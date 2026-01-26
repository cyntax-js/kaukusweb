import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
      <div className="space-y-0.5">
        <Label htmlFor={field.id} className="text-base font-medium cursor-pointer">
          {field.label}
        </Label>
      </div>
      <Switch
        id={field.id}
        checked={value ?? false}
        onCheckedChange={(checked) => setFieldValue(field.id, checked)}
      />
    </div>
  );
}
