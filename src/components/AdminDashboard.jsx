import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../config/firebase';
import BusList from "../fetchedData/BusList";
import CarList from "../fetchedData/CarList";
import VanList from "../fetchedData/VanList";
import AddBus from "./AddBus";
import AddCar from "./AddCar";
import AddVan from "./AddVan";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const adminEmails = ['whitty8754@gmail.com', 'kesavan8388@gmail.com'];
        setIsAdmin(adminEmails.includes(user.email));
      } else {
        setIsAdmin(false);
        navigate('/login');
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigate('/login');
    } catch (error) {
      console.error("Error signing out: ", error.message);
    }
  };

  if (!isAdmin) {
    return <p>You do not have permission to access this page.</p>;
  }

  return (
    <>
      <div className="flex flex-col items-center justify-center md:p-20 md:mt-10 p-5 bg-slate-200">
        <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
        <button onClick={handleSignOut} className="bg-red-500 text-white p-2 mb-4 mt-20">Sign Out</button>
      </div>
      <div>
        <AddCar />
        <CarList isAdmin={isAdmin} />
        <AddBus />
        <BusList isAdmin={isAdmin} />
        <AddVan />
        <VanList isAdmin={isAdmin} />
      </div>
    </>
  );
};

export default AdminDashboard;
