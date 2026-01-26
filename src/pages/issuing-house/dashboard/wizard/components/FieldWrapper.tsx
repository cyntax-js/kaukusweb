import { cn } from "@/lib/utils";
import { AlertCircle } from "lucide-react";

interface FieldWrapperProps {
  fieldId: string;
  error?: string;
  children: React.ReactNode;
  className?: string;
}

export function FieldWrapper({ fieldId, error, children, className }: FieldWrapperProps) {
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
      {children}
      {error && (
        <div className="flex items-center gap-1.5 mt-1.5 text-destructive animate-in fade-in-0 slide-in-from-top-1">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <p className="text-xs">{error}</p>
        </div>
      )}
    </div>
  );
}
