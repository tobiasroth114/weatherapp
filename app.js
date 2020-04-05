window.addEventListener('load', () => {
    let long;
    let lat;
    let temperatureDescription = document.querySelector('.temperature-description');
    let temperatureDegree = document.querySelector('.temperature-degree');
    let locationTimezone = document.querySelector('.location-timezone');  
    let temperatureSection = document.querySelector('.temperature');  
    let degreeSection = document.querySelector('.degree-section')
    const temperatureSpan = document.querySelector('.temperature span');
    

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/77b13c34701f5b213e7b465ccad49dd9/${lat},${long}`;


            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    //set DOM elements from APIs
                    temperatureDegree.textContent = temperature;
                    temperatureDescription.textContent = summary;
                    locationTimezone.textContent = data.timezone;
                    //formula for celsius
                    let celsius = (temperature - 32)* (5 / 9);
                    //set Icons
                    setIcons(icon, document.querySelector('.icon'));
                    // change fahrenheit to celsius
                    degreeSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent === "°F"){
                            temperatureSpan.textContent = "°C";
                            temperatureDegree.textContent = Math.floor(celsius);
                        }else{
                            temperatureSpan.textContent = "°F";
                            temperatureDegree.textContent = temperature;
                        }
                    })
                });
           });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});

//clock

const showClock = () => {
    const clock = document.getElementById('clock');
    let currDate = new Date();
    let h = currDate.getHours();
    let m = currDate.getMinutes();
    let s = currDate.getSeconds();
    //add zero to minutes & seconds if smaller than 10
    m = m < 10 ? `0${m}` : m;
    s = s < 10 ? `0${s}` : s;
    //display as hh:mm:ss
    clock.innerText = `${h}:${m}:${s}`;
    setTimeout(showClock, 1000)
}
showClock();