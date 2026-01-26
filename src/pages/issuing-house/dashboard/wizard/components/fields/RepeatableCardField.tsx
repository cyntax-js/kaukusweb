import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Plus, Trash2, CalendarIcon, GripVertical } from "lucide-react";
import { format } from "date-fns";
import { v4 as uuidv4 } from "uuid";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";
import type { RepeatableCardData } from "../../types";

interface RepeatableCardFieldProps {
  field: FieldSchema;
}

export function RepeatableCardField({ field }: RepeatableCardFieldProps) {
  const { getFieldValue, setFieldValue, errors } = useWizard();
  const cards = (getFieldValue(field.id) as RepeatableCardData[]) ?? [];
  const error = errors[field.id];

  const addCard = () => {
    const newCard: RepeatableCardData = { id: uuidv4() };
    // Initialize with empty values for each sub-field
    field.fields?.forEach((subField) => {
      newCard[subField.id] = "";
    });
    setFieldValue(field.id, [...cards, newCard]);
  };

  const removeCard = (cardId: string) => {
    setFieldValue(field.id, cards.filter((c) => c.id !== cardId));
  };

  const updateCard = (cardId: string, subFieldId: string, value: unknown) => {
    setFieldValue(
      field.id,
      cards.map((c) =>
        c.id === cardId ? { ...c, [subFieldId]: value } : c
      )
    );
  };

  const renderSubField = (card: RepeatableCardData, subField: FieldSchema) => {
    const value = card[subField.id];

    switch (subField.type) {
      case "date":
        return (
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !value && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {value ? format(value as Date, "PPP") : "Pick a date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={value as Date | undefined}
                onSelect={(date) => updateCard(card.id, subField.id, date)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
        );
      case "textarea":
        return (
          <Textarea
            value={(value as string) ?? ""}
            onChange={(e) => updateCard(card.id, subField.id, e.target.value)}
            placeholder={`Enter ${subField.label.toLowerCase()}`}
            rows={3}
            className="resize-none"
          />
        );
      default:
        return (
          <Input
            type="text"
            value={(value as string) ?? ""}
            onChange={(e) => updateCard(card.id, subField.id, e.target.value)}
            placeholder={`Enter ${subField.label.toLowerCase()}`}
          />
        );
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
          onClick={addCard}
          className="gap-2"
        >
          <Plus className="h-4 w-4" />
          Add {field.label.replace(/s$/, "")}
        </Button>
      </div>

      {cards.length === 0 ? (
        <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/25 py-8 text-center">
          <p className="text-sm text-muted-foreground">
            No {field.label.toLowerCase()} added yet
          </p>
          <Button
            type="button"
            variant="link"
            size="sm"
            onClick={addCard}
            className="mt-2"
          >
            Add your first one
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {cards.map((card, index) => (
            <Card key={card.id} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center gap-2 border-b bg-muted/30 py-3 px-4">
                <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                <span className="text-sm font-medium flex-1">
                  {field.label.replace(/s$/, "")} #{index + 1}
                </span>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeCard(card.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="p-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  {field.fields?.map((subField) => (
                    <div
                      key={subField.id}
                      className={cn(
                        "space-y-2",
                        subField.type === "textarea" && "sm:col-span-2"
                      )}
                    >
                      <Label htmlFor={`${card.id}-${subField.id}`}>
                        {subField.label}
                      </Label>
                      {renderSubField(card, subField)}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {error && (
        <p className="text-xs text-destructive animate-in fade-in-0 slide-in-from-top-1">
          {error}
        </p>
      )}
    </div>
  );
}
