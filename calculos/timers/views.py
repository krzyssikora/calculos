import json
from django.core.exceptions import ObjectDoesNotExist
from django.http import JsonResponse
from django.shortcuts import render
from .models import Collection, Task


def collection_list(request):
    collections = Collection.objects.all()
    context = {
        'collections': [(collection, collection.total_time()) for collection in collections]
    }
    return render(request, 'timers/collection_list.html', context)


def get_collection_context(pk):
    try:
        collection = Collection.objects.get(pk=pk)
    except ObjectDoesNotExist:
        print(f'no collection with id {pk}')
        return None

    tasks = [task for task in collection.task_set.iterator()]
    tasks.sort(key=lambda x: x.order)

    context = {
        'collection': collection,
        'tasks': tasks
    }
    return context


def collection_edit(request, pk):
    if context := get_collection_context(pk):
        return render(request, 'timers/collection_edit.html', context)
    else:
        return collection_list(request)


def collection_run(request, pk):
    if context := get_collection_context(pk):
        tasks = context.get('tasks', [])
        tasks_list = [
            {
                'name': task.name,
                'total_time': task.seconds * 1000,
                'order': task.order,
                'time_spent': 0,
                'time_left': task.seconds * 1000,
                'status': 0,
                'exceeded': False,
            } for task in tasks
        ]
        context['tasks'] = tasks_list
        context['data'] = json.dumps(tasks_list)
        return render(request, 'timers/collection_run.html', context)
    else:
        return collection_list(request)


def collection_done(request):
    result = json.loads(request.body)
    tasks_updated = result.get('tasks')
    # for task in tasks_updated:
    #     print(task)
    # return render(request, 'timers/collection_done.html', context={'result': result})
    return JsonResponse({'tasks': tasks_updated})


def collection_summary(request):
    return render(request, 'timers/collection_done.html', context={'result': 1})
