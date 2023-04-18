require('dotenv').config()

const { inquirerMenu, pausa, leerInput } = require("./helpers/inquirer");
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
                await busquedas.ciudad(lugar);


                // buscar los lugares

                // seleccionar el lugar

                //Clima datos

                // mostrar resultados
                console.log('\nInformacion de la ciudad\n'.brightBlue);
                console.log('Ciudad:', );
                console.log('Lat:', );
                console.log('Lng:', );
                console.log('Temperatura:', );
                console.log('Minima:', );
                console.log('Maxima:', );
                break;
        
            default:
                break;
        }

        if(opt !== 0) await pausa();
    } while (opt !== 0);

}

main();