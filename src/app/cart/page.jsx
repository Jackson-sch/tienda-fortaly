"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "@/components/cart/cart-context";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/utils";
import { Trash2, Plus, Minus, RefreshCw } from "lucide-react";

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, clearCart } = useCart();
  console.log("🚀 ~ CartPage ~ cart:", cart)
  const [couponCode, setCouponCode] = useState("");

  const subtotal = cart.reduce((total, item) => {
    const price =
      item.product.descuento > 0
        ? item.product.precio * (1 - item.product.descuento / 100)
        : item.product.precio;
    return total + price * item.quantity;
  }, 0);

  const shipping = subtotal > 100 ? 0 : 10;
  const total = subtotal + shipping;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-3xl font-bold mb-6">Tu carro esta vacío</h1>
        <p className="text-gray-600 mb-8">
          Parece que aún no ha agregado ningún producto a su carrito.
        </p>
        <Button asChild>
          <Link href="/products">Explorar productos</Link>
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Carrito de compra</h1>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="lg:w-2/3">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-6">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-4">Producto</th>
                    <th className="text-center pb-4">Cantidad</th>
                    <th className="text-right pb-4">Precio</th>
                    <th className="text-right pb-4">Total</th>
                    <th className="pb-4"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => {
                    const price =
                      item.product.descuento > 0
                        ? item.product.precio *
                          (1 - item.product.descuento / 100)
                        : item.product.precio;

                    return (
                      <tr key={item.product.id} className="border-b">
                        <td className="py-4">
                          <div className="flex items-center gap-4">
                            <div className="relative w-16 h-16 flex-shrink-0">
                              <Image
                                src={item.product.images[0] || "/placeholder.svg"}
                                alt={item.product.nombre}
                                fill
                                className="object-cover rounded"
                              />
                            </div>
                            <div>
                              <h3 className="font-medium">
                                {item.product.nombre}
                              </h3>
                              <p className="text-sm text-gray-600">
                                SKU: {item.product.sku}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4">
                          <div className="flex items-center justify-center gap-2">
                            <Button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              className="p-1 rounded-lg shadow border border-orange-300 bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700 cursor-pointer"
                              disabled={item.quantity <= 1}
                              variant="outline"
                              size="icon"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              min="1"
                              max={item.product.stock}
                              value={item.quantity}
                              onChange={(e) =>
                                updateQuantity(
                                  item.product.id,
                                  Number.parseInt(e.target.value) || 1
                                )
                              }
                              className="w-12 text-center shadow py-1 border border-orange-300"
                            />
                            <Button
                              onClick={() =>
                                updateQuantity(
                                  item.product.id,
                                  Math.min(
                                    item.product.stock,
                                    item.quantity + 1
                                  )
                                )
                              }
                              className="p-1 rounded-lg shadow border border-orange-300 bg-orange-100 text-orange-600 hover:bg-orange-200 hover:text-orange-700 cursor-pointer"
                              disabled={item.quantity >= item.product.stock}
                              variant="outline"
                              size="icon"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                        </td>
                        <td className="py-4 text-right text-sm">
                          {formatCurrency(price)}
                        </td>
                        <td className="py-4 text-right text-sm">
                          {formatCurrency(price * item.quantity)}
                        </td>
                        <td className="py-4 text-right">
                          <button
                            onClick={() => removeFromCart(item.product.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex justify-between mt-6">
            <Button variant="outline" onClick={clearCart}>
              <Trash2 className="h-4 w-4 mr-2" />
              Eliminar todo
            </Button>
            <Button variant="outline" asChild>
              <Link href="/products">
                <RefreshCw className="h-4 w-4 mr-2" />
                Continuar comprando
              </Link>
            </Button>
          </div>
        </div>

        <div className="lg:w-1/3">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Resumen de pedido</h2>

            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>{formatCurrency(subtotal)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Envío</span>
                <span>
                  {shipping === 0 ? "Free" : formatCurrency(shipping)}
                </span>
              </div>
              <div className="border-t pt-2 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>{formatCurrency(total)}</span>
                </div>
                <p className="text-xs text-gray-500 mt-1">Incluye IGV</p>
              </div>
            </div>

            <div className="mb-6">
              <div className="flex gap-2">
                <Input
                  placeholder="Código de cupón"
                  value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
                />
                <Button variant="outline">Aplicar</Button>
              </div>
            </div>

            <Button className="w-full" asChild>
              <Link href="/checkout">Ir al Checkout</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
