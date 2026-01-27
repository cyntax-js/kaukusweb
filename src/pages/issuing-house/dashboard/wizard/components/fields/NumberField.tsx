import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";
import { FieldWrapper } from "../FieldWrapper";

interface NumberFieldProps {
  field: FieldSchema;
}

export function NumberField({ field }: NumberFieldProps) {
  const { getFieldValue, setFieldValue, computeFormula, errors } = useWizard();
  const error = errors[field.id];

  // Check if this is a formula field
  const isFormula = !!field.formula;
  const isReadOnly = field.readOnly || isFormula;

  let value: number | string = "";
  
  if (isFormula && field.formula) {
    const computed = computeFormula(field.formula);
    value = computed !== null ? computed : "";
  } else {
    value = (getFieldValue(field.id) as number) ?? "";
  }

  const formatNumber = (num: number | string): string => {
    if (num === "" || num === null || num === undefined) return "";
    const number = typeof num === "string" ? parseFloat(num) : num;
    if (isNaN(number)) return "";
    return new Intl.NumberFormat("en-NG").format(number);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value.replace(/,/g, "");
    const numValue = rawValue === "" ? "" : parseFloat(rawValue);
    setFieldValue(field.id, numValue);
  };

  return (
    <FieldWrapper fieldId={field.id} error={error} helpText={field.helpText}>
      <Label 
        htmlFor={field.id}
        className={cn(error && "text-destructive")}
      >
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      <div className="relative mt-2">
        <Input
          id={field.id}
          type="text"
          inputMode="numeric"
          value={isReadOnly ? formatNumber(value) : value}
          onChange={handleChange}
          disabled={isReadOnly}
          placeholder={isFormula ? "Calculated automatically" : "Enter value"}
          className={cn(
            "transition-colors",
            isReadOnly && "bg-muted/50 text-muted-foreground cursor-not-allowed",
            error && "border-destructive ring-destructive/20 ring-2"
          )}
        />
        {isFormula && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
            Auto
          </span>
        )}
      </div>
    </FieldWrapper>
  );
}
