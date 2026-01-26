import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Upload, X, File, CheckCircle } from "lucide-react";
import { useRef, useState } from "react";
import type { FieldSchema } from "../../schema";
import { useWizard } from "../../WizardContext";
import type { FileUploadData } from "../../types";

interface FileFieldProps {
  field: FieldSchema;
}

export function FileField({ field }: FileFieldProps) {
  const { getFieldValue, setFieldValue, errors } = useWizard();
  const value = getFieldValue(field.id) as FileUploadData | undefined;
  const error = errors[field.id];
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (file: File | null) => {
    if (file) {
      const fileData: FileUploadData = {
        name: file.name,
        size: file.size,
        type: file.type,
      };
      setFieldValue(field.id, fileData);
    } else {
      setFieldValue(field.id, undefined);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileChange(file);
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2">
      <Label 
        htmlFor={field.id}
        className={cn(error && "text-destructive")}
      >
        {field.label}
        {field.required && <span className="text-destructive ml-1">*</span>}
      </Label>
      
      <input
        ref={inputRef}
        id={field.id}
        type="file"
        className="hidden"
        onChange={(e) => handleFileChange(e.target.files?.[0] || null)}
        accept=".pdf,.doc,.docx,.xls,.xlsx,.jpg,.jpeg,.png"
      />

      {value ? (
        <div className="flex items-center gap-3 rounded-lg border border-primary/30 bg-primary/5 p-3 transition-colors">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <File className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{value.name}</p>
            <p className="text-xs text-muted-foreground">
              {formatFileSize(value.size)}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-primary" />
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-muted-foreground hover:text-destructive"
              onClick={() => handleFileChange(null)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          onClick={() => inputRef.current?.click()}
          className={cn(
            "flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed p-6 transition-colors cursor-pointer",
            isDragging && "border-primary bg-primary/5",
            !isDragging && "border-muted-foreground/25 hover:border-muted-foreground/50 hover:bg-muted/30",
            error && "border-destructive"
          )}
        >
          <Upload className={cn(
            "h-8 w-8",
            isDragging ? "text-primary" : "text-muted-foreground"
          )} />
          <div className="text-center">
            <p className="text-sm font-medium">
              {isDragging ? "Drop file here" : "Click to upload or drag and drop"}
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              PDF, DOC, DOCX, XLS, XLSX, JPG, PNG
            </p>
          </div>
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
