// Nature
const track_nature = document.getElementById('nature')
const btn_1_nature = document.getElementById('prev_nature')
const btn_2_nature = document.getElementById('next_nature')

let move = 0
let carrent = 1

btn_1_nature.onclick = function(){
    if (carrent > 1){
        move +=100
        carrent -=1
        track_nature.style.cssText = `transform: translateX(${move}%)`
    }
    else{
        carrent = track_nature.children.length
        move = (track_nature.children.length-1)* -100;
        track_nature.style.cssText = `transform: translateX(${move}%)`
    }
}


btn_2_nature.onclick = function(){
    if (carrent < track_nature.children.length){
        move -=100
        carrent +=1
        track_nature.style.cssText = `transform: translateX(${move}%)`
    }
    else{
        carrent= 1
        move = 0
        track_nature.style.cssText = `transform: translateX(0%)`
    }
}


//Magic
const track_magic = document.getElementById('magic')
const btn_1_magic = document.getElementById('prev_magic')
const btn_2_magic = document.getElementById('next_magic')


btn_1_magic.onclick = function(){
    if (carrent > 1){
        move +=100
        carrent -=1
        track_magic.style.cssText = `transform: translateX(${move}%)`
    }
    else{
        carrent = track_magic.children.length
        move= (track_magic.children.length-1)* -100;
        track_magic.style.cssText = `transform: translateX(${move}%)`
    }
}


btn_2_magic.onclick = function(){
    if (carrent < track_magic.children.length){
        move -=100
        carrent +=1
        track_magic.style.cssText = `transform: translateX(${move}%)`
    }
    else{
        carrent = 1
        move = 0
        track_magic.style.cssText = `transform: translateX(0%)`
    }
}


//Neon
const track_neon = document.getElementById('neon')
const btn_1_neon = document.getElementById('prev_neon')
const btn_2_neon = document.getElementById('next_neon')


btn_1_neon.onclick = function(){
    if (carrent > 1){
        move +=100
        carrent -=1
        track_neon.style.cssText = `transform: translateX(${move}%)`
    }
    else{
        carrent = track_neon.children.length
        move = (track_neon.children.length-1)* -100;
        track_neon.style.cssText = `transform: translateX(${move}%)`
    }
}


btn_2_neon.onclick = function(){
    if (carrent < track_neon.children.length){
        move -=100
        carrent +=1
        track_neon.style.cssText = `transform: translateX(${move}%)`
    }
    else{
        carrent = 1
        move = 0
        track_neon.style.cssText = `transform: translateX(0%)`
    }
}

// Перемещение по сайту через меню
const menu = document.querySelector('.menu')
const collection_slider = document.querySelectorAll('.left_part')
menu.onclick = (e)=>{
    const currentElement = e.target.closest('.menu_p');
    if(currentElement){
        const text = currentElement.innerHTML;

        if(text == 'NATURAL') {
            collection_slider[0].scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            })
        }

        if(text == 'MAGIC') {
            collection_slider[1].scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            })
        }

        if(text == 'NEON') {
            collection_slider[2].scrollIntoView({
                block: 'center',
                behavior: 'smooth'
            })
        }
    }
}

// Работа лифта
const btn_elevator = document.getElementById("elevator")
btn_elevator.onclick = ()=>{
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    })
}

// Приветственный слайдер
const header = document.getElementById('track_header')

let move_h = 0
let carrent_h = 1

setInterval(()=>{
    if (carrent_h < header.children.length){
        move_h -=100
        carrent_h +=1
        header.style.cssText = `transform: translateX(${move_h}%)`
    }
    else{
        carrent_h = 1
        move_h = 0
        header.style.cssText = `transform: translateX(0%)`
    }
},4000)

// Перемещение по сайту основное
const about_us = document.getElementById('href_1')
about_us.addEventListener('click', ()=> {
    document.getElementById('about_us').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'center'
    });
});

const collection = document.getElementById('href_2')
collection.addEventListener('click', ()=> {
    document.getElementById('collections').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
    });
});

const connect = document.getElementById('href_3')
connect.addEventListener('click', ()=> {
    document.getElementById('connect').scrollIntoView({ 
        behavior: 'smooth', 
        block: 'start'
    });
});

// Отправка заявки
const main = document.getElementById('thank_message')
const btn_connect = document.getElementById('btn_connect')
const btn_thank = document.getElementById('thank_btn')

btn_connect.onclick = (e)=>{
    e.preventDefault()
    main.classList.add('active')
}

btn_thank.onclick = ()=>{
    main.classList.remove('active')
}