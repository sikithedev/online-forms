"use server";

import { currentUser } from "@clerk/nextjs/server";
import * as z from "zod";
import { formSchema } from "@/schemas/form";
import { prisma } from "@/lib/prisma";

async function requireUser() {
  const user = await currentUser();
  if (!user) throw new Error("User not found");
  return user;
}

export async function getFormStats() {
  const { id: userId } = await requireUser();

  const [visitsCount, submissionsCount] = await Promise.all([
    prisma.form.aggregate({
      where: { userId },
      _sum: { visits: true },
    }),
    prisma.submissions.count({
      where: { form: { userId } },
    }),
  ]);

  return {
    visits: visitsCount._sum.visits ?? 0,
    submissions: submissionsCount,
  };
}

export async function createForm(data: z.infer<typeof formSchema>) {
  const parsed = formSchema.parse(data);
  const { id: userId } = await requireUser();

  const form = await prisma.form.create({
    data: { ...parsed, userId },
  });

  return form.id;
}

export async function getForms() {
  const { id: userId } = await requireUser();

  const forms = await prisma.form.findMany({
    where: { userId },
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
  const { id: userId } = await requireUser();

  return await prisma.submissions.findMany({
    where: { formId: id, form: { userId } },
  });
}

export async function getFormById(
  id: number,
  options?: { published?: boolean }
) {
  const { id: userId } = await requireUser();

  return await prisma.form.findUnique({
    where: { id, userId, published: options?.published },
  });
}

export async function updateFormContent(id: number, content: string) {
  const { id: userId } = await requireUser();

  return await prisma.form.update({
    where: { id, userId },
    data: { content },
  });
}

export async function publishFormById(id: number, content: string) {
  const { id: userId } = await requireUser();

  return await prisma.form.update({
    where: { id, userId },
    data: { content, published: true },
  });
}

export async function getFormContentByUrl(formUrl: string) {
  return await prisma.form.update({
    where: { shareUrl: formUrl, published: true },
    data: { visits: { increment: 1 } },
    select: { content: true },
  });
}

export async function submitForm(formUrl: string, content: string) {
  return await prisma.form.update({
    where: { shareUrl: formUrl, published: true },
    data: {
      submissions: {
        create: { content },
      },
    },
  });
}

export async function deleteFormById(id: number) {
  const { id: userId } = await requireUser();

  return await prisma.form.deleteMany({
    where: { id, userId },
  });
}
