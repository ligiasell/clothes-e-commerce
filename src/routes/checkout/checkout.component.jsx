import { useContext } from 'react'

import CheckoutProduct from '../../components/checkout-product/checkout-product.component'
import {CartContext} from '../../contexts/cart.context'

const Checkout = () => {
const {cartItems} = useContext(CartContext)

  return (
    <div>
      <h1>checkout here</h1>
      <table>
        <tr>
          <th>Product</th>
          <th>Description</th>
          <th>Quantity</th>
          <th>Price</th>
          <th>Remove</th>
        </tr>
        {cartItems && cartItems.map(product => <CheckoutProduct product={product}/>)}
      </table>
    </div>
  )
}

export default Checkout
