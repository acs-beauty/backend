const ukrLetters = "[а-щьюяА-ЩЬЮЯґҐіІїЇєЄ]+";

export const ukraineWordsString = new RegExp(
  `^${ukrLetters}'?${ukrLetters}(?:\\s{1}${ukrLetters}'?${ukrLetters}?)*$`
);

export const validateLinkString = /^[a-z]+(-[a-z]+)*$/;
