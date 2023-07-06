

function reloadPage(){
    location.reload();
}

    score = 0;
    cross = true;

    audio = new Audio('media/music.mp3');
    audiogo = new Audio('media/gameover.mp3');
    winaud= new Audio('media/win.mp3');
    setTimeout(() => {
        audio.play();
    }, 1000);

    document.onkeyup = function (e) {
        if (e.key === 'Enter') {
            bunny = document.querySelector('.bunny');
            bunny.classList.add('animateBunny');
             jump();
             setTimeout(() => {
                bunny.classList.remove('animateBunny');
            }, 900);
        }
        if (e.key === 'ArrowRight') {
            bunny = document.querySelector('.bunny');
            bunnyx = parseInt(window.getComputedStyle(bunny, null).getPropertyValue('left'));
            bunny.style.left = bunnyx + 112 + 'px';
        }
        if (e.key === 'ArrowUp') {
            bunny = document.querySelector('.bunny');
            bunnyx = parseInt(window.getComputedStyle(bunny, null).getPropertyValue('left'));
        jump();
        }
        if (e.key === 'ArrowLeft') {
            bunny = document.querySelector('.bunny');
            bunnyx = parseInt(window.getComputedStyle(bunny, null).getPropertyValue('left'));
            bunny.style.left = bunnyx - 112 + 'px';
        }
    };
    function jump() {
  let jumpHeight = 200; // Adjust this value to control the jump height
  let jumpDuration = 1000; // Adjust this value to control the jump duration
  let jumpStartTime = null;

  function jumpStep(timestamp) {
    if (!jumpStartTime) jumpStartTime = timestamp;
    const elapsedTime = timestamp - jumpStartTime;
    const progress = Math.min(elapsedTime / jumpDuration, 1);
    const jumpPosition = jumpHeight * Math.sin(progress * Math.PI);
    bunny.style.bottom = jumpPosition + 75 + 'px';

    if (progress < 1) {
      window.requestAnimationFrame(jumpStep);
    }
  }

  window.requestAnimationFrame(jumpStep);
}
function updateScore(score) {
        scoreCont.innerHTML = 'Points: ' + score;
        if(score==20){
            gameOver.innerHTML='YOU WIN!';
            obstacle.classList.remove('barrierani');
           winaud.play(); 
           setTimeout(() => {
                audiogo.pause();
                audio.pause();
            }, 1000);
        }
    }

    setInterval(() => {
        bunny = document.querySelector('.bunny');
        gameOver = document.querySelector('.gameover');
        obstacle = document.querySelector('.barrier');
        scoreCont = document.getElementById('score');

        dx = parseInt(window.getComputedStyle(bunny, null).getPropertyValue('left'));
        dy = parseInt(window.getComputedStyle(bunny, null).getPropertyValue('top'));

        ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
        oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('top'));

        offsetX = Math.abs(dx - ox);
        offsetY = Math.abs(dy - oy);

        if (offsetX < 73 && offsetY < 52) {
            gameOver.innerHTML = 'Game Over!';
            obstacle.classList.remove('barrierani');
            audiogo.play();
            setTimeout(() => {
                audiogo.pause();
                audio.pause();
            }, 1000);
        } else if (offsetX < 145 && cross) {
            score += 1;
            updateScore(score);
            cross = false;
            setTimeout(() => {
                cross = true;
            }, 1000);
            setTimeout(() => {
                aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
                newDur = aniDur - 0.1;
                obstacle.style.animationDuration = newDur + 's';
                console.log('New animation duration:', newDur);
            }, 500);
        }
    }, 10);
