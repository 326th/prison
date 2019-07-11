const baseURL = 'https://exceed.superposition.pknn.dev'
let state = {'door':'close','buzzer':'off','light':'off'}
let refresh = true
let b = true
let loc = window.location.pathname.split("/");
let temp = '';
console.log(loc)
for(let i = 0; i < loc.length - 1; i++) {
    temp = temp + loc[i] + "/"
}
console.log(temp)

function get_data(){
    refresh = false
    fetch (baseURL + '/data/newton')
      .then((res) => res.text())
      .then((data) => state = JSON.parse(data))
      .catch((err) => console.log(err));
      
}
function toggle_door(){
    refresh = false
    get_data()
    switch (state['door']){
        case 'open':
            state['door'] = 'close';
            break;
        case 'close':
            state['door'] = 'open';
            break;
    }
    post()
    get_data()
    refresh = true
    refreshpost()
}
function alarm_off(){
    refresh = false
    get_data()
    state['buzzer'] = 'off'
    state['light'] = 'off'
    post()
    get_data()
    refresh = true
    refreshpost()
}

function post(){
    refresh = false
    fetch(baseURL + '/data/newton',{
        method: 'POST',
        body: JSON.stringify({
        'data': {
            'door': state['door'],
            'buzzer':state['buzzer'],
            'light':state['light'],
            }
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json)
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err));
    switch (state['door']){
        case 'open':
            document.getElementById('door').src ='door-open.png';
            break;
        case 'close':
                document.getElementById('door').src ='door-close.png';
            break;
    }
    switch (state['buzzer']){
        case 'on':
            b = true
            blink();
            break;
        case 'off':
            b = false
            document.getElementById('alarm').src ='alarm_off(1).png';
            break;
    }
}
function blink(){
    x = 0.5; 

    switch (document.getElementById('alarm').src){
        case "file://" + temp + "alarm_on(1).png":
            document.getElementById('alarm').src ='alarm_off(1).png';
            break;
        case "file://" + temp + "alarm_off(1).png":
            document.getElementById('alarm').src ='alarm_on(1).png';
            break;

    }

    if (b == true){
        setTimeout(blink, x*1000);
    }
    else {
        document.getElementById('alarm').src ='alarm_off(1).png';
    }
}
function refreshpost(){
    x = 0.5;
    get_data()
    post()
    if (refresh == true){
        setTimeout(refreshpost, x*1000);
    }

    
}
function stop_refresh(){
    refresh = false;
}