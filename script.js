currentSlide = 1;
priceSlide = 2;
slidesCount = 8;

function changeSlide() {
  currentSlide = currentSlide === slidesCount ? 1 : currentSlide + 1;
  document.getElementById('slide').src = 'slides/' + currentSlide + '.png';
}

async function fetchPriceFromExcel() {
  try {
    const url = 'https://onedrive.live.com/download?resid=ED7EB020544F6733%21113&authkey=%21ACNac6VLwtHQfZk&em=2&wdAllowInteractivity=False&wdHideGridlines=True&wdHideHeaders=True&wdDownloadButton=True&wdInConfigurator=True&wdInConfigurator=True
';

    const response = await fetch(url);
    const blob = await response.blob();
    const arrayBuffer = await blob.arrayBuffer();

    // Читання Excel
    const workbook = XLSX.read(arrayBuffer, { type: 'array' });
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];

    // Отримати всі дані як масив масивів
    const data = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

    console.log("Excel дані:", data);

    // Пропускаємо перший рядок (заголовки), беремо другий рядок (перші ціни)
    const firstRow = data[1];  // data[0] — заголовки

    if (!firstRow || firstRow.length < 4) {
      console.error("Недостатньо даних у другому рядку.");
      return;
    }

    document.querySelector('#price1').innerHTML = `<span class="label-red">A92</span> ${firstRow[0]}`;
    document.querySelector('#price2').innerHTML = `<span class="label-green">A95</span> ${firstRow[1]}`;
    document.querySelector('#price3').innerHTML = `<span class="label-blue">ДП</span> ${firstRow[2]}`;
    document.querySelector('#price4').innerHTML = `<span class="label-pink">ГАЗ</span> ${firstRow[3]}`;

  } catch (err) {
    console.error("Помилка при завантаженні або обробці Excel:", err);
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
