"use strict";
const crypto = require('crypto'),
    config = require('../../config/dev-config.json');

module.exports = {
    encrypt: encrypt
};

const key = config.AES.key, iv = config.AES.iv;


function encrypt(text) {
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);
    let encText = cipher.update(text, 'utf-8', 'base64');
    encText += cipher.final('base64');
    encText = deputize(encText);
    return encText;
}

function deputize(plainText) {
    var result = plainText.replaceAll('+', '~').replaceAll('/', '_');
    return result;
}



