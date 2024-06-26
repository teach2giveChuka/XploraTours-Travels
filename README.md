# @XploraTours-Travels

@XploraTours-Travels is a full-stack application consisting of a backend built with Node.js, Express.js, and Prisma ORM, and a frontend built with Angular. It provides a RESTful API for managing tours and bookings for a travel agency, as well as a user interface for interacting with the application.

## Features

- Create, read, update, and delete tours
- Activate and deactivate tours
- View active and inactive tours
- Search for tours by destination
- Create bookings for tours
- View bookings for a specific tour
- View total bookings count for a tour
- View total amount earned per tour
- View total amount spent by a user
- View total amount earned collectively by the company

## Technologies Used

### Backend

![Node.js](https://img.shields.io/badge/Node.js-339933?logo=nodedotjs&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-000000?logo=express&logoColor=white)
![Prisma ORM](https://img.shields.io/badge/Prisma-2D3748?logo=prisma&logoColor=white)
![SQL Server](https://img.shields.io/badge/SQL%20Server-CC2927?logo=microsoft-sql-server&logoColor=white)

- Node.js
- Express.js
- Prisma ORM
- SQL Server

### Frontend

![Angular](https://img.shields.io/badge/Angular-DD0031?logo=angular&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?logo=typescript&logoColor=white)
![HTML](https://img.shields.io/badge/HTML-E34F26?logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=white)

- Angular
- TypeScript
- HTML/CSS

## Getting Started

### Prerequisites

- Node.js (v14 or later)
- npm (Node Package Manager)
- Angular CLI
- SQL Server (or any other database supported by Prisma)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/your-username/XploraTours-Travels.git

2. **Navigate to the project directory**

   ```bash
   cd XploraTours-Travels

3. **Install backend dependencies:**

   ```bash
   cd backend-prisma
   npm install

4. **Install backend dependencies:**
      Create a new SQL Server database (or use an existing one).
      Rename the .env.example file to .env and update the database connection details.

5. **Run database migrations for the backend:**

   ```bash
   npx prisma migrate dev



6. **Start the backend development server:**

   ```bash
   npm run dev

 The backend server should now be running at http://localhost:4115.

7. **Navigate back to the project root directory:**

   ```bash
   cd ..

8. **Install frontend dependencies:**

   ```bash
   cd frontend-angular
   npm install

9. **Start the frontend development server:**

   ```bash
   ng serve -o

The frontend should now be accessible at http://localhost:4200.

API Documentation
The API documentation is available in the restClient directory of the backend. You can import the tour.http and booking.http files into your preferred API client (e.g., Insomnia, Postman) to explore and test the available endpoints.



## Screenshots

# XploraTours-Travels Screenshots

## Landing Page
1. ![Landing Page Hero Section](./frontend-angular/public/assets/screenshots/Screenshot1.PNG) (PNG - Landing Page Hero Section)
2. ![Full Landing Page View](./frontend-angular/public/assets/screenshots/landingPage.png) (PNG - Full Landing Page View)

## Login
3. ![Login Form Validation](./frontend-angular/public/assets/screenshots/loginValidation.PNG) (PNG - Login Form Validation)
4. ![Unsuccessful Login Attempt](./frontend-angular/public/assets/screenshots/unsuccesfulLogin.PNG) (PNG - Unsuccessful Login Attempt)
5. ![Successful Login](./frontend-angular/public/assets/screenshots/loginSuccess.PNG) (PNG - Successful Login)

## Signup
6. ![Signup Form Validation](./frontend-angular/public/assets/screenshots/signupFormValidation.PNG) (PNG - Signup Form Validation)
7. ![Unsuccessful Registration](./frontend-angular/public/assets/screenshots/unsuccesfulRegistration.PNG) (PNG - Unsuccessful Registration)
8. ![Successful Registration](./frontend-angular/public/assets/screenshots/SuccesfulRegistration.PNG) (PNG - Successful Registration)

## Dashboards
9. ![Admin Dashboard](./frontend-angular/public/assets/screenshots/AdminDashboard.PNG) (PNG - Admin Dashboard)
10. ![User Dashboard](./frontend-angular/public/assets/screenshots/userdashboard.png) (PNG - User Dashboard)
11. ![User Booking Tour](./frontend-angular/public/assets/screenshots/userbooking.png) (PNG - User Booking Tour)
12. ![View Single Tour Details](./frontend-angular/public/assets/screenshots/ViewOneTout.PNG) (PNG - View Single Tour Details)







  






