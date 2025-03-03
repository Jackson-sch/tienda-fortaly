import { query } from "@/lib/strapi";

const STRAPI_HOST = process.env.STRAPI_HOST || "http://localhost:1337";

export async function getFeaturedProducts() {
  try {
    const res = await query(
      "products?filters[destacado][$eq]=true&populate[imagen][fields][0]=url&populate[categoria][fields][0]=name&populate[categoria][fields][1]=id&populate[marca][fields][0]=name&populate[marca][fields][1]=id"
    );

    console.log(
      "🚀 ~ getFeaturedProducts ~ respuesta desde la función getFeaturedProducts:",
      res
    );

    const { data, meta } = res || {};

    if (!data || !Array.isArray(data)) {
      return { products: [], pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } };
    }

    const products = data.map((product) => {
      const {
        slug,
        nombre,
        marca,
        categoria,
        precio,
        stock,
        descuento,
        imagen,
        sku,
      } = product;

      // Manejo de imágenes como array de strings, consistente con fetchProductBySlug
      const images = imagen.map((img) => `${STRAPI_HOST}${img.url}`)
   
      console.log("🚀 ~ products ~ images:", images)

      // Estructura consistente para marca y categoría
      const categoriaData = categoria
        ? { id: categoria.id, name: categoria.name }
        : null;

      const marcaData = marca
        ? { id: marca.id, name: marca.name }
        : null;

      return {
        slug,
        nombre,
        marca: marcaData,
        categoria: categoriaData,
        precio,
        stock,
        descuento,
        images, // Array de strings
        sku,
      };
    });

    return {
      products,
      pagination: meta?.pagination || { page: 1, pageSize: 0, pageCount: 0, total: 0 },
    };
  } catch (error) {
    console.error("Error in getFeaturedProducts:", error);
    return { products: [], pagination: { page: 1, pageSize: 0, pageCount: 0, total: 0 } };
  }
}