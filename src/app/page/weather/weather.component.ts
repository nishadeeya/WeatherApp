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

  constructor(private weatherService: WeatherService) { }

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
}
