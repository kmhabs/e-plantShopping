import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
    const cart = useSelector(state => state.cart.items);
    const dispatch = useDispatch();

    const calculateTotalAmount = () => {
        return cart.reduce((total, item) => total + item.quantity * parseFloat(item.cost.substring(1)), 0).toFixed(2);
    };

    const calculateTotalCost = (item) => {
        return (item.quantity * parseFloat(item.cost.substring(1))).toFixed(2);
    };

    const handleIncrement = (item) => {
        dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
    };

    const handleDecrement = (item) => {
        if (item.quantity > 1) {
            dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
        } else {
            dispatch(removeItem(item.name));
        }
    };

    const handleRemove = (item) => {
        dispatch(removeItem(item.name));
    };

    const handleCheckoutShopping = (e) => {
        alert('Functionality to be added for future reference');
    };

    return (
        <div className="cart-container">
            <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
            <div>
                {cart.map(item => (
                    <div className="cart-item" key={item.name}>
                        <img src={item.image} alt={item.name} />
                        <div className="cart-details">
                            <span>{item.name}</span>
                            <p>{item.cost}€</p>
                            <p>Total: {calculateTotalCost(item)}€</p>
                            <div className="quantity-controls">
                                <button onClick={() => handleDecrement(item)}>-</button>
                                <span>{item.quantity}</span>
                                <button onClick={() => handleIncrement(item)}>+</button>
                            </div>
                            <button onClick={() => handleRemove(item)}>Remove</button>
                        </div>
                    </div>
                ))}
            </div>
            <div className="continue_shopping_btn">
                <button className="get-started-button" onClick={onContinueShopping}>Continue Shopping</button>
                <br />
                <button className="get-started-button1" onClick={handleCheckoutShopping}>Checkout</button>
            </div>
        </div>
    );
};

export default CartItem;