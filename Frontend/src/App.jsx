import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

// import SignUp from './page/SignUp';
import Login from './pages/Adminlogin.jsx';
import Dashboard from './pages/DashBoard';
import Navbar from './Components/Navbar.jsx';
import useAuthUser from './Hooks/useAuthUser.js';
import Layout from './Components/Layout.jsx';
import Loader from './Components/Loader.jsx'

function App() {
  const { authUser, isLoading } = useAuthUser();
  const isAuthUser = Boolean(authUser);
  
  return (
    <div className="app-container w-screen h-screen">
      {/* Toast Notifications */}
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 1000,
          style: { background: '#363636', color: '#fff' },
          success: { iconTheme: { primary: '#4BB543', secondary: 'white' } },
          error: { iconTheme: { primary: '#FF3333', secondary: 'white' } },
        }}
      />

      <Routes>
        {/* Public Routes */}
        {/* <Route path="/signup" element={<SignUp />} /> */}
        <Route
          path="/login"
          element={isAuthUser ? <Navigate to="/" replace /> : <Login />}
        />

        {/* Protected Routes */}
        <Route
          path="/"
          element={
            isLoading ? (
             <Loader/>
            ) : isAuthUser ? (
              <>
                <Navbar />
                <Layout />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />

        </Route>
      </Routes>
    </div>
  );
}

export default App;
