// ========================================
// Comic Personal Site - Script
// ========================================

// --- PANEL SCROLL ANIMATION ---
const panels = document.querySelectorAll('.panel');
const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.15 });

panels.forEach(function (panel) {
    observer.observe(panel);
});

// --- AVATAR CLICK EXPRESSIONS ---
const avatar = document.getElementById('avatar');
const avatarHead = avatar ? avatar.querySelector('.avatar-head') : null;
let avatarClicks = 0;
const expressions = ['happy', 'surprised', 'cool'];

if (avatarHead) {
    avatar.addEventListener('click', function () {
        avatarClicks++;
        const expr = expressions[avatarClicks % expressions.length];

        // remove all expression classes
        avatarHead.classList.remove('happy', 'surprised', 'cool');
        // add new one
        avatarHead.classList.add(expr);

        // little bounce
        avatarHead.style.transform = 'scale(1.15)';
        setTimeout(function () {
            avatarHead.style.transform = '';
        }, 200);
    });
}

// --- SPEECH BUBBLE QUOTE CYCLING ---
const heroQuote = document.getElementById('hero-quote');
const quotes = [
    'Student. Gamer. Coder. Baller.',
    'Error 404: Sleep not found',
    'Powered by energy drinks',
    'I put the "pro" in programming (not really)',
    'One more game... okay maybe two',
    'Debugging is like being a detective',
    'Will code for snacks',
    'Basketball is life, gaming is a lifestyle',
];
let quoteIndex = 0;

if (heroQuote) {
    heroQuote.style.cursor = 'pointer';
    heroQuote.parentElement.style.cursor = 'pointer';
    heroQuote.parentElement.title = 'Click for a new quote!';

    heroQuote.parentElement.addEventListener('click', function () {
        quoteIndex = (quoteIndex + 1) % quotes.length;
        heroQuote.style.opacity = '0';
        heroQuote.style.transform = 'translateY(-5px)';
        heroQuote.style.transition = 'opacity 0.2s, transform 0.2s';

        setTimeout(function () {
            heroQuote.textContent = quotes[quoteIndex];
            heroQuote.style.opacity = '1';
            heroQuote.style.transform = 'translateY(0)';
        }, 200);
    });
}

// --- BASKETBALL CLICK COUNTER ---
let ballClicks = 0;
const basketball = document.getElementById('basketball');

if (basketball) {
    basketball.addEventListener('click', function () {
        ballClicks++;

        if (ballClicks === 5) {
            this.style.background = '#FF2D55';
        } else if (ballClicks === 10) {
            this.style.background = '#007AFF';
        } else if (ballClicks === 15) {
            this.style.background = '#34C759';
        } else if (ballClicks === 20) {
            this.style.background = '#FFE600';
            this.style.transform = 'scale(1.3) rotate(360deg)';
            this.style.transition = 'transform 0.5s, background 0.3s';

            showFloatingText(this.parentElement, 'SLAM DUNK!', '#FF2D55');

            var self = this;
            setTimeout(function () {
                self.style.background = '#FF9500';
                self.style.transform = '';
            }, 1200);
            ballClicks = 0;
        } else if (ballClicks % 5 === 0) {
            showFloatingText(this.parentElement, ballClicks + ' clicks!', '#007AFF');
        }
    });
}

function showFloatingText(parent, text, color) {
    var msg = document.createElement('span');
    msg.textContent = text;
    msg.style.cssText = 'position:absolute;top:-40px;left:50%;transform:translateX(-50%);font-family:"Bangers",cursive;font-size:1.5rem;color:' + color + ';-webkit-text-stroke:1px #1a1a1a;white-space:nowrap;animation:floatNote 1s ease forwards;pointer-events:none;';
    parent.style.position = 'relative';
    parent.appendChild(msg);
    setTimeout(function () { msg.remove(); }, 1100);
}

// --- KONAMI CODE ---
var konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
var konamiIndex = 0;

