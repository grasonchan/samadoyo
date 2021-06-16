const SAMADOYO_API = 'http://api.hippy.io';

function handleResponse(response) {
  if (response.ok) {
    return response.json();
  } else {
    return Promise.reject({
      status: response.status,
      statusText: response.statusText,
    });
  }
}

window.addEventListener("load", () => {
  let navToggleActive = false;

  const navToggle = document.querySelector(".nav-toggle");
  const navToggleButton = navToggle.querySelector("button");
  const flowRoot = document.querySelector(".flow-root");
  const globalNav = document.querySelector(".global-nav");

  const modalBackdrop = document.createElement("div");
  modalBackdrop.setAttribute("class", "modal-backdrop");
  flowRoot.insertBefore(modalBackdrop, document.querySelector("header"));

  navToggle.addEventListener("touchend", () => {
    if (navToggleActive == false) {
      navToggleActive = true;

      globalNav.style.display = "block";
      modalBackdrop.style.zIndex = 2;

      navToggleButton.setAttribute("class", "fade");
      modalBackdrop.setAttribute("class", "modal-backdrop show");
      flowRoot.setAttribute("class", "flow-root hide");

      modalBackdrop.addEventListener("touchmove", event => event.preventDefault());

      navToggleButton.addEventListener("transitionend", () => {
        globalNav.style.display = "block";
        modalBackdrop.style.zIndex = 2;
      });
    } else {
      navToggleActive = false;

      navToggleButton.removeAttribute("class");
      modalBackdrop.setAttribute("class", "modal-backdrop");
      flowRoot.setAttribute("class", "flow-root");

      navToggleButton.addEventListener("transitionend", () => {
        globalNav.style.display = "none";
        modalBackdrop.style.zIndex = -1;
      });
    }
  });
});

function getGroupsName() {
  fetch(`${SAMADOYO_API}/groups`)
    .then(response => handleResponse(response))
    .then(result => {
      const groups = result.data;

      const globalNav = document.querySelector(".global-nav");
      const gnMenus = document.createElement("ul");
      const footerGroups = document.querySelector("#footer-groups");

      groups.forEach(group => {
        const gnMenu = document.createElement("li");
        gnMenu.setAttribute("class", "gn-menu");
        const gnMenu_anchor = document.createElement("a");
        gnMenu_anchor.setAttribute("href", "class.html");
        gnMenu_anchor.appendChild(document.createTextNode(group.name.zh));
        gnMenu.appendChild(gnMenu_anchor);
        gnMenus.appendChild(gnMenu);

        const footerGroup = document.createElement("li");
        const footerGroup_anchor = document.createElement("a");
        footerGroup_anchor.setAttribute("href", "class.html");
        footerGroup_anchor.appendChild(document.createTextNode(group.name.zh));
        footerGroup.appendChild(footerGroup_anchor);
        footerGroups.appendChild(footerGroup);
      });

      globalNav.appendChild(gnMenus);
    })
    .catch(error => console.log(`${error.status}: ${error.statusText}`));
}

getGroupsName();
