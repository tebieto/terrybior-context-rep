import React, { createContext, useState, useEffect } from 'react';

import { addItemToCart, removeItemFromCart, getCartTotal, clearItemFromCart, getCartItemsCount} from './cart.utils';

export const CartContext = createContext({
    hidden: true,
    toggleHidden: () => {},
    cartItems: [],
    addItem: () => {},
    removeItem: () => {},
    clearItemsFromCart: () => {},
    cartItemsCount: 0,
    total: 0,
    clearItem: () => {}
});

const CartProvider = ({ children }) => {
    const [hidden, setHidden] = useState(true);
    const toggleHidden = () => setHidden(!hidden);
    const [cartItems, setCartItems] = useState([]);
    const addItem = item => setCartItems(addItemToCart(cartItems, item));
    const removeItem = item => setCartItems(removeItemFromCart(cartItems, item));
    const clearItemsFromCart = () => setCartItems([]);
    const [cartItemsCount, setCartItemsCount] = useState(0);
    const countCartItems = ()=> setCartItemsCount(getCartItemsCount(cartItems));
    const [total, setTotal] = useState(0);
    const calculateTotalPrice = () => setTotal(getCartTotal(cartItems));
    const clearItem = item => setCartItems(clearItemFromCart(cartItems, item));


    useEffect(() => {
        countCartItems();
        calculateTotalPrice();
    }, [calculateTotalPrice, cartItems, countCartItems]);

    return (<CartContext.Provider
        value = {{
            hidden, 
            toggleHidden, 
            cartItems, 
            addItem, 
            removeItem,
            clearItemsFromCart,
            cartItemsCount,
            setCartItemsCount,
            total,
            clearItem,
        }}
    >{children}</CartContext.Provider>);
};

export default CartProvider;