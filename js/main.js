document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('particles'), {
    dotColor: '#595959',
    lineColor: '#3d3d3d',
    density: 15000,
    minSpeedX: 0.01,
    minSpeedY: 0.01,
    maxSpeedX: 0.3,
    maxSpeedY: 0.3,
    parallaxMultiplier: -15,
    proximity: 125,
    particleRadius: 5,
    lineWidth: 1.0
  });
  var intro = document.getElementById('intro');
  intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
}, false);

function rand(min, max) {
  return Math.random() * (max - min) + min;
}

function getrands() {
  const percentage1 = rand(25, 75);
  const percentage2 = rand(25, 75);
  const percentage3 = rand(25, 75);
  const percentage4 = rand(25, 75);
  var percentage11 = 100 - percentage1;
  var percentage21 = 100 - percentage2;
  var percentage31 = 100 - percentage3;
  var percentage41 = 100 - percentage4;
  var borderRadius = `${percentage1}% ${percentage11}% ${percentage21}% ${percentage2}% / ${percentage3}% ${percentage4}% ${percentage41}% ${percentage31}%`;
  return borderRadius
}

function generateBlob() {
  $(".blob").css("border-radius", getrands());
  $(".blob1").css("border-radius", getrands());
  $(".blob2").css("border-radius", getrands());
  $(".blob3").css("border-radius", getrands());
  $(".blob1").css("background-color", randomColor({luminosity: 'light', hue:'blue'}));
  $(".blob2").css("background-color", randomColor({luminosity: 'light', hue:'red'}));
  $(".blob3").css("background-color", randomColor({luminosity: 'light', hue:'yellow'}));
}

var support = { animations : Modernizr.cssanimations },
		container = document.getElementById( 'container' ),
		header = container.querySelector( 'header' ),
		loader = new PathLoader( document.getElementById( 'ip-loader-circle' ) ),
		animEndEventNames = { 'WebkitAnimation' : 'webkitAnimationEnd', 'OAnimation' : 'oAnimationEnd', 'msAnimation' : 'MSAnimationEnd', 'animation' : 'animationend' },
		// animation end event name
		animEndEventName = animEndEventNames[ Modernizr.prefixed( 'animation' ) ];

var ajax_loaded = false

$(document).ready(function() {
      generateBlob();
      ajax_loaded = true;
});

$(".blob").on('click', function(event){
  generateBlob();
});

$(".video-container").on('click', function(event){
  var v = document.getElementById("makerportfolio");
  togglePause(v)
});

var cursorOnDiv = false;

$(document).on({
        mouseenter:function(){ cursorOnDiv = true;},
        mouseleave:function(){ cursorOnDiv = false;},
    },
   '#video-flex'
);

function fancyTime(time)
{
    // Hours, minutes and seconds
    var mins = ~~((time % 3600) / 60);
    var secs = ~~time % 60;
    var ret = "";

    ret += "" + mins + ":" + (secs < 10 ? "0" : "");
    ret += "" + secs;
    return ret;
}

function togglePause(v) {
  if (v.paused) {
    v.style.filter = "grayscale(0%) brightness(100%)";
    v.play()
    $(".playpause").fadeOut();
  } else {
    if (v.currentTime != 0) {
      v.style.filter = "grayscale(60%) brightness(80%)";
      v.pause()
      $('#progress').text(fancyTime(v.currentTime) + ' / ' + fancyTime(v.duration))
      $(".playpause").fadeIn();
    }
  }
}

$(document).keydown(function(e) {
    var v = document.querySelector("#makerportfolio");
    switch(e.which) {
        case 32: // space
          if (cursorOnDiv) {
            togglePause(v)
          }
        break;

        case 37: // left
          if (cursorOnDiv) {
            v.currentTime = v.currentTime - 5
            $('#progress').text(fancyTime(v.currentTime) + ' / ' + fancyTime(v.duration))
          }
        break;

        case 39: // right
          if (cursorOnDiv) {
            v.currentTime = v.currentTime + 5
            $('#progress').text(fancyTime(v.currentTime) + ' / ' + fancyTime(v.duration))
          }
        break;

        case 38: // up
          if (cursorOnDiv) {
            v.volume = v.volume + 0.1
            $('#volume').text(Math.round(v.volume*100) + '%')
            $('#volume').show()
            $("#volume").delay(1000).fadeOut();
          }
        break;

        case 40: // down
          if (cursorOnDiv) {
            v.volume = v.volume - 0.1
            $('#volume').text(Math.round(v.volume*100) + '%')
            $('#volume').show()
            $("#volume").delay(1000).fadeOut();
          }
        break;

        default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
});

$("#particles").click(function() {
    $('html,body').animate({
        scrollTop: $("#bio_container").offset().top},
        duration=1000);
});

function init() {
	var onEndInitialAnimation = function() {
		if( support.animations ) {
			this.removeEventListener( animEndEventName, onEndInitialAnimation );
		}

		startLoading();
	};

	// disable scrolling
	window.addEventListener( 'scroll', noscroll );

	// initial animation
	classie.add( container, 'loading' );

	if( support.animations ) {
		container.addEventListener( animEndEventName, onEndInitialAnimation );
	}
	else {
		onEndInitialAnimation();
	}
}

function startLoading() {
	// simulate loading something..
	var simulationFn = function(instance) {
		var progress = 0,
			interval = setInterval( function() {

				// reached the end
				if( ajax_loaded ) {
					classie.remove( container, 'loading' );
					classie.add( container, 'loaded' );
					clearInterval( interval );

					var onEndHeaderAnimation = function(ev) {
						if( support.animations ) {
							if( ev.target !== header ) return;
							this.removeEventListener( animEndEventName, onEndHeaderAnimation );
						}

						classie.add( document.body, 'layout-switch' );
						window.removeEventListener( 'scroll', noscroll );
					};

					if( support.animations ) {
						header.addEventListener( animEndEventName, onEndHeaderAnimation );
					}
					else {
						onEndHeaderAnimation();
					}
				}
			}, 80 );
	};

	loader.setProgressFn( simulationFn );
}

function noscroll() {
	window.scrollTo( 0, 0 );
}


init();
