import { useState } from 'react';
import { useCustomers } from '@/hooks/useCustomers';
import { CustomerList } from '@/components/CustomerList';
import { MeasurementForm } from '@/components/MeasurementForm';
import { NewCustomerDialog } from '@/components/NewCustomerDialog';
import { EmptyState } from '@/components/EmptyState';
import { Scissors, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';

const Index = () => {
  const {
    customers,
    totalCount,
    selectedCustomer,
    selectedCustomerId,
    setSelectedCustomerId,
    searchQuery,
    setSearchQuery,
    addCustomer,
    updateCustomer,
    deleteCustomer,
  } = useCustomers();

  const [showNewDialog, setShowNewDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showMobileList, setShowMobileList] = useState(false);

  const handleDelete = () => {
    if (selectedCustomerId) {
      deleteCustomer(selectedCustomerId);
      setShowDeleteDialog(false);
    }
  };

  return (
    <div className="h-screen flex flex-col bg-background">
      {/* Header */}
      <header className="gradient-header px-4 py-3 flex items-center justify-between shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-accent/20 flex items-center justify-center">
            <Scissors className="h-5 w-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-primary-foreground">ناپ کی ڈائری</h1>
            <p className="text-xs text-primary-foreground/80">درزی کے لیے ناپ کی ایپ</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-primary-foreground"
          onClick={() => setShowMobileList(!showMobileList)}
        >
          {showMobileList ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </Button>
      </header>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar - Customer List */}
        <aside
          className={`
            ${showMobileList ? 'flex' : 'hidden'}
            md:flex flex-col w-full md:w-80 lg:w-96 border-l border-border bg-card
            absolute md:relative z-10 h-[calc(100vh-60px)] md:h-auto
          `}
        >
          <CustomerList
            customers={customers}
            totalCount={totalCount}
            selectedCustomerId={selectedCustomerId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            onSelectCustomer={(id) => {
              setSelectedCustomerId(id);
              setShowMobileList(false);
            }}
            onAddNew={() => setShowNewDialog(true)}
          />
        </aside>

        {/* Main Panel - Measurement Form */}
        <main className="flex-1 bg-muted/30">
          {selectedCustomer ? (
            <MeasurementForm
              customer={selectedCustomer}
              onUpdate={(updates) => updateCustomer(selectedCustomer.id, updates)}
              onDelete={() => setShowDeleteDialog(true)}
            />
          ) : (
            <EmptyState />
          )}
        </main>
      </div>

      {/* New Customer Dialog */}
      <NewCustomerDialog
        open={showNewDialog}
        onOpenChange={setShowNewDialog}
        onAdd={addCustomer}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent dir="rtl">
          <AlertDialogHeader>
            <AlertDialogTitle>کیا آپ واقعی حذف کرنا چاہتے ہیں؟</AlertDialogTitle>
            <AlertDialogDescription>
              اس گاہک کی تمام معلومات اور ناپ حذف ہو جائیں گے۔ یہ عمل واپس نہیں ہو سکتا۔
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="gap-2">
            <AlertDialogCancel>منسوخ</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive hover:bg-destructive/90"
            >
              حذف کریں
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Index;
