gesture ="";

Webcam.set({
  width:350,
  height:300,
  image_format : 'png',
  png_quality:90
});

camera = document.getElementById("camera");
Webcam.attach('#camera');

    
function take_snapshot()
{
  Webcam.snap(function(data_uri) {
      document.getElementById("result").innerHTML = '<img id="captured_image" src="'+data_uri+'"/>';
  });
}

console.log('ml5 version:', ml5.version);
classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/dkFYH50Zw/model.json',modelLoaded);

function modelLoaded() {
  console.log('Model Loaded!');
}

function speak(){
  var synth = window.speechSynthesis;
  speak_data_1 = "The meaning of this gesture is " + gesture;
  var utterThis = new SpeechSynthesisUtterance(speak_data_1);
  synth.speak(utterThis);
}

function check()
{
  img = document.getElementById("captured_image");
  classifier.classify(img, gotResult);
}

function gotResult()
{
  if (error) {
		console.error(error);
	} else {
    console.log(results);
    document.getElementById("result_gesture_name").innerHTML = results[0].label;
    gesture = results[0].label;
    speak();
    if(results[0].label == "This is looking amazing")
    {
      document.getElementById("update_gesture_name").innerHTML = "&#128076";
    }
    if(results[0].label == "Best of Luck")
    {
      document.getElementById("update_gesture_name").innerHTML = "&#128077";
    }
  if(results[0].label == "Great Victory")
    {
      document.getElementById("update_gesture_name").innerHTML = "&#9996";
    }
  }
}