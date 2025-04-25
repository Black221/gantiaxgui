import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import moment from 'moment';
import { WeatherService } from '@core/services/weather/weather.service';

declare var Chart: any; // Declare Chart globally

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styles: `
        // weather.component.scss or global styles
        .weather-banner {
        color: white;
        padding: 2rem;
        border-radius: 8px;
        text-align: center;
        background-size: cover;
        background-position: center;
        transition: background 0.5s ease-in-out;
        }

        .clear { background: url('/assets/sky/clear.jpg') no-repeat center; }
        .partly-cloudy { background: url('/assets/sky/partly-cloudy.jpg') no-repeat center; }
        .cloudy { background: url('/assets/sky/cloudy.jpg') no-repeat center; }
        .rainy { background: url('/assets/sky/rainy.jpg') no-repeat center; }
        .night { background: url('/assets/sky/night.jpg') no-repeat center; }
        .default { background-color: #444; }
    `
})
export class DashboardComponent  implements OnInit, OnDestroy {
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    prediction = {
      type_culture: "Arachide",
      type_sol: "Argileux",
      surface_champ: "1.5 hectare",
      besoin_en_eau: "3.8 L/ha/jour",
      niveau_stress: "Faible",
      priorite_irrigation: "Normale",
      heure_declenchement: "07:00",
      duree_arrosage: "25 minutes",
      volume_eau_total: "142.5 litres"
    };
    
    recommandation = {
      type_culture: "Arachide",
      type_sol: "Argileux",
      surface_champ: "1.5 hectare",
      type_irrigation: "Goutte-à-goutte enterré",
      frequence: "1 fois par jour",
      quantite_par_session: "3.8 L/ha",
      conseil_agronomique: "Éviter les arrosages excessifs durant la floraison. Maintenir le sol humide sans saturation.",
      fertilisant_naturel_recommande: {
        utiliser: true,
        type: "Compost de résidus d’arachide",
        justification: "Sol appauvri en azote lentement libéré ; apport organique localement disponible"
      }
    };
    
  
    data = {
      agro_environmental_parameters: [
        {
          parameter: "Température (°C)",
          measurement_range: "-40 à 80",
          accuracy: "±5°C à 25°C",
          recommended_optimal_values: "18 à 30 °C"
        },
        {
          parameter: "Humidité (%)",
          measurement_range: "0 à 100",
          accuracy: "±2% (0–50%), ±3% (50–100%)",
          recommended_optimal_values: "60 à 80 %"
        },
        {
          parameter: "Conductivité EC (µS/cm)",
          measurement_range: "0 à 200000",
          accuracy: "±3% (0–10000), ±5% (10000–20000)",
          recommended_optimal_values: "200 à 2000 µS/cm"
        },
        {
          parameter: "pH",
          measurement_range: "3 à 9",
          accuracy: "±0.3 pH",
          recommended_optimal_values: "6.0 à 7.0"
        },
        {
          parameter: "Azote (N, mg/kg)",
          measurement_range: "1 à 1999",
          accuracy: "±2% FS",
          recommended_optimal_values: "80 à 150"
        },
        {
          parameter: "Phosphore (P, mg/kg)",
          measurement_range: "1 à 1999",
          accuracy: "±2% FS",
          recommended_optimal_values: "60 à 120"
        },
        {
          parameter: "Potassium (K, mg/kg)",
          measurement_range: "1 à 1999",
          accuracy: "±2% FS",
          recommended_optimal_values: "150 à 250"
        },
        {
          parameter: "Fertilité (mg/kg)",
          measurement_range: "1 à 1000",
          accuracy: "Calculée à partir de NPK",
          recommended_optimal_values: "600 à 800"
        }
      ]
    };
    
      
    city: string = 'London'; // Default city
    weatherData: any; // To hold the weather data
    currentDate: string = moment().format('YYYY-MM-DD'); // Current date in YYYY-MM-DD format

    sensorReadings: any = {
        temperature: 26.4,
        humidity: 72,
        ec_conductivity: 1450,
        ph: 6.5,
        nitrogen: 110,
        phosphorus: 95,
        potassium: 210,
        fertility: 735
      };
      
