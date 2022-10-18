var translateText = "";
var lastPosition = { x: 0, y: 0 }

function getSelectedText() {
  var text = "";
  if (typeof window.getSelection != "undefined") {
    text = window.getSelection().toString();
  } else if (typeof document.selection != "undefined" && document.selection.type == "Text") {
    text = document.selection.createRange().text;
  } else {
    removeElementById("hatoke-translate");
  }
  return text;
}

function removeElementById(id) {
  if (document.contains(document.getElementById(id))) {
    document.getElementById(id).remove();
  }
}

function showButton(top, left) {
  removeElementById("hatoke-translate-wrapper");
  const button = document.createElement("div");
  button.id = "hatoke-translate";
  button.style.cssText = `position: absolute; top: ${top + 35}px; left: ${left + 15}px; width: 30px; height: 30px; border-radius:3px; background-color: #fff; border: 1px solid #ddd; box-shadow: 0px 1px 25px -10px rgba(0,0,0,0.75); cursor: pointer; z-index: 2147483647; font-size: 14px; font-weight: bold; color: #333; display: flex; align-items: center; justify-content: center;`;
  button.innerText = "S"
  button.onclick = showToolTip;
  document.body.appendChild(button);
}

async function getTranslate() {
  if (translateText.length > 0) {
    translateText = translateText.replaceAll(/[^\w\s]/gi, '')
    const body = JSON.stringify({
      userId: 1,
      source_lang: "en",
      target_lang: "tr",
      text: translateText
    });
    return await fetch(`https://api.savemytranslate.com/api/translate/translation`, {
      headers: { "Content-type": "application/json" },
      method: "POST",
      body
    }).then(response => response.json()).then(body => {
      return body;
    })
  } else {
    return false
  }
}

function handleMouseEvent(e) {
  if (e.srcElement && e.srcElement.id != "hatoke-translate") {
    removeElementById("hatoke-translate");
  }

  if (e.srcElement && e.srcElement.id != "hatoke-translate-wrapper") {
    removeElementById("hatoke-translate-wrapper");
  }
  if (window.getSelection().toString().length > 1 && window.getSelection().toString().length < 160) {
    var selected = window.getSelection();
    var oRange = selected.getRangeAt(0);
    var oRect = oRange.getBoundingClientRect();
    translateText = getSelectedText();
    var scrollTop = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    lastPosition.y = oRect.top + scrollTop;
    lastPosition.x = oRect.left;
    showButton(oRect.top + scrollTop, oRect.left);
  }
}

function getTranslateWord(translateData) {
  if (translateData.dict) {
    return translateData.dict[0].base_form
  } else if (translateData.sentences) {
    if (translateData.sentences[0]) {
      return translateData.sentences[0].orig
    } else {
      return "not found"
    }
  } else {
    return "not found"
  }
}

function getTranslateMean(translateData) {
  if (translateData.dict) {
    return translateData.dict[0].entry[0].word
  } else if (translateData.sentences) {
    if (translateData.sentences[0]) {
      return translateData.sentences[0].trans
    } else {
      return "not found"
    }
  } else {
    return "not found"
  }
}

async function showToolTip() {
  removeElementById("hatoke-translate");
  const { translation, status } = await getTranslate();
  if (status) {
    const toolTip = document.createElement("div")
    toolTip.innerHTML = `
      <style>         
        p, span, small {
          line-height: 18px;
        }

        #hatoke-translate-tooltip {
          position: absolute;
          min-width: 140px;
          max-width: 400px;
          box-shadow: 0 5px 15px rgba(0,0,0,0.1);
          top: ${lastPosition.y + 30}px;
          left: ${lastPosition.x}px;
          transform: translateX(-35%);
          border-radius:3px;
          z-index: 2147483647;
          background-color: #fcfcfc;
          border: 1px solid #ddd;
          padding: 15px; 
          display: flex;
          flex-direction: column;
          align-items: flex-start; 
          font-family: Arial !important;  
        }

        #hatoke-translate-tooltip::before{
          content: "";
          width: 0; 
          height: 0; 
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 15px solid #fcfcfc;          
          position: absolute;
          top: -15px;
          left: 50%;
          transform: translateX(-50%);          
        }

        .desc-row{
          display: flex;
          flex-direction: column;
        }
      </style>

      <div id="hatoke-translate-tooltip">
          <div class="desc-row">
            <small style="font-weight: bold;">Çeviri</small>
            <span style="color: #333; font-size: 16px; margin-bottom: 10px;">${getTranslateWord(translation)}</span>
          </div>
          <div class="desc-row">
            <span style="color: #333; font-size: 16px;">${getTranslateMean(translation)}</span>
          </div>
      </div>
    `;
    //toolTip.style.cssText = `position: absolute; min-width: 100px; max-width: 400px; top: ${lastPosition.y + 20}px; left: ${lastPosition.x}px; border-radius:3px; z-index: 2147483647; background-color: #fcfcfc; border: 1px solid #ddd; padding: 5px;`;
    //toolTip.innerHTML = `<style> #hatoke-translate-tooltip { position: absolute; min-width: 100px; max-width: 400px; top: ${lastPosition.y + 20}px; left: ${lastPosition.x}px; border-radius:3px; z-index: 2147483647; background-color: #fcfcfc; border: 1px solid #ddd; padding: 5px; }</style> <div id="hatoke-translate-tooltip"><span style="color: #333; font-size: 14px;">${getTranslateWord(translation)}  -  ${getTranslateMean(translation)}</span></div>`;    

    const wrapper = document.createElement("div");
    wrapper.id = "hatoke-translate-wrapper";
    /* wrapper.style.cssText = `position: absolute; top: ${lastPosition.y + 20}px; left: ${lastPosition.x}px;`;     */
    //wrapper.onclick = removeElementById("hatoke-translate-wrapper");
    wrapper.appendChild(toolTip);
    document.body.appendChild(wrapper);
  }
}

document.onmouseup = handleMouseEvent;