var mode=document.getElementById('dark')
var calcContainer =document.getElementById('calc-container')
var body=document.getElementById('body');
let history = document.getElementById('history');
var result=document.getElementById('result');
var btn = document.getElementsByClassName('btn');
var audio = new Audio("./audio/click.mp3");
// var audio = new Audio("./audio/click.wav");
audio.preload='auto'
var percentage_container = document.getElementById('percentage_container');
var percentageof_value =document.getElementById('percentageof_value')
var percentage_value =document.getElementById('percentage_value')
var equals=document.getElementById('equals');
var percentageBtn = document.getElementById('percentage');
var percentageICON = document.getElementById('percentageICON');

function defaultEquals(){
    equals.classList.remove('percentageEquals');
}

function vibrate(){
    audio.currentTime=0.015;
    audio.playbackRate = 3.5;
    audio.play();
    if (navigator.vibrate) {
        navigator.vibrate(15);
     }
}

[...btn].forEach(e=>{
    e.addEventListener("click",vibrate);
})

function displayNum(num)
{
    if(percentageBtn.classList.contains('active'))
    {
        if(percentage_value.classList.contains('selected'))   percentage_value.value+=num;
        if(percentageof_value.classList.contains('selected')) percentageof_value.value+=num;
    }
    else{
        result.value+=num;
    }
    // percentageof_value.value+=num;
}

function addSelected(para){
    if(para === 'pV')
    {
        percentage_value.classList.add("selected")
        percentageICON.classList.remove('d-none')
        percentageof_value.classList.remove("selected")
        percentage_value.placeholder = "0";
    }
    else{
        percentage_value.placeholder = `0%`;
        percentageof_value.classList.add("selected")
        percentageICON.classList.add('d-none')
        percentage_value.classList.remove("selected")
    }
};

function cleared()
{
    if(percentageBtn.classList.contains('active'))
    {
        percentage_value.value='';
        percentageof_value.value='';
    }
    else{
        result.value=' ';
        history.innerHTML='';
    }
}

function evaluateNum(){
    let exp;
    exp=result.value;
    // let history = document.getElementById('history');
    history.innerHTML=`${exp}`
    history.classList.add('pre-animation');
    setTimeout(function(){
        history.classList.remove('pre-animation')
    },200)
    if(result.value !=='') result.value=eval(result.value);
}


function backspace()
{

    if(percentageBtn.classList.contains('active'))
    {
        if(percentage_value.classList.contains('selected')) percentage_value.value = percentage_value.value.slice(0,-1);
        if(percentageof_value.classList.contains('selected')) percentageof_value.value = percentageof_value.value.slice(0,-1);
    }
    else{
        result.value=result.value.slice(0,-1);
    }
}

function square(){
    if(percentageBtn.classList.contains('active')){
    history.innerHTML =`click below`;
    setTimeout(() => {
        history.innerHTML = '';
    }, 2000);        
    }
    else{
        let exp=result.value;
        // let history = document.getElementById('history');
        history.innerHTML=`${exp}&#178`
        result.value=result.value*result.value;
    }
}


function percentageCalc(){
    let a = percentageof_value.value;
    let b = percentage_value.value;
    let p = b/100;
    let out = a * p;
    if(out!==''){
        if(percentageBtn.classList.contains('active')){
            result.classList.remove('d-none');
            percentage_container.classList.add('d-none');
            history.innerHTML= `${b}% of ${a}`;
            result.value=out;
        }
        percentageBtn.classList.remove('active')
            equals.classList.remove('percentageEquals');
            equals.addEventListener("click",evaluateNum)
        }
    }

    function percentage(){
        percentageBtn.classList.toggle('active')
        result.classList.toggle('d-none')
        percentage_container.classList.toggle('d-none')
        equals.classList.toggle('percentageEquals');
        history.innerHTML = `click below`;
        setTimeout(() => {
            history.innerHTML = '';
        }, 2000);
        if(equals.classList.contains('percentageEquals')){
            equals.removeAttribute("onclick")
            equals.addEventListener("click",percentageCalc);
            
        }  
}
function more(){
    if(document.getElementById('more-btn').innerHTML!=="Less")
    {
        document.getElementById('more').innerHTML=`
    <button onclick="square()" class="btn btns operators col-3">x&#178</button>
    <button class="btn btns operators btns col-3" onclick="sqrt()">√</button>
    <button class="btn btns operators btns col-3" onclick="displayNum( '(' )">(</button>
    <button class="btn btns operators btns col-3" onclick="displayNum( ')' )">)</button>
    `
    document.getElementById('more-btn').innerHTML="Less"
    document.getElementById('more-btn').classList.add('activeMore')
    mode.classList.remove('d-none')
    mute.classList.remove('d-none')
}
else{
    document.getElementById('more-btn').classList.remove('activeMore')
        document.getElementById('more').innerHTML=''
        document.getElementById('more-btn').innerHTML="More"
        mode.classList.add('d-none')
        mute.classList.add('d-none')
    }
}
function sqrt(){
    if(percentageBtn.classList.contains('active')){
        history.innerHTML =`click below`;
        setTimeout(() => {
            history.innerHTML = '';
        }, 2000);        
        }
        else{
    let exp=result.value;
    // let history = document.getElementById('history');
    history.innerHTML=`√${exp}`
    result.value=Math.sqrt(result.value);
        }
}

function switchMode()
{
    if(mode.className==='fa-solid fa-moon'){
        mode.classList.remove('fa-moon')
        mode.classList.add("fa-bolt")
        mode.style.color='rgba(255, 255, 0, 0.85)'
        calcContainer.classList.add('darkswitch')
        body.style.background='rgba(1, 21, 41, 0.963)'
    }
    else{
        mode.classList.add('fa-moon')
        mode.classList.remove("fa-bolt")
        mode.style.color='#888888'
        calcContainer.classList.remove('darkswitch')
        body.style.background='rgba(128, 128, 128, 0.33)'
    }
    
}
var mute =document.getElementById('muteIcon')
function audioMode(){
    mute.classList.toggle('fa-bell-slash')
    mute.classList.toggle('fa-bell')
    if(mute.classList.contains('fa-bell-slash')){
        audio.muted = true;
    }
    else{
        audio.muted = false;
    }
}

mode.classList.add('d-none')
mute.classList.add('d-none')