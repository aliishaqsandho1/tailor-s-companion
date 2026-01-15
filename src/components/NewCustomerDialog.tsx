import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User, Phone, UserPlus } from 'lucide-react';

interface NewCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (name: string, phone: string) => void;
}

export function NewCustomerDialog({ open, onOpenChange, onAdd }: NewCustomerDialogProps) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && phone.trim()) {
      onAdd(name.trim(), phone.trim());
      setName('');
      setPhone('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md" dir="rtl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <UserPlus className="h-6 w-6 text-primary" />
            نیا گاہک شامل کریں
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <User className="h-4 w-4 text-primary" />
              نام
            </label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="measurement-input"
              placeholder="گاہک کا نام"
              autoFocus
            />
          </div>
          <div className="space-y-2">
            <label className="flex items-center gap-2 text-sm font-medium">
              <Phone className="h-4 w-4 text-primary" />
              فون نمبر
            </label>
            <Input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="measurement-input"
              placeholder="فون نمبر"
              dir="ltr"
            />
          </div>
          <div className="flex gap-3 pt-4">
            <Button
              type="submit"
              className="flex-1 h-12 text-base bg-primary hover:bg-primary/90"
              disabled={!name.trim() || !phone.trim()}
            >
              شامل کریں
            </Button>
            <Button
              type="button"
              variant="outline"
              className="flex-1 h-12 text-base"
              onClick={() => onOpenChange(false)}
            >
              منسوخ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
