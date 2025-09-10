"use client";

import { Form } from "@/app/generated/prisma";
import React from "react";
import PreviewFormButton from "./PreviewFormButton";
import SaveFormButton from "./SaveFormButton";
import PublishFormButton from "./PublishFormButton";

type FormBuilderProps = {
  form: Form;
};

export default function FormBuilder({ form }: FormBuilderProps) {
  return (
    <main className="w-full flex flex-col">
      <div className="flex justify-between items-center gap-3 border-b-2 p-4">
        <h2 className="truncate">
          <span className="text-muted-foreground">Form:</span> {form.name}
        </h2>
        <div className="flex items-center gap-2">
          <PreviewFormButton />
          {!form.published && (
            <>
              <SaveFormButton />
              <PublishFormButton />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
