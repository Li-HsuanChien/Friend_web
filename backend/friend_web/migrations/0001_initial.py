# Generated by Django 5.0.2 on 2024-02-15 01:57

import django.db.models.deletion
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Connection',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_established', models.DateTimeField()),
                ('closeness', models.CharField(choices=[('friend', 'Friend'), ('closefriend', 'Close Friend'), ('bestfriend', 'Best Friend')], max_length=20)),
                ('nicknamechildtoparent', models.CharField(max_length=64, null=True)),
                ('nicknameparenttochild', models.CharField(max_length=64, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='Userdata',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bio', models.TextField(max_length=150)),
                ('headshot', models.ImageField(upload_to='img/headshots/')),
                ('created_time', models.DateTimeField()),
                ('date_of_birth', models.DateField()),
                ('show_horoscope', models.BooleanField(default=True)),
                ('instagram_link', models.URLField(blank=True)),
                ('facebook_link', models.URLField(blank=True)),
                ('snapchat_link', models.URLField(blank=True)),
                ('inviteurl', models.URLField(blank=True)),
                ('username', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='Inviterchannel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('connection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='friend_web.connection')),
                ('inviter', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='friend_web.userdata')),
            ],
        ),
        migrations.CreateModel(
            name='Inviteechannel',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('connection', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='friend_web.connection')),
                ('invitee', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='friend_web.userdata')),
            ],
        ),
        migrations.CreateModel(
            name='GenderType',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('label', models.CharField(max_length=45)),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='friend_web.userdata')),
            ],
        ),
        migrations.AddField(
            model_name='connection',
            name='invitee',
            field=models.ManyToManyField(related_name='invitee_connections', through='friend_web.Inviteechannel', to='friend_web.userdata'),
        ),
        migrations.AddField(
            model_name='connection',
            name='inviter',
            field=models.ManyToManyField(related_name='inviter_connections', through='friend_web.Inviterchannel', to='friend_web.userdata'),
        ),
    ]
