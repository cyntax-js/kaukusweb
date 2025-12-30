import { useState, useRef, useCallback } from 'react';
import { Upload, X, Image, Link as LinkIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface LogoUploaderProps {
  value?: string;
  onChange: (logoUrl: string | undefined) => void;
  className?: string;
}

const MAX_FILE_SIZE = 500 * 1024; // 500KB
const ACCEPTED_TYPES = ['image/png', 'image/jpeg', 'image/svg+xml', 'image/webp'];

export default function LogoUploader({ value, onChange, className }: LogoUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [urlInput, setUrlInput] = useState('');
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Please upload a PNG, JPG, SVG, or WebP image';
    }
    if (file.size > MAX_FILE_SIZE) {
      return 'File size must be less than 500KB';
    }
    return null;
  };

  const processFile = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      onChange(result);
    };
    reader.onerror = () => {
      setError('Failed to read file');
    };
    reader.readAsDataURL(file);
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleFileSelect = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  }, [processFile]);

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setError(null);
      onChange(urlInput.trim());
      setUrlInput('');
    }
  };

  const handleRemove = () => {
    onChange(undefined);
    setError(null);
    if (inputRef.current) {
      inputRef.current.value = '';
    }
  };

  return (
    <div className={cn('space-y-4', className)}>
      <Tabs defaultValue="upload" className="w-full">
        <TabsList className="w-full">
          <TabsTrigger value="upload" className="flex-1">
            <Upload className="w-4 h-4 mr-2" />
            Upload
          </TabsTrigger>
          <TabsTrigger value="url" className="flex-1">
            <LinkIcon className="w-4 h-4 mr-2" />
            URL
          </TabsTrigger>
        </TabsList>

        <TabsContent value="upload" className="mt-4">
          {value ? (
            <div className="relative p-4 border rounded-lg bg-muted/50">
              <button
                onClick={handleRemove}
                className="absolute top-2 right-2 p-1 rounded-full bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="flex items-center justify-center">
                <img 
                  src={value} 
                  alt="Logo preview" 
                  className="max-h-16 max-w-full object-contain"
                />
              </div>
              <p className="text-xs text-muted-foreground text-center mt-2">
                Click × to remove and upload a new logo
              </p>
            </div>
          ) : (
            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => inputRef.current?.click()}
              className={cn(
                'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
                isDragging 
                  ? 'border-primary bg-primary/5' 
                  : 'border-border hover:border-primary/50 hover:bg-muted/50'
              )}
            >
              <input
                ref={inputRef}
                type="file"
                accept={ACCEPTED_TYPES.join(',')}
                onChange={handleFileSelect}
                className="hidden"
              />
              <div className="flex flex-col items-center gap-2">
                <div className={cn(
                  'w-12 h-12 rounded-full flex items-center justify-center transition-colors',
                  isDragging ? 'bg-primary text-primary-foreground' : 'bg-muted'
                )}>
                  <Image className="w-6 h-6" />
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {isDragging ? 'Drop your logo here' : 'Drag & drop your logo'}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    or click to browse • PNG, JPG, SVG, WebP • Max 500KB
                  </p>
                </div>
              </div>
            </div>
          )}
        </TabsContent>

        <TabsContent value="url" className="mt-4 space-y-3">
          <div>
            <Label className="text-xs text-muted-foreground">
              Paste a URL to your logo image
            </Label>
            <div className="flex gap-2 mt-2">
              <Input
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="https://example.com/logo.png"
                className="flex-1"
              />
              <Button onClick={handleUrlSubmit} disabled={!urlInput.trim()}>
                Apply
              </Button>
            </div>
          </div>
          {value && value.startsWith('http') && (
            <div className="p-4 border rounded-lg bg-muted/50">
              <div className="flex items-center justify-between">
                <img 
                  src={value} 
                  alt="Logo preview" 
                  className="max-h-12 max-w-[200px] object-contain"
                />
                <Button variant="ghost" size="sm" onClick={handleRemove}>
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}
