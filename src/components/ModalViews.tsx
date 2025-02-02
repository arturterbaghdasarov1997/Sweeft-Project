import React, { useState } from "react";
import { IPhotoModal } from "../interfaces/photomodal.interface";
import { FaHeart } from "react-icons/fa";
import "./ModalViews.css";
import { IoMdDownload } from "react-icons/io";
import { RiCloseLargeLine } from "react-icons/ri";

export const ModalView: React.FC<IPhotoModal> = ({ open, onClose, photo }) => {
  const [downloads, setDownloads] = useState(photo.statistics?.downloads || 0);

  const imageUrl =
    photo.urls?.full ||
    photo.urls?.regular ||
    photo.urls?.small ||
    "fallback-image-url";

  if (!photo || !photo.urls) {
    return null;
  }

  const download = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    const imageUrl = e.currentTarget.href;

    fetch(imageUrl)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch image");
        }
        return response.arrayBuffer();
      })
      .then((buffer) => {
        const blob = new Blob([buffer]);
        const url = window.URL.createObjectURL(blob);

        const fileName =
          photo.alt_description?.replace(/[^a-z0-9]/gi, "_") || "image.png";

        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", fileName);
        document.body.appendChild(link);
        link.click();
        link.remove();

        setDownloads((prev) => prev + 1);
      })
      .catch((err) => {
        console.error("Download error:", err);
      });
  };

  if (!open) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <button className="close-btn" onClick={onClose}>
            <RiCloseLargeLine />
          </button>
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

          <a href={imageUrl} className="download-btn" onClick={download}>
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
            <FaHeart style={{ marginRight: 8, color: "rgb(255, 0, 0)" }} />
            <strong>{photo.likes} Likes</strong>
          </p>
        </div>
      </div>
    </div>
  );
};
