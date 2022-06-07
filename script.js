

var miasto = document.getElementsByClassName('city')[0];
var celciusze = document.getElementsByClassName('temp')[0];
var Fahrenheit = document.getElementsByClassName('temp')[1];
var pogadaladna = new Audio("ptaki.mp3")
var pogodaburza = new Audio("burza.mp3")
var pogodadeszcz = new Audio("deszcz.mp3")

function pogoda(){
    fetch('https://api.openweathermap.org/data/2.5/weather?q='+miasto.value+'&appid=API&units=metric')
   .then(function(odpowiedz){
       return odpowiedz.json();
   })
   .then(function(json){
        console.log(json);
        var pogodaChmury = json['name']
        document.getElementsByClassName('tekst')[0].innerHTML = pogodaChmury
        if(parseInt(json['main']['temp']) > 23){
            if(celciusze.checked){
            document.getElementsByClassName('tekst')[1].innerHTML = "Ciepło, temperatura wynosi" +" "+ json['main']['temp']+" "+ "°C";
            }else if(Fahrenheit.checked){
                document.getElementsByClassName('tekst')[1].innerHTML = "Ciepło, temperatura wynosi" +" "+ parseInt(json['main']['temp']*1.8 + 32)+" "+ "F";
            }
        }else{
            if(celciusze.checked){
            document.getElementsByClassName('tekst')[1].innerHTML = "Zimno, temperatura wynosi"+" "+ json['main']['temp']+" "+"°C";
            }
            else if(Fahrenheit.checked){
                document.getElementsByClassName('tekst')[1].innerHTML = "Zimno, temperatura wynosi"+" "+ parseInt(json['main']['temp']*1.8 + 32)+" "+"F";
            }
        }
        document.getElementsByClassName('tekst')[2].innerHTML = "Wiatr" +" "+ json['wind']['speed']+" "+"m/s";
        document.getElementsByClassName('tekst')[3].innerHTML = "Wilgotność" +" "+ json['main']['humidity']+" "+"%";
        document.getElementsByClassName('tekst')[4].innerHTML = "Ciśnienie" +" "+ json['main']['pressure']+" "+"hPa";
        if(json['weather'][0]['main'] == "Clear"){
            pogodadeszcz.pause();
            pogodaburza.pause();
            pogadaladna.play();   
            pogadaladna.loop = true;
        }else if(json['weather'][0]['main'] == "Clouds"){
            pogodadeszcz.pause();
            pogodaburza.pause();
            pogadaladna.pause();
        }else if (json['weather'][0]['main'] == "Rain"){
            pogodadeszcz.play();
            pogodadeszcz.loop = true;
            pogodaburza.pause();
            pogodaburza.pause();
        }else if (json['weather'][0]['main'] == "Thunderstorm"){
            pogodaburza.play();
            pogodaburza.loop = true;
            pogodadeszcz.pause();
            pogadaladna.pause();
        }
   })
   .catch(function(error){
         console.log(error);
         alert("Błąd");
         document.getElementsByClassName('tekst')[0].innerHTML = "";
   })


}

