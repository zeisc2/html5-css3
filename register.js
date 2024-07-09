function handleSubmit() {
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value.trim();
  const agreeChecked = document.getElementById("agree").checked;
  
  if (name === "" || password === "" || email ==="") {
    alert("Please enter all information in form.");
    return false;
  }

  function getDataToStore() {
    try {
      let data = [];
      if (localStorage.getItem("users")) {
        data = JSON.parse(localStorage.getItem("users"));
      }
      return data;
    } catch (error) {
      throw new Error("Không thể lấy dữ liệu từ lưu trữ.");
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

  let users = getDataToStore();

  function isUserExists(name, users) {
    return users.some((user) => user.name === name);
  }

  if (!isUserExists(name, users)) {
    const user = { name, email, password };
    users.push(user);
    setDataInStore("users", users);
    alert("Đăng ký thành công.");
    window.location.href = "login.html";
  } else {
    alert("Tên người dùng đã tồn tại.");
  }

  return false;  
}
