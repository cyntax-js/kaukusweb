import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";
import { FieldWrapper } from "../FieldWrapper";

interface CheckboxFieldProps {
  field: FieldSchema;
}

export function CheckboxField({ field }: CheckboxFieldProps) {
  const { getFieldValue, setFieldValue, errors } = useWizard();
  const value = getFieldValue(field.id) as boolean | undefined;
  const error = errors[field.id];

  return (
    <FieldWrapper fieldId={field.id} error={error}>
      <div 
        className={cn(
          "flex items-start gap-3 rounded-lg border bg-card/50 p-4 transition-colors",
          error ? "border-destructive ring-destructive/20 ring-2" : "border-border"
        )}
      >
        <Checkbox
          id={field.id}
          checked={value ?? false}
          onCheckedChange={(checked) => setFieldValue(field.id, checked)}
          className="mt-0.5"
        />
        <Label 
          htmlFor={field.id} 
          className={cn(
            "text-sm font-normal leading-relaxed cursor-pointer",
            error && "text-destructive"
          )}
        >
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
      </div>
    </FieldWrapper>
  );
}
