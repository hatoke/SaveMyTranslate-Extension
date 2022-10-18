export default {
  dragElement(elmnt) {
    var pos1 = 0,
      pos2 = 0,
      pos3 = 0,
      pos4 = 0;
    if (document.getElementById(elmnt.id + "header")) {
      // if present, the header is where you move the DIV from:
      document.getElementById(elmnt.id + "header").onmousedown = dragMouseDown;
    } else {
      // otherwise, move the DIV from anywhere inside the DIV:
      elmnt.onmousedown = dragMouseDown;
    }

    function dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      pos3 = e.clientX;
      pos4 = e.clientY;
      document.onmouseup = closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      pos1 = pos3 - e.clientX;
      pos2 = pos4 - e.clientY;
      pos3 = e.clientX;
      pos4 = e.clientY;
      // set the element's new position:
      elmnt.style.top = elmnt.offsetTop - pos2 + "px";
      elmnt.style.left = elmnt.offsetLeft - pos1 + "px";
    }

    function closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    }
  },

  createNewElement(elementOpts) {
    const defaultSettings = { tag: "div", id: "", className: "", cssText: "", shadowStatus: "closed", shadowModeStatus: false, innerHTML: "", attributeList: [], appendBody: false };
    elementOpts = { ...defaultSettings, ...elementOpts };
    const { tag, id, className, cssText, shadowStatus, shadowModeStatus, innerHTML, attributeList, appendBody } = elementOpts;
    const newElement = document.createElement(tag);
    //add id
    newElement.id = id;
    //add class list
    newElement.classList += className;
    //add css text
    newElement.style.cssText = cssText;
    //add attribute list
    if (typeof attributeList == "object" && attributeList.length > 0) {
      attributeList.forEach((attr) => {
        newElement.setAttribute(attr.key, attr.value);
      });
    }

    //set shadowRoot mode
    if (shadowModeStatus === true) {
      newElement.attachShadow({ mode: shadowStatus }).innerHTML = innerHTML;
    } else {
      newElement.innerHTML = innerHTML;
    }

    //append element document
    if (appendBody) {
      document.body.appendChild(newElement);
    }
    return newElement;
  },

  removeElement(selector = "") {
    if (typeof selector == "string" && selector.length > 0 && document.querySelector(selector)) {
      document.querySelector(selector).remove();
    }
  },
};
