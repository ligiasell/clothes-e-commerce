import { useState, createContext } from 'react'

import PRODUCTS from '../../src/shop-data.json'

export const ProductsContext = createContext({
  products: [],
})

export const ProductsProvider = ({ children }) => {
  const [products] = useState(PRODUCTS)
  const value = { products }

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>
}
