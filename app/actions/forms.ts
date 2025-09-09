"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "../generated/prisma";
import * as z from "zod";
import { formSchema } from "@/schemas/form";

const prisma = new PrismaClient();

class UserNotFoundError extends Error {}

export async function getFormStats() {
  const user = await currentUser();

  if (!user) {
    throw new UserNotFoundError();
  }

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
  const bounceRate = 100 - submissionRate;

  return {
    totalVisits,
    totalSubmissions,
    submissionRate,
    bounceRate,
  };
}

export async function createForm(data: z.infer<typeof formSchema>) {
  const result = formSchema.safeParse(data);
  if (!result.success) {
    throw new Error("Form not valid");
  }

  const user = await currentUser();
  if (!user) {
    throw new UserNotFoundError();
  }

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
