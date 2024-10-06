// FruitSection.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FruitSection.css';
import DashboardNavbar from './DasboardNavbar.jsx';
import axios from 'axios';


function Subscription_FruitSection({ addToCart }) {
    const navigate = useNavigate();

    const [orangeQuantity, setOrangeQuantity] = useState(1);
    const [papayaQuantity, setPapayaQuantity] = useState(1);
    const [mangoQuantity, setMangoQuantity] = useState(1);

    // const products = [
    //     { name: 'Orange', quantity: orangeQuantity, price: 250, image: '/orange.png', setQuantity: setOrangeQuantity },
    //     { name: 'Papaya', quantity: papayaQuantity, price: 300, image: '/papaya.png', setQuantity: setPapayaQuantity },
    //     { name: 'Mango', quantity: mangoQuantity, price: 925, image: '/mango.png', setQuantity: setMangoQuantity },
    // ];
    const products = [
        { productID: 'P001', name: 'Orange', quantity: orangeQuantity, price: 250, image: '/orange.png', setQuantity: setOrangeQuantity },
        { productID: 'P002', name: 'Papaya', quantity: papayaQuantity, price: 300, image: '/papaya.png', setQuantity: setPapayaQuantity },
        { productID: 'P003', name: 'Mango', quantity: mangoQuantity, price: 925, image: '/mango.png', setQuantity: setMangoQuantity },
    ];




    const handleAddToCart = async (product) => {
        console.log('Add to Cart button clicked', product);
        const subsID = localStorage.getItem('subscriptionID'); // Fetch subscription ID from localStorage

        // Log the subsID to check if it's being retrieved correctly
        console.log('Subscription ID (subsID):', subsID);

        // Log the product data to check if productID and quantity are correct
        console.log('Product being added:', product);

        // Prepare the cart data
        const cartData = {
            subsID,  // Pass the subscription ID
            productID: product.productID, // Use product name as productID (assuming this maps to your product logic)
            quantity: product.quantity, // Pass the selected quantity
            name: product.name, // Add name for display
        price: product.price, // Add price for display
        image: product.image 
        };



        // Log the data that will be sent to the backend
        console.log('Cart Data being sent to backend:', cartData);

        try {
            const response = await axios.post('http://localhost:3001/subscription_products', cartData);
            console.log('Response from backend:', response.data);  // Log backend response

 // Update local storage
 const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
 existingCartItems.push(cartData);
 localStorage.setItem('cartItems', JSON.stringify(existingCartItems)); // Update local storage


            navigate('/subscription_cart');
        } catch (error) {
            console.error('Error adding to cart:', error);  // Log any errors
        }
    };








    return (
        <>
            <DashboardNavbar />
            <div className="product-page">
                <h1 className="page-header">Our Productes</h1>
                <div className="product-container">
                    {products.map((product, index) => (
                        <div className="product-card" key={index}>
                            <div className="product-image-container">
                                <img src={product.image} alt={product.name} className="product-image" />
                            </div>
                            <div className="product-info">
                                <h2 className="product-title">{product.name}</h2>
                                <p className="product-weight">
                                    <span className="weight">Per 1000 GRAMS</span>
                                </p>
                                <p className="product-price">
                                    <span className="discounted-price">Rs. {product.price}</span>
                                </p>
                                <div className="quantity-selector">
                                    <button className="quantity-btn" onClick={() => product.setQuantity(Math.max(1, product.quantity - 1))}>-</button>
                                    <span>{product.quantity}</span>
                                    <button className="quantity-btn" onClick={() => product.setQuantity(product.quantity + 1)}>+</button>
                                </div>
                                {/* <button className="add-to-cart-btn" onClick={() => handleAddToCart({ name: product.name, quantity: product.quantity, price: product.price, image: product.image })}>
                                    Add to Cart
                                </button> */}
                                <button className="add-to-cart-btn" onClick={() => handleAddToCart(product)}>
                                    Add to Cart
                                </button>

                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

export default Subscription_FruitSection;



