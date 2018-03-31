$(document).ready(function() {
    console.log("ready!");
    //Setting temperature units
    var tempUnit = "C";

    var lat;
    var long;

    function setLocation(position){
        lat = position.coords.latitude;
        long = position.coords.longitude;
        displayWeather();
    }

    function displayWeather(){
        $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + lat + "&lon=" + long, function(json){
        //$("#weather").html(JSON.stringify(json));
        
        var html = "";

        //json.forEach(function(val){
        var keys = Object.keys(json);

        if(tempUnit == "C"){
          var currTemp = json["main"]["temp"];
        } else{
          var currTemp = ((Number(json["main"]["temp"]) * 9) / 5) + 32;
        }


        //Print importnat weather data
        html += "<div class = 'weather-data'>";
        html += "<p id='location'>" + json["name"] + ", " + json["sys"]["country"] + "</p>";
        html += "<p id = 'temp'> Current Temperature: " + currTemp + "&deg;" + tempUnit;
        html += "<p id = 'cloudCov'> Cloud Cover: " + json["weather"][0]["main"] + "</p>";
        html += "<img src = '" + json["weather"][0]["icon"] + "'>"; //TODO: Integrate these icons https://darkskyapp.github.io/skycons/

        html += "</div><br>";
        $("#weather-data").html(html);  
      });
    } 

    $("#temp-select input:radio").click(function(){
      tempUnit = $('input[name=weather-units]:checked').val();
      alert("Changing temp units to: " + tempUnit);
      displayWeather();
    });

    function getLocation(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(setLocation);
      }else{
        $("#weather").html("Geolocation is not supported by this browser, but I hope its nice out.");
      }
    }

    

    getLocation();
});