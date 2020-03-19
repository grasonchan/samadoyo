const samadoyoApi = 'http://api.hippy.io';

async function getGroupsName() {
  fetch(samadoyoApi + '/groups')
    .then(response => response.json())
    .then(result => {
      const groups = result.data;

      const globalNav = document.querySelector(".global-nav");
      const gnMenus = document.createElement("ul");

      const footerGroups = document.querySelector("#footer-groups");

      groups.forEach(group => {
        const gnMenu = document.createElement("li");
        gnMenu.setAttribute("class", "gn-menu");
        const gnMenu_anchor = document.createElement("a");
        gnMenu_anchor.setAttribute("href", "#");
        gnMenu_anchor.appendChild(document.createTextNode(group.name.zh));
        gnMenu.appendChild(gnMenu_anchor);
        gnMenus.appendChild(gnMenu);

        const footerGroup = document.createElement("li");
        const footerGroup_anchor = document.createElement("a");
        footerGroup_anchor.setAttribute("href", "#");
        footerGroup_anchor.appendChild(document.createTextNode(group.name.zh));
        footerGroup.appendChild(footerGroup_anchor);
        footerGroups.appendChild(footerGroup)
      })

      globalNav.appendChild(gnMenus);

      globalNav.querySelectorAll("a")[0].setAttribute("href", "class.html");
      footerGroups.querySelectorAll("a")[0].setAttribute("href", "class.html")
    })
    .catch(error => console.log(error))
}

getGroupsName()