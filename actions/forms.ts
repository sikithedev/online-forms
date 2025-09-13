"use server";

import { currentUser } from "@clerk/nextjs/server";
import * as z from "zod";
import { formSchema } from "@/schemas/form";
import { prisma } from "@/lib/prisma";

class UserNotFoundError extends Error {
  constructor(message = "User not found") {
    super(message);
    this.name = "UserNotFoundError";
  }
}

async function getUserOrThrow() {
  const user = await currentUser();
  if (!user) throw new UserNotFoundError();
  return user;
}

export async function getFormStats() {
  const user = await getUserOrThrow();

  const [visitsCount, submissionsCount] = await Promise.all([
    prisma.form.aggregate({
      where: { userId: user.id },
      _sum: { visits: true },
    }),
    prisma.submissions.count({
      where: {
        form: { userId: user.id },
      },
    }),
  ]);

  const totalVisits = visitsCount._sum.visits ?? 0;
  const totalSubmissions = submissionsCount;
  const submissionRate =
    totalVisits > 0 ? (totalSubmissions / totalVisits) * 100 : 0;
  const bounceRate = totalVisits > 0 ? 100 - submissionRate : 0;

  return { totalVisits, totalSubmissions, submissionRate, bounceRate };
}

export async function createForm(data: z.infer<typeof formSchema>) {
  const result = formSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Form not valid");
  }

  const user = await getUserOrThrow();
  const { name, description } = data;
  const form = await prisma.form.create({
    data: {
      userId: user.id,
      name,
      description,
    },
  });

  if (!form) {
    throw new Error("Something went wrong, please try again later");
  }

  return form.id;
}

export async function getForms() {
  const user = await getUserOrThrow();

  const forms = await prisma.form.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: "desc" },
    include: {
      _count: { select: { submissions: true } },
    },
  });

  return forms.map((form) => ({
    ...form,
    submissions: form._count.submissions,
  }));
}

export async function getFormSubmissions(id: number) {
  const user = await getUserOrThrow();

  return await prisma.submissions.findMany({
    where: {
      formId: id,
      form: { userId: user.id },
    },
    orderBy: { createdAt: "desc" },
  });
}

export async function getFormById(id: number) {
  const user = await getUserOrThrow();

  return await prisma.form.findUnique({
    where: {
      id,
      userId: user.id,
    },
  });
}

export async function updateFormContent(id: number, content: string) {
  const user = await getUserOrThrow();

  return await prisma.form.update({
    where: {
      id,
      userId: user.id,
    },
    data: { content },
  });
}

export async function publishFormById(id: number) {
  const user = await getUserOrThrow();

  return await prisma.form.update({
    where: {
      id,
      userId: user.id,
    },
    data: { published: true },
  });
}

export async function getFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    data: { visits: { increment: 1 } },
    where: { shareUrl: formUrl, published: true },
    select: { content: true },
  });
}
