'use strict';
const { v4 } = require('uuid')
const connection = require('../config/database')

const createBook = async (event) => {

  const { title, description, price, symbol } = JSON.parse(event.body)
  
  try{

    const date_of_issue = new Date()
    const id = v4()

    const newBook = {
      id,
      title,
      description,
      date_of_issue,
      price,
      symbol
    }

    await connection.put({
      TableName: "booksTable",
      Item: newBook
    }).promise()

    return {
      statusCode: 201,
      body: JSON.stringify({
        code:0,
        message: 'Libro Creado Correctamente',
        data: newBook
      })
    }

  }catch(e){
    return {
      statusCode: 500,
      message: e.toString()
    }
  }
}

const getBooks = async (event) => {

  try{
    const data = await connection.scan({
      TableName: "booksTable"
    }).promise()
  
    const records = data.Items
  
    return {
      statusCode: 200,
      body: JSON.stringify({
        code:0,
        message: 'Listado de Libros',
        data: records
      })
    }
  }catch(e){
    return {
      statusCode: 500,
      message: e.toString()
    }
  }
}

module.exports = {
  createBook,
  getBooks,
}