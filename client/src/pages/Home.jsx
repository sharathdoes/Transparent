import React from 'react';
import { useAuthStore, useCompanyStore } from '@/store/store'; // Assuming you have both stores
import { useNavigate } from 'react-router-dom';

function Home() {
  const { user, clearUser } = useAuthStore();
  const { clearCompany } = useCompanyStore(); // For clearing company info
  const navigate = useNavigate(); 

  if (!user) {
    navigate('/sign-in'); 
    return null;
  }

  // Logout function to clear both user and company info
  const handleLogout = () => {
    clearUser(); // Clear user from the store
    clearCompany(); // Clear company from the store
    navigate('/sign-in'); // Redirect to sign-in page
  };

  return (
    <div>
      <h1>Welcome {user.username}</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Home;
