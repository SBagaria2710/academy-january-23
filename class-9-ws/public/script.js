const socket = io();

socket.on("scaler", (data) => {
  console.log("Receiving message: ", data);
});

socket.on("serv_grp_msg", (data) => {
  console.log("Group Message", data);
});

socket.on("broadcast", (data) => {
  const div = document.createElement("div");
  div.setAttribute("class", "receiver");
  const li = document.createElement("li");
  li.innerText = data;
  const para = document.createElement("p");
  para.innerText = "Receiver";
  div.appendChild(para);
  div.appendChild(li);
  ul.appendChild(div);
});

const btn = document.getElementById("send");
const btnGrp = document.getElementById("createGrp");
const btnSTG = document.getElementById("stg");
const joinGrpBtn = document.getElementById("joinGrp");
const input = document.getElementById("message");
const ul = document.getElementById("list");

btn.addEventListener("click", () => {
  const value = input.value;
  const div = document.createElement("div");
  div.setAttribute("class", "sender");
  const li = document.createElement("li");
  li.innerText = value;
  const para = document.createElement("p");
  para.innerText = "Sender";
  div.appendChild(para);
  div.appendChild(li);
  ul.appendChild(div);
  input.value = "";
  socket.emit("client_message", value);
});

let roomId;
btnGrp.addEventListener("click", () => {
  console.log("Group created req");
  roomId = Math.ceil(Math.random(0, 1) * 1000);
  socket.emit("create_grp", roomId); // Random Room Id
});

joinGrpBtn.addEventListener("click", () => {
  console.log("Group Join Request");
  socket.emit("join_room", roomId);
});

btnSTG.addEventListener("click", () => {
  let value = input.value;
  if (value) {
    socket.emit("grp_msg", value);
  }
});
