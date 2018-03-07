from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth import get_user_model


class SignUpForm(UserCreationForm):
    first_name = forms.CharField(
        label='Nome',
        max_length=30,
        help_text='Obrigatório.'
    )
    last_name = forms.CharField(
        label='Sobrenome',
        max_length=126,
        help_text='Obrigatório.'
    )
    email = forms.EmailField(
        label='Email',
        max_length=254,
        help_text='Obrigatório. Favor digitar um email válido.'
    )

    class Meta:
        model = get_user_model()
        fields = ('username', 'first_name', 'last_name', 'email', 'password1',
                  'password2', )
