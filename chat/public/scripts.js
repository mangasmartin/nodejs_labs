var user, socket;
window.addEventListener("load", init);

function init(){
  socket = io();
  var room = "chat";
  socket.emit("join", room);
  socket.on("message", function (m) {
    write(m.user, m.txt);
  });
  document.getElementById("form").addEventListener("submit", send);
  setTimeout(function(){
    user = prompt("Nom:");
    document.getElementById("nick").textContent = user;
    document.getElementById("msg").disabled = false;
    document.getElementById("send").disabled = false;
    document.getElementById("msg").focus();
  }, 2000);
}

function send(e){
  e.preventDefault();
  var txt = document.getElementById("msg");
  socket.emit("message", { user: user, "txt": txt.value });
  write(user, txt.value);
  document.getElementById("msg").value = "";
  document.getElementById("msg").focus();
}

function write(n,m){
  var li = document.createElement("li");
  var u = document.createElement("b");
  u.textContent = n + ":";
  var t = document.createElement("span");
  t.textContent = m;
  li.appendChild(u);
  li.appendChild(t);
  var box = document.getElementById("messages");
  box.appendChild(li);
  box.scrollTop = box.scrollHeight;
}
