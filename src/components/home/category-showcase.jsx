import Link from "next/link";
import Image from "next/image";
import { getCategories } from "@/api/getCategories";

export async function CategoryShowcase() {
  const categories = await getCategories();

  return (
    <div className="mb-16">
      <h2 className="text-2xl font-bold mb-6">Comprar por categoría</h2>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <Link
            key={category.slug || index}
            href={category.slug ? `/products?category=${category.slug}` : "#"}
            className="group relative overflow-hidden rounded-lg bg-gray-100 transition-all hover:shadow-md"
          >
            <div className="aspect-square relative">
              <Image
                src={category.image || "/placeholder.svg"}
                alt={category.name || "Category"}
                fill
                className="object-cover transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/30 flex items-end p-4">
                <h3 className="text-white font-medium">
                  {category.name || "Unknown Category"}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
