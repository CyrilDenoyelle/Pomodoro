$(document).ready(function(){
	console.log('coucou');
	var Pomodoro = function(output) {
		this.inter = undefined;
		this.output = output;
		sec = 0;
		min = 0;
		end = false;
		this.start = function(dur, type) {
			$('title').html(type);
			if (type === 'Pomodoro'){
				thingtodo = prompt('que fair ?');
				if(thingtodo !== null){
					$('div').attr('class', 'fait');
					$('.fait').css('text-decoration', 'line-through');
					$('body').append($("<div/class='tache'>").html(thingtodo));	
					console.log(thingtodo);
				}
			}
			dur = parseInt(dur);
			sec = 0;
			min = dur;
			if(min === 0){sec=2;}
			if(min < 10){ min = '0' + min; }
			if(sec < 10){ sec = '0' + sec; }
			$(this.output).html(min + ":" + sec);
			if (this.inter === undefined) {
				this.inter = setInterval(function time() {	
					min = parseInt(min);
					sec = parseInt(sec);
					if(min !== 0 || sec !== 0){
						if(sec === 0){sec = 59;min--;
						}else{sec--;}
					}else if(min === 0 && sec === 0 && end === false){
						end = true;
						$('title').html('BUZZ');
						$('#son').html("<object type='audio/mp3' width='0' height='0' data='alarme.mp3'><param name='autostart' value='true' /><param name='loop' value='false' /></object>");
						var stopmusic = setTimeout(function(){
							$('#son').html('');
						}, 30000);
					}
					if(min < 10){ min = '0' + min; } if(sec < 10){ sec = '0' + sec; } 
					$(this.output).html(min + ":" + sec);
				}, 1000);
			}
		};
		this.stop = function() {
			clearInterval(this.inter);
			this.inter = undefined;
			sec = 0;
			min = 0;
			$(this.output).html(min + ":" + sec);
			$('#son').html("");
			end = false;
		};
	};
	var pomo = new Pomodoro('#output');
	$('.input').click(function(){
		var temps = $(this).attr('data');
		var type = $(this).attr('id');
		pomo.stop();
		pomo.start(temps, type);
	});
});