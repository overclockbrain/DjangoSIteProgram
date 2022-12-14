"""reversisite URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path ,include

from mainsite.views import gamePage, resultPage, topPage,acceptedTopPage,predict,rate,outline

urlpatterns = [
    path('',topPage, name="topPage"),
    path('2/',acceptedTopPage,name="acceptedTopPage"),
    path('game/',gamePage,name="gamePage"),
    path('result/',resultPage, name="resultPage"),
    path('rate/',rate,name="rate"),
    path('outline/',outline,name="outline"),
    path('admin/', admin.site.urls),
    path('predict/', predict, name="predict")
]