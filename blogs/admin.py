from django.contrib import admin

from blogs.models import Comment, Post, Blog

myModels = [Blog, Post, Comment]
admin.site.register(myModels)
