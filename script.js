currentSlide = 1;
priceSlide = 2;
slidesCount = 8;

function changeSlide() {
  currentSlide = currentSlide === slidesCount ? 1 : currentSlide + 1;
  document.getElementById('slide').src = 'slides/' + currentSlide + '.png';
}

async function fetchPriceFromExcel() {
  try {
    const response = await fetch("https://gas-backend.onrender.com/prices");
    const data = await response.json();

    document.querySelector('#price1').innerHTML = `<span class="label-red">A92</span> ${data.a92}`;
    document.querySelector('#price2').innerHTML = `<span class="label-green">A95</span> ${data.a95}`;
    document.querySelector('#price3').innerHTML = `<span class="label-blue">ДП</span> ${data.dp}`;
    document.querySelector('#price4').innerHTML = `<span class="label-pink">ГАЗ</span> ${data.gaz}`;
  } catch (err) {
    console.error("Не вдалося отримати ціни:", err);
  }
}



function getKyivTime() {
  const kyivTime = new Date().toLocaleString("en-US", { timeZone: "Europe/Kyiv" });
  return new Date(kyivTime);
}

function checkForRefresh() {
  const now = getKyivTime();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  if (hours === 0 && minutes === 5) location.reload();
}

setInterval(checkForRefresh, 60 * 1000);
setInterval(() => changeSlide(), 2000);

window.onload = fetchPriceFromExcel;
