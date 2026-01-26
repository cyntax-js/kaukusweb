import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";

interface CheckboxFieldProps {
  field: FieldSchema;
}

export function CheckboxField({ field }: CheckboxFieldProps) {
  const { getFieldValue, setFieldValue, errors } = useWizard();
  const value = getFieldValue(field.id) as boolean | undefined;
  const error = errors[field.id];

  return (
    <div className="space-y-2">
      <div className="flex items-start gap-3 rounded-lg border border-border bg-card/50 p-4">
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
      {error && (
        <p className="text-xs text-destructive animate-in fade-in-0 slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
