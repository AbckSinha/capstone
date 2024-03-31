// @file controller.js
const config = require('../config/dev-config.json');
const AESService = require('./services/AES');

class Controller {

    async getData(request, response) {
        try {
            console.log("request >>>", request.body);
            var encrypted, URL;
            encrypted = AESService.encrypt(request.body.text.toUpperCase());
            const resp = {
                status: "success",
                msg: "hello "
            }
            console.log("response from api >>>", resp);
            response.status(200).send(resp);
        }
        catch (error) {
            console.log("API Failure", error);
        }
    }
}

module.exports = new Controller();