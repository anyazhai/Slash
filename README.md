# Slash

<div id="top"></div>
<span>
<img src="https://img.shields.io/badge/Django-092E20?style=for-the-badge&logo=django&logoColor=green" />
<img src="https://img.shields.io/badge/django%20rest-ff1709?style=for-the-badge&logo=django&logoColor=white" />
<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" />
<img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" />
</span>


## Table of Contents

- [Frameworks and Tools](#frameworks-and-tools)
- [Installation](#installation)
- [Roadmap](#roadmap)


## Frameworks and Tools

- **Django**: API server and website backend.
- **React**: UI and website frontend.
- **ProstgreSQL**: Database.

<p align="right">(<a href="#top">Top</a>)</p>


## Installation

1. Clone the repository:
    ```sh
    git clone https://github.com/anyazhai/Slash.git
    ```

**Running the Backend**
<div></div>

2. Create a virtual environment for installation of required modules:
    ```sh
    cd backend
    python -m venv venv
    venv\scripts\activate
    pip install -r requirements.txt
    ```

3. Run the backend on the development server:
    ```sh
    python manage.py runserver
    ```

Now the backend is running. To access the admin panel go to http://localhost:8000/admin.
<br><br/>

**Running the Frontend**
<div></div>

4. Open a new terminal window. Install frontend dependencies:
    ```sh
    cd frontend
    npm install
    ```

5. Run the frontend:
    ```sh
    npm start
    ```

The website is now up and running and can be accesed at http://localhost:3000 (if nothing else is mentioned).

<p align="right">(<a href="#top">Top</a>)</p>


## Roadmap

There are subsequent upgrades to be made to the project to reach the final stage. Here are a list of all immediate objectives:

- [x] Configure Database.
- [x] Develop authentication and authorization scheme.
- [x] Develop project boards.
- [ ] Develop customisation options.
- [ ] Improve UI and UX.
