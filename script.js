/* 
    Eduardo Soutello - Computer Vision Portfolio
    Interactive Logic — v2.0
*/

import { GestureRecognizer, FilesetResolver, DrawingUtils } from "https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3";

document.addEventListener('DOMContentLoaded', () => {
    document.body.classList.add('js-enabled');

    initHeader();
    initMobileNav();
    initVisionOverlay();
    initScrollAnimations();
    initSkillBars();
    initGlitchEffect();
    initContactForm();
    initLab();

    console.log(
        "%c[SYSTEM] Visual Cortex Initialized. Status: OPTIMAL",
        "color: #00ff41; font-family: monospace; font-weight: bold; font-size: 13px;"
    );
});

/* ─── HEADER: scroll shrink ─────────────────────────────────── */

function initHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;

    const onScroll = () => {
        header.style.background = window.scrollY > 50
            ? 'rgba(5, 5, 8, 0.98)'
            : 'rgba(5, 5, 8, 0.9)';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
}

/* ─── MOBILE NAV ─────────────────────────────────────────────── */

function initMobileNav() {
    const btn = document.getElementById('hamburger-btn');
    const nav = document.getElementById('main-nav');
    if (!btn || !nav) return;

    const toggle = () => {
        const open = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', String(!open));
        nav.classList.toggle('nav-open', !open);
        document.body.style.overflow = open ? '' : 'hidden';
    };

    btn.addEventListener('click', toggle);

    // Close on nav link click
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            btn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('nav-open');
            document.body.style.overflow = '';
        });
    });

    // Close on Escape
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && nav.classList.contains('nav-open')) {
            btn.setAttribute('aria-expanded', 'false');
            nav.classList.remove('nav-open');
            document.body.style.overflow = '';
        }
    });
}

/* ─── VISION OVERLAY (Hero bounding boxes) ───────────────────── */

function initVisionOverlay() {
    const overlay = document.getElementById('vision-overlay');
    if (!overlay) return;

    const detections = [
        { label: 'Neural_Core',   x: 12, y: 20, w: 42, h: 50, color: 'var(--cyan)' },
        { label: 'Deep_Matrix',   x: 60, y: 8,  w: 32, h: 40, color: 'var(--magenta)' },
        { label: 'Vision_Stream', x: 5,  y: 72, w: 25, h: 22, color: 'var(--green)' },
    ];

    detections.forEach((det, i) => {
        setTimeout(() => {
            const box = document.createElement('div');
            box.className = 'bounding-box';
            box.style.cssText = `
                left: ${det.x}%;
                top: ${det.y}%;
                width: ${det.w}%;
                height: ${det.h}%;
                border-color: ${det.color};
            `;
            box.setAttribute('data-label', det.label);
            overlay.appendChild(box);
        }, i * 500);
    });
}

/* ─── SCROLL ANIMATIONS ──────────────────────────────────────── */

function initScrollAnimations() {
    const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('visible');
        }),
        { threshold: 0.08 }
    );

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
}

/* ─── SKILL BARS: animate on scroll ─────────────────────────── */

function initSkillBars() {
    const observer = new IntersectionObserver(
        entries => entries.forEach(e => {
            if (e.isIntersecting) {
                const fill = e.target;
                const target = fill.dataset.width || '0';
                fill.style.width = target + '%';
                observer.unobserve(fill);
            }
        }),
        { threshold: 0.5 }
    );

    document.querySelectorAll('.skill-bar__fill').forEach(el => observer.observe(el));
}

/* ─── GLITCH EFFECT ──────────────────────────────────────────── */

function initGlitchEffect() {
    const el = document.querySelector('.glitch-text');
    if (!el) return;

    setInterval(() => {
        if (Math.random() > 0.94) {
            const dx = (Math.random() * 6 - 3).toFixed(1);
            const dy = (Math.random() * 3 - 1.5).toFixed(1);
            el.style.transform = `translate(${dx}px, ${dy}px)`;
            el.style.filter = 'hue-rotate(80deg) brightness(1.2)';
            setTimeout(() => {
                el.style.transform = '';
                el.style.filter = '';
            }, 80);
        }
    }, 200);
}

