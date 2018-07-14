from django.shortcuts import render
from .models import Event, News

# Create your views here.
def index(request):
    events = Event.objects.all()
    newss = News.objects.all()
    event_list = " "
    news_list = " "
    for event in events:
        event_list += event.event_name+", "+event.description+", "+event.place+", "+str(event.date)+"   "
    for news in newss:
        news_list += news.news_name+", "+news.description+", "+str(news.date)+"   "

    return render(request, 'map/base.html', {'events': event_list, 'newss': news_list})
