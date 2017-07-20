from django.utils import timezone

from django.db import models

from users.models import User


class Blog(models.Model):
    writer = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    num = models.IntegerField(default=1, null=True, blank=True)
    isDefault = models.BooleanField(default=True)

    def __str__(self):
        return self.writer.__str__() + " " + self.num.__str__()


class Post(models.Model):

    writer = models.ForeignKey(User, default=None, on_delete=models.CASCADE)
    blog = models.ForeignKey(Blog, default=None, on_delete=models.CASCADE)
    title = models.CharField(max_length=200)
    summary = models.TextField()
    text = models.TextField()
    num = models.IntegerField(default=1, null=True, blank=True)
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.title


class Comment(models.Model):
    post = models.ForeignKey(Post, default=None, on_delete=models.CASCADE)
    text = models.TextField()
    created_date = models.DateTimeField(default=timezone.now)

    def __str__(self):
        return self.post.__str__()