# Generated by Django 5.0.2 on 2024-02-15 19:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('friend_web', '0002_userdata_gender_delete_gendertype'),
    ]

    operations = [
        migrations.AlterField(
            model_name='userdata',
            name='created_time',
            field=models.DateTimeField(auto_now_add=True),
        ),
    ]
