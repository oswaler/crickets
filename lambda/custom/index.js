'use strict';

var Alexa = require('alexa-sdk');


/* added line
context.callbackWaitsForEmptyEventLoop = false;
to exports.handler
This ends the session as soon as user says stop. Remove this if it becomes
useful to leave the session open.
*/

// Define signoffs and welcomes to be chosen at random on play and stop
const SignOff = [
  'Its time for all good crickets to go to sleep now.',
  'Good night, maybe the crickets will visit you in your dreams.',
  'The crickets will let you sleep now. They told me to say good night.',
  'The owls say sweet dreams.',
  'I\'ll let the crickets go to sleep now.',
  'The crickets say its time for everyone outdoors to go to bed now.',
  'Its time for some peace and quiet now.',
  'Everyone outdoors says good night.',
  'I\'ll let the crickets go to sleep now.',
  'I\'ll put the train in the station and everyone will be quiet now.',
  'Its time for the crickets to have their dinner anyway.',
  'The crickets have been singing all night. Its time for them to take a nap.',
  'The crickets will be here for you later.',
];

const SignOn = [
  'Let me open the window so you can hear everyone.',
  'Let me go wake up the crickets.',
  'Let\'s see if the crickets are ready.',
  'I think I hear the crickets, let me go open the window.',
  'Crickets, all together now. One, Two, Three.',
  'The crickets just finished warming up. They\'re ready to sing for you now.',
  'Give me a second, I just need to make sure everyone\'s ready.',
  'I just need to round everyone up.',
];

/* Removing localized time signoffs due to privacy issues
const MorningSignOff = [
  'Its time for the crickets to go have their breakfast anyway.',
  'I\'ll let the crickets get on with their day.',
  'The crickets have been singing all night. Its time for them to take a nap.',
  'I\'ll let the crickets out now. They told me to say have a good day.',
  'The owls say have a good morning.',
  'I hope you have a nice day.',
  'The crickets will be here later.',
  'Don\'t worry, I\'ll make sure the crickets are around to sing to you tonight.',
];

const AfternoonSignOff = [
  'I\'ll let the crickets take a nap so they\'ll be ready to sing to you tonight.',
  'The crickets say have a nice afternoon.',
  'Its time for the crickets to have their lunch anyway.',
  'Its time for the owls to go take a nap now.',
  'I\'ll let everyone go play until you\'re ready for them later.',
  'I need to go let the dogs out anyway.',
];
*/




var streamInfo = {
  title: 'Outdoor Scene',
  subtitle: 'A relaxing audio stream including crickets, trains, cats, birds, etc.',
  cardContent: "Enjoy :-)",
  url: 'https://s3-us-west-1.amazonaws.com/ericcrickets/crickets.mp3',
  image: {
    largeImageUrl: 'https://s3-us-west-1.amazonaws.com/ericcrickets/gentleecho512.png',
    smallImageUrl: 'https://s3-us-west-1.amazonaws.com/ericcrickets/gentleecho108.png',
    
    //largeImageUrl: 'https://s3-us-west-1.amazonaws.com/ericcrickets/gentleecholarge.png',
    //smallImageUrl: 'https://s3-us-west-1.amazonaws.com/ericcrickets/gentleechosmall.png'
  }
};

exports.handler = (event, context, callback) => {
  var alexa = Alexa.handler(event, context, callback);
  
  const APP_ID = 'amzn1.ask.skill.70b0851f-7594-4b10-b1db-45dbc4cd9530';
  alexa.appId = APP_ID;
  alexa.registerHandlers(
    handlers,
    audioEventHandlers
  );
  context.callbackWaitsForEmptyEventLoop = false;
  alexa.execute();
};

