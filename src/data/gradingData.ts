import type { DeviceGrade, CriteriaCategory } from '../types';

export const DEVICE_GRADES: DeviceGrade[] = [
  {
    id: 'brand-new',
    grade: 'Brand New',
    badge: 'Factory Sealed',
    description: "Factory-sealed with original packaging, standard accessories and 12–24 months manufacturer's warranty. Perfectly unused and pristine condition.",
    warranty: '12–24 Months Warranty'
  },
  {
    id: 'grade-a-plus-mfr',
    grade: 'Grade A+',
    badge: 'Manufacturer Prepared',
    description: 'Fully operational, manufacturer-prepared devices backed by original warranty, guaranteed for immediate use.',
    warranty: 'Original Warranty'
  },
  {
    id: 'grade-a',
    grade: 'Grade A',
    badge: 'Mint Condition',
    description: 'Lightly used in mint condition with minimal wear, fully operational, briefly used, and backed by a 3-month warranty.',
    warranty: '3-Month Warranty'
  },
  {
    id: 'grade-b',
    grade: 'Grade B',
    badge: 'Great Condition',
    description: 'Devices in great condition, minimal cosmetic wear, fully functional and reliable, perfect for everyday use with a 3-month warranty.',
    warranty: '3-Month Warranty'
  },
  {
    id: 'grade-c',
    grade: 'Grade C',
    badge: 'Average Condition',
    description: 'Devices in average condition, showing moderate wear, remain fully functional and dependable with a 3-month warranty.',
    warranty: '3-Month Warranty'
  },
  {
    id: 'grade-a-plus-var',
    grade: 'Grade A+',
    badge: 'Grade Variant',
    description: 'Devices in average condition, showing moderate wear, remain fully functional and dependable with a 3-month warranty.',
    warranty: '3-Month Warranty'
  }
];

export const GRADING_CRITERIA: CriteriaCategory[] = [
  {
    title: 'Physical Condition',
    iconName: 'Smartphone',
    items: ['Screen condition', 'Body condition', 'Cosmetic wear', 'Scratches / marks']
  },
  {
    title: 'Functionality',
    iconName: 'CheckCircle2',
    items: ['Display & Touch responsiveness', 'Physical Buttons', 'Cameras & Sensors', 'Speakers, Microphones & Connectivity']
  },
  {
    title: 'Performance',
    iconName: 'Cpu',
    items: ['Battery health & charge cycles', 'System performance', 'Hardware functionality', 'Overall operational stability']
  },
  {
    title: 'Verification',
    iconName: 'ShieldCheck',
    items: ['Diagnostic software testing', 'Multi-point quality inspection', 'Grade assignment approval', 'Warranty classification']
  }
];

export const TOP_BRANDS = [
  { name: 'Apple', category: 'Mobile & Computing' },
  { name: 'Samsung', category: 'Smartphones & Tablets' },
  { name: 'Huawei', category: 'Mobile & Network Hardware' },
  { name: 'Alcatel', category: 'White Label & Mobile' },
  { name: 'Lenovo', category: 'Laptops & Workstations' },
  { name: 'Xiaomi', category: 'Consumer Electronics' },
  { name: 'Google', category: 'Smart Devices & Pixel' },
  { name: 'Motorola', category: 'Telecommunications' }
];
