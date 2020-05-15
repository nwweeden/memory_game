document.addEventListener('DOMContentLoaded',function(){
    var cover = document.querySelectorAll("#cover div");
    var center = document.querySelector("#center");
    var pause = document.querySelector('#pause');
    var finalScore = document.querySelector('#finalScore');
    var reset = finalScore.querySelector('button');
    var result = document.querySelector('#result');
    var hsLabel = document.querySelector('#hsLabel');
    var click1 = '';
    var click2 = '';
    var target1 = '';
    var target2 = '';
    var score = 0;
    var counter = 0;
    var savedHighScore = JSON.parse(localStorage.getItem('highScore')) || '-';

    hsLabel.innerHTML = `High Score: ${savedHighScore}`

    reset.addEventListener('click',function(){
            location.reload();
        })

    var currentScore = document.createElement('span');
    currentScore.innerHTML = score;
    center.appendChild(currentScore);

    for (var cov of cover){
        cov.addEventListener('click',function guesses(e){
            
            e.target.style.background = 'transparent';
            e.target.style.transition = 'background 1s ease';
            target1 = e.target;
            click1 = e.target.id;
            if (click2 === ''){
                click2 = click1;
                target2 = target1;
                target2.removeEventListener('click',guesses)
            }
            else if (click1 === click2){
                click1 = '';
                click2 = '';
                target1.removeEventListener('click',guesses);
                target1 = '';
                target2 = '';
                score++;
                counter++;
                currentScore.innerHTML = score;
                if (counter === 12){
                    if(score < savedHighScore || savedHighScore === '-'){
                        result.innerHTML = `High score! You guessed it in only ${score} guesses`;
                        savedHighScore = score;
                        localStorage.setItem('highScore', JSON.stringify(savedHighScore))
                        hsLabel.innerHTML = `High Score: ${savedHighScore}`
                    } else {
                        result.innerHTML = `You Won! It took you ${score} guesses. The high score is ${savedHighScore} guesses`;
                    }
                }
            }
            else if (click1 !== click2){
                click1 = '';
                click2 = '';
                pause.style.zIndex = '10';
                setTimeout(function(){
                    target1.style.background = '#ff414e';
                    target2.style.background = '#ff414e';
                    pause.style.zIndex = '0';
                },1500);
                score ++;
                currentScore.innerHTML = score;
                target2.addEventListener('click',guesses);
            }
        })
    }
})