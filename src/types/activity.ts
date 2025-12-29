export interface Activity {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  price: number;
  openDays: string[];
  hours: string;
  verifyHours?: boolean;
  hoursNote?: string;
  times: string[];
  duration: string;
  location: string;
  image: string;
  images: string[];
  availableMonths: string[];
  website: string;
}
