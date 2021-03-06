const Alexa = require('ask-sdk');
const getmp3 = require ("./getmp3.js");


const LaunchRequestHandler = {
	canHandle(handlerInput) {
		return (handlerInput.requestEnvelope.request.type === 'LaunchRequest') 
		|| (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      	&& handlerInput.requestEnvelope.request.intent.name === 'AMAZON.ResumeIntent')
		|| (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      	&& handlerInput.requestEnvelope.request.intent.name === 'AMAZON.NextIntent')
		|| (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      	&& handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PreviousIntent')
		|| (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      	&& handlerInput.requestEnvelope.request.intent.name === 'AMAZON.RepeatIntent')
		|| (handlerInput.requestEnvelope.request.type === 'IntentRequest'
      	&& handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StartOverIntent')
	},
	async handle(handlerInput) {
		const mp3 = await getmp3()
		return handlerInput.responseBuilder
		.addAudioPlayerPlayDirective("REPLACE_ALL", 
			mp3, 
			"", 
			0)
		.withSimpleCard("Welcome to The Atlantic's Daily Idea")
		.getResponse();
		}
}

const PauseIntentHandler = {
 	canHandle(handlerInput) {
    	return handlerInput.requestEnvelope.request.type === 'IntentRequest'
      	&& (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.PauseIntent'
      	|| handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent');
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