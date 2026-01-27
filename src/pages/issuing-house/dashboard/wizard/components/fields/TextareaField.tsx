import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";
import { FieldWrapper } from "../FieldWrapper";

interface TextareaFieldProps {
  field: FieldSchema;
}

export function TextareaField({ field }: TextareaFieldProps) {
  const { getFieldValue, setFieldValue, errors } = useWizard();
  const value = getFieldValue(field.id) as string | undefined;
  const error = errors[field.id];

  return (
    <FieldWrapper fieldId={field.id} error={error} helpText={field.helpText}>
      <Label 
        htmlFor={field.id}
        className={cn(error && "text-destructive")}
      >
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Textarea
        id={field.id}
        value={value ?? ""}
        onChange={(e) => setFieldValue(field.id, e.target.value)}
        placeholder={`Enter ${field.label.toLowerCase()}`}
        rows={4}
        className={cn(
          "mt-2 resize-none transition-colors",
          error && "border-destructive ring-destructive/20 ring-2"
        )}
      />
    </FieldWrapper>
  );
}
