import { ProductGrid } from "@/components/products/product-grid";
import { ProductFilters } from "@/components/products/product-filters";
import { ProductSort } from "@/components/products/product-sort";
import { fetchProducts } from "@/lib/api";
import { getCategories } from "@/api/getCategories";
import { getMarcas } from "@/api/getMarcas";

export default async function ProductsPage({ searchParams }) {
  const categoryId =
    typeof searchParams.category === "string"
      ? searchParams.category
      : undefined;
  const brandId =
    typeof searchParams.brand === "string" ? searchParams.brand : undefined;
  const sort =
    typeof searchParams.sort === "string" ? searchParams.sort : "featured";

  const productsPromise = fetchProducts({ categoryId, brandId, sort });
  const categoriesPromise = getCategories();
  const brandsPromise = getMarcas();

  const [productsData, categories, brands] = await Promise.all([
    productsPromise,
    categoriesPromise,
    brandsPromise,
  ]);

  const products = productsData.products;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Todos los productos</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/4">
          <ProductFilters
            categories={categories}
            brands={brands}
            selectedCategory={categoryId}
            selectedBrand={brandId}
          />
        </div>

        <div className="lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">{products.length} productos</p>
            <ProductSort currentSort={sort} />
          </div>

          <ProductGrid products={products} />
        </div>
      </div>
    </div>
  );
}
