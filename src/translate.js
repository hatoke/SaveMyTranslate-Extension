function addSaveButton() {
    const row = document.getElementsByClassName("FFpbKc")
    const urlSearchParams = new URLSearchParams(window.location.search);
    const params = Object.fromEntries(urlSearchParams.entries());
    if (row) {
        const saveButton = document.createElement("div");
        saveButton.id = "hatoke-tranlsate-save";
        saveButton.innerText = "Kaydet"
        row[0].prepend(saveButton)
    }
}

addSaveButton();