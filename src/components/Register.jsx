// src/components/Register.js
import { useState } from 'react';
import { auth, provider, signInWithPopup, createUserWithEmailAndPassword } from '../config/firebase';
import { useNavigate } from 'react-router-dom';
import { FaGoogle } from 'react-icons/fa';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      await signInWithPopup(auth, provider);
      navigate('/');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Register</h1>
      <form onSubmit={handleRegister} className="space-y-4">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          className="border p-2 w-64"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          className="border p-2 w-64"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 w-64">Register</button>
      </form>
      <div className="mt-4">
        <button 
          onClick={handleGoogleSignIn} 
          className="bg-red-500 text-white p-2 w-64 flex items-center justify-center"
        >
               <span> <FaGoogle className='mt-0.5 mr-3' /></span>
               Register with Google
        </button>
      </div>
    </div>
  );
};

export default Register;
