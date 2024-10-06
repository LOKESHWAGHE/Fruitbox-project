import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Subscription_cart() {
    const [cartItems, setCartItems] = useState([]);
    const [subscriptionPlan, setSubscriptionPlan] = useState('');

    useEffect(() => {
        // Load cart items from local storage when the component mounts
        const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
        setCartItems(storedCartItems);

        // Load selected subscription plan from local storage
        const selectedPlan = JSON.parse(localStorage.getItem('selectedPlan')); // Retrieve selected plan
        if (selectedPlan) {
            setSubscriptionPlan(selectedPlan.name); // Set subscription plan state to the name of the plan
        }
    }, []);

    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const platformFee = 50;

    // Adjust final total based on subscription plan
    let finalTotal = totalPrice + platformFee; // Base final total

    // Multiply total based on the subscription plan
    if (subscriptionPlan === 'Weekly Plan') {
        finalTotal = totalPrice * 7 + platformFee; // Weekly plan
    } else if (subscriptionPlan === 'Monthly Plan') {
        finalTotal = totalPrice * 30 + platformFee; // Monthly plan
    }

    const removeFromCart = (index) => {
        const newCartItems = cartItems.filter((_, i) => i !== index);
        setCartItems(newCartItems);
        localStorage.setItem('cartItems', JSON.stringify(newCartItems)); // Update local storage
    };

    return (
        <div className="cart-container">
            {cartItems.length === 0 ? (
                <div className="empty-cart-container">
                    <h2 className="empty-cart-text">YOUR CART IS EMPTY</h2>
                    <Link to='/userdashboard'>
                        <button className="shop-button">SHOP OUR PRODUCTS</button>
                    </Link>
                </div>
            ) : (
                <div className="cart-items">
                    {cartItems.map((item, index) => (
                        <div key={index} className="cart-item">
                            <img src={item.image} alt={item.name} className="cart-item-image" />
                            <div className="cart-item-details">
                                <h3 className="cart-item-title">{item.name}</h3>
                                <div className="cart-item-info">
                                    <span>Quantity: {item.quantity}</span>
                                    <span className="cart-item-price">Rs. {item.price * item.quantity}</span>
                                </div>
                            </div>
                            <button onClick={() => removeFromCart(index)} className="remove-item-btn">Remove</button>
                        </div>
                    ))}
                    <div className="total-price-container">
                        {/* Display the selected subscription plan name */}
                        <h3>Subscription Plan: {subscriptionPlan}</h3>
                        <h3>Total Price: Rs. {totalPrice}</h3>
                        <h3>Platform Fee: Rs. {platformFee}</h3>
                        <h2>Final Total: Rs. {finalTotal}</h2> {/* Final total reflecting selected plan */}
                    </div>
                    <Link to='/subscription_Product_list'>
                        <button className="buy-button">Continue Buying</button>
                    </Link>
                    <Link to='/payment'>
                        <button className="buy-button">Proceed to Buy</button>
                    </Link>
                </div>
            )}
        </div>
    );
}

export default Subscription_cart;
