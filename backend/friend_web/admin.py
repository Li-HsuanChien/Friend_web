from django.contrib import admin
from friend_web.models import GenderType, Userdata, Connection


class GenderTypeadmin(admin.ModelAdmin):
    list_display = ["label"]
    pass


class Useradmin(admin.ModelAdmin):
    list_display = ["username", "bio", "headshot", "created_time", "gender",\
        "date_of_birth", "show_horoscope", "instagram_link", "facebook_link", "snapchat_link",\
            "inviteurl"]
    pass


class Connectionadmin(admin.ModelAdmin):
    list_display = ["date_established", "usedurl", "closeness", "nicknametoparent", "nicknametochild"]
    pass



admin.site.register(GenderType, GenderTypeadmin)
admin.site.register(Userdata, Useradmin)
admin.site.register(Connection, Connectionadmin)