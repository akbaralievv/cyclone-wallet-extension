const urlParams = new URLSearchParams(window.location.search);
const urlParamsHref = window.location.href;
if (urlParams.has('popup') || urlParamsHref.includes('popup=true')) {
  const style = document.createElement('style');
  style.innerHTML = `
        html, body {
          width: 100%;
          height: 100%;
          margin: 0;
          padding: 0;
          overflow: hidden;
        }
        #root {
          width: 100%;
          height: 100%;
        }
      `;
  document.head.appendChild(style);
}
