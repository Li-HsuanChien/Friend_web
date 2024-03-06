from rest_framework import permissions
from .models import Connection
from django.db.models import Q

class MaxAccessPermission(permissions.BasePermission):
    """
        Takes curren_user_id
        create sets of allowed user id
        create sets of allowed connections
        add set data with loop O(N ^ max depth) optimizable
        returns if request data in loop
    Args:
        current_user_id
    Returns:
        Boolean
    """
    message = 'You have reached out of your authorization'
    def has_permission(self, request, view):
        MAX_BREADTH = 3
        current_user_id = request.user.id
        allowed_userdata_id = set([current_user_id])
        allowed_connection_id = set()
        request_data_id = request.data.get("user_id")
        request_connection_id = request.data.get("connection_id")
        for i in range(MAX_BREADTH - 1):
            for user in allowed_userdata_id.copy():
                connection_list = Connection.objects.filter(Q(inviter = user)|Q(invitee=user)).values()
                if connection_list:
                    for row in connection_list:
                        allowed_userdata_id.add(row["inviter_id"])
                        allowed_userdata_id.add(row["invitee_id"])
                        allowed_connection_id.add(row["id"])
        print(allowed_connection_id)
        if(request_data_id and request_connection_id):
            return False
        if(request_data_id):
            return int(request_data_id) in allowed_userdata_id
        elif(request_connection_id):
            return int(request_connection_id) in allowed_connection_id
