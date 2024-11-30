from django.db import models

# Create your models here.


class Movie(models.Model):
    title = models.CharField(max_length=50)
    description = models.TextField()
    year_release = models.CharField(max_length=4, blank=True, null=True)
    genre = models.CharField(max_length=20, blank=True, null=True)
    country = models.CharField(max_length=50, blank=True, null=True)
    image_url = models.URLField(max_length=200, blank=True, null=True)
    image_public_id = models.CharField(max_length=100, blank=True, null=True)
    video_url = models.URLField(max_length=200, blank=True, null=True)
    video_public_id = models.CharField(max_length=100, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.title
