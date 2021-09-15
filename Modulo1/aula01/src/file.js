const {readFile} = require('fs/promises')
const {error} = require('./constants')

const DEFAULT_OPTIONS={
  maxLines:3,
  fields: ["id", "name", "profession", "age"]
}
class File{
  static async csvToJson(filePath){
    const content = await File.getFileContent(filePath)
    const validation = File.isValid(content)
    if(!validation.valid) throw new Error(validation.error)

    return content
  }

  static async getFileContent(filePath){
    return (await readFile(filePath)).toString('utf8')
  }

  static isValid(csvString,options=DEFAULT_OPTIONS){
      const [header, ...fileWithoutHeader] = csvString.split('\r\n')
      const isHeaderValid = header === options.fields.join(',')
      if(!isHeaderValid) {
          return {
              error: error.FILE_FIELD_ERROR_MESSAGE,
              valid: false
          }
      }

      const isContentLengthAccepted =(
        fileWithoutHeader.length  > 0 &&
        fileWithoutHeader.length <= options.maxLines
      )

      if(!isContentLengthAccepted){
        return{
          error: error.FILE_LENGTH_ERROR_MESSAGE,
          valid: false
        }
      }

      return {valid: true}
  }
}

(async()=>{
  // const result =await File.csvToJson('./../mocks/threeItems-valid.csv')
  // const result =await File.csvToJson('./../mocks/fourItems-invalid.csv')
  // const result = await File.csvToJson('./../mocks/invalid-header.csv')
  // const result = await File.csvToJson('./../mocks/emptyFile.csv')
  // console.log('result',result)
})()

module.exports = File