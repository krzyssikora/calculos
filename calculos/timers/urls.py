from django.urls import path
from . import views

app_name = 'timers'
urlpatterns = [
    path('', views.collection_list, name='collection_list'),
    path('done', views.collection_done, name='collection_done'),
    path('summary', views.collection_summary, name='collection_summary'),
    path('<int:pk>/edit', views.collection_edit, name='collection_edit'),
    path('<int:pk>/run', views.collection_run, name='collection_run'),
]