/* ─── CONTACT FORM ───────────────────────────────────────────── */

function initContactForm() {
    const form = document.getElementById('contact-form');
    const feedback = document.getElementById('form-feedback');
    const submitBtn = document.getElementById('form-submit-btn');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name    = form.querySelector('#contact-name').value.trim();
        const email   = form.querySelector('#contact-email').value.trim();
        const message = form.querySelector('#contact-message').value.trim();

        if (!name || !email || !message) {
            showFeedback(feedback, 'error', '[ERROR] Preencha todos os campos.');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            showFeedback(feedback, 'error', '[ERROR] Email inválido.');
            return;
        }

        // Compose mailto link as fallback (no backend needed)
        const subject = encodeURIComponent(`[Portfolio] Mensagem de ${name}`);
        const body    = encodeURIComponent(`Nome: ${name}\nEmail: ${email}\n\n${message}`);
        const mailto  = `mailto:eduardosoutellodev@gmail.com?subject=${subject}&body=${body}`;

        submitBtn.textContent = 'ABRINDO...';
        submitBtn.disabled = true;

        window.location.href = mailto;

        setTimeout(() => {
            showFeedback(feedback, 'success', '[SUCCESS] Cliente de email aberto. Obrigado pelo contato!');
            form.reset();
            submitBtn.textContent = 'ENVIAR MENSAGEM';
            submitBtn.disabled = false;
        }, 500);
    });
}

function showFeedback(el, type, msg) {
    if (!el) return;
    el.textContent = msg;
    el.className = `form-feedback ${type}`;
    setTimeout(() => {
        el.textContent = '';
        el.className = 'form-feedback';
    }, 5000);
}

/* ─── HAND GESTURE LAB ───────────────────────────────────────── */

let gestureRecognizer = null;
let webcamRunning = false;
let videoSourceType = 'webcam';
let currentMode = 'symbols';
let score = 0;
let lastVideoTime = -1;
let currentJutsuIndex = 0;
let lastGesture = '';
let lastPredictTime = 0;

const video      = document.getElementById('webcam');
const ipImage    = document.getElementById('webcam-ip');
const canvas     = document.getElementById('output_canvas');
const canvasCtx  = canvas ? canvas.getContext('2d') : null;

const gestureNameEl       = document.getElementById('gesture-name');
const gestureConfidenceEl = document.getElementById('gesture-confidence');
const startBtn            = document.getElementById('start-camera');
const streamUrlInput      = document.getElementById('stream-url');
const fpsDisplay          = document.getElementById('fps-counter');
const scoreDisplay        = document.getElementById('score-counter');
const targetDisplay       = document.getElementById('target-gesture');

const BUILT_IN_GESTURES = {
    Thumb_Up:    'JOINHA',
    Victory:     'PAZ / V',
    Open_Palm:   'MÃO ABERTA',
    Closed_Fist: 'PUNHO',
    Pointing_Up: 'APONTANDO',
    ILoveYou:    'ROCK / LOVE',
};

const SYMBOLS_LIST = Object.values(BUILT_IN_GESTURES);

const JUTSUS = [
    { name: 'KATON (FOGO)',  sequence: ['PAZ / V',   'APONTANDO', 'MÃO ABERTA'] },
    { name: 'SUITON (ÁGUA)', sequence: ['JOINHA',     'PUNHO',     'PAZ / V'] },
];

