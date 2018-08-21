'use strict';

var Alexa = require('alexa-sdk');


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

  alexa.execute();
};

var handlers = {
  
'LaunchRequest': function() {
    this.emit('PlayStream');
  },
  'PlayStream': function() {
    this.response.audioPlayerPlay('REPLACE_ALL', streamInfo.url, 1, null, 0);
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
    this.response.speak('There is only one scene.');
    this.emit(':responseReady');
  },
  'AMAZON.PreviousIntent': function() {
    console.log()
    this.response.speak('There is only one scene.');
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

    var NightSignOff = [
      'Its time for all good crickets to go to sleep now.',
      'Good night, maybe the crickets will visit you in your dreams.',
      'The crickets will let you sleep now. They told me to say good night.',
      'The owls say sweet dreams.',
      'The crickets say its time for everyone outdoors to go to bed now.',
      'Its time for some peace and quiet now.',
      'Everyone outdoors says good night.',
      'Okay. I\'ll let the crickets go to sleep now.',
      'I\'ll put the train in the station and everyone will be quiet now.',
      'Its time for the crickets to have their dinner anyway.',
    ];
    var SignOffArr = NightSignOff;
    var SignOffIndex = Math.floor(Math.random() * SignOffArr.length);
    var randomSignOff = SignOffArr[SignOffIndex];
    var speechOutput = randomSignOff;
      

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
