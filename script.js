var display = document.getElementById("display");
var time = document.getElementById("time");
var horas = document.getElementById("horas");
var minutos = document.getElementById("minutos");
var segundos = document.getElementById("segundos");
var começar = document.getElementById("começar");
var parar = document.getElementById("parar");

var cronometroSeg;

var horaAtual;
var minutoAtual;
var segundoAtual;

var interval;

for (var i = 0; i <= 60; i++) {
  horas.innerHTML += '<option value = "' + i + '"> ' + i + "</option>";
}

for (var i = 0; i <= 60; i++) {
  minutos.innerHTML += '<option value = "' + i + '"> ' + i + "</option>";
}

for (var i = 0; i <= 60; i++) {
  segundos.innerHTML += '<option value = "' + i + '"> ' + i + "</option>";
}

function disableButton() {
  começar.disabled = true;
}

function undisableButton() {
  começar.disabled = false;
}

function formatNumber(num) {
  return num < 10 ? "0" + num : num;
}

function changeColor() {
  time.style.color = "yellow";
}

começar.addEventListener("click", function () {
  changeColor();
  horaAtual = horas.value;
  minutoAtual = minutos.value;
  segundoAtual = segundos.value;

  if (horaAtual == 0 && minutoAtual == 0 && segundoAtual == 0) {
    alert("Por favor, selecione um intervalo de tempo");
    return false;
  } else {
    disableButton();
    display.childNodes[1].innerHTML =
      formatNumber(horaAtual) +
      ":" +
      formatNumber(minutoAtual) +
      ":" +
      formatNumber(segundoAtual);

    interval = setInterval(function () {
      segundoAtual--;

      if (segundoAtual <= 0) {
        if (minutoAtual <= 0) {
          if (horaAtual > 0) {
            //horaAtual > 0 && minAtual <=0 && segundoAtual <=0
            horaAtual--;
            minutoAtual = 59;
            segundoAtual = 59;
          } else {
            //horaAtual <= 0 && minAtual <= 0 && segundoAtual <= 0
            document.getElementById("sound").play();
            alert("Tempo esgotado!");
            clearInterval(interval);
          }
        } else {
          //horaAtual <= 0 && minAtual > 0 && segAtual <= 0
          minutoAtual--;
          segundoAtual = 59;
        }
      }

      display.childNodes[1].innerHTML =
        formatNumber(horaAtual) +
        ":" +
        formatNumber(minutoAtual) +
        ":" +
        formatNumber(segundoAtual);
    }, 1000);
  }
});

parar.addEventListener("click", function () {
  undisableButton();
  document.getElementById("sound").pause();
  document.getElementById("sound").currentTime = 0;
  clearInterval(interval);
  minutoAtual = 0;
  segundoAtual = 0;
  horaAtual = 0;
  display.childNodes[1].innerHTML =
    formatNumber(horaAtual) +
    ":" +
    formatNumber(minutoAtual) +
    ":" +
    formatNumber(segundoAtual);
});
