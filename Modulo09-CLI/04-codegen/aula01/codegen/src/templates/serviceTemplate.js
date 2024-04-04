import Util from "../util.js"

const componentNameAnchor = '$$componentName'
const currentContextAnchor = '$$currentContext'
const repositoryAnchor = '$$repositoryName'
const template = `
export default class $$componentNameService {
  constructor({repository: $$repositoryName}){
    this.$$currentContext = $$repositoryName
  }

  create(data){
    return this.$$currentContext.create(data)
  }

  read(query){
    return this.$$currentContext.read(query)
  }

  update(id,data){
    return this.$$currentContext.update(id,data)
  }

  delete(id){
    return this.$$currentContext.delete(id)
  }
}`
export function serviceTemplate(componentName, repositoryName) {
  const currentContext = `${repositoryName}`
  const txtFile = template
    .replaceAll(componentNameAnchor, Util.upperCaseFirstLetter(componentName))
    .replaceAll(currentContextAnchor, currentContext)
    .replaceAll(repositoryAnchor, repositoryName)
  return {
    fileName: `${componentName}Service`,
    template: txtFile
  }
}