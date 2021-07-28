// const readlineSync = require("readline-sync");

const playersJson = require("./playersData.json");
// console.log(playersJson);
let allCouples1=[];
let allCouples2=[];

let loggingDataOut='';
let roundCounter=0;
const main = () => {
  const tennisPlayers=playersJson.players;
  const N=tennisPlayers.length;
  // console.log("teniseri",tennisPlayers);
  if(N>64){
    console.log("Broj prijavljenih igraca na turniru ne moze biti veci od 64");
    return
  }
  // const N = readlineSync.question("Unesite broj tenisera (N):");

  // const tennisPlayers = [];

  // for (var i = 0; i < N; i++) {
  //   const tempTennisPlayer = readlineSync.question(
  //     "Unesite tenisera u obliku [ime],[prezime],[drzava],[ranking]:"
  //   );

  //   const tempTennisPlayerData = tempTennisPlayer.split(",");

  //   tennisPlayers.push({
  //     firstName: tempTennisPlayerData[0],
  //     lastName: tempTennisPlayerData[1],
  //     country: tempTennisPlayerData[2],
  //     ranking: parseInt(tempTennisPlayerData[3]),
  //   });
  // }



  const playersGroup1 = [];
  const playersGroup2 = [];

  for(let i=1; i<=tennisPlayers.length;i++){
    if(i%2==0){
      playersGroup1.push(tennisPlayers[i-1]);
    }else{
      playersGroup2.push(tennisPlayers[i-1]);
    }
  }
  checkingTempList(playersGroup1, allCouples1);
  checkingTempList(playersGroup2, allCouples2);
tournament(allCouples1,allCouples2);
console.log("loggingDataOut", loggingDataOut);
  /*

    Your program (assignment) should start here...
    Variables N and tennisPlayers are available to you.

    Feel free to create new methods, include new files, and change this project as you wish.

    Code above this comment is used to "standardize" input to the application,
    and should be changed (or built upon) only if you would like to add input validation,
    or if you have an idea that you would like to demonstrate.

    ...Good Luck and Happy Coding...

  */
};
function checkingTempList(xPlayers, couplesGroup){
  if(xPlayers.length>4){
splitingCouples(xPlayers, couplesGroup);
  }
   if(xPlayers.length==1){
oneRemained(xPlayers, couplesGroup);}
if(xPlayers.length==2){
  twoRemained(xPlayers, couplesGroup);
}
if(xPlayers.length==3){
 threeRemained(xPlayers, couplesGroup);
}
if(xPlayers.length==4){
fourRemained(xPlayers, couplesGroup);
  }
}

function splitingCouples(forwPlayers, couplesGroup){
  let tempGroup1 = [];
  let tempGroup2 = [];

  for(let i=1; i<=forwPlayers.length;i++){
    if(i%2==0){
      tempGroup1.push(forwPlayers[i-1]);
    }else{
      tempGroup2.push(forwPlayers[i-1]);
    }
  }
  checkingTempList(tempGroup1,couplesGroup);
  checkingTempList(tempGroup2,couplesGroup);
}
function fourRemained(couples,couplesGroup){
  couplesGroup.push([couples[0],couples[1]],[couples[2],couples[3]]);
}
function threeRemained(couples,couplesGroup){
  couplesGroup.push([couples[0],couples[1]],[couples[2]]);
}
function twoRemained(couples,couplesGroup){
  couplesGroup.push([couples[0],couples[1]]);
}
function oneRemained(couples,couplesGroup){
  couplesGroup.push([couples[0]]);
}

function tournament(couplesArr1,couplesArr2){

  roundCounter+=1;
  loggingDataOut+=roundCounter+". round:";
  if(couplesArr1.length==1&&couplesArr2.length==1){
    tournamentFinal(couplesArr1,couplesArr2);
  }
  let tempArr1=[];
  let tempArr2=[]
for(var i=0;i<couplesArr1.length;i++){
  let winner=oneMatch(couplesArr1[i]);
  tempArr1.push(winner);
}
for(var j=0;j<couplesArr2.length;j++){
  let winner2=oneMatch(couplesArr2[j]);
  tempArr2.push(winner2);
}
loggingDataOut+=roundCounter+". round";
console.log("winners", tempArr2);
if(tempArr1.length>1||tempArr2.length>1){
   newRound(tempArr1,tempArr2);
}
 
}

function newRound(arr1,arr2){
  let tempArr3=arrayToMultyA(arr1);
  let tempArr4=arrayToMultyA(arr2);
 
  tournament(tempArr3,tempArr4);
}
function arrayToMultyA(arrxxx){
  let finallArr=[];
  for(let x=0;x<arrxxx.length;x+2){
    if(x%2==0){
      finallArr.push([arrxxx[x],arrxxx[x+1]]);
    }else{
      finallArr.push(arrxxx[x]);
    }
    
  }
return finallArr;
}
function oneMatch(competitors){
if(competitors.length==1){
  loggingDataOut+=competitors.firstName+" "+competitors.lastName+"(no competitor);";
  return competitors[0];
}else {
  loggingDataOut+=competitors[0].firstName+" "+competitors[0].lastName+competitors[1].firstName+" "+competitors[1].lastName+";";
  return competitors[Math.round(Math.random())]
}
}
function tournamentFinal(player1,player2){
  loggingDataOut+="Final:"+player1[0].firstName+" "+player1[0].lastName+ " : "+player2[0].firstName+" "+player2[0].lastName+";";
  let finalWin=Math.round(Math.random());
  let winnerOfTour=finalWin==0?player1:player2;
  loggingDataOut+="Winer of the rournament is"+winnerOfTour.firstName+" "+winnerOfTour.lastName+"!";
}

main();
