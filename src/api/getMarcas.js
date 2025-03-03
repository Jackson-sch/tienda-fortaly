import { query } from "@/lib/strapi";

const { STRAPI_HOST } = process.env;

export function getMarcas() {
  return query(
    "marcas?fields[0]=name&populate[image][fields][0]=url"
  ).then((res) => {
    return res.data.map((marca) => {
      const { name, image: rawImage } = marca;
      const image = `${STRAPI_HOST}${rawImage.url}`;
      return { name, image };
    });
  });
}
