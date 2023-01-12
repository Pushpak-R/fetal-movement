var timeElem = document.getElementById("time");
var countTable = document.getElementById("countTable");
var onMovementBtn = document.getElementById("onMovement");
var countStr = localStorage.getItem("count")
var countObj = countStr ? JSON.parse(countStr) : {};
var time;
onMovementBtn.addEventListener("click", onMovement);

function updateTime() {
	today = new Date();
  timeElem.innerHTML = today.toLocaleTimeString();
}
setInterval(updateTime, 1000);

if(countObj) {
	for (var interval in countObj) {
		addRow(interval, countObj[interval]);
  }
}

function addRow (key, value) {
	var newRow = countTable.insertRow(1);
  var c1 = newRow.insertCell(0);
  var c2 = newRow.insertCell(1);
  c1.innerText = key;
  c2.innerText = value;
  console.log(c1,c2);
}

function onMovement() {
	var hours = today.getHours();
  var dd = String(today.getDate()).padStart(2, '0');
	var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
	var yyyy = today.getFullYear();
	var date = dd + '/' + mm + '/' + yyyy;
  var key = hours + " - " + (hours + 1) + " | " + date;
  if(countObj[key]) {
  	countObj[key] = countObj[key] + ' |';
    countTable.deleteRow(1);
    addRow(key, countObj[key]);
  } else {
  	countObj[key] = '|';
	  addRow(key, countObj[key]);
  }
  localStorage.setItem("count", JSON.stringify(countObj));
}
