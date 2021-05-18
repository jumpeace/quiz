const quizzes = [
    {
        question: '千葉県は何地方？',
        choices: [
            {
                text: '東北地方',
                isCorrect: false,
            },
            {
                text: '中部地方',
                isCorrect: false,
            },
            {
                text: '関東地方',
                isCorrect: true,
            },
        ]
    },
    {
        question: 'チーバくんの悩みとは？',
        choices: [
            {
                text: '足に手が届かない',
                isCorrect: false,
            },
            {
                text: '耳をかけない',
                isCorrect: false,
            },
            {
                text: '頭を洗えない',
                isCorrect: true,
            },
        ]
    }
];

const quizNum = quizzes.length;
let correctCount = 0;

const setupQuiz = (quizCount) => {
    if (quizCount > quizzes.length - 1) {
        renderResult();
        return;
    }
    if (quizCount === 0) {
        setupDisplay();
    }

    $('#quiz-count').text(quizCount + 1);
    $('#question').text(quizzes[quizCount].question);
    $('#choices').html(
        quizzes[quizCount].choices.reduce((acc, cur, idx) =>
            acc + `<div class= "choice" data-choice-idx="${idx}" >(${idx + 1}) ${cur.text}</div>`
            , '')
    );
    confirmAnswer(quizCount);
}

const confirmAnswer = (quizCount) => {
    $('.choice').on('click', (e) => {
        const selectedIdx = $(e.currentTarget).data('choice-idx');
        if (quizzes[quizCount].choices[selectedIdx].isCorrect) {
            alert('正解です');
            correctCount++;
        }
        else {
            alert('不正解です');
        }
        setupQuiz(++quizCount);
    })
}

const setupDisplay = () => {
    $('.quiz-out-frame').html(`<div class="count-frame"><span id="quiz-count"></span>問目 / ${quizNum}問</div><div id="question"></div><div id="choices"></div>`)
}

const renderResult = () => {
    $('.quiz-out-frame').html(`<div class="end-message">終了!!</div><div class="score">${correctCount}問 / ${quizNum}問 正解</div>`);
}

setupQuiz(0);