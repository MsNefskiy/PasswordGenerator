const numbers = "0123456789";
const specialSymbols = "@#$%&¹()[]{}=+-*/|\\`~\"'^!?.,:;_";
const latinLowerCase = "abcdefghijklmnopqrstyvwxyz";
const latinUpperCase = latinLowerCase.toUpperCase();
const russianLowerCase = "абвгдеёжзийклмнопрстуфхцчшщЪыьэюя";
const russianUpperCase = russianLowerCase.toUpperCase();

const getArrayRandomElement = (array) => {
  return array[Math.floor(Math.random() * array.length)];
};

const getPassword = (array, passwordSymbolCount) => {
  let password = "";

  for (let i = 0; i < passwordSymbolCount; i += 1) {
    password = `${password}${getArrayRandomElement(array)}`;
  }

  return password;
};

const getResultArray = (...checked) => {
  const [
    numbersChecked,
    specialSymbolsChecked,
    latinLowerChecked,
    latinUpperChecked,
    russianLowerChecked,
    russianUpperChecked,
  ] = checked;
  let resultArray = [];

  if (numbersChecked) {
    resultArray = [...resultArray, ...numbers];
  }
  if (specialSymbolsChecked) {
    resultArray = [...resultArray, ...specialSymbols];
  }
  if (latinLowerChecked) {
    resultArray = [...resultArray, ...latinLowerCase];
  }
  if (latinUpperChecked) {
    resultArray = [...resultArray, ...latinUpperCase];
  }
  if (russianLowerChecked) {
    resultArray = [...resultArray, ...russianLowerCase];
  }
  if (russianUpperChecked) {
    resultArray = [...resultArray, ...latinUpperCase];
  }

  return resultArray;
};

function toCopyPasswords({ textArea }) {
  const passwords = textArea.value;
  const tempElement = document.createElement("textarea");
  tempElement.value = passwords;
  tempElement.setAttribute("readonly", "");
  tempElement.style.position = "absolute";
  tempElement.style.left = "-9999px";
  document.body.appendChild(tempElement);
  tempElement.select();
  document.execCommand("copy");
  document.body.removeChild(tempElement);
}

function toGeneratePassword({
  textArea,
  numbersCb,
  specialSymbolsCb,
  latinLowerCb,
  latinUpperCb,
  russianLowerCb,
  russianUpperCb,
  passwordSymbolCount,
  passwordsCount,
}) {
  const resultArray = getResultArray(
    numbersCb.checked,
    specialSymbolsCb.checked,
    latinLowerCb.checked,
    latinUpperCb.checked,
    russianLowerCb.checked,
    russianUpperCb.checked
  );

  textArea.value = "";

  let passwords = [];
  for (let i = 0; i < passwordsCount.value; i += 1) {
    passwords.push(getPassword(resultArray, passwordSymbolCount.value));
  }

  passwords.map((password) => {
    textArea.value += `${password}\n`;
  });
}
