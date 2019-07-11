const baseURL = 'https://exceed.superposition.pknn.dev'
let state = {}
function get_data(){
    fetch (baseURL + '/data/newton')
      .then((res) => res.text())
      .then((data) => state = data)
      .catch((err) => console.log(err));
      console.log(data)
}
function post(door,buzzer,light){
    fetch(baseURL + '/data/newton',{
        method: 'POST',
        body: JSON.stringify({
        'data': {
            'door': door,
            'buzzer':buzzer,
            'light':light,
            }
        }),
        headers:{
            'Content-Type': 'application/json'
        }
    }).then((res) => res.json)
    .then((data)=>console.log(data))
    .catch((err)=>console.log(err));
}
function toggle_door(){
    const status = get_data()
    
}