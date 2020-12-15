'use strict'	


// ============  ОБЪЯВЛЕНИЕ  ПЕРЕМЕННЫХ  ===========================

		let left_main_obj, top_main_obj, grad_h, grad_delta_h, grad_w, grad_blur, 
		  grad_skew, grad_list, grad_bottom_list, grad_upper_list, count_of_grad, ser_number_of_grad, 
		  gradient, this_grad_height, num_of_object, transparency_of_shadow, grad_delta_blur, grad_delta_color, 
		  end_list, last_grad_blur, last_grad_height, corner_item_list, body_item_list, main_obj_coords_x, main_obj_coords_y,
		  main_obj_mouse_coords, height_of_light, this_transparency, last_transparency, delta_transparency_x = 0;



// ============  ВРЕМЕННЫЕ  ПЕРЕМЕННЫЕ (ДЛЯ  ВРЕМЕННЫХ  РАСЧЁТОВ)  ===========================
//		let aaa = 0;
//		let bbb = 0;



// left=10;
left_main_obj = $('.main_obj')[0].offsetLeft; // отступ объекта слева
top_main_obj = $('.main_obj')[0].offsetTop;   // отступ объекта сверху
main_obj_coords_x = $("div[class='main_obj']")[0].getBoundingClientRect().x;	// координаты объекта по Х
main_obj_coords_y = $("div[class='main_obj']")[0].getBoundingClientRect().y;	// координаты объекта по Y
// grad_h = 150;                													 // высота объекта, в px
grad_h = $('.main_obj')[0].clientHeight;  // высота первой состявляющей тени равна высоте объекта, в px
grad_delta_h = .5;  // шаг изменение высоты от составляющей к составляющей, в px
grad_w = 1;   // ширина объекта, в px
grad_skew = 1;  // угол поворота градиента, в deg
// num_of_object = 100;	 // количество объектов, из которых состоит тень
transparency_of_shadow = .5;   // прозрачность тени
grad_delta_blur=100*(1-grad_delta_h);  // изменяет степень размытости градиента grad_blur (желательно от 1 до 100, норма = 100)
//grad_delta_color = 1;
delta_transparency_x = .3;	// степень изменения размытости тени по оси х (от 0 до 1),чем выше число тем МЕНЬШЕ размытость				

height_of_light = .5;	// эмуляция высоты источника света, в относ.ед-цах (от .1 до 1, норма = 1 ) чем меньше число, тем ниже источник к горизонту



// ===========================  ВРЕМЕННЫЕ  РАСЧЁТЫ  ===========================
		
		// aaa = [(grad_h/2)+((num_of_object-1)*grad_delta_h)]/2;  // половина высоты последнего объекта
		// bbb = (num_of_object-1)*grad_w;  // длина тени

