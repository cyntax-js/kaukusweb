import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import type { FieldSchema, StepSchema, WizardSchema, VisibleWhen } from "./schema";
import type { FormValues, WizardContextValue } from "./types";

const WizardContext = createContext<WizardContextValue | null>(null);

const DRAFT_STORAGE_KEY = "security-wizard-draft";

interface WizardProviderProps {
  children: React.ReactNode;
  schema: WizardSchema;
}

export function WizardProvider({ children, schema }: WizardProviderProps) {
  const [formValues, setFormValues] = useState<FormValues>(() => {
    // Initialize with default values from schema
    const defaults: FormValues = {
      parValue: schema.parValue,
    };
    
    schema.steps.forEach((step) => {
      step.fields.forEach((field) => {
        if (field.value !== undefined) {
          defaults[field.id] = field.value;
        }
      });
    });
    
    return defaults;
  });
  
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [savedDraft, setSavedDraft] = useState(false);

  // Check visibility condition
  const isFieldVisible = useCallback(
    (field: FieldSchema): boolean => {
      if (!field.visibleWhen) return true;
      
      const { field: dependentField, in: allowedValues } = field.visibleWhen;
      const currentValue = formValues[dependentField];
      
      return allowedValues.includes(currentValue as string | boolean | number);
    },
    [formValues]
  );

  // Compute formula values
  const computeFormula = useCallback(
    (formula: string): number | null => {
      try {
        // Replace field references with actual values
        let expression = formula;
        const fieldRefs = formula.match(/[a-zA-Z_][a-zA-Z0-9_]*/g) || [];
        
        for (const ref of fieldRefs) {
          const value = formValues[ref];
          if (value === undefined || value === null || value === "") {
            return null;
          }
          expression = expression.replace(new RegExp(`\\b${ref}\\b`, "g"), String(value));
        }
        
        // Safe eval using Function constructor
        const result = new Function(`return ${expression}`)();
        
        if (typeof result === "number" && isFinite(result)) {
          return Math.round(result * 100) / 100; // Round to 2 decimals
        }
        return null;
      } catch {
        return null;
      }
    },
    [formValues]
  );

  // Set field value
  const setFieldValue = useCallback((fieldId: string, value: unknown) => {
    setFormValues((prev) => ({ ...prev, [fieldId]: value }));
    // Clear error when field is updated
    setErrors((prev) => {
      const next = { ...prev };
      delete next[fieldId];
      return next;
    });
  }, []);

  // Get field value
  const getFieldValue = useCallback(
    (fieldId: string): unknown => {
      return formValues[fieldId];
    },
    [formValues]
  );

  // Validate current step
  const validateStep = useCallback(
    (stepIndex: number): boolean => {
      const step = schema.steps[stepIndex];
      if (!step) return true;
      
      const newErrors: Record<string, string> = {};
      
      step.fields.forEach((field) => {
        if (!isFieldVisible(field)) return;
        
        if (field.required) {
          const value = formValues[field.id];
          if (value === undefined || value === null || value === "" || 
              (Array.isArray(value) && value.length === 0)) {
            newErrors[field.id] = `${field.label} is required`;
          }
        }
      });
      
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    },
    [schema.steps, formValues, isFieldVisible]
  );

  // Save draft to localStorage
  const saveDraft = useCallback(() => {
    try {
      const draft = {
        formValues,
        currentStep,
        timestamp: Date.now(),
      };
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      setSavedDraft(true);
      setTimeout(() => setSavedDraft(false), 2000);
    } catch (e) {
      console.error("Failed to save draft:", e);
    }
  }, [formValues, currentStep]);

  // Load draft from localStorage
  const loadDraft = useCallback(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const draft = JSON.parse(saved);
        setFormValues({ ...formValues, ...draft.formValues });
        setCurrentStep(draft.currentStep || 0);
      }
    } catch (e) {
      console.error("Failed to load draft:", e);
    }
  }, []);

  // Clear draft
  const clearDraft = useCallback(() => {
    localStorage.removeItem(DRAFT_STORAGE_KEY);
  }, []);

  // Auto-save draft
  useEffect(() => {
    const timer = setTimeout(() => {
      saveDraft();
    }, 5000);
    
    return () => clearTimeout(timer);
  }, [formValues, currentStep, saveDraft]);

  const value: WizardContextValue = {
    formValues,
    setFieldValue,
    getFieldValue,
    isFieldVisible,
    computeFormula,
    currentStep,
    setCurrentStep,
    steps: schema.steps,
    errors,
    validateStep,
    savedDraft,
    saveDraft,
    loadDraft,
    clearDraft,
  };

  return (
    <WizardContext.Provider value={value}>
      {children}
    </WizardContext.Provider>
  );
}

export function useWizard(): WizardContextValue {
  const context = useContext(WizardContext);
  if (!context) {
    throw new Error("useWizard must be used within a WizardProvider");
  }
  return context;
}
