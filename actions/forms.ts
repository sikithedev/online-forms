"use server";

import { prisma } from "@/lib/prisma";
import { formSchema } from "@/schemas/form";
import { clerkClient, currentUser } from "@clerk/nextjs/server";
import * as z from "zod";

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
    prisma.submission.count({
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

  const existingForm = await prisma.form.findFirst({
    where: {
      name: parsed.name,
      userId,
    },
  });

  if (existingForm) {
    throw new Error(`You already have a form named "${parsed.name}"`);
  }

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

export async function getFormSubmissions(formId: string) {
  await requireUser();

  const submissions = await prisma.submission.findMany({
    where: { formId },
    orderBy: { createdAt: "desc" },
  });

  const userIds = submissions.map((s) => s.userId);
  const users = await (
    await clerkClient()
  ).users.getUserList({ userId: userIds });

  const submissionsWithUsers = submissions.map((s) => {
    const user = users.data.find((u) => u.id === s.userId);
    return {
      ...s,
      userName: user?.firstName ?? "Unknown",
      userEmail: user?.emailAddresses[0].emailAddress ?? "Unknown",
    };
  });

  return submissionsWithUsers;
}

export async function getForm(
  formId: string,
  options?: {
    currentUser?: boolean;
    published?: boolean;
  }
) {
  const { id: userId } = await requireUser();

  return await prisma.form.findUnique({
    where: {
      id: formId,
      ...(options?.currentUser && { userId }),
      published: options?.published,
    },
  });
}

export async function updateFormContent(formId: string, content: string) {
  const { id: userId } = await requireUser();

  return await prisma.form.update({
    where: { id: formId, userId },
    data: { content },
  });
}

export async function publishForm(formId: string, content: string) {
  const { id: userId } = await requireUser();

  return await prisma.form.update({
    where: { id: formId, userId },
    data: { content, published: true },
  });
}

export async function incrementFormVisits(formId: string) {
  await prisma.form.update({
    where: { id: formId },
    data: { visits: { increment: 1 } },
  });
}

export async function submitForm(formId: string, content: string) {
  const { id: userId } = await requireUser();

  const form = await prisma.form.findUnique({
    where: { id: formId, published: true },
  });

  if (!form) {
    throw new Error("Form not found");
  }

  const existingSubmission = await prisma.submission.findFirst({
    where: { formId: form.id, userId },
  });

  if (existingSubmission) {
    throw new Error("You have already submitted this form");
  }

  return await prisma.submission.create({
    data: { formId: form.id, userId, content },
  });
}

export async function deleteForm(formId: string) {
  const { id: userId } = await requireUser();

  return await prisma.form.deleteMany({
    where: { id: formId, userId },
  });
}

export async function getUserSubmissionForForm(formId: string) {
  const { id: userId } = await requireUser();

  return await prisma.submission.findFirst({
    where: { formId, userId },
  });
}
