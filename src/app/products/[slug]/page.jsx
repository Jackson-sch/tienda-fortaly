import { notFound } from "next/navigation"
import { fetchProductBySlug, fetchRelatedProducts } from "@/lib/api"
import { AddToCartButton } from "@/components/products/add-to-cart-button"
import { ProductGallery } from "@/components/products/product-gallery"
import { ProductTabs } from "@/components/products/product-tabs"

import { formatCurrency } from "@/lib/utils"
import { RelatedProducts } from "@/components/products/related-product"
import { BlocksRenderer } from "@strapi/blocks-react-renderer"

export default async function ProductPage({ params }) {
  const product = await fetchProductBySlug(params.slug)

  if (!product) {
    notFound()
  }

// Verificar que categoria existe antes de pasar el id
const relatedProducts = product.categoria?.id
? await fetchRelatedProducts(product.id, product.categoria.id)
: [];



  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <ProductGallery images={product.images} />

        <div className="flex flex-col">
          <h1 className="text-3xl font-bold mb-2">{product.nombre}</h1>

          <div className="flex items-center gap-4 mb-4">
            <span className="text-gray-600">SKU: {product.sku}</span>
            <span className="text-gray-600">Marca: {product.marca.name}</span>
          </div>

          <div className="flex items-baseline gap-4 mb-6">
            {product.descuento > 0 ? (
              <>
                <span className="text-3xl font-bold text-primary">
                  {formatCurrency(product.precio * (1 - product.descuento / 100))}
                </span>
                <span className="text-xl text-gray-500 line-through">{formatCurrency(product.precio)}</span>
                <span className="bg-red-100 text-red-800 px-2 py-1 rounded-md text-sm font-medium">
                  {product.descuento}% OFF
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold text-primary">{formatCurrency(product.precio)}</span>
            )}
          </div>

          <div className="mb-6">
            <div className="flex items-center gap-2 mb-2">
              <span className={product.stock > 0 ? "text-green-600" : "text-red-600"}>
                {product.stock > 0 ? "En stock" : "Agotado"}
              </span>
              {product.stock > 0 && <span className="text-gray-600">({product.stock} disponible)</span>}
            </div>

            {product.stock > 0 && <AddToCartButton product={product} />}
          </div>

          {product.caracteristica && (
            <BlocksRenderer className="prose max-w-none mb-8" content={product.caracteristica} />
          )}

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <span className="font-medium">Categoría:</span>
              <span>{product.categoria.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Peso:</span>
              <span>{product.peso} kg</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-medium">Presentación:</span>
              <span>{product.presentacion}</span>
            </div>
          </div>
        </div>
      </div>

      <ProductTabs product={product} />

      <RelatedProducts products={relatedProducts} />
    </div>
  )
}

