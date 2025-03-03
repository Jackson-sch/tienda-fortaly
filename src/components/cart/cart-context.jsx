"use client"

import { createContext, useContext, useState, useEffect } from "react"

const CartContext = createContext(undefined)

export function CartProvider({ children }) {
  const [cart, setCart] = useState([])

  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem("cart")
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart))
      } catch (error) {
        console.error("No logró analizar el carrito de LocalStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart))
  }, [cart])

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex((item) => item.product.id === product.id)

      if (existingItemIndex !== -1) {
        // Product already in cart, update quantity
        const newCart = [...prevCart]
        const newQuantity = newCart[existingItemIndex].quantity + quantity

        // Ensure quantity doesn't exceed stock
        newCart[existingItemIndex].quantity = Math.min(newQuantity, product.stock)
        return newCart
      } else {
        // Add new product to cart
        return [...prevCart, { product, quantity: Math.min(quantity, product.stock) }]
      }
    })
  }

  const updateQuantity = (productId, quantity) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.product.id === productId) {
          return {
            ...item,
            quantity: Math.min(Math.max(1, quantity), item.product.stock),
          }
        }
        return item
      })
    })
  }

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.product.id !== productId))
  }

  const clearCart = () => {
    setCart([])
  }

  return (
    <CartContext.Provider value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

