# Generated by Django 5.0.6 on 2024-06-23 08:23

from django.db import migrations, models


class Migration(migrations.Migration):
    dependencies = [
        ("movies", "0002_alter_movie_image_url"),
    ]

    operations = [
        migrations.AlterField(
            model_name="movie",
            name="genre",
            field=models.CharField(blank=True, max_length=20),
        ),
        migrations.AlterField(
            model_name="movie",
            name="image_url",
            field=models.URLField(blank=True),
        ),
        migrations.AlterField(
            model_name="movie",
            name="release_date",
            field=models.DateField(blank=True),
        ),
    ]
