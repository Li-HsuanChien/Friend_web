from django.db import models
from django.conf import settings


class GenderType(models.Model):
    """
    example(cismale)
    """ 
    label = models.CharField(max_length=45)
        
    def __str__(self):
        return '%s' % (self.label)


class Userdata(models.Model):
    """
    example('U1','I do', '<img>', 'Gendertyple.cismale', '2024-02-26 21:07UTC-8'
            '2010-08-21',
            'true', 'https://www.instagram.com/p/CxPC67MS7nx/',
            'https://www.facebook.com/tuntundragon/',
            'snapchat.com/add/u1',
            'http://localhost:8000/invite/U1',
            'root1234'
            )
    """
    username = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete = models.CASCADE)
    bio = models.TextField(max_length=150)
    headshot = models.ImageField(upload_to='img/headshots/')
    created_time = models.DateTimeField()
    
    gender = models.ForeignKey(GenderType, on_delete=models.CASCADE)
    
    date_of_birth = models.DateField()
    show_horoscope = models.BooleanField(default=True)
    
    #social media links
    instagram_link = models.URLField(blank=True)
    facebook_link = models.URLField(blank=True)
    snapchat_link = models.URLField(blank=True)
    
    inviteurl = models.URLField(blank=True)


    
    
class Connection(models.Model):
    """
    example('U1', 'U2', '2010-08-21 15:00UTC-8', 'localhost:8000/invite/U1', 'friend' , 'boo', 'bae')
    """
    inviter = models.ManyToManyField(Userdata, related_name='inviter_connections', through="Inviterchannel")
    invitee = models.ManyToManyField(Userdata, related_name='invitee_connections', through="Inviteechannel")
    date_established = models.DateTimeField()
    usedurl = models.ForeignKey(Userdata, on_delete=models.CASCADE)
    closeness = models.CharField(max_length=20, choices=[
        ('friend', 'Friend'),
        ('closefriend', 'Close Friend'),
        ('bestfriend', 'Best Friend'),
    ])
    nicknametoparent = models.CharField(max_length=64, null=True)
    nicknametochild = models.CharField(max_length=64, null=True)


class Inviterchannel(models.Model):
    inviter = models.ForeignKey(Userdata, on_delete=models.CASCADE)
    connection = models.ForeignKey(Connection, on_delete=models.CASCADE)

class Inviteechannel(models.Model):
    invitee = models.ForeignKey(Userdata, on_delete=models.CASCADE)
    connection = models.ForeignKey(Connection, on_delete=models.CASCADE)