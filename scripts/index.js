let advertsSection = document.getElementById("adverts-section");

let backendURL = "https://donald-tech-express.onrender.com";

fetch(`${backendURL}/api/adverts`)
  .then((res) => res.json())
  .then((data) => {
    advertsSection.innerHTML = "";
    data.adverts.forEach((ad, i) => {
      let div = document.createElement("div");
      div.className =
        (i + 1) % 2 == 0 ? "advert-div desc-then-pic" : "advert-div";
      div.innerHTML = `
            <img class="advert-pic" src="${ad.ig}" alt="Advert image${i + 1}" />
            <div class="advert-desc">
                <h3>${ad.h3}</h3>
                <p>${ad.p}</h3>
            </div>    
        `;
      advertsSection.appendChild(div);
    });
  });
