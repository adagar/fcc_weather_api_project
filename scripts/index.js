$(document).ready(function() {
    console.log("ready!");
    function setWeatherData(position){
        $.getJSON("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, function(json){
        //$("#weather").html(JSON.stringify(json));
        
        var html = "";

        //json.forEach(function(val){
        var keys = Object.keys(json);

        //Setting temperature units
        var tempUnit = "&deg;C"
        var currTemp = json["main"]["temp"];

        //Print importnat weather data
        html += "<div class = 'weather-data'>";
        html += "<p id='location'>" + json["name"] + ", " + json["sys"]["country"] + "</p>";
        html += "<p id = 'temp'> Current Temperature: " + currTemp + tempUnit;
        html += "<p id = 'cloudCov'> Cloud Cover: " + json["weather"][0]["main"] + "</p>";
        html += "<img src = '" + json["weather"][0]["icon"] + "'>"; //TODO: Integrate these icons https://darkskyapp.github.io/skycons/

        html += "</div><br>";
        $("#weather-data").html(html);  
      });

    //});
  } 
  
    function getLocation(){
      if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(setWeatherData);
      }else{
        $("#weather").html("Geolocation is not supported by this browser, but I hope its nice out.");
      }
    }
    getLocation();
    console.log("Still ready!");
});