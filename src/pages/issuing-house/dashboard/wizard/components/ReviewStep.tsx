import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { CheckCircle, FileText, AlertCircle } from "lucide-react";
import { format } from "date-fns";
import { useWizard } from "../WizardContext";
import type { FileUploadData, RepeatableCardData, TableRowData } from "../types";

export function ReviewStep() {
  const { formValues, steps } = useWizard();

  // Skip the review and post-approval steps in review
  const reviewableSteps = steps.filter(
    (s) => s.id !== "review" && s.id !== "postApproval"
  );

  const formatValue = (value: unknown, fieldType: string): React.ReactNode => {
    if (value === undefined || value === null || value === "") {
      return <span className="text-muted-foreground italic">Not provided</span>;
    }

    if (fieldType === "date" && value instanceof Date) {
      return format(value, "PPP");
    }

    if (fieldType === "toggle" || fieldType === "checkbox") {
      return value ? (
        <Badge variant="default" className="bg-primary/10 text-primary border-primary/30">
          Yes
        </Badge>
      ) : (
        <Badge variant="outline" className="text-muted-foreground">
          No
        </Badge>
      );
    }

    if (fieldType === "file") {
      const file = value as FileUploadData;
      return (
        <span className="flex items-center gap-2">
          <FileText className="h-4 w-4 text-primary" />
          {file.name}
        </span>
      );
    }

    if (fieldType === "multiSelect" && Array.isArray(value)) {
      return (
        <div className="flex flex-wrap gap-1">
          {value.map((v) => (
            <Badge key={v} variant="secondary" className="text-xs">
              {String(v).replace(/_/g, " ")}
            </Badge>
          ))}
        </div>
      );
    }

    if (fieldType === "repeatableCard" && Array.isArray(value)) {
      const cards = value as RepeatableCardData[];
      return (
        <span className="text-muted-foreground">
          {cards.length} {cards.length === 1 ? "entry" : "entries"}
        </span>
      );
    }

    if (fieldType === "table" && Array.isArray(value)) {
      const rows = value as TableRowData[];
      return (
        <span className="text-muted-foreground">
          {rows.length} {rows.length === 1 ? "row" : "rows"}
        </span>
      );
    }

    if (typeof value === "number") {
      return new Intl.NumberFormat("en-NG").format(value);
    }

    return String(value).replace(/_/g, " ");
  };

  const getStepCompleteness = (stepId: string): { complete: number; total: number } => {
    const step = steps.find((s) => s.id === stepId);
    if (!step) return { complete: 0, total: 0 };

    let complete = 0;
    let total = 0;

    const seenIds = new Set<string>();
    step.fields.forEach((field) => {
      if (seenIds.has(field.id)) return;
      seenIds.add(field.id);

      // Skip fields that aren't visible
      if (field.visibleWhen) {
        const { field: depField, in: allowed } = field.visibleWhen;
        const depValue = formValues[depField];
        if (!allowed.includes(depValue as string | boolean | number)) {
          return;
        }
      }

      total++;
      const value = formValues[field.id];
      if (
        value !== undefined &&
        value !== null &&
        value !== "" &&
        !(Array.isArray(value) && value.length === 0)
      ) {
        complete++;
      }
    });

    return { complete, total };
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-3 p-4 rounded-lg bg-primary/5 border border-primary/20">
        <CheckCircle className="h-5 w-5 text-primary shrink-0" />
        <div>
          <p className="font-medium">Review Your Submission</p>
          <p className="text-sm text-muted-foreground">
            Please review all information before submitting for regulatory approval.
          </p>
        </div>
      </div>

      {reviewableSteps.map((step) => {
        const completeness = getStepCompleteness(step.id);
        const seenIds = new Set<string>();

        return (
          <div key={step.id}>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-lg">{step.title}</h3>
              <div className="flex items-center gap-2">
                {completeness.complete === completeness.total ? (
                  <Badge variant="default" className="bg-primary/10 text-primary">
                    Complete
                  </Badge>
                ) : (
                  <Badge variant="outline" className="text-muted-foreground">
                    {completeness.complete}/{completeness.total}
                  </Badge>
                )}
              </div>
            </div>

            <div className="rounded-lg border overflow-hidden">
              {step.fields
                .filter((field) => {
                  if (seenIds.has(field.id)) return false;
                  seenIds.add(field.id);

                  if (field.visibleWhen) {
                    const { field: depField, in: allowed } = field.visibleWhen;
                    const depValue = formValues[depField];
                    return allowed.includes(depValue as string | boolean | number);
                  }
                  return true;
                })
                .map((field, idx) => (
                  <div
                    key={field.id}
                    className={`flex items-start justify-between p-4 ${
                      idx !== 0 ? "border-t" : ""
                    }`}
                  >
                    <span className="text-sm text-muted-foreground">
                      {field.label}
                    </span>
                    <span className="text-sm font-medium text-right max-w-[60%]">
                      {formatValue(formValues[field.id], field.type)}
                    </span>
                  </div>
                ))}
            </div>

            <Separator className="mt-8" />
          </div>
        );
      })}

      <div className="flex items-start gap-3 p-4 rounded-lg bg-destructive/10 border border-destructive/30">
        <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
        <div>
          <p className="font-medium text-destructive">
            Important Notice
          </p>
          <p className="text-sm text-muted-foreground mt-1">
            By submitting this application, you confirm that all information provided is
            accurate and complete. False or misleading information may result in
            regulatory penalties.
          </p>
        </div>
      </div>
    </div>
  );
}