// ============================================================================












		// console.log($("div[number='0']")[0].getBoundingClientRect().x);
		
		// console.log('координаты объекта = '+main_obj_coords);
		
		$("body")[0].onmousemove = function	(e){
				// console.log('координаты мыши = '+event.clientX);	// отображение координат мыши по оси Х
				main_obj_mouse_coords = main_obj_coords_x-event.clientX;	// координаты мыши по Х относительно объекта
				// console.log('координаты мыши относительно объекта = '+main_obj_mouse_coords);
				num_of_object = main_obj_mouse_coords/height_of_light; // определяем длину тени через кол-во составляющих (в норме = расстоянию от источника до объекта)
				grad_delta_h = grad_h/(2*num_of_object);	// подгоняем шаг изменения высоты составляющих, что бы последнняя была в 2 раза длинее объекта
				grad_list = $("div[class^='grad_']");	// все объекты списком
				// grad_list += $("div[class$='_end_container']");
				// console.log(grad_list);
				grad_list.remove();                                     // удаление "старых" объектов, т.е. от предыдущих координат мыши  
				grad_list = $("div[class$='_end_container']");
				grad_list.remove();



				// ==================================================  СОЗДАНИЕ  ВЕРХНЕЙ  ПОЛОВИНЫ ТЕНИ  ===========================
								for(let i=1; i<num_of_object; i++){
	 									$('.main')[0].innerHTML += '<div class="grad_upper" number='+i+'></div>';
	 						};
	 		// ==================================================  СОЗДАНИЕ  ВЕРХНЕЙ  ПОЛОВИНЫ  КОНЦОВКИ  ======================
								$('.main')[0].innerHTML += '<div class="upper_end_container"></div>';
										$('.upper_end_container')[0].innerHTML += '<div class="corner_upper_end_item"></div>';
										$('.upper_end_container')[0].innerHTML += '<div class="body_upper_end_item"></div>';
	 		// ==================================================  СОЗДАНИЕ  НИЖНЕЙ  ПОЛОВИНЫ ТЕНИ  ============================
	 		    for(let i=1; i<num_of_object; i++){
 		     			$('.main')[0].innerHTML += '<div class="grad_bottom" number='+i+'></div>';
	 		    };
	 		// ==================================================  СОЗДАНИЕ  НИЖНЕЙ  ПОЛОВИНЫ  КОНЦОВКИ  =======================
								$('.main')[0].innerHTML += '<div class="bottom_end_container"></div>';
										$('.bottom_end_container')[0].innerHTML += '<div class="body_bottom_end_item"></div>';
										$('.bottom_end_container')[0].innerHTML += '<div class="corner_bottom_end_item"></div>';

	 		// ==================================================  ФОРМИРОВАНИЕ  СВОЙСТВ  ОБЪЕКТОВ  ============================
						  grad_list = $("div[class^='grad_']");																																								 // все объекты списком
				    // console.log(grad_list);
				    grad_list.each(function(){
				    		ser_number_of_grad = (this.attributes.number.nodeValue)*1;
				    		// console.log('серийный номер объекта = '+ser_number_of_grad);
				    		// console.log('шаг изменения высоты объекта = '+grad_delta_h);
				    		this_grad_height = (grad_h/2)+(ser_number_of_grad*grad_delta_h); // формирование высоты объекта
				    		grad_blur = (ser_number_of_grad*grad_delta_h)/this_grad_height;	// вычисление единицы изменения размытия градиента
				    		// grad_blur = grad_delta_blur/(ser_number_of_grad*1);
										this_transparency = (transparency_of_shadow-[(transparency_of_shadow/num_of_object)*ser_number_of_grad/(1+delta_transparency_x)]);	// формирование прозрачности цвета у конкретного градиента
				  				// this_transparency = transparency_of_shadow;
				  						if (this.className==='grad_upper'){
				  								 gradient = 'linear-gradient('+																																							// формирование свойств градиента для верхней части
				  															 (-grad_skew)+'deg, '+																																									// поворот градиента
				  															 'rgba(0,0,0,'+this_transparency+
				  															 ') '+(100-(100*grad_blur))+'%, '+	 																											// распол-е конечного черного цвета в теле градиента 
				  															 'transparent 100%'+																																											// прозрачность в конце тела градиента (в норме 100%)
				  															 ')';
				  									// this.style.top = 'calc(50% - '+this_grad_height+'px)';															// позиционирование относительно гориз. центра контейнера 				
				  				 				this.style.top = (top_main_obj-this_grad_height)+'px';
				  				 	}
				  						else{
				  									gradient = 'linear-gradient('+																																							// формирование свойств градиента для нижней части
				      												grad_skew+'deg, '+																																												// поворот градиента
				      												'transparent 0%, '+																																											// прозрачность в начале тела градиента (в норме 0%)
				      												'rgba(0,0,0,'+this_transparency+
				      												') '+100*grad_blur+'%'+																																							// распол-е начального черного цвета в теле градиента
				      												')';
				      					this.style.top = (top_main_obj)+'px';															// позиционирование относительно гориз. центра контейнера
				      		};
				      		if (ser_number_of_grad===0){																																												// если это первый объект, то
				      					// this_grad_height = (grad_h)+(ser_number_of_grad*grad_delta_h);							// полная высота объекта
				      					// gradient = 'linear-gradient(red,red)';																															// красный градиент
				      					// this.style.outline = '1px solid green';											
				      		};
				    // console.log(gradient);
				  		this.style.position = 'absolute';																																								// установка позиционирования
				  		// this.style.left = 'calc('+left+'% + '+(ser_number_of_grad*grad_w)+'px)'; // установка отступа объекта от левого края контейнера
        				this.style.left = 'calc('+[left_main_obj+(ser_number_of_grad*grad_w)]+'px)';        // установка отступа объекта от левого края контейнера 
				  		// this.style.top
				  		// console.log(this.style.left);
				  		this.style.zIndex = '-1000000';                                          // отводим тень на задний план
				  		this.style.height = this_grad_height+'px';																															// установка высоты целевого объекта
				  		this.style.width = grad_w+'px';																																										// установка ширины объекта
				  		this.style.backgroundImage = gradient;																																			// установка градиента
				  		last_grad_blur = ser_number_of_grad*grad_blur;
				  		// console.log('grad_blur = '+grad_blur);
				  		last_grad_height = this_grad_height;
				  		last_transparency = this_transparency;
				  		// console.log(this);
				  		
				  		// console.log(this);
				  		// console.log('размер объекта = '+this_grad_height);
				      		// console.log(this.className+'_'+this.attributes.number.nodeValue);
				      		// console.log('    размытие градиента = '+grad_blur);
				      		// console.log('    градиент = '+ser_number_of_grad*grad_blur+'%');
				        		// console.log('номер объекта = '+ser_number_of_grad);
				      
						  });	
    
			 // ==================================================  ФОРМИРОВАНИЕ  СВОЙСТВ  КОНЦОВКИ  ============================
						// ================================================  ФОРМИРОВАНИЕ  СВОЙСТВ  КОНТЕЙНЕРОВ КОНЦОВКИ  ================
								end_list = $("div[class$='_end_container']");
								// console.log(end_list);
								end_list.each(function(){
										this.style.position = 'absolute';
										this.style.left = 'calc('+[left_main_obj+(num_of_object*grad_w)]+'px)';
										this.style.zIndex = '-1000000';
										this.style.height = (grad_h)+'px';																										// зависит от высоты объекта
										// this.style.width = grad_w+'px';
										this.style.width = ((last_grad_blur/100)*last_grad_height)+'px';				// ширина контейнера зависит от размера размытия градиента у предыдущего объекта
										
										this.style.display = 'flex';
										this.style.flexDirection = 'column';
						
										if (this.className==='upper_end_container'){
												// this.style.top = 'calc(50% - '+this_grad_height+'px)';
												this.style.top = (top_main_obj-this_grad_height)+'px';
												// this.style.flexDirection = 'column';
												// this.style.outline = '1px solid blue';
										}
										if (this.className==='bottom_end_container'){
												this.style.top = top_main_obj + 'px';
												// this.style.flexDirection = 'column-reverse';
												// this.style.outline = '1px solid green';
										}
										// console.log(this);
								});				
				  // ================================================  ФОРМИРОВАНИЕ  СВОЙСТВ  УГЛОВЫХ ЭЛ-ОВ КОНЦОВКИ  ==============
     				gradient=0;
     				corner_item_list = $("div[class^='corner_']");
     				// console.log(corner_item_list);
     				corner_item_list.each(function(){
     					 // this.style.outline = '1px solid red';
     					 // this.style.height = ((last_grad_blur/100)*this_grad_height)+'px';
     					 this.style.height = grad_blur*last_grad_height+'px';
     					 // console.log('высота угла = '+(grad_blur*last_grad_height));
     					 if (this.className==='corner_upper_end_item'){
     					 	 gradient = 'radial-gradient(farthest-side at bottom left, rgba(0,0,0,'+last_transparency+')'+', transparent)';
     					 	 // this.style.backgroundImage = gradient;
     					 };
     					 if (this.className==='corner_bottom_end_item'){
     					 	 gradient = 'radial-gradient(farthest-side at top left, rgba(0,0,0,'+last_transparency+')'+', transparent)';
     					 	 // this.style.backgroundImage = gradient;
     					 };
     					 this.style.backgroundImage = gradient;
     					 // this.style.border = '1px solid red';
     					 // console.log(gradient);
     					 // console.log(this);
     				});
						// ================================================  ФОРМИРОВАНИЕ  СВОЙСТВ  ЦЕНТРАЛЬНЫХ  ЭЛ-ОВ (body_) КОНЦОВКИ  =
     				gradient=0;
     				body_item_list = $("div[class^='body_']");
     				// console.log(body_item_list);
     				body_item_list.each(function(){
     						// this.style.outline = '1px solid blue';
     						this.style.flexGrow = '1';
     						gradient = 'linear-gradient('+
     																		'90deg, '+
     																		'rgba(0,0,0,'+last_transparency+'), '+//(ser_number_of_grad*grad_blur)+'%'+
     																		'transparent 100%'+
     																		')';
     						// console.log(gradient);
     						this.style.backgroundImage = gradient;
     						// this.style.border = '1px solid green';
     				});




		};// конец $("body")[0].onmousemove (строка 53)








