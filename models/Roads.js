// road_id , latest timestamp, traffic_condition , start_location_id , end_location_id , distance

const mongoose = require('mongoose');

const RoadSchema = new mongoose.Schema({
     road_id: {
            type: Number,
            required: true
         },
        latest_timestamp: {
                type: Date,
                required: true
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

