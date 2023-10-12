from django.core.exceptions import ValidationError
from django.contrib.auth import get_user_model
UserModel = get_user_model()

def custom_validation(data):
    email = data['email'].strip()
    username = data['username'].strip()
    password = data['password'].strip()
    ##
    if not email or UserModel.objects.filter(email=email).exists():
        raise ValidationError('Пользователь с такой электронной почтой уже существует')
    ##
    if not password or len(password) < 8:
        raise ValidationError('Выберите другой пароль, минимум 8 знаков')
    ##
    if not username:
        raise ValidationError('Выберите другой никнейм')
    return data


def validate_email(data):
    email = data['email'].strip()
    if not email:
        raise ValidationError('Введите адрес электронной почты')
    return True

def validate_username(data):
    username = data['username'].strip()
    if not username:
        raise ValidationError('Выберите другой никнейм')
    return True

def validate_password(data):
    password = data['password'].strip()
    if not password:
        raise ValidationError('Введите пароль')
    return True