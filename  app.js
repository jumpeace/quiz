const quizzes = [
    {
        question: '遠藤さくらの誕生日は？',
        choices: [
            {
                text: '9月13日',
                isCorrect: false,
            },
            {
                text: '10月3日',
                isCorrect: true,
            },
            {
                text: '10月8日',
                isCorrect: false,
            },
        ]
    },
    {
        question: '遠藤さくらが初めてセンターをした表題曲は？',
        choices: [
            {
                text: '帰り道は遠回りしたくなる',
                isCorrect: false,
            },
            {
                text: 'Sing Out!',
                isCorrect: false,
            },
            {
                text: '夜明けまで強がらなくてもいい',
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