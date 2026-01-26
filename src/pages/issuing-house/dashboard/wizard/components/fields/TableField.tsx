import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { Plus, Trash2 } from "lucide-react";
import { v4 as uuidv4 } from "uuid";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";
import type { TableRowData } from "../../types";

interface TableFieldProps {
  field: FieldSchema;
}

export function TableField({ field }: TableFieldProps) {
  const { getFieldValue, setFieldValue, errors } = useWizard();
  const rows = (getFieldValue(field.id) as TableRowData[]) ?? [];
  const error = errors[field.id];

  const addRow = () => {
    const newRow: TableRowData = { id: uuidv4() };
    field.columns?.forEach((col) => {
      newRow[col.id] = col.type === "number" ? 0 : "";
    });
    setFieldValue(field.id, [...rows, newRow]);
  };

  const removeRow = (rowId: string) => {
    setFieldValue(field.id, rows.filter((r) => r.id !== rowId));
  };

  const updateCell = (rowId: string, colId: string, value: unknown) => {
    setFieldValue(
      field.id,
      rows.map((r) => (r.id === rowId ? { ...r, [colId]: value } : r))
    );
  };

  // Compute formula for a row
  const computeFormula = (row: TableRowData, formula: string): string => {
    try {
      // Calculate totals for percentage formulas
      const totalPreShares = rows.reduce(
        (sum, r) => sum + (Number(r.preShares) || 0),
        0
      );
      const totalPostShares = rows.reduce(
        (sum, r) => sum + (Number(r.postShares) || 0),
        0
      );

      let expression = formula
        .replace(/totalPreShares/g, String(totalPreShares))
        .replace(/totalPostShares/g, String(totalPostShares));

      // Replace column references with row values
      field.columns?.forEach((col) => {
        const value = row[col.id] ?? 0;
        expression = expression.replace(
          new RegExp(`\\b${col.id}\\b`, "g"),
          String(value)
        );
      });

      const result = new Function(`return ${expression}`)();
      if (typeof result === "number" && isFinite(result)) {
        return result.toFixed(2);
      }
      return "—";
    } catch {
      return "—";
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <Label className={cn(error && "text-destructive")}>
          {field.label}
          {field.required && <span className="text-destructive ml-1">*</span>}
        </Label>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={addRow}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add Row
        </Button>
      </div>

      <div className="rounded-lg border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              {field.columns?.map((col) => (
                <TableHead key={col.id} className="font-medium">
                  {col.label}
                </TableHead>
              ))}
              <TableHead className="w-12" />
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={(field.columns?.length ?? 0) + 1}
                  className="h-24 text-center text-muted-foreground"
                >
                  No data. Click "Add Row" to begin.
                </TableCell>
              </TableRow>
            ) : (
              rows.map((row) => (
                <TableRow key={row.id}>
                  {field.columns?.map((col) => (
                    <TableCell key={col.id} className="py-2">
                      {col.formula ? (
                        <span className="text-sm text-muted-foreground tabular-nums">
                          {computeFormula(row, col.formula)}%
                        </span>
                      ) : (
                        <Input
                          type={col.type === "number" ? "number" : "text"}
                          value={(row[col.id] as string | number) ?? ""}
                          onChange={(e) =>
                            updateCell(
                              row.id,
                              col.id,
                              col.type === "number"
                                ? parseFloat(e.target.value) || 0
                                : e.target.value
                            )
                          }
                          className="h-9"
                        />
                      )}
                    </TableCell>
                  ))}
                  <TableCell className="py-2">
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      onClick={() => removeRow(row.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {error && (
        <p className="text-xs text-destructive animate-in fade-in-0 slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
