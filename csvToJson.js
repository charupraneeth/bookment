// this requires convert-csv-to-json dependency
const csvToJson = require('convert-csv-to-json')

let input = 'books.csv'
let output = 'books.json'

csvToJson.generateJsonFileFromCsv(input,output);