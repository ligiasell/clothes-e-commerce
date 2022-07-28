import { createContext, useState, useEffect } from 'react'

export const addCartItem = (cartItems, productToAdd) => {
  // Find if cart items contains productToAdd, then existingCartItem returns the productToAdd in question
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  // If found increments quantity, if doesn't return cartItem
  if (existingCartItem) {
    return cartItems.map((cartItem) => (cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
  }

  // Return new array with modified/new cartItems
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const removeCartItem = (cartItems, productToRemove) => {
  // Find if cart items contains at least one productToRemove, then existingCartItem returns true
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToRemove.id)

  // If found decrements quantity, if doesn't return cartItem
   if (existingCartItem) {
    return cartItems.map((cartItem) => (cartItem.id === productToRemove.id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem))
  }

  // Return new array with modified/new cartItems
  return [...cartItems, { ...productToRemove, quantity: 0 }]
}

export const deleteProductItem = (cartItems, productToDelete) => {
  console.log("cartItems", cartItems)
  console.log("productToDelete", productToDelete)

  const result = cartItems.filter((cartItem) => cartItem.id === productToDelete.id)
  console.log("result", result)
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  deleteProductFromCart: () => {},
  cartCount: 0,
})

export const CartProvider = ({ children }) => {
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [cartItems, setCartItems] = useState([])
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    const newCartCount = cartItems.reduce((total, cartItem) => total + cartItem.quantity, 0)
    setCartCount(newCartCount)
  }, [cartItems])

  const addItemToCart = (product) => setCartItems(addCartItem(cartItems, product))

  const removeItemFromCart = (product) => setCartItems(removeCartItem(cartItems, product))

  const deleteProductFromCart = (product) => setCartItems(deleteProductItem(cartItems, product))

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, removeItemFromCart, deleteProductFromCart, cartCount }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
