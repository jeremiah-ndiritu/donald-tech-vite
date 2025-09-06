let productsContainer = document.getElementById("products-container");

let s = "autocad";
let backendURL = "http://localhost:8084"; // "https://donald-tech-express.onrender.com"
fetch(`${backendURL}/api/products/${s}`)
  .then((res) => res.json())
  .then((data) => {
    data.products.forEach((p) => {
      let div = document.createElement("div");

      div.innerHTML = `
        <h3>${p.name}</h3>
        <img src="./images/${p.image}" />
        <p>${p.description}</p>
        `;
      productsContainer.appendChild(div);
    });
  });
