# Generated by Django 4.1.7 on 2023-06-13 05:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='username',
            field=models.CharField(default='DEFAULT VALUE', max_length=255),
        ),
    ]
