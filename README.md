Daily Vitals Tracker
Project Description
The Daily Vitals Tracker is a web-based application designed to monitor daily health vitals such as heart rate, blood pressure, and temperature. This app provides personalized health tips based on the data entered and allows users to add, update, or delete their vital records seamlessly.
Features
•	Vitals Management: Add, edit, and delete vital health data.
•	Health Tips: Receive personalized health insights based on your vitals.
•	User-friendly Interface: A responsive and intuitive design for easy navigation.
•	Integrated Backend: A RESTful API to manage and retrieve vital records efficiently.
Technologies Used
Frontend
•	HTML, CSS, JavaScript
Backend
•	Node.js
•	Express.js
•	MongoDB
•	Mongoose
Testing
•	Jest
•	Supertest
Deployment
•	Frontend: Azure Static Web Apps
•	Backend: Azure App Service
Setup Instructions
Local Environment Setup
1.	Clone the Repository
Clone the project repository and navigate to the project directory:
2.	git clone https://github.com/KaniC-Web/DailyVitals.git
cd DAILYVITALSPROJECT
3.	Install Dependencies
Install the required dependencies:  npm install
4.	Set Up Environment Variables
o	Create a .env file in the root directory and add the following content to the .env file: 
5.	MONGO_URI=mongodb://localhost:27017/dailyVitals
  	PORT=5001
6.	Start the Backend Server
Run the server using:  node server.js
7.	Run the Frontend
o	Serve the index.html file located in the public folder using a local server (e.g., Live Server in VSCode).
8.	Access the Application
Open the browser and navigate to:  http://127.0.0.1:5500/public/index.html
Deployment Instructions
Frontend Deployment on Azure Static Web Apps
1.	Push your code to GitHub.
2.	Create an Azure Static Web App: 
o	Link your GitHub repository to Azure.
o	Set the app source to the public folder.
3.	Azure automatically deploys your frontend using the workflow file located at .github/workflows.
Backend Deployment on Azure App Service
1.	Use the Azure CLI to deploy the backend: 
az webapp up --name daily-vitals-app --runtime "NODE|16-lts"
2.	Update the frontend code to use the deployed backend API.
API Endpoints
Method	Endpoint	Description
GET	/api/vitals	Retrieve all vitals data.
POST	/api/vitals	Add a new vital entry.
PUT	/api/vitals/:id	Update an existing vital.
DELETE	/api/vitals/:id	Delete a specific vital.
GET	/api/vitals/health-tips	Generate health tips based on vitals.

Testing
•	Unit tests are written using Jest and Supertest.
•	Run all tests using: 
npm test
Health Tips Logic:
Heart Rate Tips:
o	High Heart Rate (> 100 bpm): If your heart rate is too high, try to relax, reduce stress, and exercise more.
o	Low Heart Rate (< 60 bpm): If your heart rate is too low, consult a doctor if you're feeling tired or dizzy.
o	Normal Heart Rate (60-100 bpm): Your heart rate is healthy. Keep up the good work!
Blood Pressure Tips:
o	High Blood Pressure (> 140 mmHg): If your blood pressure is high, try cutting down on salty foods and manage your stress.
o	Low Blood Pressure (< 90 mmHg): If your blood pressure is low, drink plenty of water and eat balanced meals.
o	Normal Blood Pressure (90-140 mmHg): Your blood pressure is healthy. Great job!
Body Temperature Tips:
o	High Temperature (> 99.5°F / 37.5°C): If you're running a fever, rest and drink water.
o	Low Temperature (< 97.0°F / 36.1°C): If your body temperature is too low, stay warm and keep an eye on how you feel.
o	Normal Temperature (97.0°F - 99.5°F): Your body temperature is normal.
How It Works:
o	The system checks your latest health readings and gives you personalized advice based on your current vitals.
o	It offers suggestions to help you stay healthy or improve your wellness based on what your body is telling you.
o	In short, the system watches your vitals and gives advice to keep you healthy based on your heart rate, blood pressure, and temperature.
