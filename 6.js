document.querySelector('.results').innerHTML = " ";
document.querySelector('.results-label').innerHTML = "";

const rock_button = document.querySelector('.rock-button');
const paper_button = document.querySelector('.paper-button');
const scissor_button = document.querySelector('.scissor-button');
const autoplayButton = document.querySelector('.autoplay-button');
const resetButton = document.querySelector('.reset-button');
const bodyElement = document.body;


let score = JSON.parse(localStorage.getItem("scores")) || {
        wins: 0,
        loses:0,
        ties:0
    };

set_label(score);

let random = 0;

function get_random(){
    return Math.floor(Math.random()*3);
};

rock_button.addEventListener('click', ()=>{get_result(0)});
paper_button.addEventListener('click', ()=>{get_result(1)});
scissor_button.addEventListener('click', ()=>{get_result(2)});
autoplayButton.addEventListener('click', ()=>{autoplay()});
resetButton.addEventListener('click', ()=>{reset_scores()});
bodyElement.addEventListener('keydown', (event)=>{
    if(event.key === 'r'){
        get_result(0);
    }else if(event.key === 'p'){
        get_result(1);
    }else if(event.key === 's'){
        get_result(2);
    }
});



const get_result = function (pick){

    const random = get_random();

    const resultsLabel = document.querySelector('.results');
    var playerPick = "";
    var computerPick = "";

        if(pick === 0){
            console.log('You chose: Rock');
            playerPick = 'rock';
            if(random===0){
                resultsLabel.innerHTML = "TIE";
                console.log('The computer chose: Rock, its a TIE.');
                computerPick = 'rock';
                score.ties ++;
            }else if(random === 1){
                resultsLabel.innerHTML = "LOST";
                console.log('The computer chose: Paper, you LOST!');
                computerPick = 'paper';
                score.loses ++;
            }else if(random === 2){
                resultsLabel.innerHTML = "WIN";
                console.log('The computer chose: Scissors, you WIN!');
                computerPick = 'scissors';
                score.wins ++;
            };

            set_label(score);

        }else if(pick === 1){
            playerPick = 'paper';
            console.log('You chose: Paper');
            if(random===0){
                resultsLabel.innerHTML = "WIN";
                console.log('The computer chose: Rock, you WIN!');
                computerPick = 'rock';
                score.wins ++;
            }else if(random === 1){
                resultsLabel.innerHTML = "TIE";
                console.log('The computer chose: Paper, its a TIE.');
                computerPick = 'paper';
                score.ties ++;
            }else if(random === 2){
                resultsLabel.innerHTML = "LOST";
                console.log('The computer chose: Scissors, you LOST!');
                computerPick = 'scissors';
                score.loses ++;
            };

            set_label(score);

        }else if(pick === 2){
            console.log('You chose: Scissors');
            playerPick = 'scissors';
            if(random===0){
                resultsLabel.innerHTML = "LOST";
                console.log('The computer chose: Rock, you LOST!');
                computerPick = 'rock';
                score.loses ++;
            }else if(random === 1){
                resultsLabel.innerHTML = "WIN";
                console.log('The computer chose: Paper, you WIN!');
                computerPick = 'paper'; 
                score.wins ++;
            }else if(random === 2){
                resultsLabel.innerHTML = "TIE";
                console.log('The computer chose: Scissors, its a TIE.');
                computerPick = 'scissors';
                score.ties ++;
            };

            set_label(score);

    };

    localStorage.setItem('scores', JSON.stringify(score));
    set_scores_label(playerPick, computerPick);
    get_scores();

};

let is_auto_playing = false;
let interval_id;

function autoplay(){

    if(!is_auto_playing){
        interval_id = setInterval(() => {
            get_result(get_random())
        },1000);
        is_auto_playing = true;
        document.querySelector('.autoplay-button').innerHTML='Stop Autoplay';
    }else{
        clearInterval(interval_id);
        is_auto_playing = false;
        document.querySelector('.autoplay-button').innerHTML='Autoplay';
    }
}

function get_scores(){
console.log("Wins: " + score.wins + ", Loses: " + score.loses + ", Ties: " + score.ties);
};

function reset_scores(){
    localStorage.removeItem('scores');
    score["wins"] = score["loses"] = score["ties"] = 0;
    console.log("Scores have been reset!");
    get_scores();
    set_label(score)
}

function set_label(score){
    document.querySelector('.scores-label').innerHTML = "Wins: " + score['wins'] + ", Losses: " + score['loses'] + ", Ties: " + score['ties'];
}

function set_scores_label(playerPick, computerPick){
document.querySelector('.results-label').innerHTML = `YOU <img src="./${playerPick}-emoji.png" class="button-img"> <img class="button-img" src="./${computerPick}-emoji.png"> COMPUTER`
}

