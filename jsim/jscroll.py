from django.core.paginator import Paginator, EmptyPage
from django.template.loader import get_template
from django.views.generic import View
from django.db.models import QuerySet
from django.core.cache import cache
from django.shortcuts import render
from django.apps import apps
import pickle
from re import sub

class JScroll:
    def __init__(self, request, template, queryset):
        request.session['jscroll-%s' %  template] = queryset
        self.template = template

    def as_html(self):
        viewport = sub('/|\.', '', self.template)
        tmp = get_template('jsim/jscroll.html')
        data = tmp.render({'template': self.template,
        'viewport': viewport})
        return data

class JScrollView(View):
    def get(self, request):
        template  = request.GET.get('jscroll-template')
        page      = request.GET.get('page')
        queryset  = request.session['jscroll-%s' % template]

        paginator = Paginator(queryset, 20)
        elems     = paginator.page(int(page))
        return render(request, template, {'elems': queryset})



