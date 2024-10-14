import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './invoice.css';

function SubscriptionInvoice() {
    const location = useLocation();
    const state = location.state || {}; // Add a default empty object if state is null

    // Retrieve subscription-related data from local storage
    const subsId = localStorage.getItem('subscriptionID') || 'N/A';
    let selectedPlan = localStorage.getItem('selectedPlan') || '{}'; // Default to empty object if not found
    try {
        selectedPlan = JSON.parse(selectedPlan); // Parse the JSON string
    } catch (error) {
        console.error("Error parsing selectedPlan from local storage", error);
        selectedPlan = {}; // Fallback to an empty object
    }

    // Access the plan name (assuming it's in a field like 'name')
    const planName = selectedPlan.name || 'N/A';

    // Get current (start) date
    const startDate = new Date();
    const plans = [
        {
            name: 'Weekly Plan',
            price: '300/Week',
            duration: 7, // Duration in days
            features: [
                '2 Fruits',
                '2 Veggies',
                'Quantity: 2/head',
            ],
        },
        {
            name: 'Monthly Plan',
            price: '500/Month',
            duration: 30, // Duration in days
            features: [
                '4 Fruits',
                '4 Veggies',
                'Quantity: 4/head',
            ],
        },
    ];

    const selectedPlanDetails = plans.find(plan => plan.name === planName);

    // Calculate end date based on the selected plan's duration
    let endDate = 'N/A'; // Default value if the plan is not found
    if (selectedPlanDetails) {
        endDate = new Date();
        endDate.setDate(startDate.getDate() + selectedPlanDetails.duration); // Add plan's duration to current date
        endDate = endDate.toLocaleDateString(); // Format the end date
    }

    // Extract cart items and price details from the state
    const [cartItems, setCartItems] = useState([]);
    const [totalPrice, setTotalPrice] = useState(state.totalPrice || 0);
    const [platformFee, setPlatformFee] = useState(state.platformFee || 0);
    const [finalTotal, setFinalTotal] = useState(state.finalTotal || 0);

    // Fetch the subscription products from the backend when the component mounts
    useEffect(() => {
        if (subsId && subsId !== 'N/A') {
            fetch(`http://localhost:3001/subscription-products/${subsId}`)
                .then(response => response.json())
                .then(data => {
                    if (Array.isArray(data)) {
                        setCartItems(data);
                        // Calculate total price based on fetched cart items
                        const total = data.reduce((acc, item) => acc + (item.price * item.quantity), 0);
                        setTotalPrice(total);
                    } else {
                        console.error('Invalid data format:', data);
                    }
                })
                .catch(error => {
                    console.error('Error fetching subscription products:', error);
                });
        }
    }, [subsId]);

    // Calculate the final total based on the plan's duration
    let subscriptionFinalTotal = finalTotal; // Default value
    if (selectedPlanDetails) {
        subscriptionFinalTotal = totalPrice + platformFee; // Adjust the calculation as per your need
    }

    // Function to clear the cart and reset prices
    const clearCart = () => {
        if (!subsId || subsId === 'N/A') {
            console.error('Subscription ID not found.');
            return;
        }

        // Make a DELETE request to the backend to remove subscription products
        fetch(`http://localhost:3001/subscription-products/${subsId}`, {
            method: 'DELETE',
        })
        .then(response => response.json())
        .then(data => {
            console.log(data.message); // Success message

            // Clear the cart items and reset the state after deleting from the database
            setCartItems([]);
            setTotalPrice(0);
            setPlatformFee(0);
            setFinalTotal(0);
            localStorage.removeItem('cartItems'); // Remove cart items from local storage
        })
        .catch(error => {
            console.error('Error clearing subscription products:', error);
        });
    };

    return (
        <div className="invoice-container">
            <h1 style={{ fontSize: '2em' }}>Subscription</h1>
            <div className="invoice-details">
                <p><strong>Subscription ID:</strong> {subsId}</p>
                <p><strong>Plan Name:</strong> {planName}</p>
                <p><strong>Start Date:</strong> {startDate.toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {endDate}</p>
                <div className="invoice-items">
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div key={index} className="invoice-item">
                                <p>{item.productName} (x{item.quantity})</p> {/* Use productName */}
                                <p>Rs. {item.price * item.quantity}</p>
                            </div>
                        ))
                    ) : (
                        <p>No items in the cart.</p>
                    )}
                </div>
                <div className="invoice-summary">
                    <p><strong>Total Price:</strong> Rs. {totalPrice}</p>
                    <p><strong>Platform Fee:</strong> Rs. {platformFee}</p>
                    <p style={{ color: 'green', fontSize: '1.5em' }}><strong>Final Total for Subscription:</strong> Rs. {subscriptionFinalTotal}</p>
                </div>
            </div>
            <div className="invoice-buttons">
                <Link to="/payment">
                    <button className="back-button">Place Order</button>
                </Link>
                <Link to="/subscription_Product_list">
                    <button className="back-button">Back to Dashboard</button>
                </Link>
                <button className="back-button" onClick={clearCart}>Clear Cart</button>
            </div>
        </div>
    );
}

export default SubscriptionInvoice;
