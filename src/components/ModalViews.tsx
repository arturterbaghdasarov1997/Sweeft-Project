import React, { useState } from "react";
import { IPhotoModal } from "../interfaces/photomodal.interface";
import { FaHeart } from "react-icons/fa";
import "./ModalViews.css";
import { IoMdDownload } from "react-icons/io";
import { RiCloseLargeLine } from "react-icons/ri";

export const ModalView: React.FC<IPhotoModal> = ({ open, onClose, photo }) => {
  const [downloads, setDownloads] = useState(photo.statistics?.downloads || 0);

  const imageUrl = photo.urls?.full || photo.urls?.regular || photo.urls?.small || "fallback-image-url";

  if (!photo || !photo.urls) {
    return null;
  }

  const download = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
  
    try {
      const response = await fetch(imageUrl);
      if (!response.ok) throw new Error("Failed to fetch image");
  
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
  
      const fileExtension = blob.type.includes("png") ? "png" : "jpg";
      const fileName = `${photo.alt_description?.replace(/[^a-z0-9]/gi, '_') || "image"}.${fileExtension}`;
  
      const link = document.createElement("a");
      link.href = url;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
  
      setDownloads((prev) => prev + 1);
    } catch (error) {
      console.error("Download error:", error);
    }
  };  

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}><RiCloseLargeLine /></button>
        </div>

        <div className="modal-body">
          <div className="image-container">
            <img
              src={imageUrl}
              alt={photo.alt_description || "Photo"}
              className="modal-image"
            />
          </div>
          <p>{photo.statistics?.views || 0} Views</p>

          <a
            href={imageUrl}
            className="download-btn"
            onClick={download}
          >
            <IoMdDownload /> Download Image
          </a>
          <p>{downloads} Downloads</p>

          <h3>Author: {photo.user?.name}</h3>
          <p>{photo.description || "No description available"}</p>
          {photo.location?.name && (
            <p>
              <strong>Location:</strong> {photo.location.name}
            </p>
          )}
          <p>
            <FaHeart style={{ marginRight: 8, color: 'rgb(255, 0, 0)' }} />
            <strong>{photo.likes} Likes</strong>
          </p>
        </div>
      </div>
    </div>
  );
};