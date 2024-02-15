from django.contrib import admin
from friend_web.models import *

# class GenderTypeInline(admin.TabularInline):
#     model = GenderType

# class GenderTypeAdmin(admin.ModelAdmin):
#     list_display = ["label", "user"]
#     pass


class UserAdmin(admin.ModelAdmin):
    list_display = ["username", "bio", "headshot", "created_time",\
        "date_of_birth", "show_horoscope", "instagram_link", "facebook_link", "snapchat_link",\
            "inviteurl"]
    # inlines = [GenderTypeInline]

class InviterchannelInline(admin.TabularInline):
    model = Inviterchannel
    pass

class InviteechannelInline(admin.TabularInline):
    model = Inviteechannel
    pass
class ConnectionAdmin(admin.ModelAdmin):
    inlines = [
        InviterchannelInline,
        InviteechannelInline,
    ]
    list_display = ('id', 'date_established', 'closeness', 'nicknamechildtoparent', 'nicknameparenttochild')
    pass

admin.site.register(Connection, ConnectionAdmin)
# admin.site.register(GenderType, GenderTypeAdmin)
admin.site.register(Userdata, UserAdmin)
