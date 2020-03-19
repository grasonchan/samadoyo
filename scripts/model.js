async function getModels() {
  fetch(samadoyoApi + '/groups')
    .then(response => response.json())
    .then(result => {
      const groups = result.data;

      fetch(samadoyoApi + '/groups/' + groups[0].id + '/products')
        .then(response => response.json())
        .then(result => {
          const products = result.data;

          const pageTitle = document.querySelector(".page-title");
          const pageTitle_title = document.createElement("h3");
          const pageTitle_anchor = document.createElement("a");
          pageTitle_anchor.setAttribute("href", "product.html");
          pageTitle_anchor.appendChild(document.createTextNode(products[0].name.zh));
          pageTitle_title.appendChild(pageTitle_anchor);
          pageTitle.appendChild(pageTitle_title);

          fetch(samadoyoApi + '/products/' + products[0].id + '/models')
            .then(response => response.json())
            .then(result => {
              const models = result.data;

              const pageTitle_span = document.createElement("span");
              pageTitle_span.appendChild(document.createTextNode(" > " + models[0].name));
              pageTitle_title.appendChild(pageTitle_span);

              const modelListItems = document.querySelector("#model-img-list");

              models[0].pictures.forEach(model_picture => {
                const modelListItem = document.createElement("li");
                modelListItem.setAttribute("class", "img-list-item");
                const modelListItem_picture = document.createElement("img");
                modelListItem_picture.setAttribute("src", "." + model_picture);
                modelListItem.appendChild(modelListItem_picture);
                modelListItems.appendChild(modelListItem)
              })
            })
            .catch(error => console.log(error))
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
}

getModels()