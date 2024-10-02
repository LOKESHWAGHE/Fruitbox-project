// UserDashboard.jsx
import React from 'react';
import Product_list from './Product_list.jsx';
import DashboardNavbar from './DasboardNavbar.jsx';
import Subscription from './subscription.jsx';  // Updated import

function UserDashboard() {
  return (
    <>
      <DashboardNavbar />
      <Product_list />
      <Subscription />  {/* Updated to call Subscription */}
    </>
  );
}

export default UserDashboard;
