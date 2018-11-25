//MODELE
function Point(abs, ord) {
	'use strict';
    Object.defineProperty(this, "x", {
        enumerable: false,
        writable: false,
        configurable: false,
        value: abs
    });
    Object.defineProperty(this, "y", {
        enumerable: false,
        writable: false,
        configurable: false,
        value: ord
    });
};

Point.prototype.horizontalSymmetry = function (n) {
    'use strict';
    return new Point(this.x, (this.y - (2 * (this.y - n))));
};

Point.prototype.verticalSymmetry = function (n) {
    'use strict';
    return new Point(this.x - (2 * (this.x - n)), this.y);
};

Point.prototype.average= function (p2,alpha){
    'use strict';
    return new Point(this.x*(1-alpha)+p2.x+alpha,this.y*(1-alpha)+p2.y+alpha);
};

Point.prototype.clone = function () {
    'use strict';
    return new Point(this.x, this.y);
};

function Segment(p1, p2, couleur) {
    'use strict';
    Object.defineProperty(this, "p1", {
        enumerable: false,
        writable: false,
        configurable: false,
        value: p1
    });
    Object.defineProperty(this, "p2", {
        enumerable: false,
        writable: false,
        configurable: false,
        value: p2
    });
    Object.defineProperty(this, "couleur", {
        enumerable: false,
        writable: false,
        configurable: false,
        value: tab
    });
}

Segment.prototype.horizontalSymmetry = function (n) {
    'use strict';
    return new Segment(this.p1.horizontalSymmetry(n), this.p2.horizontalSymmetry(n));
};

Segment.prototype.verticalSymmetry = function (n) {
    'use strict';
    return new Segment(this.p1.verticalSymmetry(n), this.p2.verticalSymmetry(n));
};

Segment.prototype.average = function (p, alpha) {
    'use strict';
    return new Segment(this.p1.average(p, alpha), this.p2.average(p, alpha));
};

let MODEL=[[],[]]

/*MODEL=[[[20,10],[380,50]]],[[[]]] // essai
var a = new Point(20, 10);
var b = new Point(380, 50);
MODEL=[[a,b]],[[[]]]
ctx1 = document.getElementById('ctx1').getContext('2d');
paint(ctx,tab)*/

/*MODEL[0][0]=[20,10],[290,120]
 MODEL[0][1]=[290,120],[180,180]
 MODEL[0][2]=[180,180],[70,180]
 MODEL[0][3]=[70,180],[100,110]
 repaint()
 * 
 * 
 * 
 * 
 * */

//VUE
function repaint(){ //affiche le MODEL
	let ctx1 = document.getElementById('ctx1').getContext('2d');
    paint(ctx1, MODEL[0]);
	
}

function paint(ctx,tab){ //affiche les segements contenus dans tab dans le canvas ctx
	for (i = 0; i < tab.length-1; i += 1) {
        ctx.lineWidth = 5;
		ctx.strokeStyle = 'grey';
		ctx.lineCap = 'round';
		ctx.beginPath();
		ctx.moveTo(tab[i].x, tab[i].y);
		ctx.lineTo(tab[i+1].x, tab[i+1].y);
		ctx.stroke();
    }
	
	
	
}
