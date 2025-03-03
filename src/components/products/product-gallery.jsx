"use client";

import { useState } from "react";
import Image from "next/image";

export function ProductGallery({ images }) {
  console.log("🚀 ~ ProductGallery ~ images:", images)
  const [selectedImage, setSelectedImage] = useState(0);

  // Si no se proporcionan imágenes, use un marcador de posición
  const displayImages = (!images || images.length === 0) 
    ? ["/placeholder.svg?height=600&width=600"] 
    : images;

  return (
    <div className="space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border">
        <Image
          src={displayImages[selectedImage] || "/herramientas.webp"}
          alt="Product image"
          fill
          className="object-cover "
        />
      </div>

      {displayImages.length > 1 && (
        <div className="flex space-x-2 overflow-x-auto pb-2">
          {displayImages.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                selectedImage === index ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setSelectedImage(index)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`Product thumbnail ${index + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}