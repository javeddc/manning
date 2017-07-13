var btn = document.querySelector('#button');
var parent = document.querySelector('#parent');
var form = document.querySelector('form');


var getChats = function() {
  var settings = {
    url: 'https://afternoon-dawn-85391.herokuapp.com/chat'
  }
  $.ajax(settings).done(function(response) {
    messageBox = $('#message_box')[0]
    while (messageBox.firstChild) {
      messageBox.removeChild(messageBox.firstChild);
    }
    console.log(response);
    chats = JSON.parse(response);
    console.log(chats);
    _.each(chats, function(chat) {
      if (chat.origin == 'ui') {
        var currentDiv = document.createElement('div');
        currentDiv.classList.add(chat.origin);
        currentDiv.classList.add('ui_row');
        var currentBtn = document.createElement('btn');
        console.log(chat.body);
        currentBtn.classList.add('ui_button');
        currentBtn.innerHTML = chat.body;
        currentBtn.onclick = function() {
          console.log('yo' + chat.body);
        }
        currentDiv.appendChild(currentBtn);
        $('#message_box')[0].appendChild(currentDiv);
      } else {
        var currentDiv = document.createElement('div');
        currentDiv.classList.add(chat.origin);
        currentDiv.classList.add('message');
        var currentP = document.createElement('p');
        currentP.innerHTML = chat.body;
        currentDiv.appendChild(currentP);
        $('#message_box')[0].appendChild(currentDiv);
      }
    })
  });
}

window.onload = function() {
  getChats();
}

var postChat = function(chatInput) {
  var settings = {
    url: 'https://afternoon-dawn-85391.herokuapp.com/chat',
    data: {
      body: chatInput
    }
  }
  $.post(settings)
}

$('#button').on('click', function(ev) {
  postChat($('#userInput')[0].value);
  getChats();
});


var buttonAction = function(actionName) {
  postChat(actionName);
}

var dbInterface = {
  postGoal: function(goalName) {},
  getGoals: function() {}
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
