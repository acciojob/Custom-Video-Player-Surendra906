/* Edit this file */
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

function toggleplay(){
	if(video.paused){
		video.play();
	}else{
		video.pause();
	}
}

function updateButton() {
	const icon=this.paused?'►':'❚ ❚';
	toggle.textContent=icon;
}

function skip(){
	video.currentTime+=parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
	const percent=(video.currentTime/video.duration)*100;
	progressBar.style.flexBasis=`${percent}%`;
}
function scrub(e){
	const scrubTime=(e.offStX/progress.offsetWidth)*video.duration;
	video.currentTime=scrubTime;
}

video.addEventListener('click',toggleplay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('timeupdate',handleProgress);
toggle.addEventListener('click',toggleplay);
skipButtons.forEach(button=>button.addEventlistener('click',skip));
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate));
range.forEach(range=>range.addEventListener('mousemove',handleRangeUpdate));
let mousedown = false;
progress.addEventListener('click', scrub);
progress.addEventListener('mousemove', (e) => mousedown && scrub(e));
progress.addEventListener('mousedown', () => mousedown = true);
progress.addEventListener('mouseup', () => mousedown = false);