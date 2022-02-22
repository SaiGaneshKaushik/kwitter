var firebaseConfig = {
      apiKey: "AIzaSyDIu7rYlKT4JSlQT4A46GFwXfGDTSRYXb0",
      authDomain: "kwitter-34d4f.firebaseapp.com",
      databaseURL: "https://kwitter-34d4f-default-rtdb.firebaseio.com",
      projectId: "kwitter-34d4f",
      storageBucket: "kwitter-34d4f.appspot.com",
      messagingSenderId: "42084075303",
      appId: "1:42084075303:web:7693614a29075c544a8b02"
    };
    
  firebase.initializeApp(firebaseConfig);

  user_name = localStorage.getItem("username");
  room_name = localStorage.getItem("room_name")

  function send()
  {
        msg = document.getElementById("msg").value;
        firebase.database().ref(room_name).push({
              name: user_name,
              message:msg,
              like:0
        });

        document.getElementById("msg").value = "";
  }

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
      
       console.log(firebase_message_id);
       console.log(message_data);

       name = message_data['name'];
       message = message_data['message'];
       like = message_data['like'];

       name_with_tag  ="<h4>" + name + "<img class = 'user_tick' src = 'tick.png'></h4> ";
       message_with_tag = "<h4 class = 'message_h4'>" + message + "</h4>";
       like_button ="<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>"; 
       span_with_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";


      row = name_with_tag + message_with_tag + like_button + span_with_tag;
       document.getElementById("output").innerHTML += row;


      } });  }); }
getData();

function updateLike(message_id)
{
      console.log("clicked on like button - " + message_id);
      likes = document.getElementById(message_id).value;
      updated_likes = Number(likes) + 1;
      firebase.database().ref(room_name).child(message_id).update({
            like: updated_likes
      });
      
 }