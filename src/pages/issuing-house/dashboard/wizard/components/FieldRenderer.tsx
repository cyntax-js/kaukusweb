import type { FieldSchema } from "../schema";
import { useWizard } from "../WizardContext";
import {
  SelectField,
  NumberField,
  DateField,
  ToggleField,
  CheckboxField,
  TextareaField,
  StringField,
  FileField,
  MultiSelectField,
  ReadOnlyField,
  RepeatableCardField,
  TableField,
} from "./fields";

interface FieldRendererProps {
  field: FieldSchema;
}

export function FieldRenderer({ field }: FieldRendererProps) {
  const { isFieldVisible } = useWizard();

  // Check visibility
  if (!isFieldVisible(field)) {
    return null;
  }

  // Render based on field type
  switch (field.type) {
    case "select":
      return <SelectField field={field} />;
    case "number":
      return <NumberField field={field} />;
    case "date":
      return <DateField field={field} />;
    case "toggle":
      return <ToggleField field={field} />;
    case "checkbox":
      return <CheckboxField field={field} />;
    case "textarea":
      return <TextareaField field={field} />;
    case "string":
      return <StringField field={field} />;
    case "file":
      return <FileField field={field} />;
    case "multiSelect":
      return <MultiSelectField field={field} />;
    case "readOnly":
      return <ReadOnlyField field={field} />;
    case "repeatableCard":
      return <RepeatableCardField field={field} />;
    case "table":
      return <TableField field={field} />;
    default:
      return (
        <div className="text-sm text-muted-foreground">
          Unknown field type: {field.type}
        </div>
      );
  }
}
