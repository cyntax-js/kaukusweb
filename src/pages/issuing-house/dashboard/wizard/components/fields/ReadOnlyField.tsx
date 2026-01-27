import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { Info, HelpCircle } from "lucide-react";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";

interface ReadOnlyFieldProps {
  field: FieldSchema;
}

// Mock external data sources
const mockExternalData: Record<string, string> = {
  cbnRate: "18.75%",
  inflationIndex: "21.34",
  listingRef: "SEC/IH/2024/0156",
  admissionDate: "2024-03-15",
  status: "Pending Review",
};

export function ReadOnlyField({ field }: ReadOnlyFieldProps) {
  const { getFieldValue } = useWizard();
  
  // Get value from external source or form values
  let displayValue: string = "";
  
  if (field.valueSource === "external") {
    displayValue = mockExternalData[field.id] || "—";
  } else {
    const value = getFieldValue(field.id);
    displayValue = value !== undefined && value !== null && value !== "" 
      ? String(value) 
      : "—";
  }

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label className="text-muted-foreground">
          {field.label}
        </Label>
        {field.helpText && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Help"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                className="max-w-xs text-sm bg-popover border border-border shadow-lg"
              >
                <p>{field.helpText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      <div className={cn(
        "flex items-center gap-2 rounded-lg border border-border bg-muted/30 px-4 py-3",
        field.valueSource === "external" && "border-dashed"
      )}>
        {field.valueSource === "external" && (
          <Info className="h-4 w-4 text-muted-foreground shrink-0" />
        )}
        <span className="text-sm font-medium">
          {displayValue}
        </span>
      </div>
      {field.valueSource === "external" && (
        <p className="text-xs text-muted-foreground">
          This value is fetched from external sources
        </p>
      )}
    </div>
  );
}
