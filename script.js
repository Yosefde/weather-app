function getWeather(city){
	if (city) {
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if (this.status==200 && this.readyState==4) {
			var formattedData=formatWeather(JSON.parse(xhr.responseText));
			document.getElementById("weather-data").innerHTML=formattedData;
			document.getElementById('cityname').value="";
		}
	};
	xhr.open("GET","http://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=metric&appid=d610395e85b50074b834a0234b0776db");
	xhr.send();
  }
  else{
  	var error='<div class="alert alert-danger alert-dismissible text-center" role="alert">';
		error+='<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button>';
		error+='You must enter a city name!</div>';
	document.getElementById('error').innerHTML=error;
  }
	return false;
}

function formatWeather(data){
    var formattedData = "<h3>Current Weather for " + data.name + ", " + data.sys.country + "</h3>" + 
        "<p>Weather: " + data.weather[0].main+ "</p>" + 
        "<p>Weather Description: " + data.weather[0].description +"<img src='http://openweathermap.org/img/w/" + data.weather[0].icon + ".png'/>" + "</p>" + 
        "<p>Temperature: " + data.main.temp + "&deg;C</p>" + 
        "<p>Pressure: " + data.main.pressure + "hPa</p>" + 
        "<p>Humidity: " + data.main.humidity + "%</p>" + 
        "<p>Min Temperature: " + data.main.temp_min + "&deg;C</p>" + 
        "<p>Max Temperature: " + data.main.temp_max + "&deg;C</p>" + 
        "<p>Wind Speed: " + data.wind.speed + "m/s</p>";

    document.getElementById("weather-data").innerHTML = formattedData;

    // Create the graph
    var ctx = document.getElementById('weather-chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['Temperature', 'Pressure', 'Humidity'],
            datasets: [{
                label: 'Weather Data',
                data: [data.main.temp, data.main.pressure, data.main.humidity],
                backgroundColor: ['rgba(255, 99, 132, 0.2)', 'rgba(54, 162, 235, 0.2)', 'rgba(255, 206, 86, 0.2)'],
                borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    return formattedData;
}





function getForecast(city,days){
	var xhr=new XMLHttpRequest();
	xhr.onreadystatechange=function(){
		if (this.status==200 && this.readyState==4) {
			var formattedData=formatForecast(JSON.parse(xhr.responseText));
			document.getElementById("forecast").innerHTML=formattedData;
			document.getElementById('cityname').value="";
			document.getElementById('days').value=""
		}
	};
	xhr.open("GET","http://api.openweathermap.org/data/2.5/forecast/daily?q="+ city + "&cnt=" + days + "&units=metric&appid=d610395e85b50074b834a0234b0776db");
	xhr.send();
	return false;
}

function formatForecast(data){
    var table = "<table>";
    for (var i = 0; i < data.list.length; i++) {
        table += "<tr>";
        table += "<td><img src='http://openweathermap.org/img/w/" + data.list[i].weather[0].icon + ".png'/></td>";
        table += "<td>" + data.list[i].weather[0].main + "</td>";
        table += "<td>" + data.list[i].weather[0].description + "</td>";
        table += "<td>" + data.list[i].temp.morn + "&deg;C</td>";
        table += "<td>" + data.list[i].temp.night + "&deg;C</td>";
        table += "<td>" + data.list[i].temp.min + "&deg;C</td>";
        table += "<td>" + data.list[i].temp.max + "&deg;C</td>";
        table += "<td>" + data.list[i].pressure + "hPa</td>";
        table += "<td>" + data.list[i].humidity + "%</td>";
        table += "<td>" + data.list[i].speed + "m/s</td>";
        table += "</tr>";
    }
    table += "</table>";

    var chartData = data.list.map(function(item) {
        return item.temp.day;
    });

    var ctx = document.getElementById('forecast-chart').getContext('2d');
    var chart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: data.list.map(function(item) {
                return item.dt;
            }),
            datasets: [{
                label: 'Temperature',
                data: chartData,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    return table;
}


