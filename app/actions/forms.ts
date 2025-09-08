"use server";

import { currentUser } from "@clerk/nextjs/server";
import { PrismaClient } from "../generated/prisma";

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
