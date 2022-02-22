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
  console.log(user_name);

  document.getElementById("user_name").innerHTML = "Welcome " + user_name + " ! ";

  function addRoom()
  {
    Room_name = document.getElementById("roon_name").value;
    firebase.database().ref("/").child(Room_name).update({
          purpose:"adding room name"
    });
    localStorage.setItem("room_name", Room_name);
    window.location = "kwitter_page.html";
  }

function getData() 
{
      firebase.database().ref("/").on('value', function(snapshot) {document.getElementById("output").innerHTML = "";snapshot.forEach(function(childSnapshot) {childKey  = childSnapshot.key;
       Room_names = childKey;
      console.log("room name - " + Room_names);
      row = "<div class = 'room_name' id=" + Room_names + "onclick = 'redirectToRoomName(this.id)'># " + Room_names + "</div><hr>";
      document.getElementById("output").innerHTML += row;
      });
});

}
getData();

function redirectToRoomName(name)
{
      console.log(name);
      localStorage.setItem("room_name", name);
      window.location = "kwitter_page.html";
}

function logout()
{
    localStorage.removeItem("username");
    localStorage.removeItem("room_name");
    window.location = "index.html";
}