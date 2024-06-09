from django.db import models


class Collection(models.Model):
    name = models.CharField(max_length=32)

    def total_time(self):
        total = 0
        for task in self.task_set.all():
            total += task.seconds
        return total

    def __str__(self):
        return f'{self.name} ({self.pk})'


class Task(models.Model):
    name = models.CharField(max_length=32)
    seconds = models.IntegerField()
    order = models.IntegerField()
    collection = models.ForeignKey(Collection, on_delete=models.CASCADE)
