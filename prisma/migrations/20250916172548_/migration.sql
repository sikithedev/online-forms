-- DropForeignKey
ALTER TABLE "public"."Submissions" DROP CONSTRAINT "Submissions_formId_fkey";

-- AddForeignKey
ALTER TABLE "public"."Submissions" ADD CONSTRAINT "Submissions_formId_fkey" FOREIGN KEY ("formId") REFERENCES "public"."Form"("id") ON DELETE CASCADE ON UPDATE CASCADE;
