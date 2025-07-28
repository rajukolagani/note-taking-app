import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUp, signIn } from '../services/api';
import './AuthPage.css';
import { useAuth } from '../context/AuthContext'; // Step 3.1

const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();
  const { login } = useAuth(); // Step 3.2

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let response;
      if (isSignup) {
        response = await signUp(formData);
      } else {
        response = await signIn(formData);
      }
      // Step 3.3: Use the login function from context
      login(response.data);

      navigate('/');
    } catch (error) {
      console.error(error);
      alert('An error occurred. Please try again.');
    }
  };

  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>{isSignup ? 'Sign Up' : 'Sign In'}</h2>
        {isSignup && (
          <input name="name" placeholder="Name" onChange={handleChange} required />
        )}
        <input name="email" type="email" placeholder="Email Address" onChange={handleChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleChange} required />
        <button type="submit">{isSignup ? 'Sign Up' : 'Sign In'}</button>
        <button type="button" onClick={switchMode}>
          {isSignup ? 'Already have an account? Sign In' : "Don't have an account? Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default AuthPage;