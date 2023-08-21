import PLayer from '@vimeo/player';
import throttle from 'lodash.throttle';

const player = new Player('vimeo-player');

player.on('timeupdate', data => {
  const currentTime = data.seconds;
  localStorage.setItem('videoplayer-current-time', currentTime);
});

const savedTime = localStorage.getItem('videoplayer-current-time');
player.setCurrentTime(savedTime);

function updateTime(currentTime) {
  localStorage.setItem('videoplayer-current-time', currentTime);
}

const throttledUpdateTime = trottle(updateTime, 1000);

player.on('timeupdate', data => {
  const currentTime = data.seconds;
  throttledUpdateTime(currentTime);
});

function checkSavedTime() {
  const savedTime = localStorage.getItem('videoplayer-current-time');
  player.getDuration().then(duration => {
    if (savedTime === null || savedTime > duration) {
      player.setCurrentTime(0);
    }
  });
}

player.on('loaded', () => {
  checkSavedTime();
});

player.on('play', () => {
  checkSavedTime();
});

player.on('ended', () => {
  player.setCurrentTime(0);
});
