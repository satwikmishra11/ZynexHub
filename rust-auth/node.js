const axios = require('axios');

async function authenticateUser(username, password) {
    try {
        const response = await axios.post('http://localhost:5003/login', { username, password });
        return response.data.status === 'success';
    } catch (error) {
        console.error('Authentication error:', error);
        return false;
    }
}

// Use the function in your auth route
app.post('/api/authenticate', async (req, res) => {
    const { username, password } = req.body;
    const isAuthenticated = await authenticateUser(username, password);
    res.json({ isAuthenticated });
});
