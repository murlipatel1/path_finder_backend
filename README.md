# Path_Finder

## API

### Endpoint: POST /locations
Request Body: { "name": "Location A", "latitude": 37.7749, "longitude": -122.4194 }
Response: `201 Created` with the created location.
Add Road:

![Screenshot 2024-08-02 160505](https://github.com/user-attachments/assets/bf11e052-5eec-45c6-8e53-27fb105a9b2e)


### Endpoint: POST /roads
Request Body: { "start_location_id": 1, "end_location_id": 2, "distance": 5, "traffic_condition": "clear" }
You may assign weight to different traffic conditions (e.g., Clear: 1, Moderate: 5, High: 10).
Response: `201 Created` with the created road.
Update Traffic Condition:
![Screenshot 2024-08-02 160505](https://github.com/user-attachments/assets/485648df-65b4-4e46-89da-0cc48769b4c1)


### Endpoint: POST /traffic-updates
Request Body: { "road_id": 1, "timestamp": "2024-06-25T14:00:00Z", "traffic_condition": "heavy" }
Response: `201 Created` with the created traffic update.
#### Output:
![Screenshot 2024-08-02 160449](https://github.com/user-attachments/assets/b87e2571-93f0-4c75-81df-65787f120197)


Get Shortest Path:
### Endpoint: GET /shortest-path
Request Parameters: start_location_id, end_location_id
Response: `200 OK` with the calculated path
{ 
"path": ["a_location_id", "b_location_id", "c_location_id"], 
"total_distance": 10, 
"estimated_time": 15 
}

#### Sample Code:
![image](https://github.com/user-attachments/assets/3ea55eba-1591-467e-80cc-903c7e53ee57)






