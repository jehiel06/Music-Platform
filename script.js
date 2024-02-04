function removeContent(id) {
    var element = document.getElementById(id);
    if (element) {
      element.style.display = 'none';
    }
  }

  function removeElements() {
   // Get the elements
   var inputRange = document.getElementById('r1');
   var button1 = document.getElementById('remove2');
   var button2 = document.getElementById('button2Id');

   // Remove the elements
   if(inputRange) inputRange.parentNode.removeChild(inputRange);
   if(button1) button1.parentNode.removeChild(button1);
   if(button2) button2.parentNode.removeChild(button2);
}


  
    function showContent(id) {
     var contents = document.getElementsByClassName('content');
     for (var i = 0; i < contents.length; i++) {
        contents[i].style.display = 'none';
      }
    document.getElementById(id).style.display = 'block';
    }
var modal = document.getElementById("myModal");
      
var btn = document.getElementById("myBtn");
      
var span = document.getElementsByClassName("close")[0];
      
btn.onclick = function() {
    modal.style.display = "block";
     }
      
span.onclick = function() {
     modal.style.display = "none";
    }
      
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
     }
}

let now_playing = document.querySelector(".now-playing");
let track_art = document.querySelector(".track-art");
let track_name = document.querySelector(".track-name");
let track_artist = document.querySelector(".track-artist");

let playpause_btn = document.querySelector(".playpause-song");
let next_btn = document.querySelector(".next-song");
let prev_btn = document.querySelector(".prev-song");

let seek_slider = document.querySelector(".seek-slider");
let volume_slider = document.querySelector(".volume-slider");
let curr_time = document.querySelector(".current-time");
let total_duration = document.querySelector(".total-duration");

let track_index = 0;
let isPlaying = false;
let updateTimer;

let curr_track = document.createElement('audio');

let track_list =[
   {
      name:"Bodhai Kaname ",
      artist:"Vishal Chandrashekhar",
      image:"https://naalyrics.com/wp-content/uploads/2021/07/Bodhai-Kaname.jpg",
      path:"songs//Bodhai Kaname.m4a",
   },
   {
      name:"En Iniya Thanimaye",
      artist:"D. Imman",
      image:"https://c.saavncdn.com/899/Teddy-Tamil-2020-20240204143901-500x500.jpg",
      path:"songs//En Iniya Thanimaye.m4a",
   },
   {
      name:"Kadhaippoma",
      artist:"Leon James",
      image:"https://c.saavncdn.com/435/Oh-My-Kadavule-Tamil-2020-20200207054852-500x500.jpg",
      path:"songs//Kadhaippoma.m4a",
   },
   {
      name: "Aye Aye Aye",
      artist: "Hip Hop Tamizha",
      image: "https://a10.gaanacdn.com/gn_img/albums/0wrb4N3Lg7/wrb406YabL/size_l.webp",
      path: "songs//Aye-Aye-Aye.mp3",
    },
   {
      name:"Marappadhilai Nenje",
      artist:"Leon James",
      image:"https://c.saavncdn.com/323/Oh-My-Kadavule-Original-Background-Score-Additional-Songs--Tamil-2020-20200304182304-500x500.jpg",
      path:"songs//Marappadhilai Nenje.m4a",
   },
  
   {
     name: "Nira",
     artist: "Nivas K.Prasanna",
     image: "https://c.saavncdn.com/790/Takkar-Tamil-2020-20230801204408-500x500.jpg",
     path: "songs//Nira.m4a",
   },
   {
      name: "Mudhal Nee Mudivum Nee",
      artist: "Darbuka Siva, Sid Sriram",
      image: "https://c.saavncdn.com/752/Mudhal-Nee-Mudivum-Nee-Title-Track-Trending-Version-Tamil-2023-20230424193324-500x500.jpg",
      path:  "songs//Mudhal Nee Mudivum Nee.m4a",
    },
   {
     name: "June Pona",
     artist: "Harris Jayaraj",
     image: "https://pics.filmaffinity.com/unnale_unnale-837268832-large.jpg",
     path:  "songs//June-Pona.mp3"
   },
   {
   name: "Orasaadha",
   artist: "Vivek Siva-Mervin Solomon",
   image: "https://c.saavncdn.com/331/Orasaadha-Madras-Gig--Tamil-2018-20180612071150-500x500.jpg",
   path: "songs//Orasaadha.m4a",
 },
 {
   name: "Tharame Tharame",
   artist: "Ghibran",
   image: "https://c.saavncdn.com/640/Kadaram-Kondan-Tamil-2019-20190717173037-500x500.jpg",
   path: "songs//Thaarame Thaarame.m4a",
 },
 {
   name: "Un Vizhigalil",
   artist: "Anirudh Ravichander, Shruti Haasan",
   image: "https://c.saavncdn.com/217/Maan-Karate-Tamil-2014-20190822142455-500x500.jpg",
   path:  "songs//Un Vizhigalil.m4a",
 },
 {
   name: "Urugi Urugi",
   artist: "Anand Aravindakshan",
   image: "https://c.saavncdn.com/720/Joe-Tamil-2023-20231118143405-500x500.jpg",
   path: "songs//Urugi Urugi.m4a"
 },
 {
   name: "Vaa Senthaazhini",
   artist: "Justin Prabhakaran",
   image: "https://c.saavncdn.com/926/Adiyae-Tamil-2023-20230818205510-500x500.jpg",
   path: "songs//Vaa Senthaazhini.m4a"
 }
 ];

 function loadTrack(track_index) {
   clearInterval(updateTimer);
   resetValues();
   curr_track.src = track_list[track_index].path;
   curr_track.load();
 
   track_art.style.backgroundImage = "url(" + track_list[track_index].image + ")";
   track_name.textContent = track_list[track_index].name;
   track_artist.textContent = track_list[track_index].artist;
   now_playing.textContent = "PLAYING " + (track_index + 1) + " OF " + track_list.length;
 
   updateTimer = setInterval(seekUpdate, 1000);
   curr_track.addEventListener("ended", nextSong);
 }

 function resetValues() {
   curr_time.textContent = "00:00";
   total_duration.textContent = "00:00";
   seek_slider.value = 0;
 }

 loadTrack(track_index);

