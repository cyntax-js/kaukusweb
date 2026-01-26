import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";

interface MultiSelectFieldProps {
  field: FieldSchema;
}

// Mock data for API-sourced options
const mockApiData: Record<string, { id: string; label: string }[]> = {
  "api/underwriters": [
    { id: "uw1", label: "First Bank Capital Markets" },
    { id: "uw2", label: "Stanbic IBTC" },
    { id: "uw3", label: "Chapel Hill Denham" },
    { id: "uw4", label: "Vetiva Capital" },
    { id: "uw5", label: "CardinalStone" },
  ],
};

export function MultiSelectField({ field }: MultiSelectFieldProps) {
  const { getFieldValue, setFieldValue, errors } = useWizard();
  const value = (getFieldValue(field.id) as string[]) ?? [];
  const error = errors[field.id];

  // Get options either from static array or API source
  let options: { id: string; label: string }[] = [];
  
  if (field.optionsSource && mockApiData[field.optionsSource]) {
    options = mockApiData[field.optionsSource];
  } else if (Array.isArray(field.options)) {
    options = field.options.map((opt) => ({
      id: opt,
      label: opt.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    }));
  }

  const toggleOption = (optionId: string) => {
    const newValue = value.includes(optionId)
      ? value.filter((v) => v !== optionId)
      : [...value, optionId];
    setFieldValue(field.id, newValue);
  };

  return (
    <div className="space-y-3">
      <Label className={cn(error && "text-destructive")}>
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <div className="grid gap-2 sm:grid-cols-2">
        {options.map((option) => {
          const isSelected = value.includes(option.id);
          return (
            <button
              key={option.id}
              type="button"
              onClick={() => toggleOption(option.id)}
              className={cn(
                "flex items-center gap-3 rounded-lg border p-3 text-left transition-all",
                isSelected
                  ? "border-primary bg-primary/5 text-foreground"
                  : "border-border bg-card/50 text-muted-foreground hover:border-muted-foreground/50 hover:bg-muted/30"
              )}
            >
              <div
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded border transition-colors",
                  isSelected
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/30"
                )}
              >
                {isSelected && <Check className="h-3 w-3" />}
              </div>
              <span className="text-sm font-medium">{option.label}</span>
            </button>
          );
        })}
      </div>
      
      {value.length > 0 && (
        <p className="text-xs text-muted-foreground">
          {value.length} selected
        </p>
      )}
      
      {error && (
        <p className="text-xs text-destructive animate-in fade-in-0 slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