// $('.block-shadows')[0].append(document.createElement('div'));
// $('.block-shadows')[0].children[($('.block-shadows')[0].childElementCount)-1].className = 'ABC'


// ==================================================  СОЗДАНИЕ  ВЕРХНЕЙ  ПОЛОВИНЫ ТЕНИ  ===========================
//	 for(let i=0; i<num_of_object; i++){
//	 	 $('.block-shadows')[0].innerHTML += '<div class="grad_upper" number='+i+'></div>';
//	 };
// ==================================================  СОЗДАНИЕ  ВЕРХНЕЙ  ПОЛОВИНЫ  КОНЦОВКИ  ======================
		//$('.block-shadows')[0].innerHTML += '<div class="upper_end_container"></div>';
		//		$('.upper_end_container')[0].innerHTML += '<div class="corner_upper_end_item"></div>';
		//		$('.upper_end_container')[0].innerHTML += '<div class="body_upper_end_item"></div>';
// ==================================================  СОЗДАНИЕ  НИЖНЕЙ  ПОЛОВИНЫ ТЕНИ  ============================
 	//for(let i=0; i<num_of_object; i++){
 	//	 $('.block-shadows')[0].innerHTML += '<div class="grad_bottom" number='+i+'></div>';
	 //};
// ==================================================  СОЗДАНИЕ  НИЖНЕЙ  ПОЛОВИНЫ  КОНЦОВКИ  =======================
		//$('.block-shadows')[0].innerHTML += '<div class="bottom_end_container"></div>';
		//		$('.bottom_end_container')[0].innerHTML += '<div class="body_bottom_end_item"></div>';
		//		$('.bottom_end_container')[0].innerHTML += '<div class="corner_bottom_end_item"></div>';













