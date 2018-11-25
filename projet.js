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

/*Pas sur de cette partie, */
function Model(fen1=[],fen2=[]) {
    this.fen1 = fen1;
    this.fen2 = fen2;
}
