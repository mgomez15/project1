/*Robert Pinnix: I coded from lines  1-57 and 77-90.I worked on user authentication in firebase. its no perfect, is not really even finished, but it is somewhat functional. i also woked on the log in form in bootstrap*/ 

$(document).ready(function(){
    $('#loginform').hide();
 $("#dropdownMenu2").on('click' , function(){
    console.log("test");
 $('#loginform').toggle();
 });

 // Initialize Firebase
var config = {
   apiKey: "AIzaSyD60jA2UyFPvoJDPYveTwwZRLkb68Apb1A",
   authDomain: "school-project-1-4bb43.firebaseapp.com",
   databaseURL: "https://school-project-1-4bb43.firebaseio.com",
   projectId: "school-project-1-4bb43",
   storageBucket: "school-project-1-4bb43.appspot.com",
   messagingSenderId: "962605447910"
 };
 firebase.initializeApp(config);

 var Email1 = $('#Email1');
 var Password1 = $('#Password1');
 var submit = $('#submit');
 var signUp = $('#signup');
 var logout = $('#logout');

 $('#submit').on('click', e => {
   event.preventDefault();
   var email = Email1.val();
   console.log(email);
   var password = Password1.val();
   var auth = firebase.auth();
   var promise = auth.signInWithEmailAndPassword(email, password)
   promise.catch(e => console.log(e.message));

 });

 $('#signup').on('click', e => {
    event.preventDefault();
     var email = Email1.val();
     console.log(email);
     var password = Password1.val();
     var auth = firebase.auth();
     var promise = auth.createUserWithEmailAndPassword(email,password)
     promise.catch(e => console.log(e.message));
     firebase.auth().onAuthStateChanged(function(user) { 
        if (user.emailVerified) {
          console.log('Email is verified');
        }
        else {
          firebase.auth().signOut();
          window.open('verificationpage.html', '_blank');
          console.log('Email is not verified');
          user.sendEmailVerification();
        
      };
    });
    


   $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?zip=80208,us&APPID=5da73b78d73f631d8a18d27035e182f7",
    method: "GET"
}).then(function (response) {
    console.log(response);
    $("#weather").append(
        $("<p>").append(
            "Current Weather: Temperature " +  Math.floor(9/5*(response.main.temp-273)+32) + "°F with " + response.weather[0].description
        )
    )
});



 });

 $('#logout').on('click', e=>{
     event.preventDefault();
     firebase.auth().signOut();

 })

 firebase.auth().onAuthStateChanged(firebaseUser => {
     if(firebaseUser){
     console.log(firebaseUser);
     console.log('logged in');
     }else{ console.log('notloggedin')
   }

 });

 $.ajax({
    url: "http://api.openweathermap.org/data/2.5/weather?zip=80208,us&APPID=5da73b78d73f631d8a18d27035e182f7",
    method: "GET"
}).then(function (response) {
    console.log(response);
    $("#weather").append(
        $("<p>").append(
            "Current Weather: Temperature " +  Math.floor(9/5*(response.main.temp-273)+32) + "°F with " + response.weather[0].description
        )
    )
});


 var today = moment().format("YYYY-MM-DD");

            var url = 'https://newsapi.org/v2/everything?q=3D+printing&from=' +
                today +
                '&to=' +
                moment().subtract(1, "years").format("YYYY-MM-DD") +
                '&sortBy=relevancy&apiKey=20c0c0a0b2bf400fa987f45a9ded6718';

            console.log(url);

            $.ajax({
                url: url,
                method: "GET",
            }).then(function (response) {
                console.log(response);

                var articles = response.articles;

                for (var i = 0; i < 5; i++) {

                    var imageUrl = articles[i].urlToImage,
                        title = articles[i].title,
                        publishedDate = articles[i].publishedAt,
                        firstPeriod = articles[i].description.indexOf("."),
                        description = (articles[i].description).slice(0, firstPeriod + 1),
                        url = articles[i].url,
                        img = $("<img>").attr({
                            src: imageUrl,
                            class: "articleImage"
                        }),
                        rowDiv = $("<div>").addClass("row articleRow"),
                        imgDiv = $("<div>").addClass("image col-md-1"),
                        textDiv = $("<div>").addClass("article col-md-11"),
                        p = $("<p>").addClass("articleP"),
                        a = $("<a>").attr({
                            href: url,
                            target: "_blank",
                            class: "articleLink"
                        }).append(title);

                    $("#news").append(
                        rowDiv.append(
                            imgDiv.append(
                                img
                            ),

                            textDiv.append(
                                p.append(
                                    a,
                                    "<br>",
                                    moment(publishedDate).format("LL"),
                                    "<br>",
                                    description
                                )
                            )
                        )
                    )

                }

            });
 });

 