var handlers = {
  
'LaunchRequest': function() {
    this.emit('PlayStream');
  },
  'PlayStream': function() {
    
   //choose random welcome signon
   var SignOnArr = SignOn;
   var SignOnIndex = Math.floor(Math.random() * SignOnArr.length);
   var randomSignOn = SignOnArr[SignOnIndex];
   var speechOutputSignOn = 'Okay, ' + randomSignOn;
    
    
    this.response.speak(speechOutputSignOn).audioPlayerPlay('REPLACE_ALL', streamInfo.url, 1, null, 0);
    this.emit(':responseReady');
  },
  'AMAZON.HelpIntent': function() {
    // skill help logic goes here
    this.emit(':responseReady');
  },
  'SessionEndedRequest': function() {
    // no session ended logic needed
  },
  'ExceptionEncountered': function() {
    console.log("\n---------- ERROR ----------");
    console.log("\n" + JSON.stringify(this.event.request, null, 2));
    this.callback(null, null)
  },
  'Unhandled': function() {
    this.response.speak('Sorry. Something went wrong.');
    this.emit(':responseReady');
  },
  'AMAZON.NextIntent': function() {
    console.log()
    this.response.speak('For now there is only one scene. Others will be added later.');
    this.emit(':responseReady');
  },
  'AMAZON.PreviousIntent': function() {
    console.log()
    this.response.speak('There is only one scene. Others will be added later.');
    this.emit(':responseReady');
  },
  'AMAZON.PauseIntent': function() {
    console.log()
    this.emit('AMAZON.StopIntent');
  },
  'AMAZON.CancelIntent': function() {
    console.log()
    this.emit('AMAZON.StopIntent');
  },
  'AMAZON.StopIntent': function() {
    console.log()

   /*Find out whether its morning, afternoon or evening
    ******Disabling code for this due to privacy concerns of getting user's local time.
          If it becomes less invasive in the future to get their timezone info 
          I'll add this back in.

   var datFullDate = new Date();
   var datHour = datFullDate.getHours();
   var SignOffArr;

   if (datHour >= 5 && datHour < 12) {
    SignOffArr = MorningSignOff;
   }   
   else if (datHour >= 12 && datHour < 18) {
     SignOffArr = AfternoonSignOff;
   }
   else {
     SignOffArr = NightSignOff;
   }
    */
    
    // Choose random signoff message from proper set of signoffs
    var SignOffArr = SignOff;
    var SignOffIndex = Math.floor(Math.random() * SignOffArr.length);
    var randomSignOff = SignOffArr[SignOffIndex];
    var speechOutput = 'Okay, ' + randomSignOff;
      

    this.response.speak(speechOutput).audioPlayerStop();
    this.emit(':responseReady');
  },
  'AMAZON.ResumeIntent': function() {
    console.log()
    this.emit('PlayStream');
  },
  'AMAZON.LoopOnIntent': function() {
    console.log()
    this.emit('AMAZON.StartOverIntent');
  },
  'AMAZON.LoopOffIntent': function() {
    console.log()
    this.emit('AMAZON.StartOverIntent');
  },
  'AMAZON.ShuffleOnIntent': function() {
    console.log()
    this.emit('AMAZON.StartOverIntent');
  },
  'AMAZON.ShuffleOffIntent': function() {
    console.log()
    this.emit('AMAZON.StartOverIntent');
  },
  'AMAZON.StartOverIntent': function() {
    console.log()
    this.response.speak('Sorry. I can\'t do that yet.');
    this.emit(':responseReady');
  },
  'PlayCommandIssued': function() {
    console.log()
    if (this.event.request.type === 'IntentRequest' || this.event.request.type === 'LaunchRequest') {
      var cardTitle = streamInfo.subtitle;
      var cardContent = streamInfo.cardContent;
      var cardImage = streamInfo.image;
      this.response.cardRenderer(cardTitle, cardContent, cardImage);
    }
    
   
    this.response.audioPlayerPlay('ENQUEUE', streamInfo.url, 2, 1, 0);
    this.emit(':responseReady');
  },
  'PauseCommandIssued': function() {
    this.emit('AMAZON.StopIntent');
  }
}

var audioEventHandlers = {
  'PlaybackStarted': function() {
    console.log()
    this.emit(':responseReady');
  },
  'PlaybackFinished': function() {
    console.log()
    this.emit(':responseReady');
  },
  'PlaybackStopped': function() {
    console.log()
    this.emit(':responseReady');
  },
  'PlaybackNearlyFinished': function() {
    console.log()
    this.response.audioPlayerPlay('REPLACE_ALL', streamInfo.url, streamInfo.url, null, 0);
    this.emit(':responseReady');
  },
  'PlaybackFailed': function() {
    console.log()
    this.response.audioPlayerClearQueue('CLEAR_ENQUEUED');
    this.emit(':responseReady');
  }
}
