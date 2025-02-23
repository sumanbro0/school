import { Student, PieChartData, AreaChartData, VisitorData } from './types';

export const students: Student[] = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@school.com',
    grade: '10th',
    attendance: 95,
    performance: 88,
    status: 'active',
    enrollmentDate: '2023-09-01',
  },
];

export const gradeDistribution: PieChartData[] = [
  { name: 'A Grade (90-100%)', value: 145, fill: '#0088FE' },
  { name: 'B Grade (80-89%)', value: 238, fill: '#00C49F' },
  { name: 'C Grade (70-79%)', value: 187, fill: '#FFBB28' },
  { name: 'D Grade (60-69%)', value: 98, fill: '#FF8042' },
  { name: 'F Grade (<60%)', value: 32, fill: '#FF4842' },
];

export const attendanceTrend: AreaChartData[] = [
  { month: 'Sep', attendance: 97, target: 95 },
  { month: 'Oct', attendance: 95, target: 95 },
  { month: 'Nov', attendance: 93, target: 95 },
  { month: 'Dec', attendance: 91, target: 95 },
  { month: 'Jan', attendance: 94, target: 95 },
  { month: 'Feb', attendance: 96, target: 95 },
  { month: 'Mar', attendance: 95, target: 95 },
  { month: 'Apr', attendance: 97, target: 95 },
];

export const visitorData: VisitorData[] = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];