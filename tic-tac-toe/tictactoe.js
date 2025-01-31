const Box = document.querySelector(".box"),
BtnX = Box.querySelector(".opt .X"),
BtnO = Box.querySelector(".opt .O"),
Board = document.querySelector(".board"),
players = document.querySelector(".players"),
allBox = document.querySelectorAll("section span"),
result = document.querySelector(".result"),
wonText = result.querySelector(".won-text"),
restartBtn = result.querySelector("button");

window.onload = ()=>{
    for (let i = 0; i < allBox.length; i++) {
       allBox[i].setAttribute("onclick", "clickedBox(this)");
    }
}

BtnX.onclick = ()=>{
    Box.classList.add("hide");
    Board.classList.add("show");
}

BtnO.onclick = ()=>{ 
    Box.classList.add("hide");
    Board.classList.add("show");
    players.setAttribute("class", "players active player");
}

let XIcon = "fas fa-times",
OIcon = "far fa-circle",
playerSign = "X",
runBot = true;
function clickedBox(element){
    if(players.classList.contains("player")){
        playerSign = "O";
        element.innerHTML = `<i class="${OIcon}"></i>`;
        players.classList.remove("active");
        element.setAttribute("id", playerSign);
    }else{
        element.innerHTML = `<i class="${XIcon}"></i>`;
        element.setAttribute("id", playerSign);
        players.classList.add("active");
    }
    selectWinner();
    element.style.pointerEvents = "none";
    Board.style.pointerEvents = "none";
    let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
    setTimeout(()=>{
        bot(runBot);
    }, randomTimeDelay);
}

function bot(){
 let array = [];
 if(runBot){
  playerSign = "O";
  for (let i = 0; i < allBox.length; i++) {
  if(allBox[i].childElementCount == 0){
  array.push(i);}
}
 let randomBox = array[Math.floor(Math.random() * array.length)];
 if(array.length > 0){
   if(players.classList.contains("player")){ 
       playerSign = "X";
       allBox[randomBox].innerHTML = `<i class="${XIcon}"></i>`;
       allBox[randomBox].setAttribute("id", playerSign);
       players.classList.add("active");
   }else{
       allBox[randomBox].innerHTML = `<i class="${OIcon}"></i>`;
       players.classList.remove("active");
       allBox[randomBox].setAttribute("id", playerSign);
   }
     selectWinner();
 }
 allBox[randomBox].style.pointerEvents = "none";
 Board.style.pointerEvents = "auto";
 playerSign = "X";
 }
}
function getIdVal(classname){
    return document.querySelector(".box" + classname).id;
}
function checkIdSign(val1, val2, val3, sign){ 
    if(getIdVal(val1) == sign && getIdVal(val2) == sign && getIdVal(val3) == sign){
        return true;
    }
}

function selectWinner(){
 if(checkIdSign(1,2,3,playerSign) || checkIdSign(4,5,6, playerSign) || checkIdSign(7,8,9, playerSign) || checkIdSign(1,4,7, playerSign) || checkIdSign(2,5,8, playerSign) || checkIdSign(3,6,9, playerSign) || checkIdSign(1,5,9, playerSign) || checkIdSign(3,5,7, playerSign)){
     runBot = false;
     bot(runBot);
     setTimeout(()=>{
      result.classList.add("show");
      Board.classList.remove("show");
     }, 700);
     wonText.innerHTML = `Player <p>${playerSign}</p> won the match!`;}
 else{
   if(getIdVal(1) != "" && getIdVal(2) != "" && getIdVal(3) != "" && getIdVal(4) != "" && getIdVal(5) != "" && getIdVal(6) != "" && getIdVal(7) != "" && getIdVal(8) != "" && getIdVal(9) != ""){
     runBot = false;
     bot(runBot);
     setTimeout(()=>{
      result.classList.add("show");
      Board.classList.remove("show");
     }, 700);
     wonText.textContent = "Match has been drawn!";}}
}

restartBtn.onclick = ()=>{
    window.location.reload();
}
