import React from "react";
import { IPhotoCard } from "../interfaces/photocard.interface";

export const PhotoCard: React.FC<IPhotoCard> = ({ photo, onClick }) => {
  return (
    <div className="photo-card" onClick={onClick}>
      <img
        className="photo-card-image"
        src={photo.urls.small}
        alt={photo.alt_description}
      />
    </div>
  );
};