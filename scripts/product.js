function forGetProduct() {
  fetch(`${SAMADOYO_API}/groups`)
    .then(response => handleResponse(response))
    .then(result => {
      const groups = result.data;

      getProduct(groups);
    })
    .catch(error => console.log(`${error.status}: ${error.statusText}`));
}

function getProduct(groups) {
  fetch(`${SAMADOYO_API}/groups/${groups[0].id}/products`)
    .then(response => handleResponse(response))
    .then(result => {
      const products = result.data;

      const pageTitle = document.querySelector(".page-title");
      const pageTitle_title = document.createElement("h3");
      pageTitle_title.appendChild(document.createTextNode(products[0].name.zh));
      pageTitle.appendChild(pageTitle_title);

      const productListItems = document.querySelector("#product-list-items");

      products[0].pictures.forEach(product_pictures => {
        const imgListItem = document.createElement("li");
        imgListItem.setAttribute("class", "img-list-item");
        const imgListItemPic = document.createElement("img");
        imgListItemPic.setAttribute("src", `.${product_pictures}`);
        imgListItem.appendChild(imgListItemPic);
        productListItems.appendChild(imgListItem);
      });

      showModels(products);
    })
    .catch(error => console.log(`${error.status}: ${error.statusText}`));
}

function showModels(products) {
  fetch(`${SAMADOYO_API}/products/${products[0].id}/models`)
    .then(response => handleResponse(response))
    .then(result => {
      const models = result.data;

      const modelListItems = document.querySelector(".model-list-items");

      models.forEach(model => {
        const modelListItem = document.createElement("li");
        modelListItem.setAttribute("class", "model-list-item");
        const modelListItem_anchor = document.createElement("a");
        modelListItem_anchor.setAttribute("href", "model.html");
        const modelListItem_thumbnail = document.createElement("img");
        modelListItem_thumbnail.setAttribute("src", `.${model.thumbnail}`);
        modelListItem_anchor.appendChild(modelListItem_thumbnail);
        modelListItem.appendChild(modelListItem_anchor);
        modelListItems.appendChild(modelListItem);
      });
    })
    .catch(error => console.log(`${error.status}: ${error.statusText}`));
}

forGetProduct();
