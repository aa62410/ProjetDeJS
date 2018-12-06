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

Point.prototype.average= function (p2,al){
    'use strict';
	var n_x = this.x*(1-al / 1000)+p2.x*al/1000;
	var n_y = this.y*(1-al / 1000)+p2.y*al/1000;
    return (new Point(n_x, n_y));
};

Point.prototype.clone = function () {
    'use strict';
    return new Point(this.x, this.y);
};

//SEGMENT
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
    return new Segment(this.p1.horizontalSymmetry(n), this.p2.horizontalSymmetry(n), this.couleur);
};

Segment.prototype.verticalSymmetry = function (n) {
    'use strict';
    return new Segment(this.p1.verticalSymmetry(n), this.p2.verticalSymmetry(n), this.couleur);
};

Segment.prototype.average = function (p, al) {
    'use strict';
	var n_p1 = this.p1.average(p.p1, al);
	var n_p2 = this.p2.average(p.p2, al);
    return new Segment(n_p1, n_p2, this.couleur);
};

let MODEL=[[],[]];
var couleur=[0,0,0];
var alpha = 0;

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
    let ctx1 = document.getElementById('ctx1');
	let ctx2 = document.getElementById('ctx2');
    paint(ctx1, MODEL[0]);
    paint(ctx2, MODEL[1]);
	
}

