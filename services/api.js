import Constants from 'expo-constants';

const {
    API_KEY,
    USER_SERVICE_URL,
    MONITORING_SERVICE_URL,
    IRRIGATION_SERVICE_URL,
} = Constants.expoConfig.extra;

console.log('API Key:', API_KEY);

export const loginUser = async (email, password) => {
    console.log("URL:", `${USER_SERVICE_URL}/users/login`);
    try {
        const response = await fetch(`${USER_SERVICE_URL}/users/login`, {
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
        const res = await fetch(`${USER_SERVICE_URL}/users/signup`, {
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


export const getUserFarms = async (token) => {
    try {
        const response = await fetch(`${USER_SERVICE_URL}/farms/my_farms`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });


        const data = await response.json();
        if (response.ok) return {success: true, farms: data};
        return {success: false, message: data.error};
    } catch (error) {
        return {success: false, message: error.message};
    }
};

export const createFarm = async (token, payload) => {
    try {

        const response = await fetch(`${USER_SERVICE_URL}/farms/create_farm`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            return {success: true, data};
        } else {
            return {success: false, message: data.error || "Failed to create farm"};
        }
    } catch (error) {
        return {success: false, message: error.message};
    }
};


export const getSensorData = async (token, farmId) => {

    try {
        const response = await fetch(`${MONITORING_SERVICE_URL}/sensors/${farmId}`, {
            method: "GET",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
            },
        });

        const text = await response.text();


        if (response.ok) {
            const data = JSON.parse(text);
            return { success: true, data };
        } else {
            const error = JSON.parse(text);
            return { success: false, message: error?.error || 'Failed to fetch sensor data' };
        }

    } catch (err) {
        return { success: false, message: err.message };
    }
};


export const updateFarm = async (token, esp32Id, payload) => {
    try {
        const response = await fetch(`${USER_SERVICE_URL}/farms/update_farm/${esp32Id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, message: data.error || "Failed to update farm" };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};



export const updateThreshold = async (token, farmId, payload) => {
    try {
        const response = await fetch(`${USER_SERVICE_URL}/farms/update_threshold/${farmId}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            },
            body: JSON.stringify(payload)
        });

        const data = await response.json();

        if (response.ok) {
            return { success: true, data };
        } else {
            return { success: false, message: data.error || "Failed to update thresholds" };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};


export const deleteFarm = async (token, farmId) => {
    try {
        const response = await fetch(`${USER_SERVICE_URL}/farms/delete_farm/${farmId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        let data = {};
        const text = await response.text();
        if (text) {
            data = JSON.parse(text);

        }
        console.log(data);
        if (response.ok) {
            return { success: true, message: data.message || "Farm deleted successfully" };
        } else {
            return { success: false, message: data.error || "Failed to delete farm" };
        }
    } catch (error) {
        return { success: false, message: error.message };
    }
};

export const toggleIrrigation = async (token, farmId, status) => {
    try {
        const response = await fetch(`${IRRIGATION_SERVICE_URL}/irrigation/toggle/${farmId}`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ action:status })
        });


        if (response.ok) {
            const data = await response.json();
            console.log(data);
            return { success: true, data };
        } else {
            const error = await response.json();
            return { success: false, message: error?.error || 'Toggle failed' };
        }
    } catch (err) {
        return { success: false, message: err.message };
    }
};

export const getThreshold = async (esp32Id) => {
    try {
        const res = await fetch(`${USER_SERVICE_URL}/farms/threshold/${esp32Id}`, {
            headers: {
                "X-API-KEY": API_KEY, // replace with your actual API key constant
            }
        });
        const data = await res.json();
        return { success: res.ok, data, message: data.error || '' };
    } catch (error) {
        return { success: false, message: error.message };
    }
};
