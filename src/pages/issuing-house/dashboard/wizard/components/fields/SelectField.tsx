import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";

interface SelectFieldProps {
  field: FieldSchema;
}

export function SelectField({ field }: SelectFieldProps) {
  const { getFieldValue, setFieldValue, formValues, errors } = useWizard();
  const value = getFieldValue(field.id) as string | undefined;
  const error = errors[field.id];

  // Handle dynamic options based on another field
  let options: string[] = [];
  if (Array.isArray(field.options)) {
    options = field.options;
  } else if (field.options && typeof field.options === "object") {
    // Get options based on dependent field (e.g., issuerType)
    const dependentFields = Object.keys(field.options);
    for (const depField of dependentFields) {
      const depValue = formValues[depField] as string;
      if (depValue && field.options[depValue]) {
        options = field.options[depValue];
        break;
      }
    }
    // Fallback to first available options if no match
    if (options.length === 0) {
      const issuerType = formValues["issuerType"] as string;
      if (issuerType && field.options[issuerType]) {
        options = field.options[issuerType];
      }
    }
  }

  const formatOption = (opt: string) => {
    return opt.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={field.id}
        className={cn(error && "text-destructive")}
      >
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select
        value={value}
        onValueChange={(val) => setFieldValue(field.id, val)}
      >
        <SelectTrigger 
          id={field.id}
          className={cn(
            "w-full transition-colors",
            error && "border-destructive focus:ring-destructive"
          )}
        >
          <SelectValue placeholder={`Select ${field.label.toLowerCase()}`} />
        </SelectTrigger>
        <SelectContent>
          {options.map((opt) => (
            <SelectItem key={opt} value={opt}>
              {formatOption(opt)}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      {error && (
        <p className="text-xs text-destructive animate-in fade-in-0 slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
