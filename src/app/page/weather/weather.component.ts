import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../weather.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  city = '';
  weatherData: any;
  forecastData: any[];
  weatherGif: string;

  constructor(private weatherService: WeatherService) { }
  ngOnInit(): void {
    this.getCurrentLocation();
  }
  getWeather() {
    this.weatherService.getWeather(this.city)
      .then(response => {
        this.weatherData = response.data;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  getForecast() {
    this.weatherService.getForecast(this.city)
      .then(response => {
        console.log(response);
        
        this.forecastData = response.data.list;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }
  weatherIcon(condition) {
    console.log(condition);
    
    // switch (icon) {
    //   case 'Clouds':
    //     return 'wi wi-day-cloudy'
    //   case 'clear-day':
    //     return 'wi wi-day-sunny'
    //   case 'partly-cloudy-night':
    //     return 'wi wi-night-partly-cloudy'
    //   default:
    //     return `wi wi-day-sunny`
    // }
      switch (condition) {
      case 'Clouds':
        return 'assets/sunny.gif';
      case '':
        return 'assets/cloudy.gif';
      case 'rainy':
        return 'assets/images/rainy.png';
      // Add more cases for other weather conditions
      default:
        return '';
    }
  }
  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          this.weatherService.getCurrentWeather(latitude, longitude)
            .then((response: any) => {
              this.weatherData = response.data;
              console.log(response.data);
              this.weatherGif=this.weatherIcon(this.weatherData.weather[0].main)
            })
            .catch((error: any) => {
              console.log('Error occurred: ' + error);
            });
        },
        (error) => {
          console.log('Error occurred. Error code: ' + error.code);
        }
      );
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }
}