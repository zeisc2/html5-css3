function getDataToStore() {
  try {
    let data = [];
    if (localStorage.getItem("products")) {
      data = JSON.parse(localStorage.getItem("products"));
    }
    return data;
  } catch (error) {
    throw new Error("Unable to retrieve data from storage.");
  }
}

function setDataInStore(key, data) {
  try {
    localStorage.setItem(key, JSON.stringify(data));
    return true;
  } catch (error) {
    console.error(error);
    return false;
  }
}

function renderProductList() {
  const productListElement = document.getElementById("productList");
  const products = getDataToStore();
  productListElement.innerHTML = "";
  products.forEach((product, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${product.description}</td>
      <td>
        <button onclick="editProduct(${index})">Edit</button>
        <button onclick="deleteProduct('${product.name}')">Delete</button>
      </td>
    `;
    productListElement.appendChild(row);
  });
}

document.getElementById("addProductForm").addEventListener("submit", function(event) {
  event.preventDefault();
  const name = document.getElementById("productName").value.trim();
  const price = document.getElementById("productPrice").value.trim();
  const description = document.getElementById("productDescription").value.trim();
  const editIndex = document.getElementById("editIndex").value;

  if (name === "" || price === "" || description === "") {
    alert("Please enter all information in the form.");
    return false;
  }

  let products = getDataToStore();

  if (editIndex === "") {
    if (!products.some(product => product.name === name)) {
      const product = { name, price, description };
      products.push(product);
      setDataInStore("products", products);
      alert("Product added successfully.");
    } else {
      alert("Product name already exists.");
    }
  } else {
    products[editIndex] = { name, price, description };
    setDataInStore("products", products);
    alert("Product updated successfully.");
    document.getElementById("editIndex").value = "";
  }

  renderProductList();
  document.getElementById("addProductForm").reset();
});

function editProduct(index) {
  const products = getDataToStore();
  const product = products[index];
  document.getElementById("productName").value = product.name;
  document.getElementById("productPrice").value = product.price;
  document.getElementById("productDescription").value = product.description;
  document.getElementById("editIndex").value = index;
}

function deleteProduct(name) {
  let products = getDataToStore();
  products = products.filter(product => product.name !== name);
  setDataInStore("products", products);
  renderProductList();
}

renderProductList();