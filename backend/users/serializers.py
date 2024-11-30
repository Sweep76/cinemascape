from django.contrib.auth.models import User
from rest_framework import serializers

from .validators import validate_password, validate_confirm_password_and_password


class UserSerializer(serializers.ModelSerializer):
    confirm_password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["id", "username", "password", "confirm_password",
                  "email", "first_name", "last_name", "last_login", "date_joined"]
        read_only_fields = ["id", "last_login", "date_joined"]
        extra_kwargs = {'password': {'write_only': True}}

    def validate_password(self, value):
        return validate_password(value)

    def validate(self, data):
        return validate_confirm_password_and_password(data)

    def create(self, validated_data):
        # Remove confirm_password from validated_data
        validated_data.pop('confirm_password')
        # Pop password to set it properly
        password = validated_data.pop('password')
        user = User(**validated_data)
        user.set_password(password)  # Set and hash the password
        user.save()
        return user
