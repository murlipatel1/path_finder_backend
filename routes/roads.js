const express = require('express');
const router = express.Router();
const Roads = require('../models/Roads');
const Location = require('../models/Location');

// Endpoint: GET /
router.get('/', (req, res) => {
    res.send('Path finder api');
});


//Endpoint: POST /locations
//Request Body: { "name": "Location A", "latitude": 37.7749, "longitude": -122.4194 }
//Response: `201 Created` with the created location.
//generate a location_id for each location

router.post('/locations', async (req, res) => {
    try {
        const { name, latitude, longitude } = req.body;

        // Fetch all locations
        const location_id = Math.floor(Math.random() * 1000);

        const newLocation = new Location({
            location_id:location_id,
            location_name:name,
            latitude:latitude,
            longitude:longitude
        });

        const newLoc = await newLocation.save();

        res.status(201).json(newLoc); 

    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});




// Endpoint: POST /roads
// Request Body: { "start_location_id": 1, "end_location_id": 2, "distance": 5, "traffic_condition": "clear" }
// You may assign weight to different traffic conditions (e.g., Clear: 1, Moderate: 5, High: 10).
// Response: `201 Created` with the created road.
router.post('/roads', async (req, res) => {
    const { start_location_id, end_location_id, distance, traffic_condition } = req.body;
    const road_id = Math.floor(Math.random() * 1000);

    const newRoad = new Roads({
        road_id:road_id,
        start_location_id:start_location_id,
        end_location_id:end_location_id,
        distance:distance,
        traffic_condition:traffic_condition
    });

    const newRd = await newRoad.save();
    res.status(200).json(newRd);
});


// Endpoint: POST /traffic-updates
// Update Traffic Condition: Update the traffic condition of a road.
// Request Body: { "road_id": 1, "timestamp": "2024-06-25T14:00:00Z", "traffic_condition": "heavy" }
// Response: `201 Created` with the created traffic update.
// Find road_id in Roads model and update the traffic_condition

router.post('/traffic-updates', async (req, res) => {
    const { road_id, timestamp, traffic_condition } = req.body;

    try {
        // Find the road by road_id
        const road = await Roads.findOne({ road_id });

        if (!road) {
            return res.status(404).json({ error: 'Road not found' });
        }

        // Update the traffic condition and timestamp
        road.traffic_condition = traffic_condition;
        road.latest_timestamp = timestamp;

        // Save the updated road document
        const updatedRoad = await road.save();

        // Respond with the updated document
        res.status(200).json(updatedRoad);
    } catch (error) {
        console.error('Error updating traffic updates:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


// Endpoint: GET /shortest-path
// Request Parameters: start_location_id, end_location_id
// Response: `200 OK` with the calculated path
// { 
// "path": ["a_location_id", "b_location_id", "c_location_id"], 
// "total_distance": 10, 
// "estimated_time": 15 
// }

router.get('/shortest-path', (req, res) => {
    const { start_location_id, end_location_id } = req.query;
    //write logic to find the shortest path between id1 and id2

    res.send(`Shortest path from ${start_location_id} to ${end_location_id}`);
});

// Endpoint: GET /roads/{id}/traffic-condition
// Generate a CSV report of all roads with their traffic conditions.
// Endpoint: GET /report/traffic
// Analyze traffic updates for each road over a period of time (e.g., past hour, past day).
// Response: `200 OK` with the traffic condition

router.post('/report/:id/traffic', (req, res) => {
    const { id } = req.params;
    res.send(`Traffic condition for road ${id}`);

    res.send('Traffic report');
});

module.exports = router;