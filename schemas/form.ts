import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(4, {
    error: (iss) => `Form name must have ${iss.minimum} characters or more`,
  }),
  description: z.string().optional(),
});
