# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-16 06:13
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_remove_user_default_blog'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='num',
            field=models.IntegerField(blank=True, default=1, null=True),
        ),
    ]
