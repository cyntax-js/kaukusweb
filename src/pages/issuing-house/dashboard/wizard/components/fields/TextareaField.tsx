import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";

interface TextareaFieldProps {
  field: FieldSchema;
}

export function TextareaField({ field }: TextareaFieldProps) {
  const { getFieldValue, setFieldValue, errors } = useWizard();
  const value = getFieldValue(field.id) as string | undefined;
  const error = errors[field.id];

  return (
    <div className="space-y-2">
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
          "resize-none transition-colors",
          error && "border-destructive focus:ring-destructive"
        )}
      />
      {error && (
        <p className="text-xs text-destructive animate-in fade-in-0 slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
