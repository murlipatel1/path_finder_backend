const mongoose = require('mongoose');

// Define the schema for the roads
const RoadSchema = new mongoose.Schema({
     road_id: {
            type: Number,
            required: true
         },
        latest_timestamp: {
                type: Date,
                required: true,
                default: Date.now
            },
        traffic_condition: {
                type: String,
                required: true
            },
        start_location_id: {
                type: Number,
                required: true
            },
        end_location_id: {
                type: Number,
                required: true
            },
        distance: {
                type: Number,
                required: true
            }
});
module.exports = mongoose.model('Roads', RoadSchema);

