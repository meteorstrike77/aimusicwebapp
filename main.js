music1 = "";
music2 = "";

function preload() {
    music1 = loadSound("music.mp3");
    music2 = loadSound("music2.mp3");
}
function setup() {
    canvas = createCanvas(600, 550);
    canvas.position(650, 250);
    
    video = createCapture(VIDEO);
    video.hide();
}
function draw() {
    image(video, 0, 0, 600, 500);
}