function playpauseSong() {
  if (!isPlaying) 
      playTrack();
  else 
      pauseTrack();
}

function playTrack() {
   curr_track.play();
   isPlaying = true;
   playpause_btn.innerHTML = '<i class="fa fa-pause-circle fa-5x"></i>';
 }

function pauseTrack() {
   curr_track.pause();
   isPlaying = false;
   playpause_btn.innerHTML = '<i class="fa fa-play-circle fa-5x"></i>';;
 }

function nextSong() {
   if (track_index < track_list.length - 1)
     track_index += 1;
   else track_index = 0;
   loadTrack(track_index);
   playTrack(); 
 }

  function prevSong() {
   if (track_index > 0)
     track_index -= 1;
   else track_index = track_list.length;
   loadTrack(track_index);
   playTrack();
 }
 
 function seekTo() {
   let seekto = curr_track.duration * (seek_slider.value / 100);
   curr_track.currentTime = seekto;
 }
 
 function setVolume() {
   curr_track.volume = volume_slider.value / 100;
 }
 function seekUpdate() {
   let seekPosition = 0;
 
   if (!isNaN(curr_track.duration)) {
     seekPosition = curr_track.currentTime * (100 / curr_track.duration);
 
     seek_slider.value = seekPosition;
 
     let currentMinutes = Math.floor(curr_track.currentTime / 60);
     let currentSeconds = Math.floor(curr_track.currentTime - currentMinutes * 60);
     let durationMinutes = Math.floor(curr_track.duration / 60);
     let durationSeconds = Math.floor(curr_track.duration - durationMinutes * 60);
 
     if (currentSeconds < 10) { currentSeconds = "0" + currentSeconds; }
     if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
     if (currentMinutes < 10) { currentMinutes = "0" + currentMinutes; }
     if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
 
     curr_time.textContent = currentMinutes + ":" + currentSeconds;
     total_duration.textContent = durationMinutes + ":" + durationSeconds;
   }
 }
