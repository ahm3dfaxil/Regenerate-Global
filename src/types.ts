export type PageView = 'home' | 'grading';

export interface DeviceGrade {
  id: string;
  grade: string;
  badge: string;
  description: string;
  warranty: string;
  tagColor?: string;
}

export interface CriteriaCategory {
  title: string;
  iconName: string;
  items: string[];
}
