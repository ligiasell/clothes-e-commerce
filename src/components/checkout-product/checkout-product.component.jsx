import React, {useContext} from 'react'

import Button from '../button/button.component'
import {CartContext} from '../../contexts/cart.context'

import './checkout-product.styles.scss'

const CheckoutProduct = ({ product }) => {
const {addItemToCart, removeItemFromCart, deleteProductFromCart} = useContext(CartContext)

const addProductToCart = () => addItemToCart(product)
const removeProductFromCart = () => removeItemFromCart(product)
const deleteProduct = () => deleteProductFromCart(product)

  return (
    <tr>
      <td>
        <img src={product.imageUrl} alt={product.name} className="checkout-product-image" />
      </td>
      <td>{product.name}</td>
      <td>
        <Button className="checkout-product-button" onClick={removeProductFromCart}> - </Button> {product.quantity} <Button onClick={addProductToCart} className="checkout-product-button"> + </Button>
      </td>
      <th>{product.price}</th>
      <th>
        <Button className="checkout-product-button" onClick={deleteProduct}>X</Button>
      </th>
    </tr>
  )
}

export default CheckoutProduct
