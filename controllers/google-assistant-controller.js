const path = require('path');
const GoogleAssistant = require('google-assistant');

const assistantController = (command, response) => {
    const authConfig = {
        keyFilePath: path.resolve(__dirname, '../configs/client_secret_619225705068-ftsp4okmmk34ebv3266phfkha5bp0tbu.apps.googleusercontent.com.json'),
        savedTokensPath: path.resolve(__dirname, './tokens.json')
    };
    
    const assistant = new GoogleAssistant(authConfig);

    console.log("In assistant controller : " + command)
    assistant
        .on('ready', () => handleCommand(command, assistant, response))
        .on('error', (error) => {
            console.log('Assistant Error:', error);
        });
}

const handleCommand = (command, assistant,response) => {
    console.log("starting assistant with command : " + command)
    const conversation = {
        lang: 'en-IN',
        showDebugInfo: false,
        textQuery: command
    };

    assistant.start(conversation, (conversation) => startConversation(conversation, response));
};

const startConversation = (conversation,response) => {

    conversation
        .on('response', text => response.send({'Assistant Response': text}))
        .on('debug-info', info => console.log('Debug Info:', info))
        // if we've requested a volume level change, get the percentage of the new level
        .on('volume-percent', percent => console.log('New Volume Percent:', percent))
        // the device needs to complete an action
        .on('device-action', action => console.log('Device Action:', action))
        // once the conversation is ended, see if we need to follow up
        .on('ended', (error, continueConversation) => {
            if (error) {
                console.log('Conversation Ended Error:', error);
            } else if (continueConversation) {
                promptForInput();
            } else {
                console.log('Conversation Complete');
                conversation.end();
            }
        })
        // catch any errors
        .on('error', (error) => {
            console.log('Conversation Error:', error);
        });
};



module.exports = assistantController