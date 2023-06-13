import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WeatherService } from '../../weather.service';
import { FormControl, FormGroup, FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule,FormsModule,NgSelectModule, FormsModule,
    ReactiveFormsModule],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent {
  city = '';
  weatherData: any;
  forecastData: any[];
  weatherGif: string;
  weatherType = [
    { id: 1, name: 'Current-Weather' },
    { id: 2, name: 'Forecast-Weather' },
  ];
  selectedCity: any;
  enableSelect: boolean=true;
  weatherForm: FormGroup;
  currentWeather: boolean;
  constructor(private weatherService: WeatherService,private cd:ChangeDetectorRef) { }
  ngOnInit(): void {
    this.getCurrentLocation();
    this.weatherForm = new FormGroup({
      city: new FormControl(''),
      selectWeather: new FormControl(null),
    })
  }
  getWeather() {
    this.currentWeather=true;

    console.log(this.weatherForm.value.city);
    
    this.weatherService.getWeather(this.weatherForm.value.city)
      .then(response => {
        this.weatherData = response.data;
      })
      .catch(error => {
        console.log('Error:', error);
      });
  }

  getForecast() {
    this.weatherService.getForecast(this.weatherForm.value.city)
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
      case 'Sunny':
        return 'assets/sunny.gif';
      case 'Clouds':
        return 'assets/cloudy1.gif';
      case 'Clear':
        return 'assets/images/rainy.png';
      // Add more cases for other weather conditions
      default:
        return '';
    }
  }
  getCurrentLocation() {
    this.currentWeather=true;
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
  onChangeWeatherType(e) {
    console.log(e.id);
    if(e.id == 1){
      this.getWeather();
      this.currentWeather=true;
    }else{
      this.getForecast();
      this.currentWeather=false;
    }
  }
  onInput()
  {
    this.weatherForm.patchValue({
     selectWeather:null
    })
    this.enableSelect=false;
    this.cd.detectChanges();
  }
}