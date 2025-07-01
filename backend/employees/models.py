from django.db import models

class Employee(models.Model):
    name = models.CharField(max_length=100)
    department = models.CharField(max_length=100)
    email = models.EmailField(max_length=150)
    joining_date = models.DateField()
    is_remote = models.BooleanField(default=False)

    def __str__(self):
        return self.name
