export interface IPhotoModal {
  open: boolean;
  onClose: () => void;
  photo: {
    id: string;
    urls: { regular: string; full?: string; small?: string };
    alt_description: string;
    description: string | null;
    likes: number;
    statistics: { views: number; downloads: number };
  };
}
