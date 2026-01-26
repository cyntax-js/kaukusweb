import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";

interface StringFieldProps {
  field: FieldSchema;
}

export function StringField({ field }: StringFieldProps) {
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
      <Input
        id={field.id}
        type="text"
        value={value ?? ""}
        onChange={(e) => setFieldValue(field.id, e.target.value)}
        placeholder={`Enter ${field.label.toLowerCase()}`}
        className={cn(
          "transition-colors",
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
