from django.db import models
from django.contrib.auth.models import User




class User(User):
    avatar = models.FileField(upload_to='avatars/')
    current_token = models.TextField()


