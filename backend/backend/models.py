from django.db import models


class GenderType(models.Model):
    """
    example(cismale)
    """ 
    label = models.CharField(max_length=45)


class CloseScale(models.Model):
    """
    example (friend)
    """
    scale = models.CharField(max_length=20, choices=[
        ('friend', 'Friend'),
        ('closefriend', 'Close Friend'),
        ('bestfriend', 'Best Friend'),
    ])

class User(models.Model):
    """
    example('U1','I do', '<img>', 'Gendertyple.cismale', '2010-08-21 15:00UTC-8',
            'true', 'https://www.instagram.com/p/CxPC67MS7nx/',
            'https://www.facebook.com/tuntundragon/',
            'snapchat.com/add/u1',
            'localhost:8000/invite/U1',
            'root1234'
            )
    """
    username = models.CharField(max_length=64, )
    bio = models.TextField(max_length=150)
    headshot = models.ImageField(upload_to='headshots/')
    created_at = models.DateTimeField()
    
    gender = models.ForeignKey(GenderType, on_delete=models.CASCADE)
    
    date_of_birth = models.DateField()
    show_horoscope = models.BooleanField(default=True)
    
    #social media links
    instagram_link = models.URLField(null=True)
    facebook_link = models.URLField(null=True)
    snapchat_link = models.URLField(null=True)
    
    inviteurl = models.URLField()
    password = models.CharField(max_length=128)  # using no secure pass for now
    

class Connection(models.Model):
    """
    example('U1', 'U2', '2010-08-21 15:00UTC-8', 'localhost:8000/invite/U1', 'closeness.friend' )
    """
    inviter = models.ManyToManyField(User, related_name='inviter_connections', on_delete=models.CASCADE)
    invitee = models.ManyToManyField(User, related_name='invitee_connections', on_delete=models.CASCADE)
    date_established = models.DateTimeField()
    usedurl = models.ForeignKey()
    closeness = models.ForeignKey(CloseScale, on_delete=models.CASCADE)


