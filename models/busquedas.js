const axios = require('axios');

class Busquedas {

    historial = [];

    constructor() {
        // TODO: leer DB si existe
    }

    get paramsMapbox() {
        return {
            'limit': 5,
            'language' : 'es',
            'access_token' : process.env.MAPBOX_KEY
        }
    }

    async ciudad(lugar =  '') {

        try {
            const instancia = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${lugar}.json`,
                params: this.paramsMapbox
            })

            const resp = await instancia.get();
            console.log(resp.data);

            return [];
        } catch (error) {

            return [];
        }

        //peticion http
        // console.log('Ciudad:', lugar);
         //retornar los lugares
    }

}

module.exports = Busquedas;