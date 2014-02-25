$(document).ready(function() {	
	window.requestAnimFrame = (function(){
		return window.requestAnimationFrame    ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame    ||
			window.oRequestAnimationFrame      ||
			window.msRequestAnimationFrame     ||
			function(callback){
				window.setTimeout(callback, 1000 / 60);
			};
		})();

	// http://en.wikipedia.org/wiki/Fermat's_spiral
	// http://www.ms.unimelb.edu.au/~segerman/papers/sunflower_spiral_fibonacci_metric.pdf

	C = ['#1F0B09', '#531A1B', '#5D1914', '#7C3126', '#8E4F2E', '#8A5B23', '#B3913B', '#D9A63D'];
	R = Math.random;
	A = 0.6;
	P = 6.283185307179586; // 2 * Math.PI

	c = document.getElementById("spiral-canvas");
	a = c.getContext("2d");
	c.width = 500;
	c.height = 500;

	function _c2(n) {
		n = (n) % 400;
		var i = Math.floor(n / 34);
		if (i > 7) i = 7;
		return C[i];
	};

	function _d(s, aa, n) {
		r = s * Math.sqrt(n);
		t = P * aa * n;

		x = r * Math.cos(t)
		y = r * Math.sin(t)

		a.beginPath();
		a.arc(x, y, R() * 4 + 8, 0 , P, false);
		a.fillStyle = _c2(n);
		a.fill();	
		
		a.lineWidth = 0;
		a.strokeStyle = 0;
		// a.stroke();
	};

	(function animloop(){
		requestAnimFrame(animloop);
		a.save();

		a.fillStyle = "";
		a.clearRect(0, 0, c.width, c.height);
		a.translate(250, 250);
		for (var i = 0; i < 250; i++) _d(14, A += 0.0000001, i);
		a.restore();
	})();
});