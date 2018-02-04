const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const toggle = player.querySelector('.toggle');
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

//點擊播放/暫停
function togglePlay() {
    const method = video.paused ? 'play' : 'pause';
    video[method]();
    const icon = video.paused ? `<i class="fas fa-play"></i>` : `<i class="fas fa-pause"></i>`;
    toggle.innerHTML = icon;
}

//音量、速率
function handleRangeUpadte() {
    video[this.name] = this.value;
}

//快進、快退
function skip() {
    video.currentTime += parseFloat(this.dataset.skip);
}

//進度條顯示
function handleProgress() {
    const precent = (video.currentTime / video.duration) * 100;
    progressBar.style.flexBasis = `${precent}%`;
}

//進度條操作
let mousedown = false;
function scrunb(e) {
    const mouseType = e.type;
    if (mouseType === 'mousedown') { mousedown = true; }
    if (mouseType === 'mouseup') { mousedown = false; }
    if (mouseType === 'click' || mouseType === 'mousemove' && mousedown) {
        const scrunbTime = (e.offsetX / progress.offsetWidth) * video.duration;
        video.currentTime = scrunbTime
    }
}


/* Hook up the event listners */
video.addEventListener('click', togglePlay);
toggle.addEventListener('click', togglePlay);

ranges.forEach(range => {
    range.addEventListener('change', handleRangeUpadte);
    range.addEventListener('mousemove', handleRangeUpadte);
})

skipButtons.forEach(button => {
    button.addEventListener('click', skip);
})

video.addEventListener('progress', handleProgress);

const progressEvents = ['click', 'mousemove', 'mousedown', 'mouseup'];
progressEvents.forEach(progressEvent => {
    progress.addEventListener(progressEvent, scrunb);
})

