function fitProblem() {
    textFit(document.querySelector('.carousel-item.active > .problem'), {minFontSize: 50, maxFontSize: 200});
};
function fitProblem0() {
    textFit(document.querySelector('.carousel-item.active > .problem'), {minFontSize: 100, maxFontSize: 200});
};
$('document').ready(fitProblem);
document.addEventListener('DOMContentLoaded', fitProblem0, false);
window.addEventListener('load', fitProblem0, false )
addEventListener("readystatechange", (event) => fitProblem0);

const myCarousel = document.querySelector('#problem_container');
const carousel = new bootstrap.Carousel(myCarousel);
const carousel_next = document.querySelector('.carousel-next');
const carousel_prev = document.querySelector('.carousel-prev');
const answer_input = document.getElementById('answer');
const answer_confirm = document.getElementById('confirm_answer');
const correct_answer_modal_element = document.getElementById('correct_answer_modal');
const correct_answer_modal = new bootstrap.Modal(correct_answer_modal_element);
const exercise_progress_bar = document.getElementById('exercise_progress_bar');
const problems_data = JSON.parse(document.getElementById('problems_data').textContent);
const small_answer_field = document.getElementById('answer_small');

let attempts = [];
let problems_number;
let problems_cancelled;
let problems_answered;
let message_read = false;

function initialize() {
    problems_number = Object.keys(problems_data).length;
    problems_cancelled = 0;
    problems_answered = 0;
    updateProgressBar(0, problems_number);
};

window.onload = initialize;

function updateProgressBar(current, maximum) {
    if (maximum === undefined) {
        maximum = Object.keys(problems_data).length;
    };
    exercise_progress_bar.setAttribute('aria-valuemax', maximum);
    exercise_progress_bar.setAttribute('aria-valuenow', current);
    exercise_progress_bar.setAttribute('style', `width: ${current/maximum*100}%`);
};

myCarousel.addEventListener('slid.bs.carousel', function(e) {
    fitProblem();
});

function initiate_answer_input() {
    answer_input.value = '';
    answer_input.classList.remove('bg-danger');
    answer_input.classList.add('bg-dark');
    answer_input.focus();
    small_answer_field.innerHTML = '';
    small_answer_field.classList.remove('bg-danger');
    small_answer_field.classList.add('bg-dark');
};

function next_problem() {
    carousel.next();
    initiate_answer_input();
};

function prev_problem() {
    carousel.prev();
    initiate_answer_input();
};

carousel_next.addEventListener('click', function(e) {
    next_problem();
});
carousel_prev.addEventListener('click', function(e) {
    prev_problem();
});


for (let idx=0; idx<problems_number; idx++) {
    attempts.push(0)
};

['click', 'touch'].forEach(e => {
    answer_confirm.addEventListener(e, () => {
        accept_answer();
    });
});

answer_input.addEventListener('keypress', (e) => {
    let key = e.charCode || e.keyCode || 0;
    if (key == 13) {accept_answer()};
});
answer_input.addEventListener('keydown', (e) => {
    let key = e.charCode || e.keyCode || 0;
    if (key == 9 || key == '9') {accept_answer()};
});

answer_input.addEventListener('input', () => {
    answer_input.classList.remove('bg-danger');
    answer_input.classList.add('bg-dark');
    answer_input.focus();
    small_answer_field.classList.remove('bg-danger');
    small_answer_field.classList.add('bg-dark');
});

// close modal on enter or escape
document.addEventListener('keypress', (e) => {
    let key = e.charCode || e.keyCode || 0;
    if (key == 13 && correct_answer_modal_element.classList.contains('show')) {
        if (message_read) {
            message_read = false;
            correct_answer_modal.hide();
        } else {
            message_read = true;
        };
    };
});


function accept_answer() {
    let answer = answer_input.value;
    let small_answer = small_answer_field.innerHTML;
    let current_problem = document.querySelector('.carousel-item.active');
    if (!current_problem) {return};
    let idx = parseInt(current_problem.getAttribute('id').match(/\d+/)[0]);
    if (answer == problems_data[idx] || small_answer == problems_data[idx]) {
        correct_answer_modal.show();
        problems_answered ++;
        answer_input.value = '';
        small_answer_field.innerHTML = '';
        next_problem();
        document.getElementById(`problem_${idx}`).remove();
        updateProgressBar(problems_answered, problems_number);
        // check if all done
        if (problems_answered == problems_number) {

        };
    } else if ( answer.length || small_answer.length ) {
        attempts.push(idx);
        answer_input.classList.remove('bg-dark');
        answer_input.classList.add('bg-danger');
        answer_input.classList.add('horizontal-shake');
        setTimeout(function() {answer_input.classList.remove('horizontal-shake')}, 1000);
        small_answer_field.classList.remove('bg-dark');
        small_answer_field.classList.add('bg-danger');
        small_answer_field.classList.add('horizontal-shake');
        setTimeout(function() {small_answer_field.classList.remove('horizontal-shake')}, 1000);
    };
};

// buttons for entering answer on small screens
for (let idx=0; idx<=9; idx++) {
    let button = document.getElementById(`button_${idx}`);
    ['click', 'touch'].forEach(e => {
        button.addEventListener(e, () => {
            small_answer_field.innerHTML += idx;
        });
    });
};
['click', 'touch'].forEach(e => {
    document.getElementById('button_del').addEventListener(e, () => {
        let text_content = small_answer_field.innerHTML;
        if (text_content.length > 0) {
            small_answer_field.innerHTML = text_content.slice(0, text_content.length - 1);
            small_answer_field.classList.remove('bg-danger');
            small_answer_field.classList.add('bg-dark');
        };
    });
});
['click', 'touch'].forEach(e => {
    document.getElementById('button_cls').addEventListener(e, () => {
        initiate_answer_input();
    });
});
