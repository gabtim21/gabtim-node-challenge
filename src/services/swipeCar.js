'use strict';
const axios = require('axios')

const listCars = async (event) => {
    const path = `https://swapi.py4e.com/api/vehicles`

    await axios.get(`${path}`)
        .then((response) => {
            return {
                statusCode: 201,
                body: JSON.stringify({
                    code:0,
                    data: response.data
                })
            }
        }).catch((error) => {
            return {
                statusCode: 500,
                message: error.toString()
            }
        })
    
}

const getCar = async (event) => {
  
    const { id } = event.pathParameters
    const path = `https://swapi.py4e.com/api/vehicles/${id}`

    await axios.get(`${path}`)
        .then((response) => {
            return {
                statusCode: 201,
                body: JSON.stringify({
                    code:0,
                    data:{
                        'nombre': response.data.title,
                        'modelo': response.data.model,
                        'manufacturado': response.data.manufacturer,
                        'costo_en_credito': response.data.cost_in_credits,
                        'longitud': response.data.length,
                        'velocidad_atmosferica_max': response.data.max_atmosphering_speed,
                        'equipo': response.data.crew,
                        'pasajeros': response.data.passengers,
                        'capacidad_de_carga': response.data.cargo_capacity,
                        'consumibles': response.data.consumables,
                        'clase_de_vehiculo': response.data.vehicle_class
                    }
                })
            }
        }).catch((error) => {
            return {
                statusCode: 500,
                message: error.toString()
            }
        })
    
}

module.exports = {
    listCars,
    getCar
}