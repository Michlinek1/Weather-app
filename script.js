

var miasto = document.getElementsByClassName('city')[0];
var celciusze = document.getElementsByClassName('temp')[0];
var Fahrenheit = document.getElementsByClassName('temp')[1];
var cisnienie = document.getElementsByClassName('dod')[0];
var wilgotnosc = document.getElementsByClassName('dod')[1];
var wiatr = document.getElementsByClassName('dod')[2];
var pogadaladna = new Audio("ptaki.mp3");
var pogodaburza = new Audio("burza.mp3");
var pogodadeszcz = new Audio("deszcz.mp3");

var zamieniacz = document.getElementsByClassName('zamienianie')[0];
var inputcelciusze = document.getElementsByClassName('konwerter')[0];
var inputFahrenheit= document.getElementsByClassName('konwerter')[1];
var bezmiejsc = document.getElementsByClassName('przecinki')[0];
var zmiejscami = document.getElementsByClassName('przecinki')[1];


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
        if(wiatr.checked){
            document.getElementsByClassName('tekst')[2].innerHTML = "Wiatr:" +" "+ json['wind']['speed']+" "+"m/s";
        }else{
            document.getElementsByClassName('tekst')[2].innerHTML = "Wiatr: Nie wybrano";
        }
        if(wilgotnosc.checked){
        document.getElementsByClassName('tekst')[3].innerHTML = "Wilgotność:" + " " + json['main']['humidity']+" "+"%";
        }else{
            document.getElementsByClassName('tekst')[3].innerHTML = "Wilgotność: Nie wybrano";
        }
        if(cisnienie.checked){
        document.getElementsByClassName('tekst')[4].innerHTML = "Ciśnienie:" + " " +json['main']['pressure']+" "+"hPa";
        }else{
            document.getElementsByClassName('tekst')[4].innerHTML = "Ciśnienie: Nie wybrano";
        }
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
        for(var i = 0; i < 5; i++){
            document.getElementsByClassName("tekst")[i].innerHTML = " ";
        }

   })


}

function lokalizacja(){
    navigator.geolocation.getCurrentPosition(function(position){
        var lat = position.coords.latitude;
        var lon = position.coords.longitude;
        fetch('https://api.openweathermap.org/data/2.5/weather?lat='+lat+'&lon='+lon+'&appid=API&units=metric')
        .then(function(odpowiedz){
            return odpowiedz.json();
        })
        .then(function(json){
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
            if(wiatr.checked){
                document.getElementsByClassName('tekst')[2].innerHTML = "Wiatr:" +" "+ json['wind']['speed']+" "+"m/s";
            }else{
                document.getElementsByClassName('tekst')[2].innerHTML = "Wiatr: Nie wybrano";
            }
            if(wilgotnosc.checked){
            document.getElementsByClassName('tekst')[3].innerHTML = "Wilgotność:" + " " + json['main']['humidity']+" "+"%";
            }else{
                document.getElementsByClassName('tekst')[3].innerHTML = "Wilgotność: Nie wybrano";
            }
            if(cisnienie.checked){
            document.getElementsByClassName('tekst')[4].innerHTML = "Ciśnienie:" + " " +json['main']['pressure']+" "+"hPa";
            }else{
                document.getElementsByClassName('tekst')[4].innerHTML = "Ciśnienie: Nie wybrano";
            }
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
       for(var i = 0; i < 5; i++){
           document.getElementsByClassName("tekst")[i].innerHTML = " ";
       }

  })
})
}

function konwerter(){
if(inputcelciusze.value != "" ){
    if(inputcelciusze.getAttribute("placeholder") == "Podaj temperature w celcjuszach" || inputcelciusze.getAttribute("placeholder") == "Podaj temperature w Fahrenheitach"){
    if(inputcelciusze.getAttribute("placeholder") == "Podaj temperature w celcjuszach"){
        if(bezmiejsc.checked){
        inputFahrenheit.value = parseInt(inputcelciusze.value*1.8 + 32) + " "+ "F";
    }else{
        inputFahrenheit.value = parseFloat(inputcelciusze.value*1.8 + 32) + " "+ "F";
    }
    }else if(inputcelciusze.getAttribute("placeholder") == "Podaj temperature w Fahrenheitach"){
        if(bezmiejsc.checked){
        inputFahrenheit.value = parseInt((inputcelciusze.value - 32)/1.8)+ " " + "°C";
        }else{
        inputFahrenheit.value = parseFloat((inputcelciusze.value - 32)/1.8) + " "+ "°C";
        }
    }
}else{
    alert("Nie zmieniaj placeholderów!")
    setTimeout(function(){
        window.location.reload();
    });
}
}else{
    inputFahrenheit.value = "Wpisz temperaturę! ";
    inputcelciusze.value = "Wpisz temperaturę! ";

}
        
}

zamieniacz.addEventListener("click", function(){
    if(inputcelciusze.getAttribute("placeholder") == "Podaj temperature w celcjuszach"){
        inputcelciusze.setAttribute("placeholder", "Podaj temperature w Fahrenheitach");
    }else if(inputcelciusze.getAttribute("placeholder") == "Podaj temperature w Fahrenheitach"){
        inputcelciusze.setAttribute("placeholder", "Podaj temperature w celcjuszach");
    }
}

)

