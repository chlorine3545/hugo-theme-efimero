class CandyCircle {
    constructor({ origin, speed, color, angle, context }) {
        this.init({ origin, speed, color, angle, context });
    }

    init({ origin, speed, color, angle, context }) {
        this.origin = origin;
        this.position = { ...this.origin };
        this.color = color;
        this.speed = speed;
        this.angle = angle;
        this.context = context;
        this.renderCount = 0;
        this.active = true;
    }

    draw() {
        this.context.fillStyle = this.color;
        this.context.beginPath();
        this.context.arc(this.position.x, this.position.y, 2, 0, Math.PI * 2);
        this.context.fill();
    }

    move() {
        if (!this.active) return;
        this.position.x += Math.sin(this.angle) * this.speed;
        this.position.y += Math.cos(this.angle) * this.speed + this.renderCount * 0.3;
        this.renderCount++;
        if (this.position.x > window.innerWidth || this.position.y > window.innerHeight) {
            this.active = false;
        }
    }
}

class CandyBoom {
    constructor({ origin, context, circleCount = 10, pool }) {
        this.origin = origin;
        this.context = context;
        this.circleCount = circleCount;
        this.circles = [];
        this.pool = pool;
        this.active = true;
        this.init();
    }

    randomArray(range) {
        return range[Math.floor(Math.random() * range.length)];
    }

    randomColor() {
        const range = ['8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];
        return '#' + Array.from({ length: 6 }, () => this.randomArray(range)).join('');
    }

    randomRange(start, end) {
        return (end - start) * Math.random() + start;
    }

    init() {
        for (let i = 0; i < this.circleCount; i++) {
            const circle = this.pool.pop() || new CandyCircle({});
            circle.init({
                context: this.context,
                origin: this.origin,
                color: this.randomColor(),
                angle: this.randomRange(Math.PI - 1, Math.PI + 1),
                speed: this.randomRange(1, 6)
            });
            this.circles.push(circle);
        }
    }

    move() {
        if (!this.active) return;
        this.circles.forEach(circle => circle.move());
        this.circles = this.circles.filter(circle => circle.active);

        if (this.circles.length === 0) {
            this.active = false;
            this.pool.push(...this.circles);
        }
    }

    draw() {
        this.circles.forEach(circle => circle.draw());
    }
}

class CursorSpecialEffects {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.globalWidth = window.innerWidth;
        this.globalHeight = window.innerHeight;
        this.booms = [];
        this.pool = [];
        this.running = false;

        this.init();
    }

    init() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = 0;
        this.canvas.style.left = 0;
        this.canvas.style.zIndex = '1145141919810';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.width = this.globalWidth;
        this.canvas.height = this.globalHeight;

        document.body.appendChild(this.canvas);

        window.addEventListener('mousedown', this.handleMouseDown.bind(this));
        window.addEventListener('resize', this.handleResize.bind(this));
        window.addEventListener('pagehide', this.handlePageHide.bind(this));
    }

    handleMouseDown(e) {
        const boom = new CandyBoom({
            origin: { x: e.clientX, y: e.clientY },
            context: this.context,
            pool: this.pool,
            circleCount: 10
        });
        this.booms.push(boom);
        if (!this.running) this.run();
    }

    handleResize() {
        this.globalWidth = window.innerWidth;
        this.globalHeight = window.innerHeight;
        this.canvas.width = this.globalWidth;
        this.canvas.height = this.globalHeight;
    }

    handlePageHide() {
        this.booms = [];
        this.running = false;
    }

    run() {
        this.running = true;
        const animate = () => {
            if (this.booms.length === 0) {
                this.running = false;
                return;
            }

            requestAnimationFrame(animate);

            this.context.clearRect(0, 0, this.globalWidth, this.globalHeight);

            this.booms.forEach((boom, index) => {
                if (!boom.active) {
                    this.booms.splice(index, 1);
                    return;
                }
                boom.move();
                boom.draw();
            });
        };

        animate();
    }
}

// 在移动端不触发特效
if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
    const cursorSpecialEffects = new CursorSpecialEffects();
    cursorSpecialEffects.init();
}