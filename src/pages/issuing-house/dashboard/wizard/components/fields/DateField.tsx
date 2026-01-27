import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { CalendarIcon, HelpCircle } from "lucide-react";
import { format } from "date-fns";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";

interface DateFieldProps {
  field: FieldSchema;
}

export function DateField({ field }: DateFieldProps) {
  const { getFieldValue, setFieldValue, errors } = useWizard();
  const value = getFieldValue(field.id) as Date | undefined;
  const error = errors[field.id];

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-2">
        <Label 
          htmlFor={field.id}
          className={cn(error && "text-destructive")}
        >
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
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
      <Popover>
        <PopoverTrigger asChild>
          <Button
            id={field.id}
            variant="outline"
            className={cn(
              "w-full justify-start text-left font-normal",
              !value && "text-muted-foreground",
              error && "border-destructive focus:ring-destructive"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? format(value, "PPP") : "Pick a date"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            onSelect={(date) => setFieldValue(field.id, date)}
            initialFocus
            className="pointer-events-auto"
          />
        </PopoverContent>
      </Popover>
      {error && (
        <p className="text-xs text-destructive animate-in fade-in-0 slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
