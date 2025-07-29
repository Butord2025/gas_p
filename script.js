currentSlide = 1
priceSlide = 2
slidesCount = 8

function changeSlide() {
  currentSlide = currentSlide === slidesCount ? 1 : currentSlide + 1
  document.getElementById('slide').src = 'slides/' + currentSlide + '.png';
}

async function fetchPrice() {  
  try {
    const urlParams = new URLSearchParams(window.location.search);
    const id = urlParams.get("id"); 
    const response = await fetch(`https://translation-server-main.onrender.com/prices?id=${encodeURIComponent(id)}`);
    const json = await response.json();

    if (response.ok) {
      data = JSON.parse(JSON.stringify(json.data));
      for (let i = 0; i < 4; i++) {
        document.querySelector('#price' + (i+1)).childNodes[1].nodeValue = ' ' +  data[i];
      }
    } else { console.log(`Error: ${json.error || "Unknown error"}`) }
  } catch (err) {
    console.log(`Request failed: ${err.message}`);
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
  if (hours === 0 && minutes === 5) {
    location.reload();
  }
}

setInterval(checkForRefresh, 60 * 1000);
setInterval(() => { changeSlide() }, 2000);

window.onload = function() {
  fetchPrice()
};