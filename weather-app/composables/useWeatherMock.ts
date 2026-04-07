import type {
  CityId,
  CityWeather,
  WeatherCity,
} from '~/types/weather'
import { computed } from 'vue'
import { useState } from '#imports'

const weatherByCity: Record<CityId, CityWeather> = {
  koeln: {
    city: {
      id: 'koeln',
      name: 'Köln',
      localTime: '14:45',
      temperature: 21,
      condition: 'Clear Sky',
      icon: 'sunny',
    },
    current: {
      locationLabel: 'Köln',
      timeLabel: '14:45 PM',
      temperature: 21,
      high: 24,
      low: 16,
      condition: 'Clear Sky',
      icon: 'sunny',
      heroImageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuB7O-iikl87OpVGRHQAH3N64qZoDVNpb9S9tQntsF2c9itO7_vD9dWctXAzN_quk0_eN92CgeYyyKpJQCVW27nIDV0eQo0zY30yuuc0A9kMJWnfF_-IBQHnZnO75rwlJltsK8RZMHsuqXIZDIQNOaiNwjrUk01ewSgK5sHkKMZoCMslXVDopR8ujJUe1JrJjZ2v3IL8d-6KHN7UbOroj5pYlF-NheHP0jmSJp89M8Dk6v-uV6pJLU3Hg82AALDtcw6yr17Ut9WJTdM',
      heroImageAlt:
        'Dramatic cinematic wide shot of Cologne skyline at dusk with the cathedral silhouette.',
    },
    hourly: [
      { id: 'now', time: 'Now', temperature: 21, icon: 'sunny', isNow: true },
      { id: '16', time: '16:00', temperature: 20, icon: 'partly_cloudy_day' },
      { id: '17', time: '17:00', temperature: 19, icon: 'partly_cloudy_day' },
      { id: '18', time: '18:00', temperature: 18, icon: 'cloud' },
      { id: '19', time: '19:00', temperature: 16, icon: 'cloud' },
      { id: '20', time: '20:00', temperature: 15, icon: 'nights_stay' },
      { id: '21', time: '21:00', temperature: 14, icon: 'nights_stay' },
    ],
    weekly: [
      { id: 'mon', day: 'Mon', high: 24, low: 12, icon: 'sunny' },
      { id: 'tue', day: 'Tue', high: 22, low: 14, icon: 'partly_cloudy_day' },
      { id: 'wed', day: 'Wed', high: 19, low: 11, icon: 'cloud' },
      { id: 'thu', day: 'Thu', high: 16, low: 9, icon: 'rainy' },
      { id: 'fri', day: 'Fri', high: 18, low: 13, icon: 'thunderstorm' },
      { id: 'sat', day: 'Sat', high: 20, low: 12, icon: 'cloud' },
      { id: 'sun', day: 'Sun', high: 23, low: 15, icon: 'sunny' },
    ],
    metrics: [
      { id: 'wind', label: 'Wind', value: '12', unit: 'km/h', detail: 'North East', icon: 'air' },
      { id: 'uv', label: 'UV Index', value: '4', unit: 'Moderate', detail: 'Use Protection', icon: 'wb_sunny' },
      { id: 'humidity', label: 'Humidity', value: '64', unit: '%', detail: 'Dew Point 14°', icon: 'humidity_percentage' },
      { id: 'visibility', label: 'Visibility', value: '10', unit: 'km', detail: 'Clear View', icon: 'visibility' },
    ],
    radar: {
      imageUrl:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCX0aeQnk_ZBQsvnn_jD3lOclWs65JegyUD4YdGtO_Uy4IdXRBZA8VAt5xCPPd6gS7DUP5wndg3xA3C5lgoxdMLEkm_OU9RUzXQDNtQSJApgVXg3eJ6P-lOlOxnhOTij4X7I_1ESf5n7gu-nfz9QINvyH2QJtwUPkgceYwf2HQHDlZUgT84oyTCVXGzWbgoj2lYDp8dPWSmi_W50SI5fHTuYq2DUb3zDLXQGdWWYEpiSx-s1iHfkQW3v7ff7HHR1sJXl2lLfhTLdVg',
      imageAlt: 'Satellite map with precipitation overlays around Cologne.',
      precipitationLabel: 'Precipitation: 0%',
    },
  },
  frankfurt: {
    city: { id: 'frankfurt', name: 'Frankfurt', localTime: '14:32', temperature: 18, condition: 'Partly Cloudy', icon: 'partly_cloudy_day' },
    current: {
      locationLabel: 'Frankfurt',
      timeLabel: '14:32 PM',
      temperature: 18,
      high: 21,
      low: 13,
      condition: 'Partly Cloudy',
      icon: 'partly_cloudy_day',
      heroImageUrl:
        'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?auto=format&fit=crop&w=1800&q=80',
      heroImageAlt: 'Frankfurt skyline during sunset.',
    },
    hourly: [
      { id: 'now', time: 'Now', temperature: 18, icon: 'partly_cloudy_day', isNow: true },
      { id: '16', time: '16:00', temperature: 18, icon: 'cloud' },
      { id: '17', time: '17:00', temperature: 17, icon: 'cloud' },
      { id: '18', time: '18:00', temperature: 16, icon: 'rainy' },
      { id: '19', time: '19:00', temperature: 15, icon: 'rainy' },
      { id: '20', time: '20:00', temperature: 14, icon: 'nights_stay' },
      { id: '21', time: '21:00', temperature: 13, icon: 'nights_stay' },
    ],
    weekly: [
      { id: 'mon', day: 'Mon', high: 21, low: 13, icon: 'partly_cloudy_day' },
      { id: 'tue', day: 'Tue', high: 19, low: 11, icon: 'rainy' },
      { id: 'wed', day: 'Wed', high: 17, low: 10, icon: 'cloud' },
      { id: 'thu', day: 'Thu', high: 16, low: 9, icon: 'rainy' },
      { id: 'fri', day: 'Fri', high: 18, low: 10, icon: 'partly_cloudy_day' },
      { id: 'sat', day: 'Sat', high: 20, low: 11, icon: 'sunny' },
      { id: 'sun', day: 'Sun', high: 22, low: 13, icon: 'sunny' },
    ],
    metrics: [
      { id: 'wind', label: 'Wind', value: '10', unit: 'km/h', detail: 'South West', icon: 'air' },
      { id: 'uv', label: 'UV Index', value: '3', unit: 'Low', detail: 'Safe', icon: 'wb_sunny' },
      { id: 'humidity', label: 'Humidity', value: '58', unit: '%', detail: 'Dew Point 11°', icon: 'humidity_percentage' },
      { id: 'visibility', label: 'Visibility', value: '9', unit: 'km', detail: 'Slight Haze', icon: 'visibility' },
    ],
    radar: {
      imageUrl: 'https://images.unsplash.com/photo-1527489377706-5bf97e608852?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Weather radar style map with cloud cover.',
      precipitationLabel: 'Precipitation: 18%',
    },
  },
  hannover: {
    city: { id: 'hannover', name: 'Hannover', localTime: '14:32', temperature: 14, condition: 'Light Rain', icon: 'rainy' },
    current: {
      locationLabel: 'Hannover',
      timeLabel: '14:32 PM',
      temperature: 14,
      high: 16,
      low: 10,
      condition: 'Light Rain',
      icon: 'rainy',
      heroImageUrl: 'https://images.unsplash.com/photo-1519692933481-e162a57d6721?auto=format&fit=crop&w=1800&q=80',
      heroImageAlt: 'Rainy city street with reflections.',
    },
    hourly: [
      { id: 'now', time: 'Now', temperature: 14, icon: 'rainy', isNow: true },
      { id: '16', time: '16:00', temperature: 14, icon: 'rainy' },
      { id: '17', time: '17:00', temperature: 13, icon: 'rainy' },
      { id: '18', time: '18:00', temperature: 13, icon: 'cloud' },
      { id: '19', time: '19:00', temperature: 12, icon: 'cloud' },
      { id: '20', time: '20:00', temperature: 12, icon: 'cloudy_snowing' },
      { id: '21', time: '21:00', temperature: 11, icon: 'nights_stay' },
    ],
    weekly: [
      { id: 'mon', day: 'Mon', high: 16, low: 10, icon: 'rainy' },
      { id: 'tue', day: 'Tue', high: 14, low: 9, icon: 'rainy' },
      { id: 'wed', day: 'Wed', high: 13, low: 8, icon: 'cloud' },
      { id: 'thu', day: 'Thu', high: 12, low: 7, icon: 'cloud' },
      { id: 'fri', day: 'Fri', high: 14, low: 8, icon: 'partly_cloudy_day' },
      { id: 'sat', day: 'Sat', high: 15, low: 9, icon: 'partly_cloudy_day' },
      { id: 'sun', day: 'Sun', high: 16, low: 10, icon: 'sunny' },
    ],
    metrics: [
      { id: 'wind', label: 'Wind', value: '18', unit: 'km/h', detail: 'West', icon: 'air' },
      { id: 'uv', label: 'UV Index', value: '2', unit: 'Low', detail: 'Cloud Cover', icon: 'wb_sunny' },
      { id: 'humidity', label: 'Humidity', value: '79', unit: '%', detail: 'Dew Point 9°', icon: 'humidity_percentage' },
      { id: 'visibility', label: 'Visibility', value: '6', unit: 'km', detail: 'Rain Mist', icon: 'visibility' },
    ],
    radar: {
      imageUrl: 'https://images.unsplash.com/photo-1534088568595-a066f410bcda?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Rain clouds over a city seen from above.',
      precipitationLabel: 'Precipitation: 64%',
    },
  },
  bremen: {
    city: { id: 'bremen', name: 'Bremen', localTime: '14:32', temperature: 12, condition: 'Overcast', icon: 'cloud' },
    current: {
      locationLabel: 'Bremen',
      timeLabel: '14:32 PM',
      temperature: 12,
      high: 15,
      low: 9,
      condition: 'Overcast',
      icon: 'cloud',
      heroImageUrl: 'https://images.unsplash.com/photo-1472120435266-53107fd0c44a?auto=format&fit=crop&w=1800&q=80',
      heroImageAlt: 'Moody overcast clouds over old town rooftops.',
    },
    hourly: [
      { id: 'now', time: 'Now', temperature: 12, icon: 'cloud', isNow: true },
      { id: '16', time: '16:00', temperature: 12, icon: 'cloud' },
      { id: '17', time: '17:00', temperature: 11, icon: 'cloud' },
      { id: '18', time: '18:00', temperature: 11, icon: 'cloud' },
      { id: '19', time: '19:00', temperature: 10, icon: 'rainy' },
      { id: '20', time: '20:00', temperature: 10, icon: 'rainy' },
      { id: '21', time: '21:00', temperature: 9, icon: 'nights_stay' },
    ],
    weekly: [
      { id: 'mon', day: 'Mon', high: 15, low: 9, icon: 'cloud' },
      { id: 'tue', day: 'Tue', high: 14, low: 8, icon: 'cloud' },
      { id: 'wed', day: 'Wed', high: 13, low: 8, icon: 'rainy' },
      { id: 'thu', day: 'Thu', high: 13, low: 7, icon: 'rainy' },
      { id: 'fri', day: 'Fri', high: 14, low: 8, icon: 'partly_cloudy_day' },
      { id: 'sat', day: 'Sat', high: 16, low: 9, icon: 'partly_cloudy_day' },
      { id: 'sun', day: 'Sun', high: 17, low: 10, icon: 'sunny' },
    ],
    metrics: [
      { id: 'wind', label: 'Wind', value: '15', unit: 'km/h', detail: 'North West', icon: 'air' },
      { id: 'uv', label: 'UV Index', value: '2', unit: 'Low', detail: 'Cloud Cover', icon: 'wb_sunny' },
      { id: 'humidity', label: 'Humidity', value: '72', unit: '%', detail: 'Dew Point 8°', icon: 'humidity_percentage' },
      { id: 'visibility', label: 'Visibility', value: '8', unit: 'km', detail: 'Good', icon: 'visibility' },
    ],
    radar: {
      imageUrl: 'https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Wide atmospheric cloud layer above city horizon.',
      precipitationLabel: 'Precipitation: 31%',
    },
  },
  'san-francisco': {
    city: { id: 'san-francisco', name: 'San Francisco', localTime: '05:45', temperature: 24, condition: 'Partly Cloudy', icon: 'partly_cloudy_day' },
    current: {
      locationLabel: 'San Francisco',
      timeLabel: '05:45 AM',
      temperature: 24,
      high: 26,
      low: 18,
      condition: 'Partly Cloudy',
      icon: 'partly_cloudy_day',
      heroImageUrl: 'https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=1800&q=80',
      heroImageAlt: 'San Francisco skyline and bay in warm sunlight.',
    },
    hourly: [
      { id: 'now', time: 'Now', temperature: 24, icon: 'partly_cloudy_day', isNow: true },
      { id: '16', time: '16:00', temperature: 23, icon: 'cloud' },
      { id: '17', time: '17:00', temperature: 21, icon: 'rainy' },
      { id: '18', time: '18:00', temperature: 20, icon: 'thunderstorm' },
      { id: '19', time: '19:00', temperature: 19, icon: 'cloudy_snowing' },
      { id: '20', time: '20:00', temperature: 18, icon: 'nights_stay' },
      { id: '21', time: '21:00', temperature: 18, icon: 'nights_stay' },
    ],
    weekly: [
      { id: 'today', day: 'Today', high: 24, low: 18, icon: 'partly_cloudy_day' },
      { id: 'mon', day: 'Mon', high: 27, low: 19, icon: 'sunny' },
      { id: 'tue', day: 'Tue', high: 22, low: 16, icon: 'cloud' },
      { id: 'wed', day: 'Wed', high: 20, low: 15, icon: 'rainy' },
      { id: 'thu', day: 'Thu', high: 23, low: 17, icon: 'partly_cloudy_day' },
      { id: 'fri', day: 'Fri', high: 24, low: 17, icon: 'partly_cloudy_day' },
      { id: 'sat', day: 'Sat', high: 25, low: 18, icon: 'sunny' },
    ],
    metrics: [
      { id: 'wind', label: 'Wind Speed', value: '12', unit: 'km/h', detail: 'North East', icon: 'air' },
      { id: 'humidity', label: 'Humidity', value: '64', unit: '%', detail: 'Coastal Moisture', icon: 'humidity_percentage' },
      { id: 'uv', label: 'UV Index', value: '4', unit: 'Moderate', detail: 'Use Protection', icon: 'wb_sunny' },
      { id: 'visibility', label: 'Visibility', value: '10', unit: 'km', detail: 'Clear View', icon: 'visibility' },
    ],
    radar: {
      imageUrl: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?auto=format&fit=crop&w=1800&q=80',
      imageAlt: 'Coastal weather map style image with cloud bands.',
      precipitationLabel: 'Precipitation: 12%',
    },
  },
}

const cityOrder: CityId[] = ['koeln', 'frankfurt', 'hannover', 'bremen', 'san-francisco']

export const useWeatherMock = () => {
  const activeCityId = useState<CityId>('weather-active-city', () => 'koeln')

  const cities = computed<WeatherCity[]>(() => cityOrder.map(cityId => weatherByCity[cityId].city))

  const activeWeather = computed<CityWeather>(() => weatherByCity[activeCityId.value])

  const selectCity = (cityId: CityId) => {
    if (weatherByCity[cityId])
      activeCityId.value = cityId
  }

  return {
    activeCityId,
    activeWeather,
    cities,
    selectCity,
  }
}
