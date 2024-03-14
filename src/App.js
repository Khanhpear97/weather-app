import './App.css';
import UilReact from "@iconscout/react-unicons/icons/uil-react";
import {TimeAndLocation} from "./components/TimeAndLocation";
import {TopButton} from "./components/TopButton";
import {Input} from "./components/Input";
import {TemperatureAndDetail} from "./components/TemperatureAndDetail";
import {Forecast} from "./components/Forecast";
import {getFormattedWeatherData} from "./services/weatherService";
import {useEffect, useState} from "react";
import {toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [query, setQuery] = useState({q: 'hanoi'});
    const [units, setUnits] = useState('metric');
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        const fetchWeather = async () => {
            const messege = query.q ? query.q : 'current location.'

            toast.info('Fetching weather for ' + messege);

            await getFormattedWeatherData({...query, units}).then((data) => {
               toast.success(`Successfully fetched weather for ${data.name}, ${data.country}.`)
                setWeather(data)
            })
        }
        fetchWeather()
    },[query, units])

    const formatBackground = () => {
        if (!weather) {
            return 'from-cyan-700 to-blue-700'
        }

        const threshold = units === 'metric' ? 20 : 60;
        if (weather.temp <= threshold) {
            return 'from-cyan-700 to-blue-700'
        } else {
            return 'from-yellow-700 to-orange-700'
        }
    }

    return (
        <div className={`mx-auto w-screen py-1 bg-gradient-to-br ${formatBackground()} h-fit shadow-xl shadow-gray-400 max-h-full`}>
            <div>
                <TopButton setQuery={setQuery}/>
                <Input setQuery={setQuery} units={units} setUnits={setUnits}/>
                {weather && (
                    <div>
                        <TimeAndLocation weather={weather}/>
                        <TemperatureAndDetail weather={weather}/>
                        <Forecast title='hourly forecast' items={weather.hourly}/>
                        <Forecast title='daily forecast' items={weather.daily}/>
                    </div>
                )}
            </div>
            <ToastContainer autoClose={2000} theme='colored' newestOnTop={true}/>
        </div>
    );
}

export default App;
