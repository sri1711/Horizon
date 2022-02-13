from django.urls import path 
from . import views

urlpatterns = [
    path('result/',views.test),
    path('home/',views.home),
    path('login/', views.login, name='login'),
    path('search/',views.search_result, name='search_results'),
    path('movie_detail/<int:pk>' , views.movie_details , name = 'movie_details' ),
    path('test/',views.search_result2),
    path('register/',views.register,name='register'),
    path('profile/',views.profile,name="profile"),
    path('success/',views.register_success,name="success"),
]
