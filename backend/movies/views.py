from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, FormParser
import cloudinary.uploader

from .models import Movie
from .serializers import MovieSerializer


@api_view(['GET', 'POST'])
def movie_list(request):
    if request.method == 'GET':
        movies = Movie.objects.all()
        serializer = MovieSerializer(movies, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        parser_classes = (MultiPartParser, FormParser)
        serializer = MovieSerializer(data=request.data)

        if serializer.is_valid():
            if 'image' in request.FILES:
                image = request.FILES['image']
                upload_image_result = cloudinary.uploader.upload(image)
                serializer.save(
                    image_url=upload_image_result['secure_url'],  image_public_id=upload_image_result['public_id'])

            if 'video' in request.FILES:
                video = request.FILES['video']
                upload_video_result = cloudinary.uploader.upload(
                    video, resource_type='video')
                serializer.save(
                    video_url=upload_video_result['secure_url'],  video_public_id=upload_video_result['public_id'])

            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def movie_detail(request, pk):
    try:
        movie = Movie.objects.get(pk=pk)
    except Movie.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = MovieSerializer(movie)
        return Response(serializer.data)

    elif request.method == 'PUT':
        parser_classes = (MultiPartParser, FormParser)
        serializer = MovieSerializer(movie, data=request.data)

        if serializer.is_valid():
            if 'image' in request.FILES:
                if movie.image_public_id:
                    cloudinary.uploader.destroy(movie.image_public_id)

                image = request.FILES['image']
                upload_image_result = cloudinary.uploader.upload(image)
                movie.image_url = upload_image_result['secure_url']
                movie.image_public_id = upload_image_result['public_id']
                movie.save()

            if 'video' in request.FILES:
                if movie.video_public_id:
                    cloudinary.uploader.destroy(
                        movie.video_public_id, resource_type='video')

                video = request.FILES['video']
                upload_video_result = cloudinary.uploader.upload(
                    video, resource_type='video')
                movie.video_url = upload_video_result['secure_url']
                movie.video_public_id = upload_video_result['public_id']
                movie.save()

            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        if movie.image_public_id:
            cloudinary.uploader.destroy(movie.image_public_id)
        if movie.video_public_id:
            cloudinary.uploader.destroy(
                movie.video_public_id, resource_type='video')

        movie.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
