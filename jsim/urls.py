from django.conf.urls import url
from . import jscroll

urlpatterns = [
    url(r'^jscroll/$', jscroll.JScroll.as_view(), name='jscroll'),
]



