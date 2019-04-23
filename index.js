const Alexa = require('ask-sdk');
const getmp3 = require ("./getmp3.js");


const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return (handlerInput.requestEnvelope.request.type === 'LaunchRequest') 
		|| (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      	&& handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent');
	},
	async handle(handlerInput) {
		const speechText = 'Welcome!! hello!! you are here!';
		const mp3 = await getmp3()
		return handlerInput.responseBuilder
		.addAudioPlayerPlayDirective("REPLACE_ALL", 
			mp3, 
			"type whatever you want", 
			0)
		.withSimpleCard('Hello World', speechText)
		.getResponse();
		}
}

 // quit, stop, pause

const PauseIntentHandler = {
 	canHandle(handlerInput) {
    	return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      	&& handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent';
  	},
		handle(handlerInput) {
   		return handlerInput.responseBuilder
      	.addAudioPlayerStopDirective()
      	.getResponse();
      }
}


	
const skillBuilder = Alexa.SkillBuilders.custom();

exports.handler = skillBuilder
	.addRequestHandlers(
		LaunchRequestHandler, PauseIntentHandler
		)
	.lambda();