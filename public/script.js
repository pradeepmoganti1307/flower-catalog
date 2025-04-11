const disappearFor1Sec = (event) => {
  event.target.style.visibility = "hidden";
  setTimeout(() => (event.target.style.visibility = "visible"), 1000);
  return;
};

const main = () => {
  const wateringCan = document.querySelector("#watering-can");
  wateringCan.addEventListener("click", disappearFor1Sec);
};

globalThis.onload = main;
