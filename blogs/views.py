from django.contrib.auth import authenticate
from django.contrib.auth.tokens import default_token_generator
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt

from blogs.forms import PostForm, CommentForm
from blogs.models import Blog, Post, Comment
from users.forms import RegisterForm
from django.http import JsonResponse
import json

from django.http import HttpResponse

response_data = {}


@csrf_exempt
def write(request, blogID):
    if request.method == 'POST':
        form = PostForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            blog = Blog.objects.get(num=blogID)
            user = blog.writer
            token = request.META.__getitem__('HTTP_X_TOKEN')

            if default_token_generator.check_token(user, token):
                    x = form.save(commit=False)
                    x.writer = user
                    x.blog = blog
                    post_id = (Post.objects.filter(blog__num=blogID).count() + 1)
                    x.num = post_id
                    x.save()
                    return JsonResponse({'status': 0, 'post_id': post_id})

            else:
                return JsonResponse({'status': -1, 'message': 'you are not logged in'})
        else:
            return JsonResponse({'status': -1, 'message': list(form.errors.keys())[0] + ": " + form.errors[list(form.errors.keys())[0]][0]})
    else:
        if request.method == 'GET':
            blog = Blog.objects.get(num=blogID)
            post = Post.objects.get(blog=blog, num=request.GET.__getitem__(id))
            if post is not None:
                return JsonResponse({'status': 0, 'post':{'title': post.title, 'summary': post.summary, 'text': post.text}})
            else:
                return JsonResponse({'status': -1, 'message': 'the post doesnt exist!'})


@csrf_exempt
def see(request, blogID):
    if request.method == 'GET':
        blog = Blog.objects.get(num=blogID)
        user = blog.writer
        token = request.META.__getitem__('HTTP_X_TOKEN')
        print(request.GET)
        if default_token_generator.check_token(user, token):
       #     if 'offset' in request.GET:
            offset = 1

       #     if 'count' in request.GET:
            count = 2
            print(count)
            print(offset)
            wanted_post = Post.objects.filter(blog__num=blogID)
            print(wanted_post[0])
            response = [{
              'title': wanted_post[offset - 1].title,
              'summary': wanted_post[offset - 1].summary,
              'text': wanted_post[offset - 1].text,
              'dateTime': wanted_post[offset - 1].created_date,
              'id': wanted_post[offset - 1].num
            }]
            for i in range(offset, offset + count - 1):
                response.append({
                  'title': wanted_post[i].title,
                  'summary': wanted_post[i].summary,
                  'text': wanted_post[i].text,
                  'dateTime': wanted_post[i].created_date,
                  'id': wanted_post[i].num
                })

            return JsonResponse({'status': 0, 'posts': response})
        else:
            return JsonResponse({'status': -1, 'message': 'you are not logged in'})


@csrf_exempt
def comment(request, blogID):
    if request.method == 'POST':
        form = CommentForm(request.POST)
        # check whether it's valid:
        if form.is_valid():
            blog = Blog.objects.get(num=blogID)
            user = blog.writer
            token = request.META.__getitem__('HTTP_X_TOKEN')

            if default_token_generator.check_token(user, token):
                    x = form.save(commit=False)
                    x.post = Post.objects.get(num=request.POST.get('post_id'))
                    x.save()
                    return JsonResponse({'status': 0, 'post_id': request.POST.get('post_id')})

            else:
                return JsonResponse({'status': -1, 'message': 'you are not logged in'})
        else:
            return JsonResponse({'status': -1, 'message': list(form.errors.keys())[0] + ": " + form.errors[list(form.errors.keys())[0]][0]})


@csrf_exempt
def getPost(request, blogID, postID):
    if request.method == 'GET':
        blog = Blog.objects.get(num=blogID)
        post = Post.objects.get(blog=blog, num=postID)
        if post is not None:
            return JsonResponse(
                {'status': 0, 'post': {'title': post.title, 'summary': post.summary, 'text': post.text, 'dateTime': post.created_date}})
        else:
            return JsonResponse({'status': -1, 'message': 'the post doesnt exist!'})


def getCmnt(request, blogID):
    if request.method == 'GET':
        blog = Blog.objects.get(num=blogID)
        user = blog.writer
        token = request.META.__getitem__('HTTP_X_TOKEN')
        postID = request.GET['post_id']
        print(postID)
        if default_token_generator.check_token(user, token):
            #     if 'offset' in request.GET:
            offset = 1

            #     if 'count' in request.GET:
            count = 2
            print(count)
            print(offset)
            wanted_post = Comment.objects.filter(post__num=postID)
            print(wanted_post[0])
            response = [{
                'text': wanted_post[offset - 1].text,
                'dateTime': wanted_post[offset - 1].created_date
            }]
            for i in range(offset, offset + count - 1):
                response.append({
                    'text': wanted_post[i].text,
                    'dateTime': wanted_post[i].created_date
                })

            return JsonResponse({'status': 0, 'comments': response})
        else:
            return JsonResponse({'status': -1, 'message': 'you are not logged in'})