// $(function(){


// ==================================================  ФОРМИРОВАНИЕ  СВОЙСТВ  ОБЪЕКТОВ  ============================

//		grad_list = $("div[class^='grad_']");																																								 // все объекты списком
//		// console.log(grad_list);
//		grad_list.each(function(){
//				ser_number_of_grad = (this.attributes.number.nodeValue)*1;
//				this_grad_height = (grad_h/2)+(ser_number_of_grad*grad_delta_h);								    // формирование высоты объекта
//				grad_blur = grad_delta_blur/this_grad_height;																															// вычисление единицы изменения размытия градиента
//				// grad_blur = grad_delta_blur/(ser_number_of_grad*1);
//
//								if (this.className==='grad_upper'){
//										 gradient = 'linear-gradient('+																																							// формирование свойств градиента для верхней части
//																	 (-grad_skew)+'deg, '+																																									// поворот градиента
//																	 'rgba(0,0,0,'+transparency_of_shadow+') '+(100-(ser_number_of_grad*grad_blur))+'%, '+	 // распол-е конечного черного цвета в теле градиента 
//																	 'transparent 100%'+																																											// прозрачность в конце тела градиента (в норме 100%)
//																	 ')';
//											this.style.top = 'calc(50% - '+this_grad_height+'px)';															// позиционирование относительно гориз. центра контейнера 				
//						 	}
//								else{
//											gradient = 'linear-gradient('+																																							// формирование свойств градиента для нижней части
//																		grad_skew+'deg, '+																																												// поворот градиента
//																		'transparent 0%, '+																																											// прозрачность в начале тела градиента (в норме 0%) 	
//																		'rgba(0,0,0,'+transparency_of_shadow+') '+(ser_number_of_grad*grad_blur)+'%'+		// распол-е начального черного цвета в теле градиента
//																		')';
//											this.style.top = '50%';																																														// позиционирование относительно гориз. центра контейнера
//								};
//								if (ser_number_of_grad===0){																																												// если это первый объект, то
//											// this_grad_height = (grad_h)+(ser_number_of_grad*grad_delta_h);							// полная высота объекта
//											// gradient = 'linear-gradient(red,red)';																															// красный градиент
//											// this.style.outline = '1px solid green';											
//								};
//
//				this.style.left = 'calc('+left+'% + '+(ser_number_of_grad*grad_w)+'px)'; // установка отступа объекта от левого края контейнера
//				this.style.width = grad_w+'px';																																										// установка ширины объекта
//				this.style.position = 'absolute';																																								// установка позиционирования
//				this.style.height = this_grad_height+'px';																															// установка высоты целевого объекта
//				this.style.backgroundImage = gradient;																																			// установка градиента
//				last_grad_blur = ser_number_of_grad*grad_blur;
//				last_grad_height = this_grad_height;
//				// console.log(this);
//				
//				// console.log(this);
//				// console.log('размер объекта = '+this_grad_height);
//				// console.log(this.className+'_'+this.attributes.number.nodeValue);
//				// console.log('    размытие градиента = '+grad_blur);
//				// console.log('    градиент = '+ser_number_of_grad*grad_blur+'%');
//				// console.log('номер объекта = '+ser_number_of_grad);
//
//		});
// console.log('    градиент = '+ser_number_of_grad*grad_blur+'%');
// console.log(last_grad_blur);








