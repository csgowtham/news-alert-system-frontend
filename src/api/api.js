// api.js
import axios from 'axios';

export const loginUser = async ({ email, password }) => {
    const response = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
    });
    return response.data;
};

export const registerUser = async ({ email, password }) => {
    const response = await axios.post('http://localhost:5000/api/auth/register', {
        email,
        password,
    });
    return response.data;
};

export const fetchTopHeadlines = async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('http://localhost:5000/api/news/top-headlines', {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};

export const fetchNotifications = async () => {
    try {
        const token = localStorage.getItem('token');
        
        if (!token) {
            console.error('No token found in localStorage');
            throw new Error('User is not authenticated. No token found.');
        }
        
        const response = await axios.get('http://localhost:5000/api/news', {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
        
        return response.data;
    } catch (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            console.error('Error fetching notifications:', error.response.data);
            console.error('Status Code:', error.response.status);
        } else {
            // The request was made but no response was received
            console.error('Error fetching notifications:', error.message);
        }
        throw error; // Re-throwing error to be caught by the calling function in Dashboard.jsx
    }
};
export const updatePreferences = async (preferences) => {
    const token = localStorage.getItem('token');
    const response = await axios.put('http://localhost:5000/api/preferences', preferences, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    return response.data;
};
