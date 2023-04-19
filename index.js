require('dotenv').config()

const { inquirerMenu, pausa, leerInput, listarLugares } = require("./helpers/inquirer");
const Busquedas = require("./models/busquedas");


const main = async() => {

    const busquedas = new Busquedas();
    let opt;

    do {
        opt = await inquirerMenu()
        
        switch (opt) {
            case 1:
                // mostrar mensaje
                const lugar = await leerInput('Ciudad: ');
                
                // buscar los lugares
                const lugares = await busquedas.ciudad(lugar);
                
                // seleccionar el lugar
                const id = await listarLugares(lugares);
                if(id === '0') continue;

                
                const lugarSelec = lugares.find(l => l.id === id);
                
                busquedas.agregarHistorial(lugarSelec.nombre);

                //Clima datos
                const clima = await busquedas.climaLugar(lugarSelec.lat, lugarSelec.lng)
                
                // mostrar resultados
                console.clear();
                console.log('\nInformacion de la ciudad\n'.brightBlue);
                console.log('Ciudad:', lugarSelec.nombre.brightBlue);
                console.log('Lat:', lugarSelec.lat);
                console.log('Lng:', lugarSelec.lng);
                console.log('Temperatura:', clima.temp);
                console.log('Minima:', clima.min);
                console.log('Maxima:', clima.max);
                console.log('Como esta el clima:', clima.desc.brightBlue);
                
                break;
        
            case 2:
                busquedas.historialCapitalizado.forEach((lugar, i) => {
                    const idx = `${i + 1}-`.brightBlue
                    console.log(`${idx} ${lugar}`);
                })

        }

        if(opt !== 0) await pausa();
    } while (opt !== 0);

}

main();