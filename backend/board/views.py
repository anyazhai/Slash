from rest_framework import views, permissions
from rest_framework.response import Response

from .serializers import BoardSerializer, ColumnSerializer, TaskSerializer, UpdateTaskSerializer
from .models import Board, Column, Task
from users.models import User


class BoardView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = BoardSerializer(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
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

    def columnPosition(self, id):
        task = Column.objects.filter(board_id=id).order_by('position').last()
        if not task:
            return 1
        return task.position + 1

    def post(self, request):
        serializer = ColumnSerializer(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        print(serializer.data['board_id'])
        position = self.columnPosition(serializer.data['board_id'])
        board = Board.objects.get(id=serializer.data['board_id'])

        Column.objects.create(position=position, board_id=board, name=serializer.data['name'])
        return Response({
            'data': serializer.data
        })
    
    def get(self, request):
        id = request.query_params.get('board_id')
        column_objects = Column.objects.filter(board_id=id)
        response = list()
        for column in column_objects:
            task_objects = Task.objects.filter(column_id=column.id)
            print(task_objects)
            task_object = list()
            for task in task_objects:
                task_object.append({'id': task.id, 'name': task.name, 'position': task.position, 'priority': task.priority, 'type':task.type, 'assignee': task.assignee, 'column_id': column.id})
            response.append({'id': column.id, 'name': column.name, 'position': column.position, 'tasks': task_object})
        return Response({'response': response})
    
    def delete(self, request, id=None):
        try:
            column_object = Column.objects.get(id=id)
            print('try')
        except:
            print('except')
            return Response(status=404)
        
        col_count = Column.objects.filter(board_id=column_object.board_id).count()

        column_object.delete()

        if column_object.position == col_count:
            return Response(status=204)
        
        columns = Column.objects.filter(board_id=column_object.board_id)
        for i, col in enumerate(columns):
            col.position = i + 1
            col.save()
        serializer = ColumnSerializer(columns, many=True)
        return Response(serializer.data)


class TaskView(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def taskPosition(self, id):
        column = Task.objects.filter(column_id=id).order_by('position').last()
        if not column:
            return 1
        return column.position + 1

    def post(self, request):
        serializer = TaskSerializer(data=self.request.data, context={'request': self.request})
        serializer.is_valid(raise_exception=True)
        print(serializer.data['column_id'])
        position = self.taskPosition(serializer.data['column_id'])
        column = Column.objects.get(id=serializer.data['column_id'])
        print("column data", column)
        Task.objects.create(position=position, column_id=column, name=serializer.data['name'], priority=serializer.data['priority'], type=serializer.data['type'])
        return Response({
            'data': 'Task added'
        })
    
    def get(self, request):
        id = request.query_params.get('column_id')
        task_objects = Task.objects.filter(column_id=id)
        response = list()
        for task in task_objects:
            response.append({'id': task.id, 'name': task.name, 'position': task.position, 'priority': task.priority, 'type':task.type, 'assignee': task.assignee})
        return Response({'response': response})
    
    def delete(self, request, id=None):
        try:
            task_object = Task.objects.get(id=id)
        except:
            return Response(status=404)
        
        task_count = Task.objects.filter(column_id=task_object.column_id).count()

        task_object.delete()

        if task_object.position == task_count:
            return Response(status=204)
        
        tasks = Task.objects.filter(column_id=task_object.column_id)
        for i, t in enumerate(tasks):
            t.position = i + 1
            t.save()
        serializer = TaskSerializer(tasks, many=True)
        return Response(serializer.data)
    

class UpdatePosition(views.APIView):
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        task_id = request.data['task']
        column_id = request.data['column']
        position = request.data['position']

        task = Task.objects.get(id=task_id)
        task_object = Task.objects.filter(column_id=column_id)
        for t in task_object:
            if t.position >= position:
                t.position = t.position + 1
                t.save()
        
        column_object = Column.objects.get(id=column_id)
        task.column_id = column_object
        task.position = position
        task.save()

        return Response({
            'data': 'position updated'
        })