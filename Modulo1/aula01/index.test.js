const File = require("./src/file")
const { error } = require("./src/constants")
const { rejects } = require('assert')
;
(async() =>{
  {
    const filePath = './mocks/emptyFile.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result,rejection)
  }
  {
    const filePath = './mocks/fourItems-invalid.csv'
    const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE)
    const result = File.csvToJson(filePath)
    await rejects(result,rejection)
  }
  {
    const filePath = './mocks/threeItems-valid.csv'
    const result = File.csvToJson(filePath)
    await expected ={
      
    }
  }
})()