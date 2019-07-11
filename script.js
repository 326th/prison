const baseURL = 'https://exceed.superposition.pknn.dev'
let state = {'door':'close','buzzer':'off','light':'off'}
function get_data(){
    fetch (baseURL + '/data/newton')
      .then((res) => res.text())
      .then((data) => state = JSON.parse(data))
      .catch((err) => console.log(err));
      
}
function toggle_door(){
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
}
function alarm_off(){
    get_data()
    state['buzzer'] = 'off'
    state['light'] = 'off'
    post()
    get_data()
}

function post(){
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
            blink();
            break;
        case 'off':
            document.getElementById('alarm').src ='alarm_off(1).png';
            break;
    }
}
function blink(){
    x = 0.5; 

    switch (document.getElementById('alarm').src){
        case 'alarm_on(1).png':
            document.getElementById('alarm').src ='alarm_off(1).png';
            break;
        case 'alarm_off(1).png':
            document.getElementById('alarm').src ='alarm_on(1).png';
            break;

    }

    setTimeout(refreshData, x*1000);
}
function refreshpost(){
    x = 0.5;
    get_data()
    post()


}
