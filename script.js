const baseURL = 'https://exceed.superposition.pknn.dev'
let state = {'door':'close','buzzer':'off','light':'off'}
function get_data(){
    fetch (baseURL + '/data/newton')
      .then((res) => res.text())
      .then((data) => state = data)
      .catch((err) => console.log(err));
      console.log(data)
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
}
function alarm_off(){
    get_data()
    state['buzzer'] = 'off'
    state['light'] = 'off'
    post()
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
            document.getElementById('alarm').src ='alarm_on(1).png';
            break;
        case 'off':
                document.getElementById('alarm').src ='alarm_off(1).png';
            break;
    }
}
function toggle_door(){
    const status = get_data()
    
}
