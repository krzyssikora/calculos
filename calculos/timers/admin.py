from django.contrib import admin
from .models import Collection, Task


@admin.register(Collection)
class CollectionAdmin(admin.ModelAdmin):
    list_display = ['name']


@admin.register(Task)
class TaskAdmin(admin.ModelAdmin):
    list_display = ['order', 'name', 'task_time', 'collection_name']

    def task_time(self, obj):
        from .templatetags.time_temp import time_view_seconds
        return time_view_seconds(obj.seconds)

    def collection_name(self, obj):
        return obj.collection.name
