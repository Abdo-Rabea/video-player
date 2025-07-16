const videoContainer = document.getElementById("player-container");
const video = document.querySelector("video");
const playBtn = document.getElementById("play-btn");

const progressRange = document.querySelector(".progress-range");
const progressBar = document.querySelector(".progress-bar");
const timeElapsed = document.querySelector(".time-elapsed");
const timeDuration = document.querySelector(".time-duration");

const volumeRange = document.querySelector(".volume-range");
const volumeBar = document.querySelector(".volume-bar");
const volumeIcon = document.getElementById("volume-icon");

const playbackSpeed = document.querySelector("select");

const fullScreenIcon = document.querySelector(".fullscreen");
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
  timeDuration.textContent = getTimeInMintSec(duration);
}

function updatePlayBackPosition(e) {
  // calc. the ratio between clicked position to the progress-range length
  const ratio = e.offsetX / this.clientWidth;
  // *updating playback position
  video.currentTime = ratio * video.duration;
  // then updateTimeElements to keep time elments updated with the play back
  updateTimeElements();
}
// *Volume Controls --------------------------- //
// update progress bar position and icon
function updateVolumeElements(ratio, mute = false) {
  const percent = ratio * 100;
  // volumeBar width changing
  volumeBar.style.width = `${percent}%`;

  // volume icon
  volumeIcon.classList = ["fas"];
  volumeIcon.title = "Mute";
  if (mute) {
    volumeIcon.classList.add("fa-volume-xmark");
    volumeIcon.title = "Unmute";
  } else {
    if (percent == 0) volumeIcon.classList.add("fa-volume-off");
    else if (percent < 60) volumeIcon.classList.add("fa-volume-low");
    else volumeIcon.classList.add("fa-volume-high");
  }
}
function updateVolumePosition(e) {
  // calc. the ratio between clicked position to the progress-range length
  let ratio = e.offsetX / this.clientWidth;
  if (ratio < 0.09) ratio = 0;
  if (ratio > 0.92) ratio = 1;
  // *updating volume
  video.volume = ratio;
  video.muted = false; // insures that volume is not muted
  // then updateTimeElements to keep time elments updated with the play back
  updateVolumeElements(ratio, false);
}

// toggle volume state (mute-unmute)
function toggleVolumeState() {
  // todo: should seperate in 2 different function (mute, unmute)
  if (video.muted) {
    video.muted = false;
    updateVolumeElements(video.volume, false);
  } else {
    video.muted = true;
    updateVolumeElements(0, true);
  }
}
// Change Playback Speed -------------------- //
function setPlayBackSpeed(e) {
  video.playbackRate = e.target.value;
}
// Fullscreen ------------------------------- //
let isFullScreen = false;

function openFullscreen() {
  if (videoContainer.requestFullscreen) {
    videoContainer.requestFullscreen();
  } else if (videoContainer.webkitRequestFullscreen) {
    /* Safari */
    videoContainer.webkitRequestFullscreen();
  } else if (videoContainer.msRequestFullscreen) {
    /* IE11 */
    videoContainer.msRequestFullscreen();
  }
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) {
    /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) {
    /* IE11 */
    document.msExitFullscreen();
  }
}

function toggleFullScreen() {
  if (isFullScreen) {
    closeFullscreen();
    isFullScreen = false;
    fullScreenIcon.childNodes[0].classList.replace("fa-compress", "fa-expand");
    fullScreenIcon.title = "Expand";
  } else {
    openFullscreen();
    isFullScreen = true;
    fullScreenIcon.childNodes[0].classList.replace("fa-expand", "fa-compress");
    fullScreenIcon.title = "Compress";
  }
}
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
volumeIcon.addEventListener("click", toggleVolumeState);

// playback speed
playbackSpeed.addEventListener("change", setPlayBackSpeed);

fullScreenIcon.addEventListener("click", toggleFullScreen);