async function initLab() {
    if (!startBtn) return; // Lab section not present

    // Mode buttons
    document.querySelectorAll('.mode-btn').forEach(btn => {
        btn.addEventListener('click', e => {
            document.querySelectorAll('.mode-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            setMode(e.currentTarget.dataset.mode);
        });
    });

    startBtn.addEventListener('click', toggleWebcam);

    // Load MediaPipe
    try {
        const vision = await FilesetResolver.forVisionTasks(
            'https://cdn.jsdelivr.net/npm/@mediapipe/tasks-vision@0.10.3/wasm'
        );
        gestureRecognizer = await GestureRecognizer.createFromOptions(vision, {
            baseOptions: {
                modelAssetPath: 'https://storage.googleapis.com/mediapipe-tasks/gesture_recognizer/gesture_recognizer.task',
                delegate: 'GPU',
            },
            runningMode: 'VIDEO',
            numHands: 2,
        });
        startBtn.textContent = 'INICIAR CÂMERA';
        startBtn.disabled = false;
        console.log('[LAB] GestureRecognizer loaded ✓');
    } catch (err) {
        console.error('[LAB] Failed to load GestureRecognizer', err);
        startBtn.textContent = 'ERRO: IA indisponível';
    }
}

function setMode(mode) {
    currentMode = mode;
    score = 0;
    if (scoreDisplay) scoreDisplay.textContent = '0';
    currentJutsuIndex = 0;

    const jutsuSeq = document.getElementById('jutsu-sequence');

    if (mode === 'symbols') {
        if (jutsuSeq) jutsuSeq.style.display = 'none';
        if (targetDisplay) targetDisplay.style.display = 'block';
        nextSymbol();
    } else {
        if (jutsuSeq) jutsuSeq.style.display = 'flex';
        if (targetDisplay) targetDisplay.textContent = JUTSUS[0].name;
        resetJutsuSteps();
    }
}

function toggleWebcam() {
    if (!gestureRecognizer) {
        startBtn.textContent = 'CARREGANDO IA...';
        return;
    }

    if (webcamRunning) {
        stopWebcam();
    } else {
        startWebcam();
    }
}

function stopWebcam() {
    webcamRunning = false;
    startBtn.textContent = 'INICIAR CÂMERA';

    if (videoSourceType === 'webcam' && video && video.srcObject) {
        video.srcObject.getTracks().forEach(t => t.stop());
        video.srcObject = null;
    } else if (ipImage) {
        ipImage.src = '';
    }

    if (video) video.style.display = 'block';
    if (ipImage) ipImage.style.display = 'none';
}

function startWebcam() {
    const url = streamUrlInput ? streamUrlInput.value.trim() : '';

    if (url.startsWith('http')) {
        // IP camera mode
        videoSourceType = 'ip';
        if (ipImage) {
            ipImage.src = url;
            ipImage.style.display = 'block';
        }
        if (video) video.style.display = 'none';
        webcamRunning = true;
        startBtn.textContent = 'DESLIGAR STREAM';
        requestAnimationFrame(predictWebcam);
    } else {
        // Webcam mode
        videoSourceType = 'webcam';
        if (video) video.style.display = 'block';
        if (ipImage) ipImage.style.display = 'none';

        navigator.mediaDevices.getUserMedia({ video: { width: 1280, height: 720 } })
            .then(stream => {
                video.srcObject = stream;
                video.addEventListener('loadeddata', () => {
                    webcamRunning = true;
                    startBtn.textContent = 'DESLIGAR CÂMERA';
                    requestAnimationFrame(predictWebcam);
                }, { once: true });
            })
            .catch(err => {
                console.error('[LAB] Camera access denied:', err);
                if (gestureNameEl) gestureNameEl.textContent = 'Câmera negada';
            });
    }
}

async function predictWebcam(timestamp) {
    if (!webcamRunning || !gestureRecognizer || !canvas || !canvasCtx) return;

    const source = videoSourceType === 'webcam' ? video : ipImage;
    const nowInMs = Date.now();

    // Skip if webcam frame hasn't changed
    if (videoSourceType === 'webcam') {
        if (!video || video.currentTime === lastVideoTime || video.readyState < 2) {
            requestAnimationFrame(predictWebcam);
            return;
        }
        lastVideoTime = video.currentTime;
    }

    const vW = videoSourceType === 'webcam' ? video.videoWidth  : ipImage.naturalWidth;
    const vH = videoSourceType === 'webcam' ? video.videoHeight : ipImage.naturalHeight;

    if (vW > 0 && vH > 0) {
        canvas.width  = vW;
        canvas.height = vH;
        canvasCtx.clearRect(0, 0, vW, vH);

        try {
            canvasCtx.drawImage(source, 0, 0, vW, vH);
        } catch (_) { /* CORS - image element still visible */ }

        try {
            const results = gestureRecognizer.recognizeForVideo(source, nowInMs);

            // Draw hand landmarks
            if (results.landmarks && results.landmarks.length > 0) {
                const drawing = new DrawingUtils(canvasCtx);
                for (const landmarks of results.landmarks) {
                    drawing.drawConnectors(landmarks, GestureRecognizer.HAND_CONNECTIONS, {
                        color: '#00f2ff',
                        lineWidth: 2,
                    });
                    drawing.drawLandmarks(landmarks, {
                        color: '#ff00cc',
                        lineWidth: 1,
                        radius: 3,
                    });
                }
            }

            // Handle gesture result
            if (results.gestures.length > 0) {
                const g          = results.gestures[0][0];
                const label      = BUILT_IN_GESTURES[g.categoryName] || g.categoryName;
                const confidence = Math.round(g.score * 100);

                if (gestureNameEl) gestureNameEl.textContent = label;
                if (gestureConfidenceEl) gestureConfidenceEl.style.width = confidence + '%';
                checkGameLogic(label, confidence);
            } else {
                if (gestureNameEl) gestureNameEl.textContent = 'AGUARDANDO...';
                if (gestureConfidenceEl) gestureConfidenceEl.style.width = '0%';
            }
        } catch (err) {
            if (gestureNameEl) gestureNameEl.textContent = 'STREAM ATIVO (CORS block)';
        }

        // FPS
        const elapsed = nowInMs - lastPredictTime;
        if (elapsed > 0 && fpsDisplay) fpsDisplay.textContent = Math.min(99, Math.round(1000 / elapsed));
        lastPredictTime = nowInMs;
    }

    if (webcamRunning) requestAnimationFrame(predictWebcam);
}

/* — Game Logic — */

function checkGameLogic(detected, confidence) {
    if (confidence < 70) return;
    if (detected === lastGesture) return;

    if (currentMode === 'symbols') {
        if (targetDisplay && detected === targetDisplay.textContent) {
            score++;
            if (scoreDisplay) scoreDisplay.textContent = score;
            lastGesture = detected;
            triggerSuccess();
            setTimeout(nextSymbol, 900);
        }
    } else {
        const jutsu = JUTSUS[0];
        if (detected === jutsu.sequence[currentJutsuIndex]) {
            markStepDone(currentJutsuIndex);
            currentJutsuIndex++;
            lastGesture = detected;

            if (currentJutsuIndex >= jutsu.sequence.length) {
                score++;
                if (scoreDisplay) scoreDisplay.textContent = score;
                if (targetDisplay) targetDisplay.textContent = '🔥 ' + jutsu.name;
                triggerSuccess(true);
                setTimeout(() => {
                    currentJutsuIndex = 0;
                    resetJutsuSteps();
                    if (targetDisplay) targetDisplay.textContent = jutsu.name;
                    lastGesture = '';
                }, 2000);
            }
        }
    }
}

function nextSymbol() {
    if (!targetDisplay) return;
    let next;
    do { next = SYMBOLS_LIST[Math.floor(Math.random() * SYMBOLS_LIST.length)]; }
    while (next === targetDisplay.textContent && SYMBOLS_LIST.length > 1);
    targetDisplay.textContent = next;
    lastGesture = '';
}

function resetJutsuSteps() {
    const steps = document.querySelectorAll('.step');
    steps.forEach((s, i) => {
        s.classList.remove('done', 'active');
        if (i === 0) s.classList.add('active');
    });
}

function markStepDone(idx) {
    const steps = document.querySelectorAll('.step');
    if (steps[idx]) {
        steps[idx].classList.remove('active');
        steps[idx].classList.add('done');
    }
    if (steps[idx + 1]) steps[idx + 1].classList.add('active');
}

function triggerSuccess(isHard = false) {
    const lab = document.getElementById('gesture-lab');
    if (!lab) return;
    const color = isHard ? 'var(--magenta)' : 'var(--green)';
    lab.style.boxShadow = `inset 0 0 ${isHard ? 60 : 35}px ${color}40`;
    setTimeout(() => lab.style.boxShadow = '', 600);
}
