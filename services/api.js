import { API_BASE_URL } from '@env';

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}/users/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })

        });


        const data = await response.json();


        if (response.ok) {
            
            return { success: true, token: data.token, user: data.user };
        } else {
            return { success: false, message: data.error || "Invalid credentials" };
        }
    } catch (error) {
        return { success: false, message: error.message };

    }
};


export const signupUser = async (username, email, password) => {
    try {
        const res = await fetch(`${API_BASE_URL}/users/signup`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, email, password }),
        });

        const data = await res.json();
        if (res.ok) {
            return { success: true, token: data.token, user: data.user };
        } else {
            return { success: false, message: data.error || 'Signup failed' };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};


export const getUserFarms = async (userId, token) => {
    try {
        const response = await fetch(`${API_BASE_URL}/farms/user/${userId}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });
        const text = await response.text();
        console.log(text)

        const data = await response.json();
        if (response.ok) return { success: true, farms: data };
        return { success: false, message: data.error };
    } catch (error) {
        return { success: false, message: error.message };
    }
};

