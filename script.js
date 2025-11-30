/********************************************
 * Dart Scorer Script.js
 * Supports X01, Cricket, Manual + Camera
 ********************************************/

// === Global Variables ===
let players = [];          // {name, score, dartsThrown, hits{}}
let currentPlayerIndex = 0;
let dartsThisTurn = 0;
let gameType = "x01";      // "x01" or "cricket"

// Cricket Numbers
const cricketNumbers = [15,16,17,18,19,20,25]; // 25 = Bull

// === Player Management ===
function addPlayer() {
    const container = document.getElementById('players-container');
    const input = document.createElement('input');
    input.type = "text";
    input.placeholder = "Player Name";
    container.appendChild(input);
}

function startGame() {
    players = [];
    const inputs = document.querySelectorAll('#players-container input');
    inputs.forEach(input => {
        if(input.value.trim() !== ""){
            players.push({
                name: input.value.trim(),
                score: gameType === "x01" ? 501 : 0,
                dartsThrown: 0,
                hits: {} // for cricket
            });
        }
    });
    currentPlayerIndex = 0;
    dartsThisTurn = 0;
    updateScoreboard();
}

// === Turn Management ===
function nextPlayer(){
    dartsThisTurn = 0;
    currentPlayerIndex = (currentPlayerIndex + 1) % players.length;
}

// === X01 Logic ===
function addDartHitX01(score){
    let player = players[currentPlayerIndex];
    player.dartsThrown++;
    if(score <= player.score){
        player.score -= score;
        if(player.score === 0){
            alert(`${player.name} wins!`);
            resetGame();
            return;
        }
    } else {
        alert("Bust! Score exceeds remaining points.");
    }

    dartsThisTurn++;
    if(dartsThisTurn >= 3) nextPlayer();
    updateScoreboard();
}

// === Cricket Logic ===
function addDartHitCricket(number){
    let player = players[currentPlayerIndex];
    player.dartsThrown++;
    if(!player.hits[number]) player.hits[number] = 0;
    player.hits[number]++;
    
    dartsThisTurn++;
    if(dartsThisTurn >= 3) nextPlayer();
    updateScoreboard();
}