document.addEventListener('keydown', function (e) {
    if (e.key === konamiCode[konamiIndex]) {
        konamiIndex++;
        if (konamiIndex === konamiCode.length) {
            document.body.classList.toggle('konami-active');
            konamiIndex = 0;
            showBanner(document.body.classList.contains('konami-active') ? 'SECRET MODE ON!' : 'SECRET MODE OFF!');
        }
    } else {
        konamiIndex = 0;
    }
});

function showBanner(text) {
    var banner = document.createElement('div');
    banner.textContent = text;
    banner.style.cssText = 'position:fixed;top:20px;left:50%;transform:translateX(-50%);background:#FFE600;color:#1a1a1a;border:4px solid #1a1a1a;border-radius:12px;padding:12px 24px;font-family:"Bangers",cursive;font-size:1.5rem;letter-spacing:2px;box-shadow:4px 4px 0 #1a1a1a;z-index:9999;pointer-events:none;';
    document.body.appendChild(banner);
    setTimeout(function () { banner.remove(); }, 2000);
}

// --- DOUBLE-CLICK CONFETTI ---
document.addEventListener('dblclick', function (e) {
    spawnConfetti(e.clientX, e.clientY);
});

function spawnConfetti(x, y) {
    var colors = ['#FFE600', '#FF2D55', '#007AFF', '#34C759', '#FF9500', '#AF52DE'];
    for (var i = 0; i < 30; i++) {
        var piece = document.createElement('div');
        piece.className = 'confetti-piece';
        var color = colors[Math.floor(Math.random() * colors.length)];
        var offsetX = (Math.random() - 0.5) * 200;
        var offsetY = (Math.random() - 0.5) * 100;
        var size = 6 + Math.random() * 8;
        var dur = 1 + Math.random() * 1;
        var shape = Math.random() > 0.5 ? '50%' : '2px';
        piece.style.cssText = 'left:' + (x + offsetX) + 'px;top:' + (y + offsetY) + 'px;width:' + size + 'px;height:' + size + 'px;background:' + color + ';border-radius:' + shape + ';animation-duration:' + dur + 's;';
        document.body.appendChild(piece);
        (function (p) {
            setTimeout(function () { p.remove(); }, 2000);
        })(piece);
    }
}

// --- MOUSE TRAIL ---
var trailColors = ['#FF2D55', '#FFE600', '#007AFF', '#34C759', '#FF9500'];
var trailIndex = 0;

document.addEventListener('mousemove', function (e) {
    // throttle: only every 3rd event
    trailIndex++;
    if (trailIndex % 3 !== 0) return;

    var dot = document.createElement('div');
    dot.className = 'trail-dot';
    dot.style.left = e.clientX - 4 + 'px';
    dot.style.top = e.clientY - 4 + 'px';
    dot.style.background = trailColors[Math.floor(Math.random() * trailColors.length)];
    document.body.appendChild(dot);

    setTimeout(function () {
        dot.style.opacity = '0';
    }, 50);

    setTimeout(function () {
        dot.remove();
    }, 400);
});

// --- FOOTER SECRET (reveals trivia) ---
var footerSecret = document.getElementById('footer-secret');
var triviaSection = document.getElementById('trivia-section');
var triviaClose = document.getElementById('trivia-close');
var secretClicks = 0;

