import React, { useState } from 'react';
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from './home/Home';
import Profiles from './profile/Profiles';
import Signup from './Components/Signup';
import Login from './Components/Login';
import VendorSignup from './Components/VendorSignup';
import Cart from './cart/Cart';
import UserDashboard from './Components/UserDashboard';
import FruitSection from './Components/FruitSection';
import VeggieSection from './Components/VeggieSection';
import AboutUs from './Components/AboutUs';
import EditProfile from './Components/EditProfile';
import VendorDashboard from './Components/VendorDashboard';
import VendorProfiles from './Components/VendorProfiles';
import EditProfileVendor from './Components/EditProfileVendor';
import ViewOrders from './Components/ViewOrders';
import AddProduct from './Components/AddProduct';
import Invoice from './Components/invoice';
import Payment from './Components/Payment';
import MySubscription from './Components/mysubscription'; // Updated import
import { Toaster } from 'react-hot-toast';
import Product_list from './Components/Product_list';
import Subscription_Product_list from './Components/Subscription_Product_list';
import Subscription_FruitSection from './Components/Subscription_FruitSection';
import Subscription_VeggieSection from './Components/Subscription_VeggieSection';
import SubscriptionInvoice from './Components/SubscriptionInvoice'; // Adjust the import path as needed
import ViewSubscriptionOrder from './Components/ViewSubscriptionOder';



function App() {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    const navigate = useNavigate();

    function addToCart(newItem) {
        const updatedCart = [...cartItems, newItem];
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }

    function removeFromCart(index) {
        const updatedCart = cartItems.filter((_, itemIndex) => itemIndex !== index);
        setCartItems(updatedCart);
        localStorage.setItem('cartItems', JSON.stringify(updatedCart));
    }

    function clearCart() {
        setCartItems([]); // Clear the state
        localStorage.removeItem('cartItems'); // Clear from localStorage
    }

    function handleLogout() {
        setCartItems([]); // Clear the state
        localStorage.removeItem('cartItems'); // Clear from localStorage
        console.log("Logging out...");
        navigate('/');  // Programmatic navigation to the login page
    }

    return (
        <>
            <Toaster />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/profile" element={<Profiles />} />
                <Route path="/user/edit" element={<EditProfile />} />
                <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} clearCart={clearCart} />} />
                <Route path="/subscription_invoice" element={<SubscriptionInvoice />} />
                 <Route path="/vendor/edit" element={<EditProfileVendor />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/register/vendor" element={<VendorSignup />} />
                <Route path="/vendorsignup" element={<VendorSignup />} />
                <Route path="/register/user" element={<Signup />} />
                <Route path="/about-us" element={<AboutUs />} />
                <Route path="/userdashboard" element={<UserDashboard clearCart={clearCart} />} />
                <Route path="/fruitsection" element={<FruitSection addToCart={addToCart} />} />
                <Route path="/veggiesection" element={<VeggieSection addToCart={addToCart} />} />
                <Route path="/vendordashboard" element={<VendorDashboard />} />
                <Route path="/vendorProfile" element={<VendorProfiles />} />
                <Route path="/vieworders" element={<ViewOrders />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/invoice" element={<Invoice />} />
                <Route path="/product_list" element={<Product_list />} />
                <Route path="/subscription_Product_list" element={<Subscription_Product_list />} />
                <Route path="/subscription_FruitSection" element={<Subscription_FruitSection addToCart={addToCart} clearCart={clearCart} />} />
                <Route path="/subscription_VeggieSection" element={<Subscription_VeggieSection  />} />
                <Route path="/viewSubscriptionOrder" element={<ViewSubscriptionOrder  />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/mysubscription" element={<MySubscription />} /> {/* Updated here */}
            </Routes>
        </>
    );
}

export default App;
