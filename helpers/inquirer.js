const inquirer = require('inquirer');
require('colors');

const preguntas = [
    {
        type: 'list',
        name: 'opcion',
        message: '¿Que desea hacer?',
        choices: [
            {
                value: 1,
                name: `${'1-'.brightBlue} Buscar ciudad`
            },
            {
                value: 2,
                name: `${'2-'.brightBlue} Historial`
            },
            {
                value: 0,
                name: '0- Salir'.brightRed
            },
        ]
    }
]

const inquirerMenu = async() => {

    console.clear();
    console.log('==============================='.brightWhite);
    console.log('     Seleccione una opcion     '.brightBlue);
    console.log('===============================\n'.brightWhite);

    const {opcion} = await inquirer.prompt(preguntas)

    return opcion;

}

const pausa = async() => {

    const pregunta = [
        {
            type: 'input',
            name: 'enter',
            message: `Presione ${'ENTER'.brightBlue} para continuar`
        }
    ]
    console.log('\n');
    await inquirer.prompt(pregunta);
}

const leerInput = async(message) => {
    const pregunta = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if(value.length === 0) {
                    return 'Por favor ingrese un valor'
                }
                return true
            }
        }
    ];

    const {desc} = await inquirer.prompt(pregunta);
    return desc;
}


const listarLugares = async(lugares = []) => {
    
    const choices = lugares.map((lugar, i) => {
        const idx = `${i + 1}-`.brightBlue;

        return {
            value: lugar.id,
            name: `${idx} ${lugar.nombre}`
        }
    });

    choices.unshift({
        value: '0',
        name: '0-'.brightBlue + ' Cancelar'
    });

    const preguntas = [
        {
            type: 'list',
            name: 'id',
            message: 'Seleccione lugar',
            choices
        }
    ]
    
    const {id} = await inquirer.prompt(preguntas);
    return id;
}

const confirmar = async(message) => {

    const pregunta = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(pregunta);
    return ok;
}

const mostrarListadoChecklist = async(tareas = []) => {
    
    const choices = tareas.map((tarea, i) => {
        const idx = `${i + 1}-`.blue;

        return {
            value: tarea.id,
            name: `${idx} ${tarea.desc}`,
            checked: (tarea.completadoEn) ? true : false
        }
    });

    const pregunta = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]
    
    const {ids} = await inquirer.prompt(pregunta);
    return ids;
}

module.exports = {
    inquirerMenu,
    pausa,
    leerInput,
    listarLugares,
    confirmar,
    mostrarListadoChecklist
}