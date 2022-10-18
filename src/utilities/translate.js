const translateData = translate.translation;

export default {
  getTranslateWord() {
    if (translateData.dict) {
      return translateData.dict[0].base_form;
    } else if (translateData.sentences) {
      if (translateData.sentences[0]) {
        return translateData.sentences[0].orig;
      } else {
        return "not found";
      }
    } else {
      return "not found";
    }
  },

  getTranslateMean() {
    if (translateData.dict) {
      return translateData.dict[0].entry[0].word;
    } else if (translateData.sentences) {
      if (translateData.sentences[0]) {
        return translateData.sentences[0].trans;
      } else {
        return "not found";
      }
    } else {
      return "not found";
    }
  },
};
