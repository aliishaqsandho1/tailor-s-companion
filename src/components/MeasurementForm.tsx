import { Customer, Measurements, measurementLabels } from '@/types/customer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Trash2, Save, User, Phone, MapPin, FileText } from 'lucide-react';

interface MeasurementFormProps {
  customer: Customer;
  onUpdate: (updates: Partial<Customer>) => void;
  onDelete: () => void;
}

const qameezFields: (keyof Measurements)[] = [
  'qameezLength',
  'sleeveLength',
  'teera',
  'neck',
  'chest',
  'waist',
  'gher',
  'collarSize',
  'cuffWidth',
  'placketWidth',
  'frontPocket',
  'sidePocket',
  'armhole',
  'elbow',
  'daman',
];

const shalwarFields: (keyof Measurements)[] = [
  'shalwarLength',
  'paicha',
  'shalwarPocket',
  'bain',
  'shalwarWidth',
];

export function MeasurementForm({ customer, onUpdate, onDelete }: MeasurementFormProps) {
  const handleMeasurementChange = (field: keyof Measurements, value: string) => {
    onUpdate({
      measurements: {
        ...customer.measurements,
        [field]: value,
      },
    });
  };

  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="gradient-header p-4 text-primary-foreground flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold">ناپ کی تفصیلات</h2>
          <p className="text-sm opacity-90">{customer.name}</p>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={onDelete}
          className="text-primary-foreground hover:bg-destructive hover:text-destructive-foreground"
        >
          <Trash2 className="h-5 w-5" />
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="p-4 space-y-6">
          {/* Customer Info */}
          <div className="section-card animate-fade-in">
            <h3 className="section-header">گاہک کی معلومات</h3>
            <div className="grid gap-4">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <User className="h-4 w-4 text-primary" />
                  نام
                </label>
                <Input
                  value={customer.name}
                  onChange={(e) => onUpdate({ name: e.target.value })}
                  className="measurement-input"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <Phone className="h-4 w-4 text-primary" />
                  فون نمبر
                </label>
                <Input
                  value={customer.phone}
                  onChange={(e) => onUpdate({ phone: e.target.value })}
                  className="measurement-input"
                  dir="ltr"
                />
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-medium">
                  <MapPin className="h-4 w-4 text-primary" />
                  پتہ
                </label>
                <Input
                  value={customer.address || ''}
                  onChange={(e) => onUpdate({ address: e.target.value })}
                  className="measurement-input"
                  placeholder="اختیاری"
                />
              </div>
            </div>
          </div>

          {/* Qameez Measurements */}
          <div className="section-card animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="section-header">قمیص کی پیمائش</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {qameezFields.map((field) => (
                <div key={field} className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {measurementLabels[field]}
                  </label>
                  <Input
                    value={customer.measurements[field]}
                    onChange={(e) => handleMeasurementChange(field, e.target.value)}
                    className="measurement-input"
                    placeholder="—"
                    dir="ltr"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Shalwar Measurements */}
          <div className="section-card animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="section-header">شلوار کی پیمائش</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {shalwarFields.map((field) => (
                <div key={field} className="space-y-2">
                  <label className="text-sm font-medium text-foreground">
                    {measurementLabels[field]}
                  </label>
                  <Input
                    value={customer.measurements[field]}
                    onChange={(e) => handleMeasurementChange(field, e.target.value)}
                    className="measurement-input"
                    placeholder="—"
                    dir="ltr"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Notes */}
          <div className="section-card animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <h3 className="section-header">نوٹس</h3>
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-medium">
                <FileText className="h-4 w-4 text-primary" />
                اضافی نوٹس
              </label>
              <Textarea
                value={customer.notes || ''}
                onChange={(e) => onUpdate({ notes: e.target.value })}
                className="min-h-[100px] bg-secondary/50 border-border focus:border-primary focus:ring-2 focus:ring-primary/20 rounded-lg"
                placeholder="کوئی خاص ہدایات یا نوٹس..."
              />
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  );
}