function paint(ctx,tab){ //affiche les segements contenus dans tab dans le canvas ctx
	ctx.getContext('2d').clearRect(0, 0, ctx.width, ctx.height)
	ctx = ctx.getContext('2d')
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

//function computeCoordinates(event){
    //on recup l'evenement qui a produit l'evenement (ici le canvas)
    //const canvas = event.currentTarget;

    //on demande le rectangle englobant le canvas
    //const rect = canvas.getBoundingClientRect();

    //on calcule les coordonnée relatives
    //const x = event.clientX - rect.left;
    //const y = event.clientY - rect.top;

    //return [x,y]
//}

//ctx1.onclick = function(event){
    //var coords = computeCoordinates(event);
//}

//EDITEUR

/*function computeCoordinates(event) {
    // on récupère l'élément qui a produit l'événement (ici le canvas)
    const canvas = event.currentTarget;
    // on demande le rectangle englobant le canvas
    const rect = canvas.getBoundingClientRect();
    // on calcule les coordonnées relatives
    const x = (event.clientX - rect.left) //MORT AU NOMBRE À VIRGULE :D
    const y = (event.clientY - rect.top)
    return [x, y];
}*/

function computeCoordinates(canvas, event){
		var b=canvas.getBoundingClientRect();
		return new Point(event.clientX-b.left, event.clientY-b.top);
};

let PointDuClick = [null, null];

function polyligne(event, canvas, n) {
    if (PointDuClick[n] === null || event.shiftKey) {
        PointDuClick[n] = computeCoordinates(canvas, event);
    } else {
        let save = computeCoordinates(canvas, event);
        MODEL[n].push(new Segment(PointDuClick[n].clone(),save.clone(),couleur))
        repaint()
        PointDuClick[n] = save;
    }
};

function nettoyage(canvas, n){
	MODEL[n]=[];
	PointDuClick[n]=null;
    canvas.getContext('2d').clearRect(0, 0, canvas.width, canvas.height);
};

function horizontalSymmetry(canvas, n) {
	let i;
	for (i=0; i<MODEL[n].length; i++){
		MODEL[n][i] = MODEL[n][i].horizontalSymmetry(canvas.height/2);
	}
    PointDuClick[n] = PointDuClick[n].horizontalSymmetry(canvas.height/2);
	repaint();
}

function verticalSymmetry(canvas, n) {
	let i;
	for (i=0; i<MODEL[n].length; i++){
		MODEL[n][i] = MODEL[n][i].verticalSymmetry(canvas.width/2);
	}
    PointDuClick[n] = PointDuClick[n].verticalSymmetry(canvas.width/2);
	repaint();
}

function Echange(){
    let tmp = MODEL[0];
    MODEL[0] = MODEL[1];
    MODEL[1] = tmp;
    tmp = PointDuClick[0].clone();
    PointDuClick[0] = PointDuClick[1].clone();
    PointDuClick[1] = tmp;
    repaint();
}

function Transfer(i){
    if(i===0){
        MODEL[1] = MODEL[0].slice(0);
        PointDuClick[1] = PointDuClick[0].clone();
    }
    else{
        MODEL[0] = MODEL[1].slice(0);
        PointDuClick[0] = PointDuClick[1].clone();
    }
    repaint();
}

function undo(i){
    MODEL[i].pop();
    if(MODEL[i].length != 0)
        PointDuClick[i] = MODEL[i][MODEL[i].length-1].p2;
    else
        PointDuClick[i] = null;
    repaint();
}

	function segment_fantome(){
		var n_m1 = [[],[]],i=0;
		var l1=MODEL[0].length,l2=MODEL[1].length;
		for(i=0;i<l1;i++){
			n_m1[0].push(MODEL[0][i]);
		}
		for(i=0;i<l2;i++){
			n_m1[1].push(MODEL[1][i]);
		}

		while(l1 > l2){
			n_m1[1].push(MODEL[1][0]);
			l2++;
		}

		while(l1 < l2){
			n_m1[0].push(MODEL[0][0]);
			l1++;
		}


		return n_m1;
	}
	
	
	function  morphing(model,canvas,statut){
		var rlt=[],i;
		var taille = model[0].length
		if (statut == 0) {
			for(i=0;i<taille;i++){
				rlt.push(model[0][i].average(model[1][i], alpha));
			}
		}
		else {
			for(i=0; i<taille; i++){
				rlt.push(model[1][i].average(model[0][i], alpha));
			}
		}
		paint(canvas,rlt);
		alpha+=100;
		if(alpha>1000){
			clearInterval(id);
			alpha=0;
			id=null;
			anti_anthony = 0;
		}	
	}


function main(){
    let canvas1 = document.getElementById('ctx1');
    let canvas2 = document.getElementById('ctx2');
    let nettoie1 = document.getElementById("nettoie1");
    let nettoie2 = document.getElementById("nettoie2");
    let horizontalSymmetry1 = document.getElementById("horizontalSymmetry1");
    let horizontalSymmetry2 = document.getElementById("horizontalSymmetry2");
    let verticalSymmetry1 = document.getElementById("verticalSymmetry1");
    let verticalSymmetry2 = document.getElementById("verticalSymmetry2");
    let echange = document.getElementById("echange");
    let unversdeux = document.getElementById("unversdeux");
    let deuxversun = document.getElementById("deuxversun");
    let undo1 = document.getElementById("undo1");
    let undo2 = document.getElementById("undo2");
    let start = document.getElementById("start");
    
    var statut = 0;   
        
    canvas1.onclick=function(event){polyligne(event, canvas1, 0)};
    canvas2.onclick=function(event){polyligne(event, canvas2, 1)};
	nettoie1.onclick=function(){nettoyage(canvas1, 0)};
	nettoie2.onclick=function(){nettoyage(canvas2, 1)};
	horizontalSymmetry1.onclick=function(){horizontalSymmetry(canvas1, 0)};
	horizontalSymmetry2.onclick=function(){horizontalSymmetry(canvas2, 1)};
	verticalSymmetry1.onclick=function(){verticalSymmetry(canvas1, 0)};
	verticalSymmetry2.onclick=function(){verticalSymmetry(canvas2, 1)};
    echange.onclick=function(){Echange()};
    unversdeux.onclick=function(){Transfer(0)};
    deuxversun.onclick=function(){Transfer(1)};
    undo1.onclick=function(){undo(0)};
    undo2.onclick=function(){undo(1)};
	start.onclick = function(event){
		var modele=segment_fantome();
		if (alpha == 0){
			id=setInterval(function(){morphing(modele,canvas1,statut%2);},100);
			statut += 1;
		}
	};


}

main()
