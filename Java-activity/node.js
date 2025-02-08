async function logUserActivity(activityData) {
    try {
        const response = await axios.post('http://localhost:5004/api/activity/process', activityData);
        console.log(response.data);
    } catch (error) {
        console.error('Activity logging error:', error);
    }
}

// Use it within any activity-tracking logic
