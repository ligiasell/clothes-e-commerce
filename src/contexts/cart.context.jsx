import { createContext, useState, useEffect } from 'react'

export const addCartItem = (cartItems, productToAdd) => {
  // Find if cart items contains productToAdd, then existingCartItem returns true
  const existingCartItem = cartItems.find((cartItem) => cartItem.id === productToAdd.id)

  // If found increments quantity, if doesn't return cartItem
  if (existingCartItem) {
    return cartItems.map((cartItem) => (cartItem.id === productToAdd.id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem))
  }

  // Return new array with modified/new cartItems
  return [...cartItems, { ...productToAdd, quantity: 1 }]
}

export const CartContext = createContext({
  isCartOpen: false,
  setIsOpen: () => {},
  cartItems: [],
  addItemToCart: () => {},
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

  const value = { isCartOpen, setIsCartOpen, cartItems, addItemToCart, cartCount }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
