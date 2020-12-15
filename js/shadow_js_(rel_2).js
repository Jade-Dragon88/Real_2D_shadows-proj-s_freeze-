'use strict'	


// ============  ОБЪЯВЛЕНИЕ  ПЕРЕМЕННЫХ  ===========================

let window_w, window_h, main_obj_left, main_obj_top, num_of_items, 
	grad_list, items_w, first_grad_left, ser_number_of_grad, main_obj_h,
	main_obj_w, shadow_first_grad, main_obj_coords_x, main_obj_coords_y, 
	х_main_obj_mouse_coords, y_main_obj_mouse_coords, num_of_shadow_grad,
	grad_delta_h, gradient, skew_of_shadow, num_of_del_grad, foundation_transform_origin,
	grad_skew, this_transparency, this_grad_height, grad_blur, delta_grad_blur, 
	transparency_of_shadow, delta_transparency_x, last_ser_number, last_grad_blur,
	last_transparency, index_of_grad_delta_h, x_center_of_main_obj, y_center_of_main_obj,
	grad_blur_bottom, grad_blur_top, transparent_bottom, transparent_top, delta_h_of_del_grad_px,
	coords_of_bottom_of_del_grad, skew_of_shadow_rad,

	shadow_red_grad,aaa
	= 0;


// console.log(top_main_obj);
window_w = $(window).width();  //ширина окна браузера
window_h = $(window).height(); //высота окна браузера
// console.log(window_w);
main_obj_coords_x = $("div[class='main_obj']")[0].getBoundingClientRect().x;	// координаты объекта по Х, верхний левый угол
main_obj_coords_y = $("div[class='main_obj']")[0].getBoundingClientRect().y;	// координаты объекта по Y, верхний левый угол
// console.log('Координаты по Х='+main_obj_coords_x+'   Координаты по Y='+main_obj_coords_y);
main_obj_left = $('.main_obj')[0].offsetLeft; // вытаскиваем отступ объекта слева
main_obj_top = $('.main_obj')[0].offsetTop;   // вытаскиваем отступ объекта сверху
main_obj_h = $('.main_obj')[0].clientHeight; // вытаскиваем высоту объекта
main_obj_w = $('.main_obj')[0].clientWidth; // вытаскиваем ширину объекта
items_w = 1;  // ширина составляющих подложки
grad_skew = 0;  // угол поворота градиента для более плавного перехода от составляющей к составляющей
// num_of_items = window_w; // кол-во составляющих подложки равно ширине окна браузера
transparency_of_shadow = .25;  // изначальная прозрачность тени
delta_transparency_x = .5;	// изменение прозрачности цвета тени по оси Х (от 0 до 1),чем меньше число тем сильнее изменение
num_of_items = 750;  // количество составляющих подложки
first_grad_left = main_obj_left-(num_of_items/2);  // координаты по оси Х первой составляющей в подложке
grad_delta_h = .4;  // шаг изменение высоты составляющих тени
delta_grad_blur = 2;  //  степень изменения размытости градиента, от 1 до 5
index_of_grad_delta_h = 100  // коэффициент изменения шага высоты составляющих тени (от 1 до 100, в норме 100)
x_center_of_main_obj = main_obj_left+(main_obj_w/2); // определяем центр объекта по оси Х
y_center_of_main_obj = main_obj_top+(main_obj_h/2); // определяем центр объекта по оси Y

// =======================================  ПРОВЕРЯЕМ ВЕРНОСТЬ ОПРЕДЕЛЕНИЯ ЦЕНТРА ОБЪЕКТА  
	$('.main')[0].innerHTML += '<div class="test_obj"></div>';
	$('.test_obj').css({
				  'position':'absolute',
				  'width': '2',
				  'height': '2',
				  'background-color': 'black',
				  'z-index':'100000',
				  'left': main_obj_left,
				  'top':y_center_of_main_obj
				   });


// first_grad_left = main_obj_left-(num_of_items/2);
// console.log(main_obj_left);
// console.log(first_grad_left);


