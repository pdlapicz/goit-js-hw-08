import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
});

const savedTime = localStorage.getItem('videoplayer-current-time');
player.setCurrentTime(savedTime);

function updateTime(currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}

const throttledUpdateTime = throttle(updateTime, 1000); // 1000 ms = 1s

player.on('timeupdate', function (data) {
  const currentTime = data.seconds;
  throttledUpdateTime(currentTime);
});

function checkSavedTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  player.getDuration().then(function (duration) {
    if (savedTime === null || savedTime > duration) {
      player.setCurrentTime(0);
    }
  });
}

player.on('loaded', function () {
  checkSavedTime();
});

player.on('play', function () {
  checkSavedTime();
});

player.on('ended', function () {
  player.setCurrentTime(0);
});
