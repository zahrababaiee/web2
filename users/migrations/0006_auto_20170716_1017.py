# -*- coding: utf-8 -*-
# Generated by Django 1.11.2 on 2017-07-16 05:47
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20170716_1016'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='default_blog',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='blogs.Blog'),
        ),
    ]
