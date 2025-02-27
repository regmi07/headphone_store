import React, {createContext, useContext, useState} from 'react';
import { toast } from 'react-hot-toast';

const Context =  createContext()

export const StateContext = ({children}) => {
    const [showCart, setShowCart] = useState(false)
    const [cartItems, setCartItems] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)
    const [totalQuantities, setTotalQuantities] = useState(0)
    const [qty, setQty] = useState(1)

    let foundProduct
    let index

    const onAdd = (product,quantity) => {
        const isAlreadyInCart = cartItems?.find((item) => item._id === product._id)

        setTotalPrice(prevTotalPrice => prevTotalPrice + product.price * quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities + quantity)

        if(isAlreadyInCart){
            const updatedCartItems = cartItems?.map((item) => {
                if(item._id === product._id) return {...item, quantity: item.quantity + quantity}
            })

            setCartItems(updatedCartItems)
        }else{
            product.quantity = quantity
            setCartItems([...cartItems, {...product}])
        }
        toast.success(`${qty} ${product.name} added to cart`)
    }

    const onRemove = (product) => {
        foundProduct = cartItems.find(item => item._id === product._id)
        let newCartItems = cartItems.filter(item => item._id !== product._id )

        setTotalPrice(prevTotalPrice => prevTotalPrice - foundProduct.price * foundProduct.quantity)
        setTotalQuantities(prevTotalQuantities => prevTotalQuantities - foundProduct.quantity)
        setCartItems(newCartItems)

    }

    const toggleCartItemQuantity = (id,value) => {
        foundProduct = cartItems.find(item => item._id === id)
        index = cartItems.findIndex(product => product._id === id)

        // let newCartItems = cartItems.filter(item => item._id !== id )
        let before = cartItems.slice(0, index)
        let after = cartItems.slice(index + 1, cartItems.length)
        if(value === 'inc'){
            setCartItems([...before, {...foundProduct, quantity: foundProduct.quantity + 1}, ...after])
            setTotalPrice((prevTotalPrice) => prevTotalPrice + foundProduct.price)
            setTotalQuantities((prevTotalQuantities) => prevTotalQuantities + 1)
        }else if(value === 'dec'){
            if(foundProduct.quantity > 1){
                setCartItems([...before, {...foundProduct, quantity: foundProduct.quantity - 1},...after])
                setTotalPrice((prevTotalPrice) => prevTotalPrice - foundProduct.price)
                setTotalQuantities((prevTotalQuantities) => prevTotalQuantities - 1)
            }
        }
    }

    const increaseQty = () => {
        setQty(prevQty => prevQty + 1)
    }

    const decreaseQty = () => {
        setQty(prevQty => {
            if(prevQty - 1 < 1) return 1
            return prevQty - 1
        })
    }

    return (
        <Context.Provider value={{showCart, setShowCart, cartItems, setCartItems, totalPrice, setTotalPrice, totalQuantities, setTotalQuantities, qty, increaseQty, decreaseQty, onAdd, toggleCartItemQuantity, onRemove}}>
            {children}
        </Context.Provider>
    )
}

export const useStateContext = () => useContext(Context)