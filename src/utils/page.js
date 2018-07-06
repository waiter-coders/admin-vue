import service from './service'
import { Message, MessageBox } from 'element-ui'

const sendRequest = function(url, params, confirmMsg, successMsg, errorMsg, isPost){
  var confirm = Promise.resolve(true);
  if (confirmMsg != undefined && confirmMsg.length > 0) {
    confirm = MessageBox.confirm(confirmMsg)
  }
  return confirm.then(function(){
    var ajax = isPost ? service.post(url, {params:params}) : service.get(url, {params:params}) 
    return ajax.then(function(){
      var success = Promise.resolve(true);
      if (successMsg != undefined && successMsg.length > 0) {
        success = Message.success(successMsg)
      }
      return success
    })
  })
}

const fetch = function(url, params, confirmMsg, successMsg, errorMsg){return sendRequest(url, params, confirmMsg, successMsg, errorMsg, false);}
const post = function(url, params, confirmMsg, successMsg, errorMsg){return sendRequest(url, params, confirmMsg, successMsg, errorMsg, true);}

export default {
  fetch:fetch,
  post:post
}