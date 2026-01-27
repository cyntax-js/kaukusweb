import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";

interface ToggleFieldProps {
  field: FieldSchema;
}

export function ToggleField({ field }: ToggleFieldProps) {
  const { getFieldValue, setFieldValue } = useWizard();
  const value = getFieldValue(field.id) as boolean | undefined;

  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-card/50 p-4 transition-colors hover:bg-card">
      <div className="flex items-center gap-2">
        <Label htmlFor={field.id} className="text-base font-medium cursor-pointer">
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
      <Switch
        id={field.id}
        checked={value ?? false}
        onCheckedChange={(checked) => setFieldValue(field.id, checked)}
      />
    </div>
  );
}
