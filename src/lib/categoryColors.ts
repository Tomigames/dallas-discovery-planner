/** Maps the raw activity category to the unified display label shown in the UI. */
export const rawToDisplay: Record<string, string> = {
  "Gardens": "Gardens",
  "Nature & Wildlife": "Nature & Wildlife",
  "Parks & Trails": "Parks & Trails",
  "History Museum": "History Museum",
  "Art Museum": "Art Museum",
  "Science Museum": "Science Museum",
  "Arts & Culture": "Arts & Culture",
  "Performing Arts": "Performing Arts",
  "Family & Entertainment": "Entertainment",
  "Sports & Entertainment": "Entertainment",
  "Food & Markets": "Shopping & Dining",
  "Landmarks & Views": "Landmarks & Views",
  "Shopping & Dining": "Shopping & Dining",
  "Nightlife": "Nightlife",
  "Seasonal Events": "Seasonal Events",
};

export const categoryColors: Record<string, string> = {
  "Gardens": "#16a34a",
  "Nature & Wildlife": "#166534",
  "Parks & Trails": "#0d9488",
  "Museums & Arts": "#7c3aed",
  "History Museum": "#7c3aed",
  "Art Museum": "#7c3aed",
  "Science Museum": "#7c3aed",
  "Arts & Culture": "#be185d",
  "Performing Arts": "#be185d",
  "Landmarks & Views": "#ea580c",
  "Entertainment": "#0284c7",
  "Shopping & Dining": "#db2777",
  "Nightlife": "#b45309",
  "Seasonal Events": "#d97706",
  "Free": "#0891b2",
};

export const getDisplayCategory = (raw: string): string =>
  rawToDisplay[raw] ?? raw;

export const getCategoryColor = (raw: string): string =>
  categoryColors[getDisplayCategory(raw)] ?? "#6366f1";
