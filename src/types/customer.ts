export interface Measurements {
  // قمیص - Qameez
  qameezLength: string;      // لمبائی قمیص
  sleeveLength: string;      // بازو
  teera: string;             // تیرا
  neck: string;              // گلا
  chest: string;             // چھاتی
  waist: string;             // کمر
  gher: string;              // گھیر
  collarSize: string;        // کالر گز
  cuffWidth: string;         // کف چوڑائی
  placketWidth: string;      // پٹی چوڑائی
  frontPocket: string;       // سامنے پاکٹ
  sidePocket: string;        // سائیڈ پاکٹ
  armhole: string;           // آرمول
  elbow: string;             // کہنی
  daman: string;             // دامن
  
  // شلوار - Shalwar
  shalwarLength: string;     // شلوار لمبائی
  paicha: string;            // پائچہ
  shalwarPocket: string;     // شلوار پاکٹ
  bain: string;              // بائن
  shalwarWidth: string;      // شلوار چوڑائی
}

export interface Customer {
  id: string;
  name: string;
  phone: string;
  address?: string;
  measurements: Measurements;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export const emptyMeasurements: Measurements = {
  qameezLength: '',
  sleeveLength: '',
  teera: '',
  neck: '',
  chest: '',
  waist: '',
  gher: '',
  collarSize: '',
  cuffWidth: '',
  placketWidth: '',
  frontPocket: '',
  sidePocket: '',
  armhole: '',
  elbow: '',
  daman: '',
  shalwarLength: '',
  paicha: '',
  shalwarPocket: '',
  bain: '',
  shalwarWidth: '',
};

export const measurementLabels: Record<keyof Measurements, string> = {
  qameezLength: 'لمبائی قمیص',
  sleeveLength: 'بازو',
  teera: 'تیرا',
  neck: 'گلا',
  chest: 'چھاتی',
  waist: 'کمر',
  gher: 'گھیر',
  collarSize: 'کالر گز',
  cuffWidth: 'کف چوڑائی',
  placketWidth: 'پٹی چوڑائی',
  frontPocket: 'سامنے پاکٹ',
  sidePocket: 'سائیڈ پاکٹ',
  armhole: 'آرمول',
  elbow: 'کہنی',
  daman: 'دامن',
  shalwarLength: 'شلوار لمبائی',
  paicha: 'پائچہ',
  shalwarPocket: 'شلوار پاکٹ',
  bain: 'بائن',
  shalwarWidth: 'شلوار چوڑائی',
};
