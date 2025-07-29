currentSlide = 1;
priceSlide = 2;
slidesCount = 8;

function changeSlide() {
  currentSlide = currentSlide === slidesCount ? 1 : currentSlide + 1;
  document.getElementById('slide').src = 'slides/' + currentSlide + '.png';
}

async function fetchPrice() {
  try {
    const response = await fetch("https://excel.officeapps.live.com/x/_layouts/XlFileHandler.aspx?sheetName=%D0%A6%D0%86%D0%9D&downloadAsCsvEnabled=1&WacUserType=WOPI&usid=1cf43880-3e1d-5674-b721-8e7f909484a7&NoAuth=1&waccluster=NO4");
    const csv = await response.text();

    const lines = csv.trim().split('\n');
    const dataRows = lines.slice(1);
    const olasLine = dataRows.find(row => row.split(',')[0].includes("Олас Рівне"));

    if (!olasLine) {
      console.error("Рядок 'Олас Рівне' не знайдено.");
      return;
    }

    const values = olasLine.split(',');

    document.querySelector('#price1').innerHTML = `<span class="label-red">A92</span> ${values[1]}`;
    document.querySelector('#price2').innerHTML = `<span class="label-green">A95</span> ${values[2]}`;
    document.querySelector('#price3').innerHTML = `<span class="label-blue">ДП</span> ${values[3]}`;
    document.querySelector('#price4').innerHTML = `<span class="label-pink">ГАЗ</span> ${values[4]}`;

  } catch (err) {
    console.error("Помилка при fetchPrice:", err);
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

window.onload = fetchPrice;
