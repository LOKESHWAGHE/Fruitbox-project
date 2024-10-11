import React from 'react';
import { useLocation } from 'react-router-dom';
import './invoice.css';

function ViewSubscriptionOrder() {
    const location = useLocation();
    const state = location.state || {}; // Add a default empty object if state is null

    // Debugging: check if cartItems are passed properly
    console.log("Location State:", state);

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

    // Retrieve cart items from local storage
    const storedCartItems = localStorage.getItem('cartItems');
    const cartItems = storedCartItems ? JSON.parse(storedCartItems) : []; // Parse the cart items

    // Debugging: check if cartItems array exists and has data
    console.log("Cart Items:", cartItems);

    // Extract totalPrice, platformFee, and finalTotal from state or calculate them if needed
    const totalPrice = state.totalPrice || cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
    const platformFee = state.platformFee || 10; // Example default platform fee
    const finalTotal = state.finalTotal || (totalPrice + platformFee);

    // Calculate the final total based on the plan's duration
    let subscriptionFinalTotal = finalTotal; // Default value
    if (selectedPlanDetails) {
        subscriptionFinalTotal = finalTotal * selectedPlanDetails.duration; // Multiply by the plan duration
    }

    return (
        <div className="invoice-container">
            <h1 style={{ fontSize: '2em' }}>Subscription Plans</h1>
            <div className="invoice-details">
                <p><strong>Subscription ID:</strong> {subsId}</p>
                <p><strong>Plan Name:</strong> {planName}</p>
                <p><strong>Start Date:</strong> {startDate.toLocaleDateString()}</p>
                <p><strong>End Date:</strong> {endDate}</p>
                <div className="invoice-items">
                    {cartItems.length > 0 ? (
                        cartItems.map((item, index) => (
                            <div key={index} className="invoice-item">
                                <p>{item.name} (x{item.quantity})</p>
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
        </div>
    );
}

export default ViewSubscriptionOrder;
