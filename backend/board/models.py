from django.db import models
from users.models import User

class Board(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} has created the project {self.name}" 


class Column(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    board_id = models.ForeignKey(Board, on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        unique_together = ('board_id', 'position')
        ordering = ['position']

    def __str__(self):
        return f"{self.board_id.name} has the column {self.name}"
    

class Task(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=30)
    column_id = models.ForeignKey(Column, on_delete=models.CASCADE)
    assignee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, blank=True)
    priority = models.CharField(max_length=30) #medium high low
    type = models.CharField(max_length=30) #frontend, backend deployment
    position = models.IntegerField()

    class Meta:
        unique_together = ('column_id', 'position')
        ordering = ['position']

    def __str__(self):
        return f"Task {self.name}"