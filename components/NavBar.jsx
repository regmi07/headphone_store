import React from 'react'
import Link from 'next/link'
import {AiOutlineShopping} from 'react-icons/ai'

import { useStateContext } from '../context/StateContext'

import Cart from './Cart'

const NavBar = () => {

  const {totalQuantities, showCart, setShowCart} = useStateContext()

  return (
    <div className='navbar-container'>
      <p className='logo'>
        <Link href='/'>Headphones</Link>
      </p>

      <button type='button' className='cart-icon' onClick={() => setShowCart(true)}>
        <AiOutlineShopping />
        <span className='cart-item-qty'>{totalQuantities}</span>
      </button>
      {
        showCart && <Cart />
      }
    </div>
  )
}

export default NavBar