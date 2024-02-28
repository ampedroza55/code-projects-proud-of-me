// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

// https://learn.ml5js.org/#/reference/posenet

/* ===
ml5 Example
PoseNet example using p5.js
=== */
// Global Variables
let capture;
let poseNet;
let poses = []; // this array will contain our detected poses (THIS IS THE IMPORTANT STUFF)
const cam_w = 640;
const cam_h = 480;

const options = {
  architecture: "MobileNetV1",
  imageScaleFactor: 0.3,
  outputStride: 16, // 8, 16 (larger = faster/less accurate)
  flipHorizontal: true,
  minConfidence: 0.5,
  maxPoseDetections: 2, // 5 is the max
  scoreThreshold: 0.5,
  nmsRadius: 20,
  detectionType: "multiple",
  inputResolution: 257, // 161, 193, 257, 289, 321, 353, 385, 417, 449, 481, 513, or 801, smaller = faster/less accurate
  multiplier: 0.5, // 1.01, 1.0, 0.75, or 0.50, smaller = faster/less accurate
  quantBytes: 2,
};

function setup() {
  createCanvas(cam_w, cam_h);
  capture = createCapture(VIDEO);
  capture.size(cam_w, cam_h);

  // Create a new poseNet method with a single detection
  poseNet = ml5.poseNet(capture, options, modelReady);

  // This sets up an event that fills the global variable "poses"
  // with an array every time new poses are detected.
  poseNet.on("pose", function (results) {
    poses = results;
  });

  // Hide the capture element, and just show the canvas
  // capture.hide();
}

// this function gets called once the model loads successfully.
function modelReady() {
  console.log("Model loaded");
}

function draw() {
  if (poses.length > 0) {
    drawnose();
  }
}

function drawnose() {
  
  console.log(poses);
  
  // store the first pose in a variable called "pose"
  let pose = poses[0].pose;

  // store the keypoint for the right wrist in a variable called "rightWrist"
  // let rightWrist = pose.keypoints[10];
  let nose = createVector(pose.nose.x, pose.nose.y) 
  
  
  // alternative option
  // let rightWrist = poses[0].pose.keypoints[10] // alternative option

  // store the position of the rightWrist in two variables, one for the x position, and one for the y position
  
  
  // draw the right wrist (keypoint 10)
  fill(255, 100, 150); 
  quad(nose.x, nose.y, 289, 25);
  // draw this ellipse where the nose is
  rect(nose.x, nose.y, 200, 5);
  
  
}
