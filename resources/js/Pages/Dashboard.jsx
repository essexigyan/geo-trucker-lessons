import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useGeolocated } from "react-geolocated";
import { useEffect, useState } from "react";
import videoData from "../data/videos.json";
import YouTube from "react-youtube";
import env from "react-dotenv";

export default function Dashboard({ auth }) {
    const [weather, setWeather] = useState();
    const [videos, setVideos] = useState();

    const doWeatherData = (data) => {
        setWeather(data);
        setVideos(videoData);
    };

    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
    const api = import.meta.env.VITE_WEATHER_API;
    const getWeatherData = async () => {
        try {
            const result = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?lat=${coords.latitude}&lon=${coords.longitude}&appid=${api}`
            );
            let data = await result.json();
            return data;
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (coords) {
            let data = getWeatherData().then((resp) => {
                doWeatherData(resp);
            });
        }
    }, [coords]);

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Dashboard
                </h2>
            }
        >
            <Head title="Dashboard" />
            {weather && console.log(weather)}
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        {!isGeolocationAvailable && (
                            <div>Your browser does not support Geolocation</div>
                        )}
                        {!isGeolocationEnabled && (
                            <div>Geolocation is not enabled</div>
                        )}
                        {!coords && (
                            <div>Getting the location data&hellip; </div>
                        )}
                        {coords && (
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Latitude: </td>
                                        <td>{coords.latitude}</td>
                                    </tr>
                                    <tr>
                                        <td>Longitude: </td>
                                        <td>{coords.longitude}</td>
                                    </tr>
                                    {/* 
                                    <tr>
                                        <td>heading</td>
                                        <td>{coords.heading}</td>
                                    </tr>
                                    <tr>
                                        <td>speed</td>
                                        <td>{coords.speed}</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        )}
                        {!coords && (
                            <div>Getting the weather data&hellip; </div>
                        )}
                        {weather && (
                            <table>
                                <tbody>
                                    <tr>
                                        <td>City Name: </td>
                                        <td>{weather.name}</td>
                                    </tr>
                                    <tr>
                                        <td>Weather: </td>
                                        <td>{weather.weather[0].main}</td>
                                    </tr>
                                    <tr>
                                        <td>Description: </td>
                                        <td>
                                            {weather.weather[0].description}
                                        </td>
                                    </tr>
                                    {/* <tr>
                                        <td>heading</td>
                                        <td>{coords.heading}</td>
                                    </tr>
                                    <tr>
                                        <td>speed</td>
                                        <td>{coords.speed}</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <table>
                            <tbody>
                                <tr>
                                    <td>Videos</td>
                                </tr>
                                {videos &&
                                    videos
                                        .filter(
                                            (item) =>
                                                item.category ==
                                                weather.weather[0].main
                                        )
                                        .map((items, id) => (
                                            <tr key={items.id}>
                                                <td>
                                                    <YouTube
                                                        videoId={items.embed}
                                                    />
                                                </td>
                                            </tr>
                                        ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
