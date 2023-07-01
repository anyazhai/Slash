from . import views
from django.urls import path

app_name = 'board'

urlpatterns = [
    path('board/', views.BoardView.as_view(), name="board"),
    path('board/list', views.BoardListView.as_view(), name="boardlist"),
]