import { query } from "@/lib/strapi";

const STRAPI_HOST = process.env.STRAPI_HOST || 'http://localhost:1337';

/**
 * Obtenga productos con filtrado, clasificación y paginación
 */
export async function fetchProducts({
  categoryId,
  brandId,
  sort = "destacado",
  page = 1,
  pageSize = 12
}) {
  // Validación de parámetros
  if (!Number.isInteger(page) || page < 1) throw new Error("Invalid page number");
  if (!Number.isInteger(pageSize) || pageSize < 1) throw new Error("Invalid page size");

  let queryString = `products?populate[imagen][fields][0]=url&populate[categoria][fields][0]=name&populate[marca][fields][0]=name&pagination[page]=${page}&pagination[pageSize]=${pageSize}`;

  if (categoryId) queryString += `&filters[categoria][id][$eq]=${categoryId}`;
  if (brandId) queryString += `&filters[marca][id][$eq]=${brandId}`;

  // Add sorting
  switch (sort) {
    case "price-asc": queryString += "&sort=precio:asc"; break;
    case "price-desc": queryString += "&sort=precio:desc"; break;
    case "newest": queryString += "&sort=createdAt:desc"; break;
    case "featured":
    default: queryString += "&sort=destacado:desc"; break;
  }

  try {
    const res = await query(queryString);
    const { data, meta } = res;

    const products = data
      .map(product => {
        const { id, slug, nombre, precio, stock, descuento, imagen, sku, categoria, marca, caracteristica } = product;
        
        const image = `${STRAPI_HOST}${imagen[0].url}`
          

        return {
          id,
          slug,
          nombre,
          precio,
          stock,
          descuento,
          image,
          sku,
          categoria: categoria?.data?.name || null,
          marca: marca?.data?.name || null,
          caracteristica
        };
      })
      .filter(Boolean);

    return { products, pagination: meta.pagination };
  } catch (error) {
    console.error('Error fetching products:', error);
    throw new Error('Failed to fetch products');
  }
}

/**
 * Obtener un solo producto de Slug
 */
export async function fetchProductBySlug(slug) {
  if (!slug || typeof slug !== 'string') throw new Error('Invalid slug');

  const queryString = `products?filters[slug][$eq]=${slug}&populate[imagen][fields][0]=url&populate[categoria][fields][0]=name&populate[marca][fields][0]=name`;

  try {
    const res = await query(queryString);
    if (!res.data?.length) return null;

    const product = res.data[0];
    const { id, nombre, precio, stock, descuento, imagen, sku, descripcion, categoria, marca, caracteristica } = product;

    const images = imagen.map(img => `${STRAPI_HOST}${img.url}`);

      const categoriaData = categoria
      ? { id: categoria.id, name: categoria.name }
      : null;

    const marcaData = marca
      ? { id: marca.id, name: marca.name }
      : null;

    return {
      id,
      slug,
      nombre,
      precio,
      stock,
      descuento,
      images,
      sku,
      categoria: categoriaData,
      marca: marcaData,
      descripcion,
      caracteristica
    };
  } catch (error) {
    console.error('Error fetching product by slug:', error);
    throw new Error('Failed to fetch product');
  }
}

/**
 * Obtenga productos relacionados con el producto actual
 */
export async function fetchRelatedProducts(productId, categoryId, limit = 4) {
  if (!Number.isInteger(productId) || !Number.isInteger(categoryId)) {
    throw new Error('Invalid productId or categoryId');
  }
  if (!Number.isInteger(limit) || limit < 1) throw new Error('Invalid limit');

  const queryString = `products?filters[id][$ne]=${productId}&filters[categoria][id][$eq]=${categoryId}&populate[imagen][fields][0]=url&pagination[pageSize]=${limit}`;

  try {
    const res = await query(queryString);
    const { data } = res;

    return data
      .map(product => {
        const { id, slug, nombre, precio, stock, descuento, imagen, sku } = product;
        
        const images = imagen.map(img => `${STRAPI_HOST}${img.url}`);

        return { id, slug, nombre, precio, stock, descuento, images, sku };
      })
      .filter(Boolean);
  } catch (error) {
    console.error('Error fetching related products:', error);
    throw new Error('Failed to fetch related products');
  }
}