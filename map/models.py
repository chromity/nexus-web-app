from django.db import models

# Create your models here.
class Event(models.Model):
    event_name = models.CharField(max_length=255, default='')
    place = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    def __str__(self):
        return self.event_name

class News(models.Model):
    news_name = models.CharField(max_length=255, default='')
    description = models.TextField()
    date = models.DateField()
    def __str__(self):
        return self.news_name

class Promo(models.Model):
    promo_name = models.CharField(max_length=255)
    store_name = models.CharField(max_length=255)
    station = models.CharField(max_length=255)
    description = models.TextField()
    date = models.DateField()
    def __str__(self):
        return self.promo_name