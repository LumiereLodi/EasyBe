CODE STRUCTURES: 

ASSETS : MULTIMEDIA, PHOTOS, LOGOS

COMPONENT: 
    -APPBAR : The main appbar of the bar is its own component here. Prop will be sent to the component as title 
    -AUTH : Here you find the login form and authentication when the user reload the page. 
    -DASHBOARD : The dashboard for all users is the same. The top part of the dash board is the same for everyone and the overview part depends on your department. 
    -DRAWER : A permanent drawer on the left of the screen. Here we have listed the tabs. The Tabs are different depending on user position and department. 
    -LAYOUT : We have two main layout that we have called list layout and details layout. the list layout is on the left and the roght layout is on the right. 
    -VIEWS : 
        -MANAGER : The view of each manager depending on their department. 
        -STAFF : view of each staff members depending on their department. 
        
        


IN MORE DETAILS:  

⚡ PERN Full-Stack PROJECT/TEAM AND ANALTICAL TOOL FOR EASYBE

    PostgreSQL Express React Node (PERN) full-stack app, integrates React 
	frontend with Node.js backend. 


📄 Table of Contents

    Using this project 
    =

📚 Using this project
Backend

1. PostgreSQL needs to be installed and running - I started it from my
Windows 10 PostgreSQL 12 dropdown option 'SQL shell (psql)'
2. Postman used to test the backend before frontend was available
3. Postgresql shell commands: \l list all databases. \c database1 connect to
database1. \dt inspect tables. \q to quit.
📷 API's and Schema 
Refer to zip folder.

Backend screenshot Frontend & backend screenshot Frontend screenshot
📶 Technologies - Backend

    PostgreSQL v13
    PostgreSQL Installer for Windows
    Express.js middleware v4
    Node.js v14
    Nodemon npm module so backend server will automatically restart after code changes
    Postman API to simulate a frontend

📶 Technologies - Frontend
    React framework v17
	Mobx

💾 Setup - Backend

    Change to /server directory
    Install dependencies using npm i
    Install nodemon globally if you don't already have it
    Install PostgreSQL & run it (requires the password you created during installation)
    Add database access credentials to db.js - recommend installing npm dotenv & using .env to hide credentials if commiting to Github
    Postgresql shell commands: \l list all databases. \c database1 connect to database1. \dt inspect tables. \d+ inspect table & show relation information. \q to quit.
    Run nodemon server for a dev server
    *http://localhost:5000/ can be accessed for CRUD operations such as POST, GET, PUT, DELETE etc. using Postman

💾 Setup - Frontend

    Change to /client directory
    Install dependencies using npm i.
    Run npm start. Frontend will open at http://localhost:{port#}