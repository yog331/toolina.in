
export type ToolCategory = 'Govt' | 'Utility' | 'Health' | 'Developer';

export interface Tool {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: ToolCategory;
  path: string;
  isNew?: boolean;
  isOffline?: boolean;
}

export interface CalculationResult {
  label: string;
  value: string | number;
  highlight?: boolean;
}
