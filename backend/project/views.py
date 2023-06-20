from rest_framework.permissions import IsAuthenticated
from rest_framework import generics
from rest_framework.views import APIView
from .models import Project, Column, Task
from .serializers import (ProjectSerializer,
                        #   ColumnSerializer,
                        #   ExistingColumnSerializer,
                        #   ExistingCardSerializer,
                        #   CardSerializer,
                        )
from rest_framework import status
from rest_framework.response import Response


class ProjectListCreate(APIView):
    """
    List all existing projects for a user or create a new one
    """
    def get(self, request):
        projects = Project.objects.filter(user=request.user)
        return Response({projects.id: {project.name, project.created_on } for project in projects})

    def post(self, request):
        data = request.data
        data['user'] = request.user.id
        serializer = ProjectSerializer(data=data)
        if serializer.is_valid():
            instance = serializer.save()
            data = {'id': instance.id}
            data.update(serializer.data)
            return Response(data, status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

