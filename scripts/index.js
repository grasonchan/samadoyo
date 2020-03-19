async function getHeros() {
  fetch(samadoyoApi + '/heros')
    .then(response => response.json())
    .then(result => {
      const heros = result.data;
      const slidePics = document.getElementsByClassName("swiper-slide");

      for(i = 0; i < slidePics.length; i++) {
        const slidePic = document.createElement("img");
        slidePic.setAttribute("src", "." + heros[i]);
        slidePics[i].appendChild(slidePic)
      }
    })
    .catch(error => console.log(error))
}

getHeros()