from django.shortcuts import render
from .models import Event, News
from twilio.rest import Client

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

def sms(request):
    account_sid = 'AC5a635be4cd989f66a8ad783246f87cc1'
    auth_token = 'c91f6177500426f18e6cfa7f6c38bea5'
    client = Client(account_sid, auth_token)

    message = client.messages \
        .create(
        body='Hello, This is LRMC?',
        from_='+18508058901',
        to='+639338559633'
    )

    print(message.sid)
    events = Event.objects.all()
    newss = News.objects.all()
    event_list = " "
    news_list = " "
    for event in events:
        event_list += event.event_name + ", " + event.description + ", " + event.place + ", " + str(event.date) + "   "
    for news in newss:
        news_list += news.news_name + ", " + news.description + ", " + str(news.date) + "   "

    return render(request, 'map/base.html', {'events': event_list, 'newss': news_list})
