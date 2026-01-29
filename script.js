const questions = [
    {
        question: "Apa output dari kode berikut?",
        code: "x = [1, 2, 3]\ny = x\ny.append(4)\nprint(x)",
        options: ["[1, 2, 3]", "[1, 2, 3, 4]", "Error", "[4]"],
        correct: 1,
        explanation: "y adalah referensi ke list yang sama dengan x, jadi mengubah y juga mengubah x. Keduanya menunjuk ke objek list yang sama di memori."
    },
    {
        question: "Apa perbedaan antara '==' dan 'is' di Python?",
        options: [
            "'==' membandingkan nilai, 'is' membandingkan identitas objek",
            "Keduanya sama persis",
            "'is' lebih cepat dari '=='",
            "'==' hanya untuk angka, 'is' untuk string"
        ],
        correct: 0,
        explanation: "'==' memeriksa apakah nilai sama, sedangkan 'is' memeriksa apakah dua variabel menunjuk ke objek yang sama di memori."
    },
    {
        question: "Apa yang akan terjadi dengan kode ini?",
        code: "def func(a, b=[]):\n    b.append(a)\n    return b\n\nprint(func(1))\nprint(func(2))",
        options: ["[1] dan [2]", "[1] dan [1, 2]", "Error", "[1, 2] dan [1, 2]"],
        correct: 1,
        explanation: "Default mutable arguments (seperti list) dibuat hanya sekali saat fungsi didefinisikan, bukan setiap kali fungsi dipanggil. Jadi list b yang sama digunakan di kedua pemanggilan."
    },
    {
        question: "Apa output dari kode berikut?",
        code: "print(type(5/2))\nprint(type(5//2))",
        options: ["int, int", "float, int", "int, float", "float, float"],
        correct: 1,
        explanation: "Operator '/' selalu menghasilkan float, sedangkan '//' adalah floor division yang menghasilkan int."
    },
    {
        question: "Manakah cara yang benar untuk membuat dictionary comprehension?",
        options: [
            "{x: x**2 for x in range(5)}",
            "[x: x**2 for x in range(5)]",
            "(x: x**2 for x in range(5))",
            "dict(x: x**2 for x in range(5))"
        ],
        correct: 0,
        explanation: "Dictionary comprehension menggunakan kurung kurawal {} dengan format {key: value for item in iterable}."
    },
    {
        question: "Apa output dari kode ini?",
        code: "x = 'python'\nprint(x[2:4])",
        options: ["th", "yt", "yth", "tho"],
        correct: 0,
        explanation: "String slicing x[2:4] mengambil karakter dari indeks 2 sampai 3 (sebelum 4). Python menggunakan zero-based indexing, jadi 'p'=0, 'y'=1, 't'=2, 'h'=3."
    },
    {
        question: "Manakah yang merupakan tipe data immutable di Python?",
        options: ["list", "tuple", "dictionary", "set"],
        correct: 1,
        explanation: "Tuple adalah immutable (tidak bisa diubah setelah dibuat). List, dictionary, dan set adalah mutable."
    },
    {
        question: "Apa hasil dari kode berikut?",
        code: "a = [1, 2, 3]\nb = a[:]\nb[0] = 99\nprint(a[0])",
        options: ["99", "1", "Error", "None"],
        correct: 1,
        explanation: "a[:] membuat shallow copy dari list a. Jadi b adalah list terpisah, dan mengubah b tidak mempengaruhi a."
    },
    {
        question: "Apa yang dilakukan fungsi 'lambda' di Python?",
        options: [
            "Membuat fungsi anonim (tanpa nama)",
            "Menghapus variabel",
            "Membuat loop",
            "Mengimport modul"
        ],
        correct: 0,
        explanation: "Lambda adalah cara untuk membuat fungsi kecil anonim dalam satu baris. Contoh: lambda x: x*2"
    }
];

let score = 0;
let answeredCount = 0;
let currentQuestion = null;
let answeredCells = new Set();

const modal = document.getElementById('modal');
const questionText = document.getElementById('questionText');
const questionNumber = document.getElementById('questionNumber');
const optionsContainer = document.getElementById('options');
const feedback = document.getElementById('feedback');
const nextBtn = document.getElementById('nextBtn');
const cells = document.querySelectorAll('.cell');
const finalMessage = document.getElementById('finalMessage');

// Create floating particles
function createParticles() {
    const particlesContainer = document.getElementById('particles');
    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 3 + 's';
        particle.style.animationDuration = (3 + Math.random() * 2) + 's';
        particlesContainer.appendChild(particle);
    }
}

createParticles();

