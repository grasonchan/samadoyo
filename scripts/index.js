function getHeros() {
  fetch(`${SAMADOYO_API}/heros`)
    .then(response => handleResponse(response))
    .then(result => {
      const heros = result.data;
      
      const slidePics = document.getElementsByClassName("swiper-slide");

      for (i = 0; i < slidePics.length; i++) {
        const slidePic = document.createElement("img");
        slidePic.setAttribute("src", `.${heros[i]}`);
        slidePics[i].appendChild(slidePic);
      }
    })
    .catch(error => console.log(`${error.status}: ${error.statusText}`));
}

getHeros();
