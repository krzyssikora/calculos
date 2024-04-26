from django.urls import path
from . import views

app_name = 'contar'
urlpatterns = [
    path('', views.index, name='index'),
    path('game', views.game, name='game'),
    path('game_summary_data', views.game_summary_data, name='game_summary_data'),
    # path('game_summary/<int:pn>/<str:msg>', views.game_summary, kwargs=dict(), name='game_summary'),
    path('game_summary', views.game_summary, name='game_summary'),
]
