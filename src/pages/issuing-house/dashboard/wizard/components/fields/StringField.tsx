import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";
import { FieldWrapper } from "../FieldWrapper";

interface StringFieldProps {
  field: FieldSchema;
}

export function StringField({ field }: StringFieldProps) {
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
      <Input
        id={field.id}
        type="text"
        value={value ?? ""}
        onChange={(e) => setFieldValue(field.id, e.target.value)}
        placeholder={`Enter ${field.label.toLowerCase()}`}
        className={cn(
          "mt-2 transition-colors",
          error && "border-destructive ring-destructive/20 ring-2"
        )}
      />
    </FieldWrapper>
  );
}
