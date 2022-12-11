const search = document.querySelector("#search");
const qas = document.querySelectorAll("#qa");
const qasText = [];
qas.forEach((qa) => qasText.push(qa.innerText));
console.log(qasText);

function debounce(func, timeout = 100) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
}

const inpFunc = debounce((e) => {
  qas.forEach((qa, i) => {
    if (!qasText[i].includes(search.value)) {
      qa.classList.add("hidden");
    } else {
      qa.classList.remove("hidden");
    }
  });
});

search.addEventListener("input", inpFunc);
