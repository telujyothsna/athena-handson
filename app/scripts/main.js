$(document).ready(function(){
	var slidesJsonURL = '/data/slides.json';

	$.ajax({
		url: slidesJsonURL,
		'dataType': 'json'
	})
	.then(function(response, status, headers){
		buildSlides(response.slides);
	});


	function buildSlides(slides){
		var slideTmpl = $('#slideTmpl').html();
		var indicatorTmpl = $('#indicTmpl').html();
		var slideHolder = $('#athSlides .carousel-inner');
		var indiHolder = $('#athSlides .carousel-indicators');
		var slideHtml = '', indicHtml = '';
		var i, numSlides = slides.length, tmp;

		for(i=0; i< numSlides; i++){
			tmp = slides[i];
			slideHtml += slideTmpl.replace('%title%', tmp.title)
							.replace('%content%', tmp.content)
							.replace('%btnTxt%', tmp.button.txt)
							.replace('%btnLink%', tmp.button.link)
							.replace('%img%', tmp.img)
							.replace('%index%', i);
			indicHtml += indicatorTmpl.replace('%index%', i);
		}

		indiHolder.html(indicHtml);

		slideHolder.html(slideHtml);
		slideHolder.find('.item').eq(0).addClass('active');
		indiHolder.find('li').eq(0).addClass('active');
		$('#athSlides').carousel({
			interval: 2000,
			pause: 'hover',

		});
	}

});
