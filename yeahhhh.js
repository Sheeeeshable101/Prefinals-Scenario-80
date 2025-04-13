document.addEventListener('DOMContentLoaded', function() {
    // Dark mode toggle
    const darkModeSwitch = document.getElementById('dark-mode-switch');
    const body = document.body;
    
    // Check for saved theme preference
    const currentTheme = localStorage.getItem('theme');
    if (currentTheme) {
        body.setAttribute('data-theme', currentTheme);
        if (currentTheme === 'dark') {
            darkModeSwitch.checked = true;
        }
    }
    
    darkModeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.setAttribute('data-theme', 'dark');
            localStorage.setItem('theme', 'dark');
        } else {
            body.removeAttribute('data-theme');
            localStorage.setItem('theme', 'light');
        }
    });
    
    // Main button interaction
    const mainButton = document.getElementById('main-button');
    mainButton.addEventListener('click', function() {
        alert('Thank you for your interest in our programs!');
    });
    
    // Interactive background
    const canvas = document.getElementById('interactive-bg');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
    
    // Create particles
    const particles = [];
    const particleCount = Math.floor(window.innerWidth / 10);
    
    class Particle {
        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 3 + 1;
            this.speedX = Math.random() * 2 - 1;
            this.speedY = Math.random() * 2 - 1;
            this.color = `hsla(${Math.random() * 60 + 200}, 70%, 50%, 0.7)`;
        }
        
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            
            if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
            if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        }
        
        draw() {
            ctx.fillStyle = this.color;
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }
    
    function init() {
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < particles.length; i++) {
            particles[i].update();
            particles[i].draw();
            
            // Connect nearby particles
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 120) {
                    ctx.strokeStyle = `hsla(200, 70%, 50%, ${1 - distance/120})`;
                    ctx.lineWidth = 0.5;
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.stroke();
                }
            }
        }
        
        requestAnimationFrame(animate);
    }
    
    init();
    animate();
    
    // Mouse interaction
    let mouseX = 0;
    let mouseY = 0;
    
    window.addEventListener('mousemove', function(event) {
        mouseX = event.clientX;
        mouseY = event.clientY;
        
        // Make particles react to mouse
        for (let i = 0; i < particles.length; i++) {
            const dx = mouseX - particles[i].x;
            const dy = mouseY - particles[i].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                particles[i].speedX = dx * 0.01;
                particles[i].speedY = dy * 0.01;
            }
        }
    });
});
