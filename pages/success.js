import React, {useState, useEffect} from 'react'
import Link from 'next/Link'
import {BsBagCheckFill} from 'react-icons/bs'

import {useStateContext} from '../context/StateContext'

import { runRealisticConfetti } from '../lib/utils'

const Success = () => {
    const {setCartItems, setTotalPrice, setTotalQuantities} = useStateContext()

    useEffect(() => {
        localStorage.clear()
        setCartItems([])
        setTotalPrice(0)
        setTotalQuantities(0)
        runRealisticConfetti()
    },[])

  return (
    <div className='success-wrapper'>
        <div className='success'>
            <p className='icon'>
                <BsBagCheckFill />
            </p>
            <h2>Thank you for your order!</h2>
            <p className='email-msg'>Check your email for the receipt</p>
            <p className='description'>
                If you have any questions, please email
                <a className='email' href='mailto:order@ecommerce.com'>
                    order@ecommerce.com
                </a>
            </p>
            <Link href='/'>
                <button type='button' className='btn' width='300px'>Continue shooping</button>
            </Link>
        </div>
    </div>
  )
}

export default Success