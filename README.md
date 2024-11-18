# University Club Management System  

The **University Club Management System** is a web application that enables students of **Shoolini University** to explore, join, and manage university clubs efficiently.  

## Features  
- Explore available clubs with details.  
- Join and manage club memberships.  
- Backend server built with **Node.js** and **MySQL**.  

---

## Tech Stack  
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express  
- **Database:** MySQL  

---

## Getting Started  

Follow these instructions to set up the project on your local machine.  

### Prerequisites  
Ensure you have the following installed on your system:  
- **Node.js** (to run the backend)  
- **Python** (to serve the frontend)  
- **MySQL** (for the database)  

---

### Installation Steps for **Windows Users**  

1. **Install Node.js**  
   - Download the Node.js installer from [Node.js Official Website](https://nodejs.org/) and follow the installation wizard.  
   - After installation, verify it by running the following commands in the terminal:  
     ```bash
     node -v
     npm -v
     ```  

2. **Install Project Dependencies**  
   - Navigate to the project directory in the terminal and initialize the project:  
     ```bash
     npm init -y
     ```  
   - Install required packages:  
     ```bash
     npm install express body-parser cors mysql2
     ```  

3. **Set Up the Backend**  
   - Open the `server.js` file.  
   - Replace the default password in line **28** with your MySQL password.  
   - Start the server:  
     ```bash
     node server.js
     ```  

4. **Set Up the Frontend**  
   - Open a new terminal, navigate to the project directory, and run:  
     ```bash
     python -m http.server 3000
     ```  
   - Ensure **Python** is installed for this command to work. Replace `3000` with your desired port number if needed.  

5. **Set Up the Database**  
   - Open the MySQL CLI:  
     ```bash
     mysql -u root -p
     ```  
   - Run the following SQL queries:  
     ```sql
     CREATE DATABASE user_data;
     USE user_data;
     CREATE TABLE Students (
         StudentID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
         Name VARCHAR(100) NOT NULL,
         Course VARCHAR(50) NOT NULL,
         Semester INT NOT NULL,
         MobileNumber VARCHAR(15) NOT NULL,
         Email VARCHAR(100) NOT NULL UNIQUE,
         Club VARCHAR(100) DEFAULT NULL
     );
     SHOW DATABASES;
     ```  

---

### Installation Steps for **macOS Users**  

1. **Install Node.js**  
   - Open a terminal and run the following command to install Node.js via Homebrew:  
     ```bash
     brew install node
     ```  
   - Verify the installation:  
     ```bash
     node -v
     npm -v
     ```  

2. **Install Project Dependencies**  
   - Navigate to the project directory in the terminal and initialize the project:  
     ```bash
     npm init -y
     ```  
   - Install required packages:  
     ```bash
     npm install express body-parser cors mysql2
     ```  

3. **Set Up the Backend**  
   - Open the `server.js` file.  
   - Replace the default password in line **28** with your MySQL password.  
   - Start the server:  
     ```bash
     node server.js
     ```  

4. **Set Up the Frontend**  
   - Open a new terminal, navigate to the project directory, and run:  
     ```bash
     python3 -m http.server 3000
     ```  
   - Ensure **Python** is installed for this command to work. Replace `3000` with your desired port number if needed.  

5. **Set Up the Database**  
   - Open the MySQL CLI:  
     ```bash
     mysql -u root -p
     ```  
   - Run the following SQL queries:  
     ```sql
     CREATE DATABASE user_data;
     USE user_data;
     CREATE TABLE Students (
         StudentID INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
         Name VARCHAR(100) NOT NULL,
         Course VARCHAR(50) NOT NULL,
         Semester INT NOT NULL,
         MobileNumber VARCHAR(15) NOT NULL,
         Email VARCHAR(100) NOT NULL UNIQUE,
         Club VARCHAR(100) DEFAULT NULL
     );
     SHOW DATABASES;
     ```  

---

## Important Notes  
- **Backend and Frontend Ports:** Ensure the frontend and backend run on different ports to avoid conflicts.  
- **MySQL Password:** Always update the MySQL password in `server.js` before starting the backend server.  

---

Feel free to raise issues or contribute to this project! 😊
