from django.urls import path
from .views import employee_api

urlpatterns = [
    path('employee/',employee_api, name='employee_api'),
]
