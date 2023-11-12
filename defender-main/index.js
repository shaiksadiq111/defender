const canvas = document.querySelector('canvas');

canvas.width = innerWidth;
canvas.height = innerHeight;

const c =   canvas.getContext('2d');


// console.log(c);



class Player{
    constructor (x, y, radius, color){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
    }

    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill()
    }

};

class Projectile{
    constructor(x, y, radius, color, veloctiy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.veloctiy = veloctiy;
    }

    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill()
    }

    update(){
        this.draw();
        this.x = this.x + this.veloctiy.x;
        this.y = this.y + this.veloctiy.y;
    }
}


class Enemy {
    constructor(x, y, radius, color, veloctiy){
        this.x = x;
        this.y = y;
        this.radius = radius;
        this.color = color;
        this.veloctiy = veloctiy;
    }

    draw(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.fillStyle = this.color;
        c.fill()
    }

    update(){
        this.draw();
        this.x = this.x + this.veloctiy.x;
        this.y = this.y + this.veloctiy.y;
    }
}


var x = canvas.width/2;
var y = canvas.height/2;

const player = new Player(x, y,30, 'blue');
player.draw()
console.log(player);

const projectiles = [];
const enemies = []; 

function spawnEnemies(){
    setInterval(() => {
        var curX = Math.random()*x, curY = Math.random()*y;
        // console.log(curX, curY);
        const angle = Math.atan2(y - curY, x - curX );
        const velocity = {
            x: Math.cos(angle),
            y : Math.sin(angle),
        }
        const newEnemy = new Enemy(curX, curY, 30, 'yellow', velocity);
        enemies.push(newEnemy);
        // console.log(enemies);
    }, 1000)
}




function animate(){
    requestAnimationFrame(animate)
    c.clearRect(0, 0, canvas.width, canvas.height);
    player.draw();
    projectiles.forEach(projectile => {
        projectile.update();
    })
    enemies.forEach((enemy) => {
        enemy.update();
    })
}

window.addEventListener('click', (e) => {
    const angle = Math.atan2(e.clientY - y, e.clientX - x);
    const velocity = {
        x: Math.cos(angle),
        y : Math.sin(angle),
    }
   const projectile = new Projectile(x, y, 5, 'red', velocity);
   projectiles.push(projectile);

})





animate();
spawnEnemies();