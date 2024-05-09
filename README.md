# COMPSCI 732 / SOFTENG 750 project - Team Playful Penguins


# Introduction to Nutriguin

Diets play significant roles in everyday life and well-being; our diet directly impacts our health and happiness. Many people struggle to stick to healthy eating habits as it can be hard to find the time and resources to plan and prepare meals. They lack accessible and convenient tools to inform and inspire their decisions. Our project sets out to aid health-conscious people in preparing healthy meals at home and finding food-focused balanced diet options from local stores. The app will promote a well-balanced and still delicious diet by encouraging users to make better choices.

Our application Nutriguin will provide recommendations of healthy dishes available at stores and detailed healthy food recipes that include the meals' nutrients, calories and other dietary information. Through this, our app will equip individuals with the tools to take their dietary health into their own hands through informed choices and accessibility. Each user will have a profile that they can use to save their favourite meals, creating a convenient list of what the user knows they like. This same profile can be used to rate other meals on the app and is required for various possible future additions to the application.

Deployed URL: https://thenutriguin.com

# Setup

## 1. Environment Variables

Add backend and frontend environment variables in two different `./env` files in their respective folders

## 2. Steps to run our App

1.  Clone the github repository to your local drive. https://github.com/UOA-CS732-SE750-Students-2024/project-group-playful-penguins.git
2.  In command prompt, navigate to `cd .\backend `
3.  Run the command `npm i`
4.  Run the command `node .\app.js` to start the backend server
5.  In command prompt, navigate to `.\frontend`
6.  Run the command `npm i`
7.  Run the command `npm run dev` from the frontend folder
8.  Navigate to http://localhost:5173/

Feel free to use the following credentials to login: <br/>
username: reviewer@user.nz <br/>
password: Test1234

# Key Features
- Mobile responsiveness

# Screenshots

![recipe-page](https://github.com/UOA-CS732-SE750-Students-2024/project-group-playful-penguins/blob/ppeng-61-readme-changes/group-image/recipe_page.png)

![takeout-page](https://github.com/UOA-CS732-SE750-Students-2024/project-group-playful-penguins/blob/ppeng-61-readme-changes/group-image/takeout_page.png)

# Assignment specifications 

## 1. Usage of the frameworks used in the course

Our team has effectively utilized the MERN stack, which was covered in the course. We have implemented React for our front-end framework, NodeJS for our backend operations, the Express library for backend routing, and MongoDB for our database needs.

We have employed git for version control, consistently using several git commands to ensure our code remains synchronized.

We have also efficiently utilized React to construct our single-page application by creating reusable components.

For backend communications, we have used the Express library along with axios and fetch for making requests to backend endpoints.

Mongoose was incorporated as demonstrated in the course lectures, and we utilized various testing libraries...

## 2. Application of further learning beyond the scope of course material

Our project extensively incorporates MaterialUI to achieve a modern and sleek design.

We deployed our application using a virtual machine instance on Google Compute Engine.

For user authentication, we integrated Google Auth along with JWT tokens.

## 3. Meeting user requirements and initial project proporsal requirements

Our application is designed to inform users about the nutritional aspects of meals, whether cooked at home or ordered out.

We display detailed nutritional information such as calories, carbs, and proteins in our recipes and offer various filters to help users select meals based on specific nutritional needs.

Our prototype meets all the essential requirements(must haves) outlined in our initial proposal.

The application suggests healthy recipes with a health star score of at least 50, including ingredients and cooking instructions. Nutritional information and dietary requirements are also detailed on each recipe page. For takeout options, this information can be filtered on the homepage.

For those mindful of their budget, takeout prices are displayed, allowing users to filter menu items within their financial limits.

The search functionality enables users to quickly find specific dishes in both takeouts and recipes.

Additionally, we managed to implement several desirable features (should haves) like dietary filters (e.g., vegan, vegetarian, gluten-free) and user profiles, which save favorite dishes for easy access.

Before starting frontend development, we designed our interfaces in Figma to ensure alignment with our visual goals. (Find more information about the UI desing in our [wiki](https://github.com/UOA-CS732-SE750-Students-2024/project-group-playful-penguins/wiki)


## 4. Best practices used in development

Our team has consistently adhered to the best practices within our applied frameworks, ensuring both the understandability and maintainability of our code.

Frontend Practices:

- We employ style constant files to maintain consistent UI design throughout the application.
- We have organized separate services in the frontend to manage backend route calls efficiently.
- Our filters are structured for high reusability across different parts of the application.

Backend Practices:

- We utilize nested routes to enhance the structure and readability of our backend.
- Security is a priority; we hash user passwords combined with a salt before storing them in the database to safeguard against external threats.
- For critical APIs, such as those handling recipes and takeouts, we verify JWT to ensure that only authorized users can make requests. So even if someone changes the token on the frontend, the backend is going to verify the token that it receives.

Environmental Configurations:

- We maintain separate .env files in both the frontend and backend for enhanced security, ensuring sensitive information is properly isolated.


## 5. Testing 

We have conducted tests on both the frontend and backend using the Jest testing framework.

## Backend

```

```

## Frontend

```

```

## 6. Deployment

Our project has been successfully deployed to a remote VM on Google Cloud Platform, which can be accessed by the URL: https://thenutriguin.com/

For detailed deployment procedures and settings, please consult the deployment section of our [wiki](https://github.com/UOA-CS732-SE750-Students-2024/project-group-playful-penguins/wiki).


# Project Management

- Our project management process involves creating new issues in Jira for each feature during our sprints, with each feature branch in GitHub named using the prefix 'ppeng-' followed by the Jira task ID.
- Commits within these branches also follow a consistent naming convention, including the task ID as a prefix, enhancing traceability.
- At the end of each sprint, features are peer-reviewed by at least two team members before being merged into the main branch, ensuring code quality and collaborative improvement.
- For comprehensive details on our project management practices and more, please refer to the project management section of our [wiki](https://github.com/UOA-CS732-SE750-Students-2024/project-group-playful-penguins/wiki).


# Technologies Used

- **Front-end framework** - React
- **Front-end UI component framework** - Material UI
- **Runtime environment** - Node.js
- **Web backend application framework** - Express
  **Database** - MongoDB, Mongoose library
- **Programming language** - JavaScript
- **Version control** - git
- **Repository management** - GitHub
- **Project Management** - JIRA
- **Authorization & Token** - jwt, Google OAuth 2.0
- **Code Formatting** - Prettier
- **Linting Utility** - ESLint
- **Deployment** - Google Cloud
- **Testing** - Jest

Technologies beyond the course material that we use are Material UI, Google Cloud (deployment), jwt & Google OAuth 2.0 (Authorization)

# Members

- Sukhleen Kaur
- Kenny Cheuk Fung Lam
- Blair Mclean
- Imashi Kinigama
- Hongyang Michael Xu
- Rahal Medawatte


