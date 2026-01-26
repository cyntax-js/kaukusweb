import type { FieldSchema, StepSchema } from "./schema";

export type FormValues = Record<string, unknown>;

export interface WizardContextValue {
  formValues: FormValues;
  setFieldValue: (fieldId: string, value: unknown) => void;
  getFieldValue: (fieldId: string) => unknown;
  isFieldVisible: (field: FieldSchema) => boolean;
  computeFormula: (formula: string) => number | null;
  currentStep: number;
  setCurrentStep: (step: number) => void;
  steps: StepSchema[];
  errors: Record<string, string>;
  validateStep: (stepIndex: number) => boolean;
  savedDraft: boolean;
  saveDraft: () => void;
  loadDraft: () => void;
  clearDraft: () => void;
}

export interface RepeatableCardData {
  id: string;
  [key: string]: unknown;
}

export interface TableRowData {
  id: string;
  [key: string]: unknown;
}

export interface FileUploadData {
  name: string;
  size: number;
  type: string;
  url?: string;
}
