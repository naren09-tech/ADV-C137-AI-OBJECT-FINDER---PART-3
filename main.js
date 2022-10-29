var status1 = "";
var objects = [];

var name_object;
function setup() {
    canvas = createCanvas(480, 360);

    canvas.center();
    video = createCapture(VIDEO);
    video.hide();

}
function start() {
    objectDetector = ml5.objectDetector("cocossd", modeloaded);
    document.getElementById("status").innerHTML = "Detecting objects";
}
function draw() {
    image(video, 0, 0, 480, 360);
    if (status1 != "") {
        objectDetector.detect(video, gotResults);
        name_object = document.getElementById("name_object").value;
        for (i = 0; i < objects.length; i++) {
            document.getElementById("status").innerHTML = "Objects detected";
            document.getElementById("object_detect").innerHTML = "Number of objects detected : " + objects.length;
            fill("red");
            stroke("red");
            noFill();
            percent = floor(objects[i].confidence * 100);
            text(objects[i].label + " " + percent + "%", objects[i].x + 15, objects[i].y + 15);
            rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
            if (name_object == objects[i].label) {
                var synth = window.speechSynthesis;
                utturThis = new SpeechSynthesisUtterance(name_object+" found");
                synth.speak(utturThis);
                document.getElementById("object").innerHTML=name_object+" detected";
            }
            else{
                document.getElementById("object").innerHTML=name_object+" not detected";
            }

        }

    }
}
function modeloaded() {
    console.log("Model is loaded");
    status1 = true;
}
function gotResults(error, results) {
    if (error) {
        console.error(error);
    }
    else {
        objects = results;
    }
}