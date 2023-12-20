const path = require('path');
const GoogleAssistant = require('google-assistant');

const authConfig = {
    keyFilePath: path.resolve(__dirname, './client_secret_619225705068-ftsp4okmmk34ebv3266phfkha5bp0tbu.apps.googleusercontent.com.json'),
    savedTokensPath: path.resolve(__dirname, './tokens.json')
};

const assistant = new GoogleAssistant(authConfig);

module.exports = assistant