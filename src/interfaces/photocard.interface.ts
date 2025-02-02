export interface IPhotoCard {
  photo: {
    id: string;
    urls: { small: string };
    alt_description: string;
  };
  onClick: () => void;
}
