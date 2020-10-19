let sendPost1;
$(document).ready(function() {
		sendPost1 = function() {
			$('.formGo').submit(function (e) {
				e.preventDefault();
				var form = $(this);
				// вырезал проверку на ошибку (подсвечивание красным)

				let tel = $("#testInput").val(); //значение поля телефона
				if (tel.length < 17) { //если длина меньше 17
					alert('Введите корректный номер телефона!');
					return false; //останавливаем
				}

				var data = form.serialize();
				$.ajax({
					url: "https://docs.google.com/forms/u/0/d/e/1FAIpQLSfxZUHvrZkPUXtppi5hyQGe9tG1KGw1ldUiowxUtG_-2O90Vw/formResponse", // слать надо сюда, строку с буковками надо заменить на вашу, это атрибут action формы
					data: data,
					type: "POST",
					dataType: "xml",
					beforeSend: function () {
						form.find('.send__form').attr('disabled'); //откючим кнопку
					},
					statusCode: {
						0: () => okay(form), //стрелочная функция https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions
						200: () => okay(form)
					}
				});
			});
		}
		function okay(f) {
			f.html('<h4 style="color: #fff;">Спасибо, Ваш заявка отправлена!</h4><p style="color: #fff;">Я вам перезвоню в течении 30-ти минут.</p>'); // сунем в форму сообщение что все ок
		}
})
