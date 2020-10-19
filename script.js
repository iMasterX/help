let sendPost1;
$(document).ready(function() {
		sendPost1 = function() {

			$('.formGo').submit(function (e) { // вешаем событие на отправку формы
				e.preventDefault(); // выключаем стандартное действие отправки
				var form = $(this); // запомним форму в переменной
				//     вырезал проверку на ошибку (подсвечивание красным)
				let tel = $("#testInput").val(); //значение поля телефона
				if (tel.length < 17) { //если длина меньше 17
					alert('Введите корректный номер телефона!');
					return false; //останавливаем
				}
				var data = form.serialize(); // сериализуем данные формы в строку для отправки, обратите внимание что атрибуты name у полей полностью сопдают с нэймами у полей самой гугл формы
				$.ajax({ // инициализируем аякс
					url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfxZUHvrZkPUXtppi5hyQGe9tG1KGw1ldUiowxUtG_-2O90Vw/formResponse", // слать надо сюда, строку с буковками надо заменить на вашу, это атрибут action формы
					data: data, // данные  которые мы сериализовали
					type: "POST", // постом
					dataType: "xml", // ответ ждем в формате xml
					beforeSend: function () { // перед отправкой
						form.find('.send__form').attr('disabled'); // отключим кнопку
					}
					, statusCode: { // после того как пришел ответ от сервера
						0: function () { // это успешный случай
							form.html('<h4 style="color: #fff;">Спасибо, Ваш заявка отправлена!</h4><p style="color: #fff;">Я вам перезвоню в течении 30-ти минут.</p>'); // сунем в форму сообщение что все ок
						},
						200: function () { // это тоже успешный случай
							form.html('<h4 style="color: #fff;">Спасибо, Ваш заявка отправлена!</h4><p style="color: #fff;">Я вам перезвоню в течении 30-ти минут.</p>'); // сунем в форму сообщение что все ок
						}
					}
				});
			});
		}
})
