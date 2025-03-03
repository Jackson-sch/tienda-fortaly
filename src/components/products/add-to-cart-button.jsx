"use client";

import { useState } from "react";
import { ShoppingCart, Plus, Minus, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "@/components/cart/cart-context";

export function AddToCartButton({ product, compact = false }) {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart(product, quantity);

    setIsAdded(true);
    toast.success("Agregado al carrito", {
      description: `${product.nombre} (${quantity}) se ha agregado a su carrito.`,
    });

    setTimeout(() => {
      setIsAdded(false);
    }, 2000);
  };

  if (compact) {
    return (
      <Button
        size="sm"
        onClick={(e) => {
          e.preventDefault();
          addToCart(product, 1);
          toast.success("Agregado al carrito", {
            description: `${product.nombre} se ha agregado a su carrito.`,
          });
        }}
      >
        <ShoppingCart className="h-4 w-4" />
      </Button>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="flex items-center">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            disabled={quantity <= 1}
          >
            <Minus className="h-4 w-4" />
          </Button>
          <span className="w-12 text-center">{quantity}</span>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            disabled={quantity >= product.stock}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <div>
          <Button
            className="w-full"
            onClick={handleAddToCart}
            disabled={isAdded}
          >
            {isAdded ? (
              <>
                <Check className="h-4 w-4 mr-2" />
                Agregado al carrito
              </>
            ) : (
              <>
                <ShoppingCart className="h-4 w-4 mr-2" />
                añadir a la cesta
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  );
}
