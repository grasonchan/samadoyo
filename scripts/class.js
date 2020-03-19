async function getProducts() {
  fetch(samadoyoApi + '/groups/')
    .then(response => response.json())
    .then(result => {
      const groups = result.data;

      fetch(samadoyoApi + '/groups/' + groups[0].id + '/products')
        .then(response => response.json())
        .then(result => {
          const products = result.data;
          
          const classNavItems = document.querySelector(".class-nav-items");
          
          const classListItems = document.querySelector("#class-list-items");

          products.forEach(product => {
            const classNavItem = document.createElement("li");
            classNavItem.setAttribute("class", "class-nav-item");
            const classNavItem_anchor = document.createElement("a");
            classNavItem_anchor.setAttribute("href", "#");
            const classNavItem_title = document.createElement("h2");
            classNavItem_title.appendChild(document.createTextNode(product.name.zh));
            const classNavItem_thumbnail = document.createElement("img");
            classNavItem_thumbnail.setAttribute("src", "." + product.thumbnail);
            classNavItem_anchor.append(classNavItem_title, classNavItem_thumbnail);
            classNavItem.appendChild(classNavItem_anchor);
            classNavItems.append(classNavItem);

            const imgListItem = document.createElement("li");
            imgListItem.setAttribute("class", "img-list-item");
            const imgListItem_anchor = document.createElement("a");
            imgListItem_anchor.setAttribute("href", "#");
            const imgListItem_poster = document.createElement("img");
            imgListItem_poster.setAttribute("src", "." + product.poster);
            imgListItem_anchor.appendChild(imgListItem_poster);
            imgListItem.appendChild(imgListItem_anchor);
            classListItems.appendChild(imgListItem)
          })

          classNavItems.querySelectorAll("a")[0].setAttribute("href", "product.html");
          classListItems.querySelectorAll("a")[0].setAttribute("href", "product.html")
        })
        .catch(error => console.log(error))
    })
    .catch(error => console.log(error))
}

getProducts()