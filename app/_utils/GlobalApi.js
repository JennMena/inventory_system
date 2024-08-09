const { default: axios } = require("axios")

const SendEmail = (data) =>{
    axiosos.post('/api/send', data)
}

export default{
    SendEmail
}