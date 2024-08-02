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

// Find the shortest path between two locations using Dijkstra's algorithm
const findShortestPath = (start, end, roads) => {
    const distances = {};
    const previous = {};
    const queue = [];
    const estimatedTime = 0;

    // Initialize distances and queue
    roads.forEach(road => {
        distances[road.start_location_id] = Infinity;
        distances[road.end_location_id] = Infinity;
    });
    distances[start] = 0;

    queue.push({ id: start, distance: 0 });

    while (queue.length > 0) {
        // Sort the queue by distance
        queue.sort((a, b) => a.distance - b.distance);

        const current = queue.shift();
        const currentId = current.id;
        
        if (currentId === end) break;

        // Searching through each neighbour
        roads.forEach(road => {
            if (road.start_location_id === currentId || road.end_location_id === currentId) {
                const neighbor = road.start_location_id === currentId ? road.end_location_id : road.start_location_id;
                const newDistance = distances[currentId] + road.distance;

                if(road.traffic_condition === "Heavy"){
                    estimatedTime = estimatedTime + 15;
                }else if(road.traffic_condition === "Moderate"){
                    estimatedTime = estimatedTime + 10;
                }else if(road.traffic_condition === "Low"){
                    estimatedTime = estimatedTime + 5;
                }

                if (newDistance < distances[neighbor]) {
                    distances[neighbor] = newDistance;
                    previous[neighbor] = currentId;
                    queue.push({ id: neighbor, distance: newDistance });
                }
            }
        });
    }

    // Build the shortest path
    const path = [];
    let currentNode = end;
    while (currentNode) {
        path.unshift(currentNode);
        currentNode = previous[currentNode];
    }

    return { path, distance: distances[end] , estimatedTime};
};

router.get('/shortest-path', async (req, res) => {
    const { start_location_id, end_location_id } = req.query;

    try {
        // Parse location ids to integers
        const startId = parseInt(start_location_id);
        const endId = parseInt(end_location_id);

        // Fetch all roads from the database
        const roads = await Roads.find({});

 
        const result = findShortestPath(startId, endId, roads);

        res.status(200).json({
            path: result.path,
            total_distance: result.distance,
            estimated_time: result.estimatedTime
        });

    } catch (error) {
        res.status(500).send(error.message);
    }
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