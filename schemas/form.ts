import * as z from "zod";

export const formSchema = z.object({
  name: z.string().min(4, {
    error: (iss) => `Form name must have ${iss.minimum} characters or more`,
  }),
  description: z.string().optional(),
});

export const textPropertiesSchema = z.object({
  label: z
    .string()
    .min(4, {
      message: "Label must be at least 4 characters.",
    })
    .max(64, {
      message: "Label must be at most 64 characters.",
    }),
  required: z.boolean(),
  placeholder: z.string().max(64, {
    message: "Placeholder must be at most 64 characters.",
  }),
  helperText: z.string().max(128, {
    message: "Helper text must be at most 128 characters.",
  }),
});

export const numberPropertiesSchema = z.object({
  label: z.string().max(64, {
    message: "Label must be at most 64 characters.",
  }),
  required: z.boolean(),
  placeholder: z.string().max(64, {
    message: "Placeholder must be at most 64 characters.",
  }),
  helperText: z.string().max(128, {
    message: "Helper text must be at most 128 characters.",
  }),
});

export const textareaPropertiesSchema = (minRows: number, maxRows: number) =>
  z.object({
    label: z
      .string()
      .min(4, {
        message: "Label must be at least 4 characters.",
      })
      .max(64, {
        message: "Label must be at most 64 characters.",
      }),
    required: z.boolean(),
    rows: z
      .number()
      .min(minRows, {
        message: `Numer of rows must be at least ${minRows}.`,
      })
      .max(maxRows, {
        message: `Numer of rows must be at most ${maxRows}.`,
      }),
    placeholder: z.string().max(64, {
      message: "Placeholder must be at most 64 characters.",
    }),
    helperText: z.string().max(128, {
      message: "Helper text must be at most 128 characters.",
    }),
  });

export const datePropertiesSchema = z.object({
  label: z
    .string()
    .min(4, {
      message: "Label must be at least 4 characters.",
    })
    .max(64, {
      message: "Label must be at most 64 characters.",
    }),
  required: z.boolean(),
  helperText: z.string().max(128, {
    message: "Helper text must be at most 128 characters.",
  }),
});

export const selectPropertiesSchema = z.object({
  label: z
    .string()
    .min(4, {
      message: "Label must be at least 4 characters.",
    })
    .max(64, {
      message: "Label must be at most 64 characters.",
    }),
  required: z.boolean(),
  placeholder: z.string().max(64, {
    message: "Placeholder must be at most 64 characters.",
  }),
  helperText: z.string().max(128, {
    message: "Helper text must be at most 128 characters.",
  }),
  options: z.array(z.string()),
});

export const checkboxPropertiesSchema = z.object({
  label: z
    .string()
    .min(4, {
      message: "Label must be at least 4 characters.",
    })
    .max(64, {
      message: "Label must be at most 64 characters.",
    }),
  required: z.boolean(),
  helperText: z.string().max(128, {
    message: "Helper text must be at most 128 characters.",
  }),
});

export const titlePropertiesSchema = z.object({
  title: z
    .string()
    .min(4, {
      message: "Title must be at least 4 characters.",
    })
    .max(64, {
      message: "Title must be at most 64 characters.",
    }),
});

export const subtitlePropertiesSchema = z.object({
  subtitle: z
    .string()
    .min(4, {
      message: "Subtitle must be at least 4 characters.",
    })
    .max(64, {
      message: "Subtitle must be at most 64 characters.",
    }),
});

export const paragraphPropertiesSchema = z.object({
  text: z
    .string()
    .min(4, {
      message: "Paragraph must be at least 4 characters.",
    })
    .max(512, {
      message: "Paragraph must be at most 512 characters.",
    }),
});

export const spacerPropertiesSchema = (minHeight: number, maxHeight: number) =>
  z.object({
    height: z
      .number()
      .min(minHeight, {
        message: `Height must be at least ${minHeight} pixels.`,
      })
      .max(maxHeight, {
        message: `Height must be at most ${maxHeight} pixels.`,
      }),
  });
