from django.db import models
from django.conf import settings


class Userdata(models.Model):
    """
    example('U1','I do', '<img>', 'M', '2024-02-26 21:07UTC-8'
            '2010-08-21',
            'true', 'https://www.instagram.com/p/CxPC67MS7nx/',
            'https://www.facebook.com/tuntundragon/',
            'https://snapchat.com/add/u1',
            'http://localhost:8000/invite/U1',
            'root1234'
            )
    """
    Gender_CHOICES = {
        "M": "Cis Gender Male",
        "F": "Cis Gender Female",
        "N": "Non Binary",
        "NA": "Prefer Not To Say"
    }
    username = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete = models.CASCADE, primary_key=True)
    bio = models.TextField(max_length=150, null=True)
    headshot = models.ImageField(upload_to='static/img/headshots/', null=True, default='default.png')
    created_time = models.DateTimeField(auto_now_add=True)
    #hard coded gender customizable gender TBD
    gender = models.CharField(choices=Gender_CHOICES)
    date_of_birth = models.DateField()
    show_horoscope = models.BooleanField(default=True)
    #social media links
    instagram_link = models.URLField(null=True)
    facebook_link = models.URLField(null=True)
    snapchat_link = models.URLField(null=True)

    inviteurl = models.URLField()

    def __str__(self):
        return '%s' % (self.username)

class Connection(models.Model):
    #inviter user id
    inviter = models.ForeignKey(Userdata, related_name='inviter_connections', on_delete=models.CASCADE)
	#invitee user id
    invitee = models.ForeignKey(Userdata, related_name='invitee_connections', on_delete=models.CASCADE)
    date_established = models.DateTimeField(auto_now_add=True)
	#hard coded closeness level
    closeness = models.CharField(max_length=20, choices=[
        ('friend', 'Friend'),
        ('closefriend', 'Close Friend'),
        ('bestfriend', 'Best Friend'),
    ])
    nicknamechildtoparent = models.CharField(max_length=64, null=True)
    nicknameparenttochild = models.CharField(max_length=64, null=True)
    activated = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.inviter} invited {self.invitee}"




# class GenderType(models.Model):
#     """
#     example(cismale)
#     """
#     label = models.CharField(max_length=45)
#     user = models.ForeignKey(Userdata, on_delete=models.CASCADE)

#     def __str__(self):
#         return '%s' % (self.label)
