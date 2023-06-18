from django.db import models
from users.models import User

class Project(models.Model):
    name = models.CharField(max_length=30)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    created_on = models.DateField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} has created the project {self.name}" 


class Column(models.Model):
    name = models.CharField(max_length=30)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    position = models.IntegerField()

    class Meta:
        ordering = ['position']

    def __str__(self):
        return f"{self.project.name} has the column {self.name}"
    

class Task(models.Model):
    name = models.CharField(max_length=30)
    description = models.CharField(max_length=500)
    column = models.ForeignKey(Column, on_delete=models.CASCADE)
    assignee = models.ForeignKey(User, on_delete=models.SET_NULL)
    priority = models.CharField(max_length=30)
    label = models.CharField(max_length=30)
    position = models.IntegerField()

    class Meta:
        ordering = ['position']

    def __str__(self):
        return f"{self.project.name} has the column {self.name}"