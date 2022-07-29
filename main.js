function setup() {
  canvas = createCanvas(300, 300);
  canvas.center();
  video = createCapture(VIDEO);
  video.hide();
  classifier = ml5.imageClassifier("MobileNet", modelLoaded);
}
function modelLoaded() {
  console.log("Model is loaded");
}
function draw() {
  image(video, 0, 0, 300, 300);
  classifier.classify(video, gotResult);
}
var previous_result = "";
function gotResult(error, result) {
  if (error) {
    console.log(error);
  }
  else {
    if ((result[0].label > 0.5) && (previous_result != result[0].label)) {
      console.log(results);
      previous_result=result[0].label;
      var synth=window.speechSynthesis;
      speak_data="Object is -"+result[0].label;
      var utterThis= new SpeechSynthesisUtterance(speak_data);
      synth.speak(utterThis);

      document.getElementById("result_object_name").innerHTML="Object :"+ result[0].label;
      document.getElementById("result_object_accuracy").innerHTML="Accuracy :"+result[0].confidence.toFixed(3); 
    }
    }
}


