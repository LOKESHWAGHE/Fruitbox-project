

import React, { useEffect, useState } from 'react';
import './mysubscription.css';
import axios from 'axios'; // For making API requests

const MySubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);

  useEffect(() => {
    // Retrieve the selected plan from local storage
    const plan = localStorage.getItem('selectedPlan');
    if (plan) {
      setSelectedPlan(JSON.parse(plan));
    }
  }, []);

 const handleSubscription = async () => {
  const userID = '1012'; // Replace with the actual userID
  const startDate = new Date().toISOString().split('T')[0]; // Current date
  const endDate = new Date(new Date().setDate(new Date().getDate() + 7)).toISOString().split('T')[0]; // 1 week later

  const subscriptionData = {
    userID,
    subs_Type: selectedPlan?.name || '', // Make sure the selectedPlan is defined
    StartDate: startDate,
    EndDate: endDate,
  };

  try {
    const response = await axios.post('/subscription', subscriptionData); // POST to '/subscription'
    console.log(response.data.message);
  } catch (error) {
    console.error('Error saving subscription:', error);
  }
};


  return (
    <div className="subscription-container">
      <h1>Your Subscription</h1>
      {selectedPlan ? (
        <div className="subscription-details">
          <h2>{selectedPlan.name}</h2>
          <p>Price: {selectedPlan.price}</p>
          <br />
          <h3>Features:</h3>
          <ul className="features">
            {selectedPlan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <button onClick={handleSubscription} className="get-plan-btn">Confirmend Subscription</button> {/* Button to trigger subscription */}
        </div>
      ) : (
        <p className="no-subscription">No subscription selected.</p>
      )}
    </div>
  );
};

export default MySubscription;


