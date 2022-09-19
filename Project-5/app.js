// Global Variable 

let div = null; 
window.onload =()=>{
    main()
}
function main(){
// reference 
const changeBtn = document.getElementById("changeBtn");
const copyBtn = document.getElementById("copyBtn");
const output = document.getElementById("input_color_code");
const root = document.getElementById("container");

changeBtn.addEventListener("click",function(){
    let bgColor = generateHexColorCode();
    root.style.backgroundColor = bgColor;
    output.value = bgColor;
})

copyBtn.addEventListener("click",function(){
    navigator.clipboard.writeText(output.value);

    if(div!== null){
        div.remove();
        div = null;
    }
    if(isValidHex(output.value)){
        generateToastMessage(`${output.value} are copied`)
    }else{
        alert("Invalid Color Code")
    }
})

output.addEventListener("keyup", function(e){
    const color = e.target.value
    if(color && isValidHex(color)){
        root.style.backgroundColor = color;
    }
})

}


// Function Creation 

// Generate Hex Color Code function 

function generateHexColorCode(){
    const red = Math.floor(Math.random()*255).toString(16);
    const green = Math.floor(Math.random()*255).toString(16);
    const blue = Math.floor(Math.random()*255).toString(16);

    return `#${red}${green}${blue}`
}

// RGBA Color Generator Function 

function generateRGBAColor(){
    const red =Math.floor(Math.random()*255);
    const green =Math.floor(Math.random()*255);
    const blue =Math.floor(Math.random()*255);
    const opacity = Math.floor(Math.random()*99);
    
    return `rgba(${red},${green},${blue},.${opacity})`
}

// Cheak Input Color Code with isValidHex function 

function isValidHex(color){
    if(color.length !== 7) return false;
    if(color[0]!== "#") return false;
    color=color.substring(1);

    return /^[0-9A-Fa-f]{6}$/i.test(color);
}

// Tost Message Generator Function 

function generateToastMessage(msg){
    div = document.createElement("div");
    div.innerText = msg;
    div.className= "toast-message toast-message-slide-in";
    
    div.addEventListener("click", function(){
        div.classList.remove("toast-message-slide-in");
        div.classList.add("toast-message-slide-out");
       
        div.addEventListener("animationend", function(){
            div.remove();
            div = null;
            })
    })
    
    document.body.appendChild(div);
}


