"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BlocksRenderer } from "@strapi/blocks-react-renderer";

export function ProductTabs({ product }) {
  return (
    <Tabs defaultValue="description" className="mb-12">
      <TabsList className="mb-6">
        <TabsTrigger value="description">Descripción</TabsTrigger>
        <TabsTrigger value="specifications">Presentación</TabsTrigger>
        <TabsTrigger value="shipping">Envío y devoluciones</TabsTrigger>
      </TabsList>

      <TabsContent value="description" className="prose max-w-none">
        <BlocksRenderer content={product.descripcion} />
        <p>
          Esta herramienta de alta calidad es perfecta tanto para contratistas
          profesionales como para entusiastas de bricolaje.Las características
          incluyen Diseño ergonómico para uso cómodo y construcción duradera
          para un rendimiento duradero.
        </p>
        <p>
          Ya sea que esté trabajando en un pequeño proyecto doméstico o en una
          gran construcción trabajo, esta herramienta lo ayudará a hacer el
          trabajo de manera eficiente y eficazmente.
        </p>
      </TabsContent>

      <TabsContent value="specifications">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">
              Especificaciones técnicas
            </h3>
            <table className="w-full">
              <tbody>
                <tr className="border-b">
                  <td className="py-2 font-medium">SKU</td>
                  <td className="py-2">{product.sku}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Marca</td>
                  <td className="py-2">{product.marca.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Categoría</td>
                  <td className="py-2">{product.categoria.name}</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Peso</td>
                  <td className="py-2">{product.peso} kg</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 font-medium">Presentación</td>
                  <td className="py-2">{product.presentacion}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4">Características</h3>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Materiales de alta calidad para la durabilidad</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Diseño ergonómico para uso cómodo</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Aplicación versátil para varios proyectos</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Fácil de mantener y limpiar</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2">•</span>
                <span>Viene con garantía del fabricante</span>
              </li>
            </ul>
          </div>
        </div>
      </TabsContent>

      <TabsContent value="shipping">
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-2">Información de envío</h3>
            <p>
              Enviamos a los 50 estados y la mayoría de los destinos
              internacionales. Los pedidos generalmente se procesan dentro de
              1-2 días hábiles.Envío Los tiempos varían según la ubicación:
            </p>
            <ul className="list-disc pl-6 mt-2 space-y-1">
              <li>Estándar nacional: 3-5 días hábiles</li>
              <li>Express Nacional: 1-2 días hábiles</li>
              <li>Internacional: 7-14 días hábiles</li>
            </ul>
            <p className="mt-2">
              Envío gratis en pedidos de más de S/ 100.00 dentro de la ciudad.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-2">
              Política de devoluciones
            </h3>
            <p>
              Aceptamos devoluciones dentro de los 30 días posteriores a la
              entrega para la mayoría de los artículos en Condición nueva y no
              utilizada con envasado original.Para iniciar un Regrese,
              comuníquese con nuestro equipo de servicio al cliente.
            </p>
            <p className="mt-2">
              Tenga en cuenta que los pedidos personalizados, los elementos de
              autorización y ciertos El equipo de seguridad no se puede
              devolver.
            </p>
          </div>
        </div>
      </TabsContent>
    </Tabs>
  );
}
