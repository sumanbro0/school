export interface Student {
  id: string;
  name: string;
  email: string;
  grade: string;
  attendance: number;
  performance: number;
  status: 'active' | 'inactive';
  enrollmentDate: string;
}

export interface MetricCard {
  title: string;
  value: number | string;
  description: string;
  trend?: number;
  icon: React.ReactNode;
}

export interface PieChartData {
  name: string;
  value: number;
  fill: string;
}

export interface AreaChartData {
  month: string;
  attendance: number;
  target: number;
}

export interface VisitorData {
  month: string;
  desktop: number;
}

export interface TableColumn<T> {
  id: string;
  header: string;
  accessorKey: keyof T;
  cell?: (info: { getValue: () => any }) => React.ReactNode;
}

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}