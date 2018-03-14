from django.core.paginator import Paginator, EmptyPage
from django.template.loader import get_template
from django.views.generic import View
from django.db.models import QuerySet
from django.shortcuts import render

class JScroll(View):
    def __init__(self, request, template, context, *args, **kwargs):
        super(JScroll, self).__init__(*args,**kwargs)

        context = dict(map(lambda ind: (ind[0], 
        str(ind[1].query)), context.items()))

        request.session['jscroll-%s' % template] = {
        'context': context}

        self.template = template

    def get(self, request):
        template = request.GET.get('jscroll-template')
        key      = 'jscroll-%s' % template
        context  = request.session[key]['context']
        
        context = dict(map(lambda ind: (ind[0], 
        QuerySet(ind[1]))), context.items())

        return render(request, template, context)

    def as_html(self):
        tmp = get_template('jsim/jscroll.html')
        return tmp.render({'template': self.template})

