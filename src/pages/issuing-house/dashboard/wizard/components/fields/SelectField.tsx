import { useEffect } from "react";
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
import { FieldWrapper } from "../FieldWrapper";

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
    // Options are keyed by possible values of a dependent field (e.g., issuerType: { GOVERNMENT: [...], CORPORATE: [...] })
    // We need to find which form field has a value matching one of these keys
    const optionKeys = Object.keys(field.options);
    
    // Check common dependent fields for dynamic options
    const possibleDependentFields = ["issuerType", "securityType", "instrumentType", "couponType"];
    
    for (const depFieldName of possibleDependentFields) {
      const depValue = formValues[depFieldName] as string;
      if (depValue && optionKeys.includes(depValue) && field.options[depValue]) {
        options = field.options[depValue];
        break;
      }
    }
  }

  // Auto-select if there's only one option and no value is set
  useEffect(() => {
    if (options.length === 1 && !value) {
      setFieldValue(field.id, options[0]);
    }
  }, [options, value, field.id, setFieldValue]);

  const formatOption = (opt: string) => {
    return opt.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());
  };

  // Don't render if no options available (for dynamic fields awaiting parent selection)
  if (options.length === 0) {
    return null;
  }

  return (
    <FieldWrapper fieldId={field.id} error={error}>
      <Label 
        htmlFor={field.id}
        className={cn(error && "text-destructive")}
      >
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <Select
        value={value || ""}
        onValueChange={(val) => setFieldValue(field.id, val)}
      >
        <SelectTrigger 
          id={field.id}
          className={cn(
            "w-full mt-2 transition-colors",
            error && "border-destructive ring-destructive/20 ring-2"
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
    </FieldWrapper>
  );
}
