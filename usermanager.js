
function getDataToStore() {
    try {
      let data = [];
      if (localStorage.getItem("users")) {
        data = JSON.parse(localStorage.getItem("users"));
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
  
  function renderUserList() {
    const userListElement = document.getElementById("userList");
    const users = getDataToStore();
    userListElement.innerHTML = "";
    users.forEach((user, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${user.name}</td>
        <td>${user.email}</td>
        <td>${user.password}</td>
        <td>
          <button onclick="editUser(${index})">Edit</button>
          <button onclick="deleteUser('${user.name}')">Delete</button>
        </td>
      `;
      userListElement.appendChild(row);
    });
  }
  
  document.getElementById("addUserForm").addEventListener("submit", function(event) {
    event.preventDefault();
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    const editIndex = document.getElementById("editIndex").value;
  
    if (name === "" || password === "" || email === "") {
      alert("Please enter all information in the form.");
      return false;
    }
  
    let users = getDataToStore();
  
    if (editIndex === "") {
      // Add new user
      if (!users.some(user => user.name === name)) {
        const user = { name, email, password };
        users.push(user);
        setDataInStore("users", users);
        alert("User added successfully.");
      } else {
        alert("Username already exists.");
      }
    } else {
      // Edit existing user
      users[editIndex] = { name, email, password };
      setDataInStore("users", users);
      alert("User updated successfully.");
      document.getElementById("editIndex").value = "";
    }
  
    renderUserList();
    document.getElementById("addUserForm").reset();
  });
  
  function editUser(index) {
    const users = getDataToStore();
    const user = users[index];
    document.getElementById("name").value = user.name;
    document.getElementById("email").value = user.email;
    document.getElementById("password").value = user.password;
    document.getElementById("editIndex").value = index;
  }
  
  function deleteUser(name) {
    let users = getDataToStore();
    users = users.filter(user => user.name !== name);
    setDataInStore("users", users);
    renderUserList();
  }
  
  renderUserList();