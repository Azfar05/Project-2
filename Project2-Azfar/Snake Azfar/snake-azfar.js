// alles wat er word getekent inclusief de canvas
const canvas = document.querySelector(".canvas");
// houd de game 2d
const ctx = canvas.getContext("2d");
const scale = 10;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

// vanuit deze variabele word de snake gebouwd
var snake;

// hier word de start van de game klaargemaakt
(function setup() {
    snake = new Snake();
    fruit = new Fruit();
    fruit.pickLocation();
    
    window.setInterval(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        fruit.draw();
        snake.update();
        snake.draw();

// zorgt dat als de snake het fruit eet, een nieuwe word gegenereerd
        if (snake.eat(fruit)) {
            console.log("EATING")
            fruit.pickLocation();
        }
        
    }, 250);
}());

// detecteert of er een knop word ingedrukt waardoor de snake van richting veranderd
window.addEventListener('keydown', ((evt) => {
    const direction = evt.key.replace('Arrow', '');
    snake.changeDirection(direction);
}))

// functie waarmee het fruit dat de snake moet opeten word gegenereerd
function Fruit() {
    this.x;
    this.y;
   
// geeft random plek aan het fruit 
    this.pickLocation= function() {
        this.x = (Math.floor(Math.random() * rows -1) + 1) * scale;
        this.y = (Math.floor(Math.random() * columns -1) + 1) * scale;
    }

// geeft het fruit een rode kleur
    this.draw = function() {
        ctx.fillStyle = "red";
        ctx.fillRect(this.x, this.y, scale, scale)
    }
}

//hier word de snake geprogrammeerd, ook zijn snelheid
function Snake() {
    this.x = 0;
    this.y = 0;
    this.xSpeed = scale * 1;
    this.ySpeed = 0;
    this.total = 0;
    this. tail = [];
    
//dit zorgt voor het uiterlijk, ook zorgt het ervoor dat als de snake groeit hij nogsteeds dezelfde kleur is
    this.draw = function() {
        ctx.fillStyle = "darkgreen";
        
        for (let i=0; i<this.tail.length; i++) {
            ctx.fillRect(this.tail[i].x, this.tail[i].y, scale, scale);
        }
        
        ctx.fillRect(this.x, this.y, scale, scale);
    }
    
// dit update de groei van de snake, maakt de staart langer
    this.update = function() {
        for (let i=0; i<this.tail.length -1; i++) {
            this.tail[i] = this.tail[i+1];
        }
        
        this.tail[this.total -1] = {x: this.x, y: this.y};
        
// houd de snelheid hetzelfde
        this.x += this.xSpeed;
        this.y += this.ySpeed;
        
// laat de snake aan de tegenovergestelde zijde weer doorlopen
        if (this.x > canvas.width) {
            this.x = 0;
        }
        if (this.y > canvas.height) {
            this.y = 0;
        }
        if (this.x < 0) {
            this.x = canvas.width;
        }
        if (this.y < 0) {
            this.y = canvas.height;
        }
    }

// hiermee word gedecteerd of de snake van richting veranderd
    this.changeDirection = function(direction) {
        switch(direction) {
            case 'Up':
                this.xSpeed = 0;
                this.ySpeed = -scale * 1;
                break;
            case 'Down':
                this.xSpeed = 0;
                this.ySpeed = scale * 1;
                break;
            case 'Left':
                this.xSpeed = -scale * 1;
                this.ySpeed = 0;
                break;
            case 'Right':
                this.xSpeed = scale * 1;
                this.ySpeed = 0;
                break;
               }
    }
    
// hiermee word gedecteerd of de snake het fruit heeft gegeten of niet
    this.eat = function(fruit) {
        if (this.x === fruit.x && this.y === fruit.y) {
            this.total++;
            return true;
        }
        
        return false;
    }
}