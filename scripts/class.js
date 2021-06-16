function forGetProducts() {
  fetch(`${SAMADOYO_API}/groups`)
    .then(response => handleResponse(response))
    .then(result => {
      const groups = result.data;

      getProducts(groups);
    })
    .catch(error => console.log(`${error.status}: ${error.statusText}`));
}

function getProducts(groups) {
  fetch(`${SAMADOYO_API}/groups/${groups[0].id}/products`)
    .then(response => handleResponse(response))
    .then(result => {
      const products = result.data;

      const classNavItems = document.querySelector(".class-nav-items");
      const classListItems = document.querySelector("#class-list-items");

      products.forEach(product => {
        const classNavItem = document.createElement("li");
        classNavItem.setAttribute("class", "class-nav-item");
        const classNavItem_anchor = document.createElement("a");
        classNavItem_anchor.setAttribute("href", "product.html");
        const classNavItem_title = document.createElement("h2");
        classNavItem_title.appendChild(document.createTextNode(product.name.zh));
        const classNavItem_thumbnail = document.createElement("img");
        classNavItem_thumbnail.setAttribute("src", `.${product.thumbnail}`);
        classNavItem_anchor.append(classNavItem_title, classNavItem_thumbnail);
        classNavItem.appendChild(classNavItem_anchor);
        classNavItems.append(classNavItem);

        const imgListItem = document.createElement("li");
        imgListItem.setAttribute("class", "img-list-item");
        const imgListItem_anchor = document.createElement("a");
        imgListItem_anchor.setAttribute("href", "product.html");
        const imgListItem_poster = document.createElement("img");
        imgListItem_poster.setAttribute("src", `.${product.poster}`);
        imgListItem_anchor.appendChild(imgListItem_poster);
        imgListItem.appendChild(imgListItem_anchor);
        classListItems.appendChild(imgListItem);
      });
    })
    .catch(error => console.log(`${error.status}: ${error.statusText}`));
}

forGetProducts();
