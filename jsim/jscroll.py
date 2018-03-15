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
    def __init__(self, template, queryset, token):
        cache.set('%s-jscroll-%s' % (token, template),  
        pickle.dumps(queryset))

        self.template = template
        self.token    = token

    def as_html(self):
        viewport = sub('/|\.', '', self.template)
        tmp = get_template('jsim/jscroll.html')
        data = tmp.render({'template': self.template,
        'viewport': viewport, 'token': self.token})
        return data

class JScrollView(View):
    def get(self, request):
        template  = request.GET.get('jscroll-template')
        page      = request.GET.get('page')
        token     = request.GET.get('token')

        queryset  = cache.get('%s-jscroll-%s' % (token, template))
        queryset  = pickle.loads(queryset).order_by('id')

        paginator = Paginator(queryset, 20)
        elems     = paginator.page(int(page))
        return render(request, template, {'elems': queryset})



