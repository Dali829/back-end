import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar.js'
import 'bootstrap/dist/css/bootstrap.min.css'
import './cartPage.css'
import { Link } from 'react-router-dom'
import axios from 'axios'
import ProductGrid from '../components/navbar/productCartGrid.js'
function ShoppingCart () {
  const [products, setProducts] = useState([])
  const [items, setItems] = useState([])
  const [error, setError] = useState()
  useEffect(() => {
    axios
      .get(
        'http://localhost:3030/cart/getCartItems/' +
          localStorage.getItem('currentUser')
      )
      .then(response => {
        setItems(response.data)
        const productsGetRequests = response.data.map(cartItem => {
          return axios.get(
            'http://localhost:3030/product/getProductById/' + cartItem.productId
          )
        })
        return Promise.all(productsGetRequests)
          .then(productResponses => {
            const productsData = productResponses.map(response => response.data)
            setProducts(productsData)
          })
          .catch(error => {
            console.error(error)
          })
      })
      .catch(error => {
        console.error(error)
      })
  }, [])
  if (products.length > 0) {
    return (
      <React.Fragment>
        <Navbar />
        <ProductGrid products={products} items={items} />
      </React.Fragment>
    )
  } else {
    return (
      <React.Fragment>
        <Navbar />
        <div className='container cartPageContainer p-2 noProductContainer d-flex d-none  align-items-center flex-column'>
          <h2 className=' noProductMessage '>No products in your cart</h2>
          <Link to='/products'>
            <button className='btn addProuctBtn'>Add Products to Cart</button>
          </Link>
        </div>
      </React.Fragment>
    )
  }
}
export default ShoppingCart
