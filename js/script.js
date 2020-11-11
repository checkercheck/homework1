document.addEventListener("DOMContentLoaded", function () {
  // загрузка html
  let colorArray = []; // массив, куда будут складываться введенные значения цветов с input
  var re = /[0-9A-Fa-f]{6}/g; // регулярное выражение проверки Hex

  let submit = document.querySelector(".submit"), // кнопка submit
    input = document.querySelector("input"), // тег input
    btnContainer = document.querySelector(".button-container"), // контейнер с кнопками
    window = document.querySelector(".window"); // окно отображения цвета

  function createBtn(bg) {
    // функция создания кнопки с передачей параметра цвета
    // создание кнопки
    let coloredBtn = document.createElement("button"); // создание кнопки
    coloredBtn.classList.add("btn"); // добавление класса "btn" к кнопке
    coloredBtn.style.background = `#${bg}`; // подставление значения цвета переданного через параметр
    coloredBtn.innerHTML = "Выбрать"; // добавление текста кнопки
    btnContainer.appendChild(coloredBtn); // добавление кнопки к контейнеру кнопок
    return coloredBtn; // получение кнопки
  }

  // проверка на количество символов
  input.addEventListener("change", function () {
    if (input.value.length > 6) {
      // если больше 6 символов, обнулить input, написать предупреждение
      alert("максимальное количество: 6 символов");
      input.value = "";
    }
  });

  submit.addEventListener("click", function (e) {
    // обработчик события submit
    e.preventDefault(); // отключить перезагрузку страницы
    if (input.value != "") {
      // первое условие: если  значение не пустое
      if (re.test(input.value)) {
        // второе условие: проверка значения на формат Hex
        colorArray.push(`#${input.value}`); // добавление значения в массив colorArray
        createBtn(input.value); // вызов функции создания кнопки с передачей параметра цвета
        input.value = ""; // обнуление input
        console.log(colorArray); // проверка ячеек в массиве colorArray

        let buttons = document.querySelectorAll(".btn"); // нахождение всех кнопок с классом "btn"
        for (let i = 0; i < buttons.length; i++) {
          // вешаем через цикл всем кнопкам обработчик событий
          (function (i) {
            // вот тут не совсем понял, зачем нам нужна анонимная функция, но передаем параметр i
            let button = buttons[i]; // через параметр i обращаемся к каждой кнопке
            button.onclick = function () {
              // вещаем обработчик событий
              window.style.background = `${colorArray[i]}`; // через параметр i подставляем значение из массива цветов
              window.textContent = `${colorArray[i]}`; // выводим название hex в заголовок
            };
          })(i); // передача параметра i для прохода по циклу
        }
      } else {
        alert("невалидный Hex"); // если неверный input, вывести ошибку
        input.value = ""; // обнулить значение
      }
      re.lastIndex = 0; // это не понял(
    } else {
      alert("пустое значение!"); // если пустое значение
    }
  });
});
