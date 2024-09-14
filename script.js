// Select DOM elements
const playPauseBtn = document.getElementById('play-pause');
const nextBtn = document.getElementById('next');
const prevBtn = document.getElementById('prev');
const progressBarContainer = document.querySelector('.progress-bar');
const progressBar = document.querySelector('.progress-bar .progress');
const currentTimeSpan = document.querySelector('.current-time');
const totalTimeSpan = document.querySelector('.total-time');
const volumeSlider = document.getElementById('volume');
const speedControl = document.getElementById('speed');
const audio = new Audio(); // Audio element
let isPlaying = false;
let currentSongIndex = 0;

// Get all the songs
const songs = document.querySelectorAll('.main .song');

// Function to load a song
function loadSong(songIndex) {
    // Reset UI for all songs
    songs.forEach(song => song.classList.remove('playing'));

    const selectedSong = songs[songIndex];
    const songSrc = selectedSong.getAttribute('data-audio');
    audio.src = songSrc;

    // Add 'playing' class to the current song
    selectedSong.classList.add('playing');

    try {
        audio.play();
        isPlaying = true;
        playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
    } catch (error) {
        console.error("Playback failed:", error);
    }

    // Update total duration when metadata is loaded
    audio.addEventListener('loadedmetadata', () => {
        totalTimeSpan.textContent = formatTime(audio.duration);
    });
}

// Play or Pause the song
playPauseBtn.addEventListener('click', () => {
    if (isPlaying) {
        audio.pause();
    } else {
        audio.play();
    }
});

// Update play/pause button on play/pause events
audio.addEventListener('play', () => {
    isPlaying = true;
    playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
});

audio.addEventListener('pause', () => {
    isPlaying = false;
    playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
});

// Load the next song
nextBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex + 1) % songs.length;
    loadSong(currentSongIndex);
});

// Load the previous song
prevBtn.addEventListener('click', () => {
    currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
    loadSong(currentSongIndex);
});

// Load the first song initially
loadSong(currentSongIndex);

// Add click event listener to each song
songs.forEach((song, index) => {
    song.addEventListener('click', () => {
        currentSongIndex = index;
        loadSong(currentSongIndex);
    });
});

// Volume control
volumeSlider.addEventListener('input', (e) => {
    audio.volume = e.target.value;
});

// Speed control
speedControl.addEventListener('change', (e) => {
    audio.playbackRate = e.target.value;
});

// Update progress bar and time
audio.addEventListener('timeupdate', () => {
    const progressPercent = (audio.currentTime / audio.duration) * 100;
    progressBar.style.width = `${progressPercent}%`;

    // Update current time
    currentTimeSpan.textContent = formatTime(audio.currentTime);
});

// Seek in the song when clicking on the progress bar
progressBarContainer.addEventListener('click', (e) => {
    const width = progressBarContainer.clientWidth;
    const clickX = e.offsetX;
    const duration = audio.duration;

    audio.currentTime = (clickX / width) * duration;
});

// Format time in minutes:seconds
function formatTime(time) {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}
