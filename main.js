music1 = "";
music2 = "";
scoreLeftWrist = 0;
scoreRightWrist = 0;
leftWristX = 0;
leftWristY = 0;
rightWristX = 0;
rightWristY = 0;
songstatus1 = "";
songstatus2 = "";

function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 550);
    canvas.position(650, 250);
    
    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}
function modelLoaded() {
    console.log("Model is Loaded!")
}
function draw() {
    image(video, 0, 0, 600, 500);
    songstatus1 = music1.isPlaying();
    fill("#FF0000");
    stroke("FF0000");

    if(scoreLeftWrist > 0.2) {
        circle(leftWristX, leftWristY, 20);
        music2.stop();

        if(songstatus1 == false) {
            music1.play();
            document.getElementById("songname").innerHTML = "Song 1";
        }
    }
    songstatus2 = music2.isPlaying();

    if(scoreRightWrist > 0.2) {
        circle(rightWristX, rightWristY, 20);
        music1.stop();

        if(songstatus2 == false) {
            music2.play();
            document.getElementById("songname").innerHTML = "Song 2"
        }
    }
    
}
function gotPoses(results) {
    if(results.length > 0) {
        console.log(results);

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Left Wrist's Score = " + scoreLeftWrist);

        scoreRightWrist = results[0].pose.keypoints[10].score;
        console.log("Right Wrist's Score = " + scoreRightWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Left Wrist X = " + leftWristX + " Left Wrist Y = " + leftWristY);
        console.log("Right Wrist X = " + rightWristX + " Right Wrist Y = " + rightWristY);
    }
}