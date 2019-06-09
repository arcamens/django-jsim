# django-jsim

This package is used to ease deployment of Jsim javascript library.

https://github.com/arcamens/jsim

The jsim library is a javascript library on top of JQuery to quickly
prototype web sites.

# Install

The django-jsim package should run on Django==2.1.7 and python3.5+.

~~~
pip install django-jsim
~~~

# Usage

Just add jsim to your django installed apps.

~~~ppython
INSTALLED_APPS = [
    'jsim',

]
~~~

In order to use jsim in your application you need to add the django template tag
in the beginning of your index.html file.

~~~html
{% load jsim %}

~~~

Once that is done it is enough to dump the jsim html in the beginning
of your index html body tag as in:

~~~html
<body>
{% jsim %}

~~~

Once that is done then you can start using jsim functionalities in your application.
