const divContainer = document.getElementById("results");
let btn = document.getElementById("btn");
let search = document.getElementById("ricerca");
let bodyCard = document.getElementById("body-card");

VANTA.CLOUDS({
  el: "#main-container",
  mouseControls: true,
  touchControls: true,
  gyroControls: false,
  minHeight: 200.00,
  minWidth: 200.00,
  skyColor: 0x374893,
  cloudColor: 0x3d5c9b,
  sunColor: 0xff1818,
  sunGlareColor: 0xa49510
})

async function getKeyOfCity() {
  const call = await fetch(
    `https://api.openweathermap.org/geo/1.0/direct?q=${search.value}&limit=1&appid=63eccf81fc7eb1c007eb7d95bca961a6`
  );
  const response = await call.json();
  return response;
}

async function getLatAndLon(latitudine, longitudine) {
  const call = await fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitudine}&lon=${longitudine}&lang=it&units=metric&appid=63eccf81fc7eb1c007eb7d95bca961a6`
  );
  const response = await call.json();
  return response;
}

btn.addEventListener("click", (e) => {
  e.preventDefault();
  let div = document.getElementById("cont-style");
  div ? div.remove() : false;

  getKeyOfCity()
    .then((data) => {
      const latitudine = data[0].lat;
      const longitudine = data[0].lon;
      return [latitudine, longitudine];
    })

    .then((result) => {
      getLatAndLon(result[0], result[1]).then((data) => {
        console.log(data);
        const date = Date().substring(0, 15);
        let up = data.weather[0].description;
        up = up[0].toUpperCase() + up.substring(1);
        let div = document.createElement("div");
        div.setAttribute("id", "cont-style");
        div.innerHTML = `
      <h1>Città: ${data.name} - Nazione: ${data.sys.country}</h1>
      <h1>${date}</h1>
      <ul>
      <li><img src="./assets/${data.weather[0].icon}.png">${up}</li>
      <li>Temperatura massima:  ${data.main.temp_max}°</li>
      <li>Temperatura massima:  ${data.main.temp_min}°</li>
      <li>Wind speed: ${data.wind.speed} km/h </li>
      </ul>`;

        bodyCard.appendChild(div);
      });
    });
});
