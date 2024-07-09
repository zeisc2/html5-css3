function handleloginSubmit(event) {
    event.preventDefault(); // Ngăn chặn hành động mặc định của biểu mẫu

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    let users = getDataToStore();

    if (email === "" || password === "") {
        alert("Vui lòng nhập tên người dùng và mật khẩu.");
        return false;  
    }

    const user = users.find(user => user.email === email && user.password === password);
    if (user) {
        alert("Đăng nhập thành công.");
        localStorage.setItem("user", JSON.stringify(user));
        window.location.href = "index.html"; 
    } else {
        alert("Sai tên người dùng hoặc mật khẩu.");
    }

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

function isUserExists(name, users) {
    return users.some(user => user.name === name);
}

document.getElementById('loginForm').onsubmit = handleloginSubmit;