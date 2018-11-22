function Point(abs = 0,ord = 0){
    Object.Properties(this,{
        x : {value : abs, writable : false},
        y : {value : ord, writable : false}
    });
}

Point.prototype.horizontalSymetry = function(n){
    return new Point(this.x,((n.y - this.y)+n.y));
}

Point.prototype.verticalSymetry = function(n){
    return new Point(((n.x - this.x)+n.x),this.y);
}

Point.prototype.average= function (p2,alpha){
    return new Point(this.x*(1-alpha)+p2.x+alpha,this.y*(1-alpha)+p2.y+alpha);
}

Point.prototype.clone = function(){
    return new Point(this.x,this.y);
}

function Segment(p1,p2,couleur = [0,0,0]){

}