// Create sparkle effect
function createSparkle(x, y) {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    document.body.appendChild(sparkle);
    
    setTimeout(() => sparkle.remove(), 1000);
}

// Create confetti
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#f093fb', '#4facfe', '#feca57', '#48dbfb'];
    for (let i = 0; i < 100; i++) {
        setTimeout(() => {
            const confetti = document.createElement('div');
            confetti.className = 'confetti-piece';
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confetti);
            
            setTimeout(() => confetti.classList.add('active'), 10);
            setTimeout(() => confetti.remove(), 3000);
        }, i * 30);
    }
}

cells.forEach((cell, idx) => {
    cell.addEventListener('click', (e) => {
        const index = parseInt(cell.dataset.index);
        if (!answeredCells.has(index)) {
            currentQuestion = index;
            createSparkle(e.clientX, e.clientY);
            showQuestion(index);
        }
    });
});

function showQuestion(index) {
    const q = questions[index];
    
    questionNumber.textContent = index + 1;
    
    let questionHTML = `<strong>Pertanyaan ${index + 1}:</strong><br>${q.question}`;
    if (q.code) {
        questionHTML += `<div class="code-block">${q.code}</div>`;
    }
    questionText.innerHTML = questionHTML;
    
    optionsContainer.innerHTML = '';
    q.options.forEach((option, i) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.textContent = option;
        optionDiv.addEventListener('click', () => checkAnswer(i, index));
        optionsContainer.appendChild(optionDiv);
    });
    
    feedback.style.display = 'none';
    nextBtn.style.display = 'none';
    modal.classList.add('active');
}

function checkAnswer(selected, questionIndex) {
    const q = questions[questionIndex];
    const options = document.querySelectorAll('.option');
    
    options.forEach((opt, i) => {
        opt.style.pointerEvents = 'none';
        if (i === q.correct) {
            opt.classList.add('selected-correct');
        } else if (i === selected && i !== q.correct) {
            opt.classList.add('selected-wrong');
        }
    });
    
    if (selected === q.correct) {
        feedback.className = 'feedback correct';
        feedback.innerHTML = `✅ <strong>Benar Sekali!</strong><br>${q.explanation}`;
        score += 10;
        cells[questionIndex].classList.add('answered');
        cells[questionIndex].textContent = '✓';
        
        // Add sparkles on correct answer
        for (let i = 0; i < 5; i++) {
            setTimeout(() => {
                const rect = cells[questionIndex].getBoundingClientRect();
                createSparkle(
                    rect.left + Math.random() * rect.width,
                    rect.top + Math.random() * rect.height
                );
            }, i * 100);
        }
    } else {
        feedback.className = 'feedback wrong';
        feedback.innerHTML = `❌ <strong>Kurang Tepat!</strong><br>Jawaban yang benar: <strong>${q.options[q.correct]}</strong><br><br>${q.explanation}`;
        cells[questionIndex].classList.add('wrong');
        cells[questionIndex].textContent = '✗';
    }
    
    feedback.style.display = 'block';
    nextBtn.style.display = 'block';
    answeredCells.add(questionIndex);
    answeredCount++;
    
    updateScore();
}

function updateScore() {
    const scoreElement = document.getElementById('score');
    const answeredElement = document.getElementById('answered');
    
    scoreElement.classList.add('updated');
    scoreElement.textContent = score;
    answeredElement.textContent = `${answeredCount}/9`;
    
    setTimeout(() => scoreElement.classList.remove('updated'), 500);
    
    if (answeredCount === 9) {
        setTimeout(showFinalMessage, 500);
    }
}

function showFinalMessage() {
    modal.classList.remove('active');
    document.querySelector('.grid').style.display = 'none';
    
    let message = '';
    let percentage = (score / 90) * 100;
    
    if (percentage === 100) {
        message = 'SEMPURNA! Anda master Python! 🏆';
        createConfetti();
    } else if (percentage >= 70) {
        message = 'Bagus sekali! Anda paham Python dengan baik! 👏';
        createConfetti();
    } else if (percentage >= 50) {
        message = 'Lumayan! Masih ada ruang untuk berkembang! 💪';
    } else {
        message = 'Jangan menyerah! Terus belajar ya! 📚';
    }
    
    document.getElementById('finalScore').innerHTML = 
        `Skor akhir: <strong style="font-size: 1.5em; color: #667eea;">${score}/90</strong><br><br>${message}`;
    finalMessage.style.display = 'block';
}

nextBtn.addEventListener('click', () => {
    modal.classList.remove('active');
});

modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.classList.remove('active');
    }
});
