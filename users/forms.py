from django import forms
from .models import UserProfile, User


class RegisterForm(forms.ModelForm):

    class Meta:
        model = UserProfile
        fields = ('user_name', 'password', 'first_name', 'last_name', 'email', )

