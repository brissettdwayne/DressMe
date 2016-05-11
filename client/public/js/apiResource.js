console.log('API is up');

var weatherKey;
var baseURL;
var queryURL;
var userZipcode;
var lowTemp = 0;
var willRain = false;
var willSnow = false;
var gender = "male"; // needs to be updated on user signup

function getKey(){
  $.ajax({
    url: "/key",
    type: "GET",
    success: function(data){
      makeBaseLink(data.API_KEY);
    }
  })
}

function getUserZipcode(){
  $('#update-button').click(function(){
    userZipcode = $("#account-container").find("[name=zipcode]").val()
    $('#current-weather-container').html('<h3>Today in ' + userZipcode + '</h3>');
  });
  userZipcode = $("#account-container").find("[name=zipcode]").val()
  $('#current-weather-container').html('<h3>Today in ' + userZipcode + '</h3>');
}

function makeBaseLink(keyString){
  baseURL = "https://api.worldweatheronline.com/premium/v1/weather.ashx?key="+ keyString
};


function makeQueryLink(zipcode, format, daysNum){
  queryURL = baseURL+"&q="+zipcode+"&format="+format+"&num_of_days="+daysNum
  return queryURL
};

function askTheWeather(method, link, payload){
  $.ajax ({
    method: method || 'get',
    // data: payload || {},
    url: link,
    success: function(data){
      getTodayInfo(data.data);
      checkForRain(data.data.weather[0].hourly);
      checkForSnow(data.data.weather[0].hourly);
      getLowForToday(data.data.weather[0]);
      getRec();
    }
  });
}

var userInfoAPI = userInfoAPI || {};

function getLowForToday(weather){
  var temp = weather.mintempF;
  lowTemp = parseInt(temp);
  console.log("low temp: " + lowTemp);
};

function getTodayInfo(object){
  console.log(object);
  var today = object.weather[0].hourly
  var morning = today[2]
  var midday = today[4]
  var evening = today[5]
  var current = object.current_condition[0];
  renderTodayInfo(morning,$("#morning-forecast"))
  renderTodayInfo(midday,$("#midday-forecast"))
  renderTodayInfo(evening,$("#evening-forecast"))
  renderCurrentInfo(current)

};

function checkForRain(hourly){
  for (var i = 0; i<hourly.length; i ++){
    if ( hourly[i].chanceofrain > 40) {
      console.log(hourly[i].chanceofrain + "is greater than 40")
      willRain = true;
    }
  }
}

function checkForSnow(hourly){
  for (var i = 0; i<hourly.length; i ++){
    if ( hourly[i].chanceofsnow > 10) {
      console.log(hourly[i].chanceofsnow + "is greater than 10")
      willSnow = true;
    }
  }
}

function renderTodayInfo(object, parentElement){
  console.log ("rendering todays weather");
  var tempP = $("<p>").text("Temp: "+ object.tempF + " °F");
//  var humidityP = $("<p>").text("Humidity: "+ object.humidity + "%");
//  var feelsLikeP = $("<p>").text("Feels Like: "+ object.FeelsLikeF + " °F");
  var weatherIcon = $('<img>').attr('src', object.weatherIconUrl[0].value);
//  var weatherDesc = $('<p>').text("Weather description: " + object.weatherDesc[0].value);
  parentElement.append(tempP, weatherIcon);
  // ask Sam why this works lol
};

function renderCurrentInfo(object){
  console.log ("rendering current weather");
  var currentCondition = $("<p>").text("Temp: "+ object.temp_F + " °F  |  Humidity: "+ object.humidity + "%  |  Feels Like: "+ object.FeelsLikeF + " °F"  );
  var humidityP = $("<p>").text("Humidity: "+ object.humidity + "%");
  var feelsLikeP = $("<p>").text("Feels Like: "+ object.FeelsLikeF + " °F");
//  var weatherIcon = $('<img>').attr('src', object.weatherIconUrl[0].value);
  $("#current-weather-container").append(currentCondition);
  // ask Sam why this works lol
};


$(function(){
  getKey();

})
