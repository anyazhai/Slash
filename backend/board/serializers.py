from rest_framework import serializers

from .models import Board, Column, Task


class BoardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Board
        fields = ["name"]


class ColumnSerializer(serializers.ModelSerializer):
    class Meta:
        model = Column
        fields = ["name", "board_id"]


class TaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task
        fields = ["name", "column_id", "type", "priority"]
