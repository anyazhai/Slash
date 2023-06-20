from rest_framework import serializers
from .models import Project, Column, Task


class ProjectSerializer(serializers.ModelSerializer):

    class Meta:
        model = Project
        fields = ('id', 'user', 'name', 'columns')
