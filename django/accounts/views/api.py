from rest_framework.decorators import api_view
from rest_framework import status
from rest_framework.response import Response

from accounts.serializers.user import UserSerializer


@api_view(['GET'])
def current_user(request):
    if not request.auth:
        return Response(
            status=status.HTTP_403_FORBIDDEN
        )

    return Response(
        {
            'success': True,
            'msg': UserSerializer(request.user).data,
        },
        status=status.HTTP_200_OK
    )


@api_view(['POST'])
def user_create(request):
    serialized = UserSerializer(data=request.data)
    if serialized.is_valid():
        serialized.save()
        return Response(
            {
                'success': True,
                'msg': 'Usuário criado com sucesso.',
            },
            status=status.HTTP_201_CREATED
        )

    else:
        return Response(
            {
                'success': False,
                'msg': serialized.errors,
            },
            status=status.HTTP_400_BAD_REQUEST
        )
