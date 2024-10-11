import React, { useState } from 'react';
import { registerUser, loginUser } from '../api/api.js';
import { useNavigate } from 'react-router-dom';

const Auth = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLogin, setIsLogin] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage('');
    
        try {
            const response = isLogin 
                ? await loginUser({ email, password }) 
                : await registerUser({ email, password });
    
            console.log('API Response:', response); // Log the response
    
            // Access the token directly from response, since it is not nested in 'data'
            const token = response.token; // Accessing the token correctly
            localStorage.setItem('token', token);
            setToken(token);
            navigate('/dashboard');
        } catch (error) {
            setErrorMessage('Failed to log in. Please check your credentials.');
            console.error('Error during authentication:', error); // Log the error for debugging
        }
    };
    

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="mt-5">
                <h2>{isLogin ? 'Login' : 'Register'}</h2>
                <div className="mb-3">
                    <input
                        type="email"
                        className="form-control"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        placeholder="Email"
                    />
                </div>
                <div className="mb-3">
                    <input
                        type="password"
                        className="form-control"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder="Password"
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    {isLogin ? 'Login' : 'Register'}
                </button>
                <button type="button" className="btn btn-link" onClick={() => setIsLogin(!isLogin)}>
                    Switch to {isLogin ? 'Register' : 'Login'}
                </button>
                {errorMessage && <p className="text-danger">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Auth;