// =======================================  СОЗДАНИЕ  ПОДЛОЖКИ
	$('.main')[0].innerHTML += '<div class="foundation"></div>';
	for(let i=0; i<num_of_items; i++){
		$('.foundation')[0].innerHTML += '<div class="" number='+i+'></div>';
	//	grad_list_2 = 
	};

// ============================  УСТАНАВЛИВАЕМ СВОЙСТВА КОНТЕЙНЕРА-ПОДЛОЖКИ
	$('.foundation').css({
		// 'border':'1px solid blue',
		'width': num_of_items,
		'height': num_of_items,
		'position': 'absolute',
		'left': main_obj_left-(num_of_items/2),
		'top': main_obj_top-(num_of_items-main_obj_h)/2,
		// 'transform-origin':'center center',
		// 'transform':'rotate(45deg)'
		});


// =======================================  ФОРМИРОВАНИЕ  НАЧАЛЬНЫХ  СВОЙСТВ  ПОДЛОЖКИ 
    grad_list = $("div[number]");
    // console.log(grad_list);
    grad_list.each(function(){
    	ser_number_of_grad = (this.attributes.number.nodeValue)*1;  // извлекаем серийный номер составляющей подложки
    	// console.log(ser_number_of_grad);
   		this.style.position = 'absolute';  // позиция составляющей
    	// this.style.outline = '1px solid rgba(255,0,0, .1)';
		this.style.zIndex = '-1000000';
		this.style.width = items_w+'px'; // ширина составляющей
		// this.style.height = (main_obj_h+(num_of_items/2))+'px'; // высота составляющей
		this.style.height = (num_of_items)+'px'; // высота составляющей
    	// this.style.left = [first_grad_left+(main_obj_w/2)+(ser_number_of_grad*items_w)]+'px';  // отступ составляющей от левого края 
		this.style.left = [(ser_number_of_grad*items_w)]+'px';  // отступ составляющей от левого края
		// this.style.top = [main_obj_top-(num_of_items/2)+(main_obj_h/2)]+'px';
		// this.style.outline = '1px solid rgba(255,0,0, .02)';
//  	if (((this.attributes.number.nodeValue)*1)===((num_of_items-main_obj_w)/2)){
//  	    this.style.backgroundColor = 'green';
//		};
				
    });

	




	$("body")[0].onmousemove = function	(e){
		shadow_first_grad = Math.floor((num_of_items+main_obj_w)/(2*items_w));  // определяем порядковый номер составляющей, с которой начнётся тень
		х_main_obj_mouse_coords = main_obj_coords_x-event.clientX;	// расстояние от курсора до левой грани объекта по оси Х
		y_main_obj_mouse_coords = y_center_of_main_obj-event.clientY;  // расстояние от курсора до центра объекта по оси Y
		// console.log(y_main_obj_mouse_coords);
		// х_main_obj_mouse_coords = 0;
		num_of_shadow_grad = х_main_obj_mouse_coords;  // кол-во составляющих тени равно = расстояние от курсора до объекта по оси Х
		num_of_shadow_grad = Math.hypot(х_main_obj_mouse_coords,y_main_obj_mouse_coords) // кол-во составляющих тени равно = расстоянию от курсора до центра левой грани объекта (чёрная точкаь)
		// console.log('координаты мышки относительно объекта по Х='+х_main_obj_mouse_coords);
		// console.log('координаты мышки по Х='+event.clientX);
	//		for(let i=shadow_first_grad; i<=main_obj_mouse_coords; i++){
	//			if
	//		};
		
		
		// console.log('y_main_obj_mouse_coords = '+ y_main_obj_mouse_coords);
		// console.log('x_main_obj_mouse_coords = '+ х_main_obj_mouse_coords);

		// =============================================================  ОПРЕДЕЛЯЕМ УГОЛ ПОВОРОТА ПОДЛОЖКИ
			
			skew_of_shadow_rad = (Math.atan(y_main_obj_mouse_coords/х_main_obj_mouse_coords)); // угол поворота подложки, в радианах
			skew_of_shadow = (180/Math.PI)*skew_of_shadow_rad; // угол поворота подложки, в градусах
//			console.log('skew_of_shadow(через арктангенс)'+skew_of_shadow);



//			skew_of_shadow = (90*y_main_obj_mouse_coords)/(х_main_obj_mouse_coords+y_main_obj_mouse_coords);  
//			console.log('skew_of_shadow(моя формула)'+skew_of_shadow);
//			if (х_main_obj_mouse_coords<0 && y_main_obj_mouse_coords<0){  // источник света в нижней правой четверти
//				skew_of_shadow = +[(90*(-1*y_main_obj_mouse_coords))/(-1*(х_main_obj_mouse_coords+y_main_obj_mouse_coords))]+180;
//			};
//			if (х_main_obj_mouse_coords<0 && y_main_obj_mouse_coords>0){  // источник света в верхней правой четверти
//				skew_of_shadow = 180-(90*y_main_obj_mouse_coords)/((-1*х_main_obj_mouse_coords)+y_main_obj_mouse_coords);
//			};
//			if (х_main_obj_mouse_coords>0 && y_main_obj_mouse_coords<0){  // источник света в нижней левой четверти
//				skew_of_shadow = (90*y_main_obj_mouse_coords)/(х_main_obj_mouse_coords+(-1*y_main_obj_mouse_coords));
//			};
//			if (х_main_obj_mouse_coords<0 && y_main_obj_mouse_coords===0){  // источник света на оси Y справа от объекта
//				skew_of_shadow = 180;
//			};
//			
		// $('.foundation')[0].style.transform = 'rotate('+ skew_of_shadow +'deg)'; //  поворот подложки
		
		
		
		
		// =====================================  смена координат центра поворота подложки
		foundation_transform_origin = '50% '+([num_of_items-main_obj_h]/2)+'px'; // верхний край объекта
		if (y_main_obj_mouse_coords<0){
			foundation_transform_origin = '50% '+([num_of_items+main_obj_h]/2)+'px'; // нижний край объекта
		};
//		console.log('y_main_obj_mouse_coords = '+y_main_obj_mouse_coords);
//		console.log('foundation_transform_origin = '+foundation_transform_origin);
		

		$('.foundation').css({
						'transform-origin':foundation_transform_origin,
						// 'transform':'rotate('+ skew_of_shadow +'deg)'  //  поворачиваем подложку
		});




		// console.log('skew_of_shadow = '+skew_of_shadow);
		// console.log('COS(skew_of_shadow) = '+ Math.ceil([Math.cos((Math.PI/180)*skew_of_shadow)]*(main_obj_h))		);
//		console.log(typeof skew_of_shadow);
		num_of_del_grad = Math.ceil([Math.abs(Math.ceil(Math.sin(skew_of_shadow_rad)*(main_obj_h)))]/items_w);  // количество градиентов, требующих изменения при повороте тени
		console.log('num_of_del_grad = '+num_of_del_grad);
		shadow_red_grad = shadow_first_grad + num_of_del_grad; // порядковый номер последней составляющей, которая ещё выходит за пределы объекта при повороте тени
		// console.log('shadow_first_grad - num_of_add_grad = '+shadow_first_grad);
//		num_of_del_grad = Math.sin
	
		
		
		
		


		grad_list.each(function(){
			// ======================================  ПЕРЕВОД СВОЙСТВ СОСТАВЛЯЮЩИХ В СОСТОЯНИЕ ПО-УМОЛЧАНИЮ
			this.style.height = (num_of_items)+'px';
			this.style.backgroundColor = 'transparent';
			this.style.backgroundImage = 'none';
			this.style.top = [main_obj_top-(num_of_items/2)+(main_obj_h/2)]+'px';
			this.style.top = 0;
			this.style.outline = 'none';
	    	// this.style.outline = '1px solid rgba(255,0,0, .1)';  // отображаем подложку
			// $('.upper_end_corner').remove();
			this.style.width = '1px';

			//  =======================================================  ФОРМИРОВАНИЕ  ТЕНИ
			ser_number_of_grad = +(this.attributes.number.nodeValue);
		// if (num_of_shadow_grad > main_obj_w){	
			for(let i=0; i<num_of_shadow_grad; i++){
				if (ser_number_of_grad===(shadow_first_grad+i)){
					grad_delta_h = (index_of_grad_delta_h/100)*main_obj_h/num_of_shadow_grad;  // переопределяем шаг изменения высоты составляющих тени, так что бы тень в конце всегда была в 2 раза шире объекта
					this_grad_height = (main_obj_h)+(i*grad_delta_h); // высота целевого градиента
					delta_h_of_del_grad_px = [+Math.ceil([Math.cos((Math.PI/180)*skew_of_shadow)]*(main_obj_h))]/(num_of_del_grad); // шаг изменения нижней границы градиентов у составляющих тени, которые выходят за пределы объекта


//					console.log('cosA = '+[+Math.ceil([Math.cos((Math.PI/180)*skew_of_shadow)]*(main_obj_h))]);
//					console.log('num_of_del_grad = '+ num_of_del_grad);
//					console.log('delta_h_of_del_grad_px = '+delta_h_of_del_grad_px);
					this_transparency = [transparency_of_shadow-[(transparency_of_shadow/num_of_shadow_grad)*i/(1+delta_transparency_x)]]; // прозрачность цвета градиента увеличивается при удалении от объекта
					last_transparency = this_transparency;
					grad_blur = (i*grad_delta_h)/(this_grad_height*delta_grad_blur);  // размер размытия градиента у целевой составляющей, в десятых долях единицы
					
					grad_blur_bottom=grad_blur_top = (i*grad_delta_h)/(this_grad_height*delta_grad_blur);
//					console.log('grad_blur_bottom = '+grad_blur_bottom);
//					console.log('grad_blur_top = '+grad_blur_top);
					
					transparent_bottom=0;
					transparent_top=100;					


					if (i<num_of_del_grad){
						coords_of_bottom_of_del_grad= Math.ceil(100-(100*[[i*(Math.tan(skew_of_shadow_rad)+(1/Math.tan(skew_of_shadow_rad)))]/this_grad_height]));  // расположение нижней границы в градиенте "лишних" составляющих тени, в процентах
						// console.log('coords_of_bottom_of_del_grad = '+coords_of_bottom_of_del_grad);
						this.style.borderTop = '1px solid red';
						// this.style.backgroundColor = 'rgba(255,0,0, .5)';
						if (y_main_obj_mouse_coords>0) {
							transparent_bottom=0;
							// transparent_bottom=50;
							// transparent_bottom = coords_of_bottom_of_del_grad;
							grad_blur_bottom = 0;
						}
						else{grad_blur_top = 0};
					};



					last_grad_blur = grad_blur;
					
					
					gradient = 'linear-gradient('  // градиент идет снизу вверх и имеет один цвет-черный
				  					+(-grad_skew)+'deg, '  // поворот градиента
									+'transparent '+transparent_bottom+'%, '  // начало градиента прозрачное
				  					+'rgba(0,0,0,'+this_transparency+') '  // определяем цвет и его прозрачность
				  					+(100*grad_blur_bottom)+'%, ' // нижняя позиция цвета в градиенте
									+'rgba(0,0,0,'+this_transparency+') '  // теже цвет и прозрачность градиента
									+(100-(100*grad_blur_top))+'%, ' // верхняя позиция цвета в градиенте
				  					+'transparent '+transparent_top+'%'  // конец градиента тоже прозрачное				
									+')';
					this.style.height = this_grad_height+'px';  // высота градиента
					this.style.top = [main_obj_top-(i*grad_delta_h/2)]+'px'; // отступ сверху
					this.style.top = [((num_of_items-main_obj_h)/2)-(i*grad_delta_h/2)]+'px';
					this.style.backgroundImage = gradient;  //  устанавливаем градиент
				//	$("div[class*='_end']").each(function(){  //  удаляем лишние элементы
				//		this.remove();
				//	});
				};

				if (ser_number_of_grad>=shadow_first_grad && ser_number_of_grad<=shadow_red_grad){
					// this.style.backgroundImage = 'none';
					// this.style.backgroundColor = 'rgba(255,0,0, .5)'; // выделяем красным те составляющие тени, которые выходят за пределы объекта
				};







				last_ser_number = shadow_first_grad+num_of_shadow_grad;  //серийный номер первой составляющей подложки СРАЗУ ПОСЛЕ тени
				if ((this.attributes.number.nodeValue*1)===last_ser_number) { //работаем с этой составляющей
					$("div[class*='_end']").each(function(){  //  удаляем лишние элементы
						this.remove();
					});
					// console.log('!!!!!!!!!!');
					// this.style.outline = '1px solid red';
					// this.style.backgroundColor = 'red';
					// this.style.height = (2*main_obj_h)+'px'; // высота составляющей
					this.style.height = this_grad_height+'px';
					this.style.top = [(num_of_items-this_grad_height)/2]+'px';  // отступ сверху
					// this.style.width = (2*main_obj_h*last_grad_blur)+'px'; // ширина составляющей
					this.style.width = (х_main_obj_mouse_coords/3)+'px'; // ширина составляющей зависит от расстояния между курсором и объектом
					this.style.display = "flex";
					this.style.flexDirection = "column";
					// console.log(this);

					//  ===============================================  СОЗДАЕМ ОБЪЕКТЫ ДЛЯ ОКОНЧАНИЯ ТЕНИ
					this.innerHTML += '<div class="upper_end_corner"></div>'; // верний угол
					this.innerHTML += '<div class="body_end"></div>';  // середина
					this.innerHTML += '<div class="bottom_end_corner"></div>'; // нижний угол

					//  -------------------------------------------------  УСТАНАВЛИВАЕМ СВОЙСТВА ДЛЯ ОБЪЕКТОВ КОНЦОВКИ
					$("div[class*='_end_corner']").each(function(){
						this.style.position = 'static';
						// this.style.outline = '1px solid red';
						// this.style.height = (.5*main_obj_h)+"px";
						this.style.height = (this_grad_height*last_grad_blur)+"px";
						this.style.width = "100%";
					});
					gradient = 'radial-gradient('  //  определяем свойства градиента для верхнего угла
								+'farthest-side '
								+'at bottom left, '
								+'rgba(0,0,0,'+last_transparency+'), '
								+'transparent)';
					$('.upper_end_corner')[0].style.backgroundImage = gradient;  //  устанавливаем градиент для верхнего угла
					gradient = 'radial-gradient('  //  определяем свойства градиента для нижнего угла
								+'farthest-side '
								+'at top left, '
								+'rgba(0,0,0,'+last_transparency+'), '
								+'transparent)';
					$('.bottom_end_corner')[0].style.backgroundImage = gradient;   //  устанавливаем градиент для нижнего угла
					gradient = 'linear-gradient('   //  определяем свойства градиента для центрального объекта
								+'90deg, '
								+'rgba(0,0,0,'+last_transparency+'), '  //(ser_number_of_grad*grad_blur)+'%'
								+'transparent 100%'
								+')';
					$('.body_end').css({  //  устанавливаем свойства и градиент для центрального объекта
								"position":"static",
								"flex-grow":"1",
								"width":"100%",
								"background-image":gradient
								});
				};




			};
		// };
		});
		if (х_main_obj_mouse_coords <= 0){ // подчищаем концовку тени, когда её самой нет
			$("div[class*='_end']").each(function(){
				this.remove();
			});
		};

	}; //  конец $("body")[0].onmousemove



















