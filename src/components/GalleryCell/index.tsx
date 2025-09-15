import React from "react";

export interface GalleryCellProps {
  imageSrc: string;
  alt?: string;
  title?: string;
  description?: string;
}

const GalleryCell: React.FC<GalleryCellProps> = ({ imageSrc, alt = "", title, description }) => {
  return (
    <div className="gallery-cell rounded-lg overflow-hidden shadow-md bg-white dark:bg-gray-900 p-4 flex flex-col items-center">
      <img src={imageSrc} alt={alt} className="w-full h-48 object-cover mb-2 rounded" />
      {title && <h3 className="text-lg font-semibold mb-1">{title}</h3>}
      {description && <p className="text-gray-600 dark:text-gray-300 text-sm">{description}</p>}
    </div>
  );
};

export default GalleryCell;