      getReadingValue(parameter: string): number | string {
        const keyMap: any = {
          'Température (°C)': 'temperature',
          'Humidité (%)': 'humidity',
          'Conductivité EC (µS/cm)': 'ec_conductivity',
          'pH': 'ph',
          'Azote (N, mg/kg)': 'nitrogen',
          'Phosphore (P, mg/kg)': 'phosphorus',
          'Potassium (K, mg/kg)': 'potassium',
          'Fertilité (mg/kg)': 'fertility'
        };
      
        const key = keyMap[parameter];
        return this.sensorReadings[key] !== undefined ? this.sensorReadings[key] : '—';
      }
      

      
    constructor(
        private weatherService: WeatherService, // Inject the WeatherService
    ) {}

    ngOnInit(): void {
        this.weatherData = {
            dt: 1682505600, // Timestamp actuel
            sys: {
              sunrise: 1682476800,
              sunset: 1682523600
            },
            weather: [
              {
                description: 'Partly cloudy',
                icon: '03d' // partiellement nuageux de jour
              }
            ],
            main: {
              temp: 24.5,
              feels_like: 25.1,
              humidity: 68,
              pressure: 1015
            },
            wind: {
              speed: 5.5,
              deg: 135 // SE
            },
            name: 'Mboro, Médina Gounass',
          };
          this.renderWaterChart();
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next(null);
        this._unsubscribeAll.complete();
    }

    getSkyCondition(weatherData: any): string {
        const now = weatherData.dt;
        const sunrise = weatherData.sys.sunrise;
        const sunset = weatherData.sys.sunset;
      
        const isDay = now >= sunrise && now <= sunset;
        const iconCode = weatherData.weather[0].icon;
      
        if (!isDay) return 'night';
        if (iconCode.includes('01')) return 'clear';
        if (iconCode.includes('02') || iconCode.includes('03')) return 'partly-cloudy';
        if (iconCode.includes('04')) return 'cloudy';
        if (iconCode.includes('09') || iconCode.includes('10')) return 'rainy';
        if (iconCode.includes('13')) return 'snow';
        if (iconCode.includes('50')) return 'mist';
      
        return 'clear'; // Default case
      }
   
      skyCondition: string = 'clear';

    fetchWeather() {
        this.weatherService.getWeather(this.city).subscribe(data => {
            this.weatherData = data;
            this.skyCondition = this.getSkyCondition(data);
        });
    }

    getSkyIcon(): string {
        const isDay = this.weatherData?.weather[0].icon?.includes('d');
        return isDay ? '/assets/icons/sun.png' : '/assets/icons/moon.png';
    }

    getWindDirection(degrees: number): string {
        if (degrees === undefined || degrees === null) return '';
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const index = Math.round(degrees / 45) % 8;
        return directions[index];
    }

    getSkyClasses(): string {
        switch (this.skyCondition) {
          case 'clear':
            return 'bg-gradient-to-r from-blue-400 to-sky-500';
          case 'partly-cloudy':
            return 'bg-gradient-to-r from-blue-300 to-gray-400';
          case 'cloudy':
            return 'bg-gradient-to-r from-gray-400 to-gray-700';
          case 'rainy':
            return 'bg-gradient-to-r from-gray-600 to-blue-800';
          case 'night':
            return 'bg-gradient-to-r from-gray-900 to-black';
          case 'snow':
            return 'bg-gradient-to-r from-blue-100 to-white text-gray-800';
          case 'mist':
            return 'bg-gradient-to-r from-gray-200 to-gray-500 text-gray-800';
          default:
            return 'bg-gradient-to-r from-gray-500 to-gray-700';
        }
      }


      renderWaterChart() {
        const ctx = document.getElementById('waterChart') as HTMLCanvasElement;
    
        const data = {
          labels: [
            '00h', '01h', '02h', '03h', '04h', '05h', '06h', '07h',
            '08h', '09h', '10h', '11h', '12h', '13h', '14h', '15h'
          ],
          datasets: [{
            label: 'Eau utilisée (L)',
            data: [0, 2, 4, 6, 5, 8, 12, 10, 9, 7, 5, 4, 3, 2, 1, 0],
            borderColor: '#3B82F6',
            backgroundColor: 'rgba(59, 130, 246, 0.1)',
            fill: true,
            tension: 0.4,
            pointRadius: 3
          }]
        };
    
        new Chart(ctx, {
          type: 'line',
          data: data,
          options: {
            responsive: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Litres'
                }
              }
            },
            plugins: {
              legend: {
                display: true
              }
            }
          }
        });
      }
      
      
}
