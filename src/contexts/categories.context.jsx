import { createContext, useState, useEffect } from 'react'

// Add SHOP_DATA file on Firestone db as 'categories' collection
// import { addCollectionAndDocuments } from '../utils/firebase/firebase.utils';
// import SHOP_DATA from '../shop-data.js';

import { getCategoriesAndDocuments } from '../utils/firebase/firebase.utils'

export const CategoriesContext = createContext({
  categoriesMap: {},
})

export const CategoriesProvider = ({ children }) => {
  const [categoriesMap, setCategoriesMap] = useState({})

  // Add SHOP_DATA file on Firestone db as 'categories' collection
  // useEffect(() => {
  //   addCollectionAndDocuments('categories', SHOP_DATA);
  // }, []);

  useEffect(() => {
    const getCategoriesMap = async () => {
      const categoryMap = await getCategoriesAndDocuments()
      setCategoriesMap(categoryMap)
    }
    getCategoriesMap()
  }, [])

  const value = { categoriesMap }

  return <CategoriesContext.Provider value={value}>{children}</CategoriesContext.Provider>
}
