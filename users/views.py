from django.contrib.auth import authenticate, login
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from blogs.models import Blog
from users.forms import RegisterForm
from django.http import JsonResponse
import json

from django.http import HttpResponse

from users.models import User

response_data = {}


@csrf_exempt
def register(request):
    if request.method == 'POST':
        # create a form instance and populate it with data from the request:
        form = RegisterForm(request.POST)
        print("there is a request")
        # check whether it's valid:
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['password'])
            user.save()
            blog_id = Blog.objects.count() + 1
            user = User.objects.get(username=request.POST.get('username'))
            blog = Blog(num=blog_id, writer=user, isDefault=True)
            blog.save()
        #    form.save()
            response_data['status'] = 0
            return HttpResponse(json.dumps(response_data), content_type="application/json")
        else:
            response_data['status'] = -1
            response_data['message'] = list(form.errors.keys())[0] + ": " + form.errors[list(form.errors.keys())[0]][0]
            print(HttpResponse(json.dumps(response_data), content_type="application/json"))
            return HttpResponse(json.dumps(response_data), content_type="application/json")
    else:
        return HttpResponse(json.dumps(response_data), content_type="application/json")

@csrf_exempt
def mylogin(request):
    if request.method == 'POST':
        username = request.POST.get('username', '')
        password = request.POST.get('password', '')
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                token = default_token_generator.make_token(user)
                user.current_token = token
                print(token)
                return JsonResponse({'status': 0, 'token': token})
        else:
            print(user)
            print(password)
            return JsonResponse({'status': -1, 'message': 'incorrect username or password!'})