if (footerSecret) {
    footerSecret.addEventListener('click', function () {
        secretClicks++;
        if (secretClicks >= 3) {
            triviaSection.classList.toggle('show');
            secretClicks = 0;

            if (triviaSection.classList.contains('show')) {
                triviaSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }
    });
}

if (triviaClose) {
    triviaClose.addEventListener('click', function () {
        triviaSection.classList.remove('show');
    });
}

// --- KEYBOARD SECRET: type "alphan" ---
var typedBuffer = '';

document.addEventListener('keydown', function (e) {
    typedBuffer += e.key.toLowerCase();
    if (typedBuffer.length > 20) {
        typedBuffer = typedBuffer.slice(-20);
    }

    if (typedBuffer.includes('alphan')) {
        typedBuffer = '';
        showBanner('Hey, thats me! -- Alphan');
        spawnConfetti(window.innerWidth / 2, window.innerHeight / 2);
    }
});

// --- KEYBOARD SECRET: type "giants" for basketball mode ---
document.addEventListener('keydown', function (e) {
    typedBuffer += e.key.toLowerCase();
    if (typedBuffer.length > 20) {
        typedBuffer = typedBuffer.slice(-20);
    }

    if (typedBuffer.includes('giants')) {
        typedBuffer = '';
        document.body.classList.toggle('giants-mode');
        showBanner(document.body.classList.contains('giants-mode') ? 'VIENNA GIANTS MODE!' : 'Normal mode');
    }
});

// --- RIGHT-CLICK OVERRIDE (comic style) ---
document.addEventListener('contextmenu', function (e) {
    e.preventDefault();

    var menu = document.createElement('div');
    menu.style.cssText = 'position:fixed;top:' + e.clientY + 'px;left:' + e.clientX + 'px;background:#FFE600;color:#1a1a1a;border:4px solid #1a1a1a;border-radius:12px;padding:10px 16px;font-family:"Bangers",cursive;font-size:1rem;letter-spacing:1px;box-shadow:4px 4px 0 #1a1a1a;z-index:9999;cursor:pointer;animation:slideIn 0.2s ease;';
    menu.textContent = 'Nope! Thats top secret!';
    document.body.appendChild(menu);

    setTimeout(function () { menu.remove(); }, 1500);

    menu.addEventListener('click', function () {
        menu.remove();
    });
});

// --- GAME TAG CLICK SOUND (visual feedback) ---
var gameTags = document.querySelectorAll('.game-tag');
gameTags.forEach(function (tag) {
    tag.style.cursor = 'pointer';
    tag.addEventListener('click', function () {
        this.style.transform = 'scale(1.2) rotate(-5deg)';
        this.style.background = '#FF2D55';
        this.style.color = '#fff';
        var self = this;
        setTimeout(function () {
            self.style.transform = '';
            self.style.background = '';
            self.style.color = '';
        }, 400);
    });
});

// --- SKILL BAR ANIMATION ON SCROLL ---
var skillFills = document.querySelectorAll('.skill-fill');
var skillObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var fill = entry.target;
            var width = fill.style.width;
            fill.style.width = '0%';
            setTimeout(function () {
                fill.style.width = width;
            }, 200);
        }
    });
}, { threshold: 0.5 });

skillFills.forEach(function (fill) {
    skillObserver.observe(fill);
});

// --- PLAYLIST CLICK ---
var playlistItems = document.querySelectorAll('.playlist-item');
playlistItems.forEach(function (item) {
    item.style.cursor = 'pointer';
    item.addEventListener('click', function () {
        playlistItems.forEach(function (i) { i.classList.remove('active'); });
        this.classList.add('active');

        var icon = this.querySelector('.pl-icon');
        if (icon) icon.textContent = '\u25B6';

        // reset other icons
        playlistItems.forEach(function (i) {
            if (i !== item) {
                var ic = i.querySelector('.pl-icon');
                if (ic) ic.textContent = '\u25B7';
            }
        });
    });
});

// --- FACT CARD COUNTER ANIMATION ---
var factNumbers = document.querySelectorAll('.fact-number');
var factObserver = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
        if (entry.isIntersecting) {
            var el = entry.target;
            var text = el.textContent;
            var target = parseInt(text);
            if (isNaN(target)) return; // skip infinity symbol

            el.textContent = '0';
            var current = 0;
            var step = Math.ceil(target / 20);
            var interval = setInterval(function () {
                current += step;
                if (current >= target) {
                    current = target;
                    clearInterval(interval);
                }
                el.textContent = current;
            }, 40);
        }
    });
}, { threshold: 0.5 });

factNumbers.forEach(function (num) {
    factObserver.observe(num);
});