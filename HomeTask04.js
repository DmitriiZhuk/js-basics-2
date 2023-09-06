async function fetchUsers() {
  const response = await fetch("https://jsonplaceholder.typicode.com/users");
  const data = await response.json();
  return data;
}

function displayUsers(users) {
  const userList = document.getElementById("user-list");
  userList.innerHTML = "";

  users.forEach((user) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${user.name} <button onclick="deleteUser(${user.id})">Удалить</button>`;
    userList.appendChild(listItem);
  });
}

function deleteUser(userId) {
  const users = JSON.parse(localStorage.getItem("users")) || [];
  const updatedUsers = users.filter((user) => user.id !== userId);

  localStorage.setItem("users", JSON.stringify(updatedUsers));

  displayUsers(updatedUsers);
}

async function main() {
  let users = JSON.parse(localStorage.getItem("users"));

  users = await fetchUsers();
  localStorage.setItem("users", JSON.stringify(users));

  displayUsers(users);
}

main();
