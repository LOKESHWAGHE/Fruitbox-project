import React from 'react';
import { Link } from 'react-router-dom';
import './Cart.css';

function Cart({ cartItems, removeFromCart, proceedToBuy }) {
    const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
    const platformFee = 50;
    const finalTotal = totalPrice + platformFee;

    const handleProceedToBuy = () => {
        proceedToBuy(); // Call the proceedToBuy function from props
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
                        <h3>Total Price: Rs. {totalPrice}</h3>
                        <h3>Platform Fee: Rs. {platformFee}</h3>
                        <h2>Final Total: Rs. {finalTotal}</h2>
                    </div>
                    <Link to='/userdashboard'>
                        <button className="buy-button">Continue Buying</button>
                    </Link>
                    <button className="buy-button" onClick={handleProceedToBuy}>Proceed to Buy</button> {/* Call proceedToBuy */}
                </div>
            )}
        </div>
    );
}

export default Cart;
