var AlexaSkill  = require('./AlexaSkill'),
    SkillConfig = require('./Config');

var APP_ID = SkillConfig.APP_ID;

var BennettAffirmations = function () {
    AlexaSkill.call(this, APP_ID);
};

// Extend AlexaSkill
BennettAffirmations.prototype = Object.create(AlexaSkill.prototype);
BennettAffirmations.prototype.constructor = BennettAffirmations;

BennettAffirmations.prototype.eventHandlers.onSessionStarted = function (sessionStartedRequest, session) {
    console.log("BennettAffirmations onSessionStarted requestId: " + sessionStartedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any initialization logic goes here
};

BennettAffirmations.prototype.eventHandlers.onLaunch = function (launchRequest, session, response) {
    console.log("BennettAffirmations onLaunch requestId: " + launchRequest.requestId + ", sessionId: " + session.sessionId);
    var speechOutput = "Welcome to the Bennett Affirmation app. You can say, Tell Bennett he's a good boy!";
    var repromptText = "You can say, Tell Bennett he's a good boy!";
    response.ask(speechOutput, repromptText);
};

BennettAffirmations.prototype.eventHandlers.onSessionEnded = function (sessionEndedRequest, session) {
    console.log("BennettAffirmations onSessionEnded requestId: " + sessionEndedRequest.requestId
        + ", sessionId: " + session.sessionId);
    // any cleanup logic goes here
};

BennettAffirmations.prototype.intentHandlers = {
    // register custom intent handlers
    "PraiseBennettIntent": function (intent, session, response) {
        console.log("BennettAffirmations PraiseBennettIntent");
        response.tell("Bennett, you are a good boy, yes you are!");
    },
    "AMAZON.HelpIntent": function (intent, session, response) {
        console.log("BennettAffirmations AMAZON.HelpIntent");
        response.ask("You can say, Tell Bennett he's a good boy!", "You can say, Tell Bennett he's a good boy!");
    }
};

// Create the handler that responds to the Alexa Request.
exports.handler = function (event, context) {
    // Create an instance of the BennettAffirmations skill.
    var bennettAffirmations = new BennettAffirmations();
    bennettAffirmations.execute(event, context);
};
