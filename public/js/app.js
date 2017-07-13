var btn = document.querySelector('#button');
var parent = document.querySelector('#parent');
var form = document.querySelector('form');
var goal = '';

var getChats = function() {
  var settings = {
    // url: 'https://afternoon-dawn-85391.herokuapp.com/chat'
    url: '/chat'
  }
  $.ajax(settings).done(function(response) {
    messageBox = $('#message_box')[0]
    while (messageBox.firstChild) {
      messageBox.removeChild(messageBox.firstChild);
    }
    console.log(response);
    chats = JSON.parse(response);
    console.log(chats);
    if (chats.length == 0) {
      postUI(uiChats.intro)
    } else {
      _.each(chats, function(chat) {
        var currentDiv = document.createElement('div');
        currentDiv.classList.add(chat.origin);
        currentDiv.classList.add('message');
        var currentP = document.createElement('p');
        currentP.innerHTML = chat.body;
        currentDiv.appendChild(currentP);
        $('#message_box')[0].appendChild(currentDiv);
      })
      if (chats[chats.length - 1].origin == 'ui') {
        chat = chats[chats.length - 1];
        var currentDiv = document.createElement('div');

        currentDiv.classList.add('ui_row');
        buttons = chat.buttons.split(',');
        _.each(buttons, function(buttonStr) {
          var currentBtn = document.createElement('button');
          currentBtn.classList.add('ui_button');
          currentBtn.innerHTML = buttonStr;
          // currentBtn.onclick = 'dbInterface.' + buttonStr.toLowerCase().replace(' ', '_');
          var stringParse = 'dbInterface.' + buttonStr.toLowerCase().replace(' ', '_') + '()';
          console.log(stringParse);
          // stringCommand = eval(stringParse);
          // console.log(stringCommand);
          // currentBtn.onclick = eval('function() {' + stringParse + '};');
          currentBtn.onclick = function() {
            postChat(buttonStr);
            eval(stringParse);
          };
          currentDiv.appendChild(currentBtn);
        })
        $('#message_box')[0].appendChild(currentDiv);
      }
    }
  });
}

window.onload = function() {
  getChats();
}

var postChat = function(chatInput) {
  var settings = {
    url: '/chat',
    data: {
      body: chatInput
    }
  }
  $.post(settings)
}

var postUI = function(inputObj) {
  var settings = {
    url: '/ui',
    data: {
      body: inputObj.body,
      origin: inputObj.origin,
      buttons: inputObj.buttons
    }
  }
  $.post(settings).done(function() {
    getChats()
  });
}

$('#button').on('click', function(ev) {
  postChat($('#userInput')[0].value);
  getChats();
});


var dbInterface = {
  postGoal: function(goalName) {},
  getGoals: function() {},
  long_term: function() {


  },
  short_term: function() {


  },
  great: function() {
    // console.log('sdkjf');
    // postUI(uiChats.awesome);
    setTimeout(function(){ postUI(uiChats.awesome); }, 200);
    setTimeout(function(){ postUI(uiChats.goal_type); }, 900);


  },
  not_so_good: function() {


  },
  not_sure: function() {

  },
  professional: function() {
    postUI(uiChats.professional);
    setTimeout(function(){ postUI(uiChats.tell_goal); }, 900);
    setTimeout(function(){ btn.addEventListener('click', function() {
      goal = $('#userInput')[0].value;
      goalObj = {};
      goalObj.body = "So you want to " + goal.replace('I want to ', '').replace('i want to ', '') + ". That's awesome.";
      goalObj.origin = 'app';
      postUI(goalObj);
      $('#userInput')[0].value = '';
      setTimeout(function(){ postUI(uiChats.goal_timeframe); }, 400);
    }); }, 900);


    // setTimeout(function(){ postUI(uiChats.goal_timeframe); }, 900);
  },
  physical: function() {

  },
  personal: function() {

  },
  a_month: function() {

  },
  a_year: function() {

  },
  three_years: function() {

  }

}

// body, origin, buttons
var uiChats = {
  intro: {
    body: "Hey. How\'s it going today?",
    origin: "ui",
    buttons: 'Great,Not So Good,Not Sure'
  },
  awesome: {
    body: "Awesome. To stay feeling great, it can help to have some goals for the future. If you tell me a few things, I can help keep track of your goals for you and check in on your progress.",
    origin: 'app'
  },
  goal_type: {
    body: "Imagine a goal you want to have achieved in the future. First, tell me what kind of goal this is.",
    origin: "ui",
    buttons: 'Professional,Physical,Personal'
  },
  professional: {
    body: "Cool. Having professional goals can help make your work more meaningful. ", origin: 'app'
  },
  goal_timeframe: {
    body: "Pick a timeframe for achieving this goal. Make it achievable, and be generous.",
    origin: "ui",
    buttons: 'A month,A year,Three years'
    },
  tell_goal: {
    body: "Tell me in a few words what this goal is. You can say 'I want to...'",
    origin: "app"
  }
}








