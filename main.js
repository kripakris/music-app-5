song_1="";
song_2="";

function preload(){
    song_1 = loadSound("music.mp3");
    song_2 = loadSound("music2.mp3");
}

scoreRightWrist = 0;
scoreLeftWrist = 0;

rightWristX = 0;
rightWristY = 0;

leftWristX = 0;
leftWristY = 0;

function setup(){
    canvas = createCanvas(400,400);
    canvas.center();

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose' , gotPoses);
}

function modelLoaded()
{
console.log('Posenet is initialized.');
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;
        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = " + scoreRightWrist + "scoreLeftWrist =" + scoreLeftWrist);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristX = results[0].pose.rightWrist.y;
        console.log("rightWristX =" + rightWristX +  "rightWristY" + rightWristY);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristX = results[0].pose.leftWrist.y;
        console.log("leftWristX =" + leftWristX +  "leftWristY" + leftWristY);

    }
}

function draw(){
    image(video,0,0,400,400);

    fill("pink");
    stroke("red");
    if (scoreRightWrist > 0.2)
    {
    circle(rightWristX,rightWristY,20);
    song_2.stop();
    song_1.play();
    document.getElementById("song").innerHTML="playing harry potter song";
    } 
    if (scoreLeftWrist > 0.2)
    {
    circle(leftWristX,leftWristY,20);
    song_1.stop();
    song_2.play();
    document.getElementById("song").innerHTML="playing peter pan song";
    }

}

function play()
{
 song_1.play();
 song.setVolume(1);
 song.rate(1);
}