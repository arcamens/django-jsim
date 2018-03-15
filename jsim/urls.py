from django.conf.urls import url
from . import jscroll

urlpatterns = [
    url(r'^jscroll-view/$', jscroll.JScrollView.as_view(), name='jscroll-view'),
]



