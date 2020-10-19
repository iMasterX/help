let sendPost1;
$(document).ready(function() {
		sendPost1 = function() {
			$('.formGo').submit(function (e) {
				e.preventDefault();
				var form = $(this);
				// вырезал проверку на ошибку (подсвечивание красным)

				let tel = $("#testInput").val(); //значение поля телефона
				if (tel.indexOf('_') != -1) { //если присутствуют нижние подчеркивания
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
						form.find('.send__form').attr('disabled'); //отключим кнопку
					},
					statusCode: {
						0: () => okay(form), //стрелочная функция https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Functions/Arrow_functions
						200: () => okay(form)
					}
				});
				var formID = $(this).attr('id');
				var formNm = $('#' + formID);
				var message = $(formNm).find(".form-message");
				var formTitle = $(formNm).find(".form-title");
				$.ajax({
					type: "POST",
					url: 'http://newlevel.school//send-message-to-telegram.php',
					data: formNm.serialize(),
					success: function (data) {
						// Вывод сообщения об успешной отправке
						message.html(data);
						formTitle.css("display", "none");
						setTimeout(function () {
							formTitle.css("display", "block");
							message.html('');
							$('input').not(':input[type=submit], :input[type=hidden]').val('');
						}, 3000);
					}
					, error: function (jqXHR, text, error) {
						// Вывод сообщения об ошибке отправки
						message.html(error);
						formTitle.css("display", "none");
						setTimeout(function () {
							formTitle.css("display", "block");
							message.html('');
							$('input').not(':input[type=submit], :input[type=hidden]').val('');
						}, 3000);
					}
				});
				return false;
			});
			$('.form-element').append('<p class="creator"><a href=""</a></p>');
		}
		function okay(f) {
			f.html('<h4 style="color: #fff;">Спасибо, Ваш заявка отправлена!</h4><p style="color: #fff;">Я вам перезвоню в течении 30-ти минут.</p>'); // сунем в форму сообщение что все ок
		}
})
