import { cn } from "@/lib/utils";
import { AlertCircle, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface FieldWrapperProps {
  fieldId: string;
  error?: string;
  helpText?: string;
  children: React.ReactNode;
  className?: string;
}

export function FieldWrapper({ fieldId, error, helpText, children, className }: FieldWrapperProps) {
  return (
    <div 
      data-field-id={fieldId}
      data-error={error ? "true" : "false"}
      className={cn(
        "relative transition-all duration-200",
        error && "animate-in fade-in-0",
        className
      )}
    >
      <div className="relative">
        {children}
        {helpText && (
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="absolute right-0 top-0 p-1 text-muted-foreground hover:text-foreground transition-colors"
                  aria-label="Help"
                >
                  <HelpCircle className="h-4 w-4" />
                </button>
              </TooltipTrigger>
              <TooltipContent 
                side="top" 
                align="end"
                className="max-w-xs text-sm bg-popover border border-border shadow-lg"
              >
                <p>{helpText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
      </div>
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 text-destructive animate-in fade-in-0 slide-in-from-top-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}
