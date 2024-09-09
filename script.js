const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 400;
canvas.height = 400;

const scale = 20;
const rows = canvas.height / scale;
const columns = canvas.width / scale;

let snake;
let food;
let d;

function setup() {
    snake = new Snake();
    food = new Food();
    d = { x: 0, y: 0 };

    document.addEventListener('keydown', (e) => {
        switch (e.key.toLowerCase()) {
            case 'a':
                if (d.x === 0) d = { x: -scale, y: 0 };
                break;
            case 'w':
                if (d.y === 0) d = { x: 0, y: -scale };
                break;
            case 'd':
                if (d.x === 0) d = { x: scale, y: 0 };
                break;
            case 's':
                if (d.y === 0) d = { x: 0, y: scale };
                break;
        }
    });

    gameLoop();
}

function gameLoop() {
    setTimeout(() => {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        snake.update();
        snake.draw();
        food.draw();

        if (snake.eat(food)) {
            food = new Food();
        }

        if (snake.checkCollision()) {
            alert('');
            snake = new Snake();
        }

        gameLoop();
    }, 200);
}

class Snake {
    constructor() {
        this.body = [{ x: scale * 2, y: scale * 2 }];
        this.size = scale;
    }

    draw() {
        ctx.fillStyle = '#0f0';
        this.body.forEach(segment => {
            ctx.fillRect(segment.x, segment.y, this.size, this.size);
        });
    }

    update() {
        const head = { x: this.body[0].x + d.x, y: this.body[0].y + d.y };
        this.body.pop();
        this.body.unshift(head);
    }

    eat(food) {
        const head = this.body[0];
        if (head.x === food.x && head.y === food.y) {
            this.body.push({});
            return true;
        }
        return false;
    }

    checkCollision() {
        const head = this.body[0];
        if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height) {
            return true;
        }
        for (let i = 1; i < this.body.length; i++) {
            if (head.x === this.body[i].x && head.y === this.body[i].y) {
                return true;
            }
        }
        return false;
    }
}

class Food {
    constructor() {
        this.x = Math.floor(Math.random() * columns) * scale;
        this.y = Math.floor(Math.random() * rows) * scale;
    }

    draw() {
        ctx.fillStyle = '#f00';
        ctx.fillRect(this.x, this.y, scale, scale);
    }
}

setup();
