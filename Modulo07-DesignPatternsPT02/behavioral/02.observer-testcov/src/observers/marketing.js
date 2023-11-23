export default class Marketing {
  update({ id, userName }) {

    //importante lembra que o update é reponsável  por gerenciar seus error/exceptions
    //não deve ter await no notify porque a responsabilidade do notify é so admintir eventos
    // so notificat todo mundo
    console.log(`[${id}]: [Marketing] will send an email to ${userName}`)
  }
}