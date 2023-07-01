from rest_framework import views, permissions
from rest_framework.response import Response

from .serializers import BoardSerializer
from .models import Board
from users.models import User


class BoardView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = BoardSerializer(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        print(request.user , "username")
        user = User.objects.get(email=request.user)
        
        Board.objects.create(user=user, name=serializer.data['name'])
        return Response({"message": "Board has been created"})

    def get(self, request):
        id = request.query_params.get('id')
        board_object = Board.objects.get(id=id)
        response = {"name": board_object.name}
        return Response({'response': response})


class BoardListView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def get(self, request):
        user = request.user
        boards = Board.objects.filter(user=user)
        response = list()
        for board in boards:
            response.append({'id': board.id, 'name': board.name, 'created_on': board.created_on})
        return Response({'response': response})


class ColumnView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        pass