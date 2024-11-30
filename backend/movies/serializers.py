from rest_framework import serializers
from .models import Movie


class MovieSerializer(serializers.ModelSerializer):
    class Meta:
        model = Movie
        fields = ["id", "title",  "description", "year_release", "country",
                  "genre", "image_url", "image_public_id", "video_url", "video_public_id", "created_at", "updated_at"]
        read_only_fields = ["id", "created_at", "updated_at"]

        def create(self, validated_data):
            return Movie.objects.create(**validated_data)
