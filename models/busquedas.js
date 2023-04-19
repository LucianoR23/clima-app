const fs = require('fs');
const axios = require('axios');

class Busquedas {

    historial = [];
    dbPath = './db/database.json'

    constructor() {
        this.leerDB();
    }

    get historialCapitalizado() {

        return this.historial.map(l => {
            let palabras = l.split(' ');
            palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1))

            return palabras.join(' ')
        })
    }

    get paramsMapbox() {
        return {
            'limit': 5,
            'language' : 'es',
            'access_token' : process.env.MAPBOX_KEY
        }
    }
    // get paramsOpenWeather() {
    //     return {
    //         'appid': process.env.OPENWEATHER_KEY,
    //         'units' : 'metric',
    //         'lang' : 'es'
    //     }
    // }

    async ciudad(lugar =  '') {

        try {
            const instancia = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            });

            const resp = await instancia.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {

            return [];
        }

        //peticion http
        // console.log('Ciudad:', lugar);
         //retornar los lugares
    }

    async climaLugar(lat, lon) {

        try {
            const instancia = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {
                    lat,
                    lon,
                    appid: process.env.OPENWEATHER_KEY,
                    units: 'metric',
                    lang: 'es'
                }
            });

            const resp = await instancia.get();
            const {main, weather} = resp.data

            return {
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }
        } catch (error) {
            console.log(error);
        }

    }

    agregarHistorial(lugar = '') {

        if(this.historial.includes(lugar.toLocaleLowerCase())) {
            return
        }
        this.historial = this.historial.splice(0,4);

        this.historial.unshift(lugar.toLocaleLowerCase());

        //Grabar en DB
        this.guardarDB();
    }

    guardarDB() {

        const payload = {
            historial: this.historial
        }

        fs.writeFileSync(this.dbPath, JSON.stringify(payload));

    }

    leerDB() {

        if(!fs.existsSync(this.dbPath)) return;

        const info = fs.readFileSync(this.dbPath, {encoding: 'utf-8'});
        const data = JSON.parse(info)

        this.historial = data.historial;

    }

}

module.exports = Busquedas;