from django.shortcuts import render
from django.http import HttpResponse
import requests

# Create your views here.


def test(request):
    context = {}

    if 'query' in request.POST:
        context["query"] = request.POST.get('query',None)
        
    query = context['query']

    response = requests.get('https://api.themoviedb.org/3/movie/{query}?api_key=6d3fe47c2bced82ae728f71b20b61ae4')
    data = response.json()
    print(data)
    return render(request, 'result.html',{
        'movie_poster' : 'https://image.tmdb.org/t/p/w300' + data['poster_path'],
        'movie_title' : data['title'],
        'movie_content' : data['overview'],
        'popularity' : data['popularity'],
        'rating' : data['vote_average']
    })

def profile(request):
    return render(request,'profile_details.html')

def home(request):
    return render(request,'index.html')

def login(request):
    return render(request,'login.html')

def register(request):
    return render(request,'register.html')

def register_success(request):
    return render(request,'registration_success.html')

def search_result(request):
    context = {}

    if 'query' in request.POST:
        context["query"] = request.POST.get('query',None)
        
    query = context['query']
    
    api_query  = 'https://api.themoviedb.org/3/search/movie?api_key=6d3fe47c2bced82ae728f71b20b61ae4&language=en-US&page=1&query='+str(query)
    response = requests.get(api_query)
    data = response.json()
    print(data['results'])

    result_list = data['results']
    context = {
        'res': result_list,
        'query' : query
    }

    print("Path :::: " , result_list[0]['poster_path'])
    
    return render(request,'search_results.html',context)



def search_result2(request):
    context = {}
    
    api_query  = 'https://api.themoviedb.org/3/search/movie?api_key=6d3fe47c2bced82ae728f71b20b61ae4&language=en-US&page=1&query=money'
    response = requests.get(api_query)
    data = response.json()
    print(data['results'])

    result_list = data['results']
    genre = []
    length = []
    for i  in range(len(result_list)):
        genre.append(result_list[i]['genre_ids'])
        length.append(i)

    print(length)
    context = {
        'res': result_list,
        'genre' : genre,
        'len' : length
    }

    print("Path :::: " , result_list[0]['poster_path'])
    
    return render(request,'testHello.html',context)


def movie_details(request , pk):
    print(pk)

    apiquery = 'https://api.themoviedb.org/3/movie/'+str(pk)+'?api_key=6d3fe47c2bced82ae728f71b20b61ae4' 
    response = requests.get(apiquery)
    data = response.json()
    print(data)

    return render(request, 'result.html',{
        'movie_poster' : 'https://image.tmdb.org/t/p/w300' + data['poster_path'],
        'movie_title' : data['title'],
        'movie_content' : data['overview'],
        'popularity' : data['popularity'],
        'rating' : data['vote_average']
    })
