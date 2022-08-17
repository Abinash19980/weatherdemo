console.log("this is themesssage")
fetch("https://puzzle.mead.io/puzzle").then((response)=>{
    response.json().then((data)=>{
        console.log(data)
    })
})


const weatherForm = document.querySelector('form')
const long = document.getElementById('log')
const lat = document.getElementById('lat')
const dataMessage = document.getElementById('message')

const search = document.querySelector('input')

weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    console.log(lat.value)
    console.log(long.value)
    const lati=lat.value
    const longi = long.value
    fetch("http://localhost:3000/weather?log="+longi+"&lat="+lati).then((response)=>{
    console.log(response)
    response.json().then((data)=>{
        console.log(data)
        JSONdata = JSON.stringify(data) 
        dataMessage.textContent= JSONdata
    })
})
})