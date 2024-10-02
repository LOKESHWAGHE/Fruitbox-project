import React from 'react';
import styled from 'styled-components';

const ProfilePageContainer = styled.div`
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background-color: #1D232A;
  border: 1px solid #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;

const ProfilePicture = styled.div`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  overflow: hidden;
  margin: 20px auto;
`;

const UserInfo = styled.div`
  margin-bottom: 20px;
`;

const SubscriptionDetails = styled.div`
  margin-bottom: 20px;
`;

const FavoriteFruits = styled.div`
  margin-bottom: 20px;
`;

const FavoriteFruitsList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const FavoriteFruitsItem = styled.li`
  margin-bottom: 10px;
`;

const Bio = styled.p`
  font-size: 18px;
  color: #666;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
  margin-top: 20px;
  text-align: center;
`;

function Profile() {
  // Example user data
  const userData = {
    name: 'Amit Verma',
    email: 'amitverma@example.com',
    phone: '9876543201',
    address: '67, Vallabh Nagar, Indore',
    profilePicture: '/profile.png',
  };

  return (
    <>
      <Heading>
        Profile Information
      </Heading>
      <ProfilePageContainer>
        <ProfilePicture>
          <img src={userData.profilePicture} alt="Profile Picture" />
        </ProfilePicture>
        <UserInfo>
          <h2>{userData.name}</h2>
          <p>Email: {userData.email}</p>
          <p>Phone: {userData.phone}</p>
          <p>Address: {userData.address}</p>
        </UserInfo>
        <button className="bg-pink-500 text-white rounded-md px-3 py-1 hover:bg-pink-700 duration-200">
          Edit Profile
        </button>
      </ProfilePageContainer>
    </>
  );
}

export default Profile;