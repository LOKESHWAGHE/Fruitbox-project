import React, { useEffect, useState } from 'react';
import './mysubscription.css';
import axios from 'axios'; // For making API requests

const MySubscription = () => {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [subscriptionDates, setSubscriptionDates] = useState({ startDate: '', endDate: '' });
  const [subscriptionStatus, setSubscriptionStatus] = useState('');
  const [subsID, setSubsID] = useState(null); // For storing subs_ID

  useEffect(() => {
    const plan = localStorage.getItem('selectedPlan');
    const savedSubsID = localStorage.getItem('subscriptionID'); // Get saved subs_ID

    if (plan && savedSubsID) {
      const parsedPlan = JSON.parse(plan);
      setSelectedPlan(parsedPlan);
      setSubsID(savedSubsID); // Set the subsID

      // Fetch subscription details from the backend
      const fetchSubscriptionDetails = async () => {
        try {
          const response = await axios.get(`http://localhost:3001/subscription/details`, {
            params: { subs_ID: savedSubsID }
          });

          // Assuming response.data has the properties you expect
          const { endDate, startDate } = response.data;

          // Make sure to handle date format correctly
          const formattedStartDate = new Date(startDate).toISOString().split('T')[0];
          const formattedEndDate = new Date(endDate).toISOString().split('T')[0];

          setSubscriptionDates({ startDate: formattedStartDate, endDate: formattedEndDate });

          const currentDate = new Date();
          const subscriptionEndDate = new Date(endDate);
          if (currentDate > subscriptionEndDate) {
            setSubscriptionStatus('Expired');
          } else {
            setSubscriptionStatus('Active');
          }
        } catch (error) {
          console.error('Error fetching subscription details:', error);
        }
      };

      fetchSubscriptionDetails();
    }
  }, []);

  const handleCancelToday = async () => {
    try {
      console.log('Sending subs_ID:', subsID); // Debugging line
      const response = await axios.put('http://localhost:3001/subscription/cancelToday', {
        subs_ID: subsID
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      // Check the response for the updated EndDate
      if (response.data && response.data.newEndDate) {
        console.log('Updated end date:', response.data.newEndDate);

        // Update the endDate in state to reflect the updated end date from the server
        const newEndDate = new Date(response.data.newEndDate).toISOString().split('T')[0];

        setSubscriptionDates(prev => ({
          ...prev,
          endDate: newEndDate // Update only the endDate
        }));

        alert('Subscription day canceled, end date extended');
      } else {
        console.error('No new end date received');
        alert('Error: Could not update the subscription end date');
      }
    } catch (error) {
      console.error('Error canceling subscription:', error);
      alert('Error canceling subscription');
    }
  };

  return (
    <div className="subscription-container">
      <h1>Your Subscription</h1>
      {selectedPlan ? (
        <div className="subscription-details">
          <h2>{selectedPlan.name}</h2>
          <p>Price: {selectedPlan.price}</p>
          
          <p>Start Date: {new Date().toISOString().split('T')[0]}</p>

          <p>End Date: {subscriptionDates.endDate}</p>
          <h3>Features:</h3>
          <ul className="features">
            {selectedPlan.features.map((feature, index) => (
              <li key={index}>{feature}</li>
            ))}
          </ul>
          <p>Status: <strong>{subscriptionStatus}</strong></p>

          {/* Cancel today's subscription */}
          <button className="cancel-button" onClick={handleCancelToday}>Cancel Today</button>
        </div>
      ) : (
        <p className="no-subscription">No subscription selected.</p>
      )}
    </div>
  );
};

export default MySubscription;