// $('#button').on('click', function(ev) {
//   var settings = {
//     url: 'https://afternoon-dawn-85391.herokuapp.com/chat',
//     data: {
//       body: $('#userInput')[0].value
//     }
//   }
//   $.post(settings).done(function() {
//     var settings = {
//       url: 'https://afternoon-dawn-85391.herokuapp.com/chat'
//       // data: { t: input.value, apikey: '2f6435d9' }
//     }
//
//     $.ajax(settings).done(function(response) {
//       messageBox = $('#message_box')[0]
//       while (messageBox.firstChild) {
//         messageBox.removeChild(messageBox.firstChild);
//       }
//       console.log(response);
//       chats = JSON.parse(response);
//       console.log(chats);
//       _.each(chats, function(chat) {
//         var currentDiv = document.createElement('div');
//         currentDiv.classList.add(chat.origin);
//         currentDiv.classList.add('message');
//         var currentP = document.createElement('p');
//         currentP.innerHTML = chat.body;
//         currentDiv.appendChild(currentP);
//         $('#message_box')[0].appendChild(currentDiv);
//       })
//     });
//   })
// });



// window.onload = function() {
//   var settings = {
//     url: 'https://afternoon-dawn-85391.herokuapp.com/chat'
//   }
//
//   $.ajax(settings).done(function(response) {
//     messageBox = $('#message_box')[0]
//     while (messageBox.firstChild) {
//       messageBox.removeChild(messageBox.firstChild);
//     }
//     console.log(response);
//     chats = JSON.parse(response);
//     _.each(chats, function(chat) {
//       var currentDiv = document.createElement('div');
//       currentDiv.classList.add(chat.origin);
//       currentDiv.classList.add('message');
//       var currentP = document.createElement('p');
//       currentP.innerHTML = chat.body;
//       currentDiv.appendChild(currentP);
//       $('#message_box')[0].appendChild(currentDiv);
//     })
//   });
// }

// function loadXMLDoc() {
//   var xhttp = new XMLHttpRequest();
//   xhttp.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//       document.getElementById("demo").innerHTML =
//       this.responseText;
//     }
//   };
//   xhttp.open("GET", "/Users/kudzu/wdi/men/chatbot.txt", true);
//   xhttp.send();
// }
//
// document.getElementById('update').addEventListener('click', loadXMLDoc);
//
//
// function readTextFile(file)
// {
//     var rawFile = new XMLHttpRequest();
//     rawFile.open("GET", file, false);
//     rawFile.onreadystatechange = function ()
//     {
//         if(rawFile.readyState === 4)
//         {
//             if(rawFile.status === 200 || rawFile.status == 0)
//             {
//                 var allText = rawFile.responseText;
//                 alert(allText);
//             }
//         }
//     }
//     rawFile.send(null);
// }


// var text = ("<aiml><category><pattern>HI</pattern>" + "<template>Hi Im Benny</template></category>" +
// "<category><pattern>I M SAD</pattern><template>It's alright to feel sad sometimes. Can you tell me more?</template>"
// + "</category>" +
// "<category><pattern>I M SAD</pattern><template>It's alright to feel sad sometimes. Can you tell me more?</template></category></aiml>")
//
//
// parser = new DOMParser();
// xmlDoc = parser.parseFromString(text,"text/xml");
//
//
//
// patterns = [];
// xmlDoc.getElementsByTagName('pattern');
// var length = xmlDoc.getElementsByTagName('pattern').length;
// for (var i = 0; i < length; i++) {
//   patterns.push(xmlDoc.getElementsByTagName('pattern')[i].innerHTML.toLowerCase())
// }
//
// templates = [];
// var length = xmlDoc.getElementsByTagName('template').length;
// for (var i = 0; i < length; i++) {
//   templates.push(xmlDoc.getElementsByTagName('template')[i].innerHTML)
// }


// var getResponse = function(input) {
//   if (patterns.indexOf(input) === -1) {
//     return 'Sorry, I don\'t understand'
//   } else {
//     var location = patterns.indexOf(input.toLowerCase());
//     return templates[location];
//   }
// };


// var getResponse = function(userInput) {
//   var settings = {
//     url: 'http://localhost:4567/response',
//     data: {
//       input: userInput
//     }
//   }
//   var output
//   $.ajax(settings).done(function(response) {
//     console.log(response.title);
//     output = response
//     console.log(output);
//   });
//   return output
// }


// btn.addEventListener("click", function(event) {
// var userInput = document.querySelector('#userInput').value;
// 	var newPara = document.createElement('p');
// 	newPara.className = 'user';
// 	newPara.textContent = userInput;
// 	//console.log(userInput);
// 	parent.appendChild(newPara);
// 	event.preventDefault();
// 	form.reset();
//
// if (userInput != '') {
//
// 	var newP = document.createElement('p');
// 	newP.className = 'computer';
// 	newP.textContent = getResponse(userInput);
//
// 	parent.appendChild(newP);
// }

// });