// ==================================================  ФОРМИРОВАНИЕ  СВОЙСТВ  КОНЦОВКИ  ============================
		// ================================================  ФОРМИРОВАНИЕ  СВОЙСТВ  КОНТЕЙНЕРОВ  =========================
//				end_list = $("div[class$='_end_container']");
//				// console.log(end_list);
//				end_list.each(function(){
//						this.style.position = 'absolute';
//						this.style.left = 'calc('+left+'% + '+(num_of_object*grad_w)+'px)';
//						this.style.height = last_grad_height+'px';																										// зависит от высоты предыдущего объекта
//						// this.style.width = grad_w+'px';
//						this.style.width = ((last_grad_blur/100)*last_grad_height)+'px';				// ширина контейнера зависит от размера размытия градиента у предыдущего объекта
//						this.style.display = 'flex';
//						this.style.flexDirection = 'column';
//		
//						if (this.className==='upper_end_container'){
//								this.style.top = 'calc(50% - '+this_grad_height+'px)';
//								// this.style.flexDirection = 'column';
//								// this.style.outline = '1px solid blue';
//						}
//						if (this.className==='bottom_end_container'){
//								this.style.top = '50%';
//								// this.style.flexDirection = 'column-reverse';
//								// this.style.outline = '1px solid green';
//						}
//						// console.log(this);
//				});				
//  // ================================================  ФОРМИРОВАНИЕ  СВОЙСТВ  УГЛОВЫХ ЭЛ-ОВ  =======================
//				gradient=0;
//				corner_item_list = $("div[class^='corner_']");
//				// console.log(corner_item_list);
//				corner_item_list.each(function(){
//					 // this.style.outline = '1px solid red';
//					 this.style.height = ((last_grad_blur/100)*this_grad_height)+'px';
//					 // console.log(this);
//					 if (this.className==='corner_upper_end_item'){
//					 	 gradient = 'radial-gradient(farthest-side at bottom left, rgba(0,0,0,'+transparency_of_shadow+')'+', transparent)';
//					 	 // this.style.backgroundImage = gradient;
//					 };
//					 if (this.className==='corner_bottom_end_item'){
//					 	 gradient = 'radial-gradient(farthest-side at top left, rgba(0,0,0,'+transparency_of_shadow+')'+', transparent)';
//					 	 // this.style.backgroundImage = gradient;
//					 };
//					 this.style.backgroundImage = gradient;
//					 // console.log(gradient);
//					 // console.log(this);
//				});
//		// ================================================  ФОРМИРОВАНИЕ  СВОЙСТВ  ЦЕНТРАЛЬНЫХ  ЭЛ-ОВ (body_)  ==========
//				gradient=0;
//				body_item_list = $("div[class^='body_']");
//				// console.log(body_item_list);
//				body_item_list.each(function(){
//						// this.style.outline = '1px solid blue';
//						this.style.flexGrow = '1';
//						gradient = 'linear-gradient('+
//																		'90deg, '+
//																		'rgba(0,0,0,'+transparency_of_shadow+'), '+//(ser_number_of_grad*grad_blur)+'%'+
//																		'transparent 100%'+
//																		')';
//						// console.log(gradient);
//						this.style.backgroundImage = gradient;
//				});











































// });













// console.log(aaa);
// console.log(bbb);