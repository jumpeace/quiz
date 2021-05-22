// ハッシュ値(sha256)生成関数
const sha256 = async(text) => {
    const uint8 = new TextEncoder().encode(text)
    const digest = await crypto.subtle.digest('SHA-256', uint8)
    return Array.from(new Uint8Array(digest)).map(v => v.toString(16).padStart(2, '0')).join('')
}

const setupDisplay = () => {
    $('.quiz-out-frame').html(`<div class="count-frame"><span id="quiz-count"></span>問目 / ${quizNum}問</div><div id="question"></div><div id="choices"></div>`)
}

const renderResult = () => {
    $('.quiz-out-frame').html(`<div class="end-message">終了!!</div><div class="score">${correctCount}問 / ${quizNum}問 正解</div><div><a href="https://twitter.com/share?url=https://jpig-com.github.io/quiz-test/&text=クイズ ${correctCount}問 / ${quizNum}問 正解&hashtags=theQuiz" class="twitter-share-button" data-show-count="false">Tweet</a></div>`);
}

const quizzes = [
    {
        question: '千葉県は何地方？',
        choices: [
            '東北地方',
            '中部地方',
            '関東地方',
        ],
        answer: 'cd2dff2d37e2c2328708999f6f8e56bfea52a5dbc14b07e2d94c8c9349e87e57',
    },
    {
        question: 'チーバくんの悩みとは？',
        choices: [
            '足に手が届かない',
            '耳をかけない',
            '頭を洗えない',
        ],
        answer: '89c7875fcffd5b604df6207efb8c87271cfc34437b1339271b4cb68c4916bc8e'
    }
];

const quizNum = quizzes.length;
let correctCount = 0;

const setupQuiz = (quizCount) => {
    if (quizCount > quizNum - 1) {
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
            acc + `<div class= "choice" data-choice-idx="${idx}" >(${idx + 1}) ${cur}</div>`
            , '')
    );
    checkAnswer(quizCount);
}

const checkAnswer = (quizCount) => {
    $('.choice').on('click', async (e) => {
        const selectedIdx = $(e.currentTarget).data('choice-idx');
        const selectedHash = await sha256(quizzes[quizCount].choices[selectedIdx]);
        if (selectedHash == quizzes[quizCount].answer) {
            alert('正解です');
            correctCount++;
        }
        else {
            alert('不正解です');
        }
        setupQuiz(++quizCount);
    })
}

setupQuiz(0);