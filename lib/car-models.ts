/**
 * Car Model Mapping Utility for Honda Permata
 * Maps folder names to display names for consistent car model handling
 */

export interface CarModelInfo {
  displayName: string;
  slug: string;
}

/**
 * Mapping of car model folder names to their display names
 */
export const CAR_MODEL_MAPPING: Record<string, CarModelInfo> = {
  'all-new-honda-accord': {
    displayName: 'All New Honda Accord',
    slug: 'all-new-honda-accord'
  },
  'all-new-honda-cr-v': {
    displayName: 'All New Honda CR-V',
    slug: 'all-new-honda-cr-v'
  },
  'honda-br-v-n7x': {
    displayName: 'Honda BR-V N7X',
    slug: 'honda-br-v-n7x'
  },
  'honda-city-hatchback-rs': {
    displayName: 'Honda City Hatchback RS',
    slug: 'honda-city-hatchback-rs'
  },
  'honda-civic-rs': {
    displayName: 'Honda Civic RS',
    slug: 'honda-civic-rs'
  },
  'honda-civic-type-r': {
    displayName: 'Honda Civic Type R',
    slug: 'honda-civic-type-r'
  },
  'honda-e-n1': {
    displayName: 'Honda e:N1',
    slug: 'honda-e-n1'
  },
  'honda-hr-v': {
    displayName: 'Honda HR-V',
    slug: 'honda-hr-v'
  },
  'honda-step-wgn': {
    displayName: 'Honda STEP WGN',
    slug: 'honda-step-wgn'
  },
  'honda-wr-v': {
    displayName: 'Honda WR-V',
    slug: 'honda-wr-v'
  },
  'new-honda-brio': {
    displayName: 'New Honda Brio',
    slug: 'new-honda-brio'
  },
  'new-honda-city': {
    displayName: 'New Honda City',
    slug: 'new-honda-city'
  }
};

/**
 * Get car model display name from folder slug
 */
export function getCarModelDisplayName(slug: string): string {
  return CAR_MODEL_MAPPING[slug]?.displayName || slug;
}

/**
 * Get all available car models
 */
export function getAllCarModels(): CarModelInfo[] {
  return Object.values(CAR_MODEL_MAPPING);
}

/**
 * Check if a car model slug is valid
 */
export function isValidCarModelSlug(slug: string): boolean {
  return slug in CAR_MODEL_MAPPING;
}