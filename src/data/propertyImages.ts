import galleryManifest from "./propertyImages.manifest.json";

const PUBLIC_GALLERY_PATH = "/gallery";

interface GalleryManifestEntry {
  id: string;
  alt: string;
  category: string;
  sourceUrl: string;
  localFileName?: string;
}

export interface PropertyImage {
  id: string;
  url: string;
  alt: string;
  category: string;
  sourceUrl: string;
  localFileName?: string;
}

const manifestEntries = galleryManifest as GalleryManifestEntry[];

export const propertyImages: PropertyImage[] = manifestEntries.map(entry => {
  const url = entry.localFileName
    ? `${PUBLIC_GALLERY_PATH}/${entry.localFileName}`
    : entry.sourceUrl;

  return {
    id: entry.id,
    alt: entry.alt,
    category: entry.category,
    url,
    sourceUrl: entry.sourceUrl,
    localFileName: entry.localFileName
  } satisfies PropertyImage;
});

// Helper function to get images by category
export const getImagesByCategory = (category: string): PropertyImage[] => {
  return propertyImages.filter(img => img.category === category);
};

// Helper function to get all categories
export const getCategories = (): string[] => {
  return Array.from(new Set(propertyImages.map(img => img.category)));
};

// Featured images for hero/homepage
export const featuredImages = [
  propertyImages[0], // Living room
  propertyImages[8], // Dining area
  propertyImages[12], // Master bedroom
  propertyImages[28] // Exterior
];
