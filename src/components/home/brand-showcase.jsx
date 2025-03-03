import Link from "next/link"
import Image from "next/image"
import { getMarcas } from "@/api/getMarcas"



export async function BrandShowcase() {
  const brands = await getMarcas()

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Marcas populares</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
        {brands.map((brand) => (
          <Link
            key={brand.id}
            href={`/products?brand=${brand.id}`}
            className="flex items-center justify-center p-6 bg-white rounded-lg border hover:shadow-md transition-shadow"
          >
            <div className="text-center">
              <div className="relative h-12 w-full mb-4 flex items-center justify-center">
                <Image src={brand.image || "/marcas.svg"} alt={brand.name} width={100} height={40} className="object-contain" />
              </div>
              <span className="text-sm font-medium">{brand.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

