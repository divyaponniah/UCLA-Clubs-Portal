# CS 97

# Frontend
## Start the project
> Make sure that you are inside the "frontend" folder.\
> Make sure that you have installed npm by doing:\
`npm install`
 
## Run the project
> Make sure you are inside the "frontend" folder.\
> Type this into your command line:\
`npm start`

# Backend
## Create virtual environment
```
python3 -m venv env
source env/bin/activate
pip install -r requirements.txt
```
> Windows:
```
python3 -m venv env
.\env\Scripts\activate
pip install -r requirements.txt
```

## Run the project
```
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```
> For first time admin:
```
cd backend
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
# enter username, email, password
python manage.py runserver
```
> Head to http://127.0.0.1:8000/admin/, log in with superuser credentials and input club/event data with admin interface

# Additional Documentation & Files
## Figma
```
https://www.figma.com/file/FCNyenRtX7VXk5l4srdhDN/CS-97-Project?node-id=0%3A1
```
## Project Presentation Video
```
https://drive.google.com/file/d/1hpbR5LDODtbMuACwvaYBLAza5dU2RHZU/view?usp=sharing 
```

