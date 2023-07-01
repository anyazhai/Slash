from . import views
from django.urls import path

app_name = 'board'

urlpatterns = [
    path('board/', views.BoardView.as_view(), name="board"),
    path('board/list', views.BoardListView.as_view(), name="boardlist"),
    path('column/', views.ColumnView.as_view(), name="columndata"),
    path('task/', views.TaskView.as_view(), name="taskdata"),
]