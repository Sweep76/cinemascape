# Movie Dot Application

**A movie platform management application that allows users to perform
CRUD (Create, Read, Update, Delete) operations on movies.**

This repository contains both the backend and frontend applications for the Movie Dot project. The backend is built with Django and Django REST Framework, while the frontend is built with Angular.

## Prerequisites
Before you can run the applications, ensure you have the following installed:

### Backend (Django)
- Python 3.8+
- pip (Python package installer)
- virtualenv (Recommended)

### Frontend (Angular)
- Node.js 14+
- npm (Node package manager) or Yarn (alternative to npm)

## Backend Setup

1. Clone the Repository and navigate to the Backend Directory
```
git clone https://github.com/keeeyaan/movie-dot.git
cd movie-dot/backend
```

2. Create a Virtual Environment
```
python -m venv venv
source venv/bin/activate  # On Windows, use `venv\Scripts\activate`
```

3. Install Dependencies
```
pip install -r requirements.txt
```

4. Set Up Environment Variables
Create a .env file in the backend directory and add your Cloudinary credentials:
> *(Note: For this step a temporary variables is already added you can skip this.)*
```
CLOUD_CLOUD_NAME=your_cloud_name
CLOUD_API_KEY=your_api_key
CLOUD_API_SECRET=your_api_secret
```

5. Apply Migrations
```
python manage.py migrate
```

6. Run the Development Server
```
python manage.py runserver
```

The backend server will start at http://127.0.0.1:8000/.

## Frontend Setup
1. Navigate to the Frontend Directory
```
cd ./frontend
```
2. Install Dependencies
```
npm install
# OR if you are using Yarn
yarn install
```
3. Run the Development Server
```
npm start
# OR if you are using Yarn
yarn start
```
The frontend development server will start at http://localhost:4200/.

## How to Use
### Add a Movie
1. Open the frontend application in your browser at http://localhost:4200/.
2. Click on the "Add New Movie" button.
3. Fill in the movie details and upload an image or video.
4. Click "Save" to add the movie to your collection.

### Edit a Movie
1. In the list of movies, hover the movie you desire and a button will show up, click on the "Edit" button for the movie you want to edit.
2. Update the movie details and upload a new image or video if needed.
3. Click "Save" to update the movie information.

### Delete a Movie
1. In the list of movies, hover the movie you desire and a button will show up, click on the "Delete" button for the movie you want to remove.
2. Confirm the deletion.

## Additional Notes
- Ensure the backend server is running before starting the frontend server to avoid API call issues.
- If you encounter any issues, check the console for error messages and ensure all dependencies are correctly installed.
