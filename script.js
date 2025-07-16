const videoContainer = document.getElementById("player-container");
const video = document.querySelector("video");
const playBtn = document.getElementById("play-btn");

const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const timeElapsed = document.querySelector(".time-elapsed");
const timeDuration = document.querySelector(".time-duration");

const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");

// Play & Pause ----------------------------------- //
// function to playVideo
function changePlayIconToPause() {
  playBtn.classList.replace("fa-play", "fa-pause");
  playBtn.title = "Pause";
}
// pre: the play icon is pause
function changePlayIconToPlay() {
  playBtn.classList.replace("fa-pause", "fa-play");
  playBtn.title = "Play";
}
function playVideo() {
  video.play();
  changePlayIconToPause();
}
function pauseVideo() {
  video.pause();
  changePlayIconToPlay();
}
// toggle video state (play-pause)
function toggleVideoPlaying() {
  if (video.paused) {
    playVideo();
  } else pauseVideo();
}

// toggle video state (play-pause) if video contianer is clicked
function videoContainerTogglePlaying(e) {
  if (e.target === video || e.target === videoContainer) toggleVideoPlaying();
}

// *Progress Bar ---------------------------------- //
// converts time from seconds to MM:SS
function getTimeInMintSec(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secondsLeft = Math.round(seconds - minutes * 60);
  return `${minutes < 10 ? `0${minutes}` : minutes}:${
    secondsLeft < 10 ? `0${secondsLeft}` : secondsLeft
  }`;
}
// initialize progress bar of 0, currentDuration of 0 and totalDuration
function initializeTimeElements() {
  const duration = video.duration;
  timeDuration.textContent = getTimeInMintSec(duration);
  timeElapsed.textContent = "00:00 /";
  progressBar.style.width = 0;
}

// update progress bar - timeElapsed
function updateTimeElements() {
  const currentTime = video.currentTime;
  const duration = video.duration;
  timeElapsed.textContent = `${getTimeInMintSec(currentTime)} /`;
  progressBar.style.width = `${Math.round((currentTime / duration) * 100)}%`;
}

function updatePlayBackPosition(e) {
  // calc. the ratio between clicked position to the progress-range length
  const ratio = e.offsetX / this.clientWidth;
  // *updating playback position
  video.currentTime = ratio * video.duration;
  // then updateTimeElements to keep time elments updated with the play back
  updateTimeElements();
}
// Volume Controls --------------------------- //
function updateVolumePosition() {}
// Change Playback Speed -------------------- //

// Fullscreen ------------------------------- //

// *Event Listener
// video play-pause
videoContainer.addEventListener("click", videoContainerTogglePlaying);
playBtn.addEventListener("click", toggleVideoPlaying);
video.addEventListener("ended", changePlayIconToPlay);

// progress event listener
// progressRange.addEventListener("click");
video.addEventListener("loadedmetadata", initializeTimeElements);
video.addEventListener("timeupdate", updateTimeElements);
progressRange.addEventListener("click", updatePlayBackPosition);

// Volume Eventlistener
volumeRange.addEventListener("click", updateVolumePosition);
