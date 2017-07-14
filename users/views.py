from django.shortcuts import render
from users.forms import RegisterForm


def register(request):
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = RegisterForm(data=request.POST)
        # check whether it's valid:
   #     if form.is_valid():