export interface AccessibilitySettings {
  textSize: 'sm' | 'base' | 'lg' | 'xl';
  highContrast: boolean;
  reduceMotion: boolean;
}

export interface PARCProject {
  id: string;
  name: string;
  status: 'Active' | 'Completed' | 'Upcoming' | 'In Testing';
  blurb: string;
  description: string;
  coords: { x: number; y: number }; // percentage coords (0-100) on our responsive SVG
  location: string;
  leadResearcher: string;
  investment: string;
}

export interface Job {
  id: string;
  title: string;
  department: 'Operations' | 'Engineering' | 'Science' | 'Administration';
  type: 'Full-Time' | 'Part-Time';
  salary: string;
  location: string;
  postedDate: string;
  description: string;
  requirements: string[];
}

export interface OdorReport {
  timestamp: string;
  locationType: string;
  intensity: 'Negligible' | 'Mild' | 'Moderate' | 'Noticeable' | 'Strong';
  description: string;
  reporterStatus: 'Visitor' | 'Resident' | 'Business';
  reporterEmail?: string;
}
