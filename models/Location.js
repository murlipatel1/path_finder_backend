// name of location , latitude , logitude , location id

const LocationSchema = new Schema({
    location_name: {
        type: String,
        required: true
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    location_id: {
        type: Number,
        required: true
    }
});

module.exports = mongoose.model('Location', LocationSchema);