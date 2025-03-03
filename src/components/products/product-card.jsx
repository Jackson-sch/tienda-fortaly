'use client'
import Link from "next/link"
import Image from "next/image"
import { AddToCartButton } from "@/components/products/add-to-cart-button"
import { formatCurrency } from "@/lib/utils"
import { useState } from "react"

export function ProductCard({ product }) {
console.log("🚀 ~ ProductCard ~ product desde la card:", product)

  const [selectedImage, setSelectedImage] = useState(0);

  // Si no se proporcionan imágenes, use un marcador de posición
  const displayImages = (!product.images || product.images.length === 0) 
    ? ["/placeholder.svg?height=600&width=600"] 
    : product.images;



  return (
    <div className="group relative bg-white rounded-lg shadow-sm overflow-hidden transition-all hover:shadow-md">
      <Link href={`/products/${product.slug}`} className="block aspect-square overflow-hidden">
        <Image
          src={displayImages[selectedImage] || "/placeholder.svg"}
          alt={product.nombre}
          width={300}
          height={300}
          className="object-cover w-full h-full transition-transform group-hover:scale-105"
        />
        {product.destacado && (
          <div className="absolute top-2 left-2 bg-primary text-white text-xs font-medium px-2 py-1 rounded">
            Presentación
          </div>
        )}
        {product.descuento > 0 && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-medium px-2 py-1 rounded">
            {product.descuento}% OFF
          </div>
        )}
      </Link>

      <div className="p-4">
        {/* <div className="mb-1 text-xs text-gray-500">{product.marca.name}</div> */}
        <Link href={`/products/${product.slug}`} className="block">
          <h3 className="font-medium text-gray-900 mb-1 line-clamp-2 hover:text-primary transition-colors">
            {product.nombre}
          </h3>
        </Link>

        <div className="flex items-baseline gap-2 mb-3">
          {product.descuento > 0 ? (
            <>
              <span className="text-lg font-bold text-primary">
                {formatCurrency(product.precio * (1 - product.descuento / 100))}
              </span>
              <span className="text-sm text-gray-500 line-through">{formatCurrency(product.precio)}</span>
            </>
          ) : (
            <span className="text-lg font-bold text-primary">{formatCurrency(product.precio)}</span>
          )}
        </div>

        <div className="flex justify-between items-center">
          <span className={product.stock > 0 ? "text-green-600 text-sm" : "text-red-600 text-sm"}>
            {product.stock > 0 ? "En stock" : "Agotado"}
          </span>

          {product.stock > 0 && <AddToCartButton product={product} compact />}
        </div>
      </div>
    </div>
  )
}

