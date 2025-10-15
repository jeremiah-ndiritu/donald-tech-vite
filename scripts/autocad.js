let productsContainer = document.getElementById("products-container");

let s = "autocad";
let backendURL = "https://donald-tech-express.onrender.com"; //"http://localhost:8084"
fetch(`${backendURL}/api/products/${s}`)
  .then((res) => res.json())
  .then((data) => {
    data.products.forEach((p) => {
      let div = document.createElement("div");

      div.innerHTML = `
        <h3>${p.name}</h3>
        <img src="${p.image}" alt="${p.name}" />
        <p>${p.description}</p>
        `;
      productsContainer.appendChild(div);
    });
  });
