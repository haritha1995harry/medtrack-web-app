
# MedTrack - Never Miss a Dose Again

## Description
MedTrack is a web-based medication management system designed to help users take their medications on time while allowing caregivers to monitor adherence. It offers features like medication scheduling, reminders, and caregiver notifications. The application is built using the MERN stack and follows an MVC architecture.

## Technologies Used
- **Backend:** Node.js, Express.js, MongoDB, Mongoose
- **Frontend:** HTML, CSS, JavaScript, Materialize CSS
- **Authentication:** bcrypt for password hashing
- **Notifications:** Email notifications, in-app caregiver notifications
- **Prototyping:** Figma (interactive wireframes for Caregivers and Medications UI)
- **Version Control:** Git with feature branches aligned to Trello tasks
- **Testing:** Postman, Mocha (planned)

## Features
- User registration with secure password hashing
- Medication scheduling with flexible occurrence times
- Real-time notifications to caregivers when a dose is missed
- Dashboard to view upcoming medications and adherence history
- Caregiver management: Add, view caregivers
- Role-based access control for users and caregivers (planned)
- Interactive UI for Caregivers and Medications sections

## Architecture
The application follows the MVC (Model-View-Controller) architecture:
- **Model:** Defines data structures and schemas (MongoDB via Mongoose)
- **View:** Frontend pages and UI components (HTML, CSS, Materialize)
- **Controller:** Handles logic and interaction between model and view (Node.js)
- **Routes:** Defines API endpoints for data manipulation and retrieval

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/haritha1995harry/medtrack-web-app.git
   cd medtrack
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in a `.env` file:
   ```
   PORT=3000
   MONGO_URI=mongodb://localhost:27017/medtrackDB
   ```
4. Run the application:
   ```bash
   npm start
   ```

## API Endpoints
- **POST /register:** User registration
- **POST /login:** User login
- **POST /medications:** Add a new medication
- **GET /medications/upcoming/:userId:** Get upcoming medications
- **POST /caregivers:** Add a new caregiver
- **GET /caregivers/:userId:** Get caregivers by user
- **GET /medications/:userId:** Get medications list by user

## Contributors
- Binara Lokuliyanage (Scrum Master, Full-Stack Developer)
- Haritha Prashad Gunarathna (Backend Developer)
- Sathin Chamikara Polwaththa (Frontend Developer)

## License
This project is licensed under the MIT License.
