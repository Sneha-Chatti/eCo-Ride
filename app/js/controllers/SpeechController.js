'use strict';

ecoRideApp.controller('SpeechController',
    function SpeechController($scope, $rootScope) {
      var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
      var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
      var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent

      var recognition = new SpeechRecognition();
      var speechRecognitionList = new SpeechGrammarList();

      recognition.continuous = false;
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      var diagnostic = document.querySelector('#output');
      var bg = document.querySelector('html');
      var hints = document.querySelector('.hints');


      recognition.start();

      recognition.onstart = function(event) {
        console.log('Ready to receive a color command.');
      }

      recognition.onresult = function(event) {
        var text = event.results[0][0].transcript;
        console.log(text);

        if(text.search("home")!= -1) {
          window.location.replace("#!/home");
        }
        else if((text.search("give")!= -1) && (text.search("ride")!= -1)) {
          window.location.replace("#!/shareRide");
        }
        else if((text.search("get")!= -1) && (text.search("ride")!= -1)) {
          window.location.replace("#!/bookRide");
        }
        else if((text.search("how")!= -1) && (text.search("ride")!= -1) && (text.search("works")!= -1)) {
          window.location.replace("#HowEcoRide");
        }
        else if((text.search("why")!= -1) && ((text.search("ride")!= -1) || (text.search("carpool")!= -1))) {
          window.location.replace("#WhyEcoRide");
        }
        else if((text.search("login")!= -1) || (text.search("sign in")!= -1)) {
          window.location.replace("#!/login");
        }
        else if((text.search("register")!= -1) || (text.search("sign up")!= -1)) {
          window.location.replace("#!/register");
        }
        recognition.onend = function(event) {
          recognition.start();
        }
      }
    })
