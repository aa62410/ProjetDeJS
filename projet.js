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
        value: couleur
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

/*[20,10],[380,50] // essai

var a = new Point(20, 10);
var b = new Point(380, 50);
var c = new Segment(a,b,[130,255,255])
MODEL=[[c]]

ctx1 = document.getElementById('ctx1').getContext('2d');
paint(ctx,tab)*/

/*
var a = new Point(20, 10);
var b = new Point(290, 120);
var c = new Point(180, 180);
var d = new Point(70, 180);
var e = new Point(100, 110);
var f = new Segment(a,b,[130,255,255])
var g = new Segment(b,c,[130,255,255])
var h = new Segment(c,d,[130,255,255])
var i = new Segment(d,e,[130,255,255])
MODEL[0][0]=f
MODEL[0][1]=g
MODEL[0][2]=h
MODEL[0][3]=i

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
	for (i = 0; i < tab.length; i += 1) {
        ctx.lineWidth = 5;
		ctx.strokeStyle = "rgb("+tab[i].couleur[0]+","+tab[i].couleur[1]+","+tab[i].couleur[2]+")";
		ctx.lineCap = 'round';
		ctx.beginPath();
		ctx.moveTo(tab[i].p1.x, tab[i].p1.y);
		ctx.lineTo(tab[i].p2.x, tab[i].p2.y);
		ctx.stroke();
    }
	
	
	
}

function computeCoordinates(event){
    //on recup l'evenement qui a produit l'evenement (ici le canvas)
    const canvas = event.currentTarget;

    //on demande le rectangle englobant le canvas
    const rect = canvas.getBoundingClientRect();

    //on calcule les coordonnée relatives
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    return [x,y]
}

ctx1.onclick = function(event){
    var coords = computeCoordinates(event);
}
