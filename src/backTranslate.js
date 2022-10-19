import elementUtil from "./utilities/element.js";
import translateUtil from "./utilities/translate.js";

elementUtil.removeElement("#hatoke-translate-wrapper");

const createCloseElement = () => {
  const closeElement = elementUtil.createNewElement({
    tag: "div",
    id: "hatoke-close-modal",
    cssText: `
    position: absolute;
    top: -10px;
    left: -10px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    cursor: pointer; 
    background-color: #e74c3c;
    border: 1px solid #333;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    user-select: none !important;`,
  });

  closeElement.addEventListener("click", () => {
    elementUtil.removeElement("#hatoke-translate-wrapper");
  });

  return closeElement;
};

const embedItem = document.getElementsByTagName("embed")[0];
embedItem.setAttribute("width", "99.9%");
embedItem.setAttribute("height", "99.9%");

const translateModalWrapper = elementUtil.createNewElement({
  tag: "div",
  id: "hatoke-translate-wrapper",
  cssText: `
  position: relative;
  width: 100%;
  height: 100%;
  `,
});

const translateModal = elementUtil.createNewElement({
  tag: "div",
  id: "hatoke-translate-file",
  cssText: `  
  position: fixed;    
  z-index: 200000;  
  `,
  attributeList: [{ key: "draggble", value: true }],
  shadowModeStatus: true,
  innerHTML: `
  <style>
  .hatoke-translate-wrapper{
    font-family: Open Sans, sans-serif;
    position: relative;
    display: flex;
    alignt-items: center;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 3px;
    box-shadow: 0 5px 10px rgba(0,0,0,0.1);
    pading-left: 5px;
  }
  
  .card-wrapper{
    width: 220px;  
    background-color: #fff;  
  }
  
  .card-wrapper:first-child{
    border-right: 1px solid #ddd;
  }
  
  .card-wrapper .card-head{
    padding: 10px;
    border-bottom: 1px solid #ddd;
    cursor: move;
  }
  
  .card-wrapper .card-body{
    padding: 10px;
    min-height: 80px;
    overflow-y: auto;
  }
  </style>
  
  <div class="hatoke-translate-wrapper">  
    <div class="card-wrapper" onmousedown="closeModal(event)">    
      <div class="card-head">
        <span>İngilizce</span>
      </div>
      <div class="card-body">
        <span>${translateUtil.getTranslateWord()}</span>
      </div>
    </div>
    <div class="card-wrapper">
      <div class="card-head">
        <span>Türkçe</span>
      </div>
      <div class="card-body">
        <span>${translateUtil.getTranslateMean()}</span>
      </div>    
    </div>
  </div>
  `,
});

const translateModalScript = document.createElement("script");
translateModalScript.text = `
function closeModal(e){  
  if (e && (e.which == 2 || e.button == 4)) {
    const translateModal = document.querySelector("#hatoke-translate-file");
    translateModal.remove()
  }  
}
`;

translateModal.appendChild(translateModalScript);
translateModalWrapper.appendChild(translateModal);

document.body.appendChild(translateModalWrapper);
elementUtil.dragElement(translateModal);
