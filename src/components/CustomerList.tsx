import { Customer } from '@/types/customer';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Search, Plus, User, Phone } from 'lucide-react';

interface CustomerListProps {
  customers: Customer[];
  totalCount: number;
  selectedCustomerId: string | null;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onSelectCustomer: (id: string) => void;
  onAddNew: () => void;
}

export function CustomerList({
  customers,
  totalCount,
  selectedCustomerId,
  searchQuery,
  onSearchChange,
  onSelectCustomer,
  onAddNew,
}: CustomerListProps) {
  return (
    <div className="flex flex-col h-full">
      {/* Header */}
      <div className="gradient-header p-4 text-primary-foreground">
        <h2 className="text-xl font-bold mb-1">گاہکوں کی فہرست</h2>
        <p className="text-sm opacity-90">کل گاہک: {totalCount}</p>
      </div>

      {/* Search */}
      <div className="p-3 border-b border-border">
        <div className="relative">
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="نام یا فون نمبر تلاش کریں..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pr-10 measurement-input"
          />
        </div>
      </div>

      {/* Add New Button */}
      <div className="p-3 border-b border-border">
        <Button 
          onClick={onAddNew} 
          className="w-full h-12 text-base bg-accent text-accent-foreground hover:bg-gold-dark"
        >
          <Plus className="ml-2 h-5 w-5" />
          نیا گاہک شامل کریں
        </Button>
      </div>

      {/* Customer List */}
      <ScrollArea className="flex-1">
        <div className="p-3 space-y-2">
          {customers.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              {searchQuery ? 'کوئی گاہک نہیں ملا' : 'ابھی تک کوئی گاہک نہیں'}
            </div>
          ) : (
            customers.map((customer) => (
              <div
                key={customer.id}
                onClick={() => onSelectCustomer(customer.id)}
                className={`customer-card ${
                  selectedCustomerId === customer.id ? 'customer-card-active' : ''
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-foreground truncate">
                      {customer.name}
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
                      <Phone className="h-3 w-3" />
                      <span dir="ltr">{customer.phone}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </ScrollArea>
    </div>
  );
}
