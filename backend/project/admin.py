from django.contrib import admin
from .models import Project, Column, Task

admin.site.register(Project)
admin.site.register(Column)
admin.site.register(Task)