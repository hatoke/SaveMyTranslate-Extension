async function getSelectedTranslate(selectionText) {
  const translateData = await fetchTranslate(selectionText);
  console.log(translateData);
  if (translateData) {
    executeScriptActiveTab(translateData);
  }
}

async function fetchTranslate(selectionText) {
  const targetText = selectionText.replaceAll(/[^\w\s]/gi, "");
  const body = JSON.stringify({
    userId: 1,
    source_lang: "en",
    target_lang: "tr",
    text: targetText.toLowerCase(),
  });
  console.log("body is ", body);
  return await fetch("https://api.savemytranslate.com/api/translate/translation", {
    headers: { "Content-type": "application/json" },
    method: "POST",
    body,
  })
    .then((response) => response.json())
    .then((body) => {
      console.log(body);
      return body;
    })
    .catch((err) => {
      return false;
    });
}

function executeScriptActiveTab(translation) {
  chrome.tabs.executeScript(
    {
      code: `var translate = ${JSON.stringify(translation)};`,
    },
    () => {
      chrome.tabs.executeScript({
        file: "backTranslate.js",
      });
    }
  );
}


chrome.contextMenus.create({
  id: "saveMyTranslate",
  title: 'Save My "%s"',
  contexts: ["selection", "link"],
});

chrome.contextMenus.onClicked.addListener(function (sel) {
  getSelectedTranslate(sel.selectionText);
});
