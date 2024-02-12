// 1. 랜덤번호 지정
// 2. 유저가 번호를 입력한다 그리고 go라는 버튼을 누름
// 3. 랜덤번호 < 유저번호 down!!
// 4. 랜덤번호 > 유저번호 up!!
// 5. rest 버튼을 누르면 게임이 리셋된다.
// 6. 5번의 기회를 다 쓰면 게임이 끝난다(더이상 추즉 불가, 버튼이 disable)
// 7. 유저가 1~100 범위 밖의 숫자를 입력하면 알려준다. 기회를 깍지 않는다.
// 8. 유저가 이미 입력한 숫자를 또 입력하면 알려준다. 기회를 깍지 않는다.

let RandomNum = 0; // 1
let playbutton = document.getElementById("Gobutton"); //2
let Userinput = document.getElementById("UserNumInput");//2
let reset = document.getElementById("reset"); //5
let information = document.getElementById("infor"); //3.4
let chance = 5 //6
let gameover = false //6
let chancearea = document.getElementById("chance-area") //6
let history = [] // 8


playbutton.addEventListener("click",play) //2
reset.addEventListener("click",resetNum) //5
Userinput.addEventListener("focus", function(){Userinput.value=""})


function PickRandomNum(){ // 1
    RandomNum = Math.floor((Math.random()*100)+1);
    console.log("정답", RandomNum)
}

function play(){
    let Uservalue = Userinput.value;//2
    console.log(Uservalue);//2

    if(Uservalue<1 || Uservalue>100){ //7
        information.textContent = "1과 100사이의 숫자를 입력해주세요."
        return;
    } 

    if(history.includes(Uservalue)){ // 8
        information.textContent = "이미 입력한 숫자입니다. 다른 숫자를 입력해주세요.";
        return;
    }

    chance --; //6
    chancearea.textContent = `남은 기회:${chance+1}번` //6
    console.log("chance",chance) //6

    if(RandomNum>Uservalue){  //3.4
        information.textContent = "UP!!" //3.4
    }else if(RandomNum<Uservalue){
        information.textContent = "DOWN!!" //3.4
    }else {
        information.textContent = "정답!!" //3.4
        gameover = true; //6
    }

    history.push(Uservalue) // 8
    console.log(history) // 8

    if(chance<1){
        gameover = true; //6
    }
    
    if(gameover == true){
        playbutton.disabled = true; //6
        resetNum()
    }

    


}


function resetNum(){ 
    Userinput.value = ""; //5
    PickRandomNum() ; //5
    information.textContent = "두구두구두구"  //5
    playbutton.addEventListener("click", play)
}



PickRandomNum() // 1
play() //3.4
