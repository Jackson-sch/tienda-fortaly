import Link from "next/link"
import { ProductCard } from "@/components/products/product-card"
import { getFeaturedProducts } from "@/api/getFeaturedProducts"



export async function FeaturedProducts() {
  const {products} = await getFeaturedProducts()
  console.log("🚀 ~ FeaturedProducts ~ products destacados:", products)
  

  return (
    <div className="mb-16">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Productos destacados </h2>
        <Link href="/products" className="text-primary hover:underline">
          Ver todo
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.slug} product={product} />
        ))}
      </div>
    </div>
  )
}

