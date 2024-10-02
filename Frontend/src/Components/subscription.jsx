import React from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "./subscription.css"

const Subscription = () => {
  const navigate = useNavigate();

  const plans = [
    {
      name: 'Weekly Plan',
      price: '300/Week',
      features: [
        '2 Fruits',
        '2 Veggies',
        'Quantity: 2/head',
      ],
    },
    {
      name: 'Monthly Plan',
      price: '500/Month',
      features: [
        '4 Fruits',
        '4 Veggies',
        'Quantity: 4/head',
      ],
    },
  ];

  const handleGetPlan = async(plan) => {
    const userID = 'uch45'; // Replace with actual userID
        const startDate = new Date().toISOString().split('T')[0]; // Current date
        const endDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]; // 1 week later
    
        const subscriptionData = {
          userID,
          subs_Type: plan.name,
          StartDate: startDate,
          EndDate: endDate,
        };

        try {
                // Update to full URL for the request
                const response = await axios.post('http://localhost:3001/subscription', subscriptionData);
                console.log(response.data.message);
          
                // Store the selected plan in local storage
                localStorage.setItem('selectedPlan', JSON.stringify(plan));
          
                // Redirect to the payment page
                navigate('/payment');
              } catch (error) {
                console.error('Error saving subscription:', error);
              }
    // Store the selected plan in local storage
    localStorage.setItem('selectedPlan', JSON.stringify(plan));

    // Redirect to the payment page
    navigate('/payment');
  };

  return (
    <div className="plan-selector">
      <h2>Choose your Subscriptions</h2>
      <p>Get the right plan for your health. Plans can be upgraded in the future.</p>
      <div className="plans">
        {plans.map((plan, index) => (
          <div key={index} className="plan-card">
            <h3>{plan.name}</h3>
            <p className="price">{plan.price}</p>
            <ul>
              {plan.features.map((feature, i) => (
                <li key={i}>{feature}</li>
              ))}
            </ul>
            <button className="get-plan-btn" onClick={() => handleGetPlan(plan)}>Get Plan</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Subscription;
