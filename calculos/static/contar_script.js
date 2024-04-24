function fitProblem() {
    textFit(document.querySelector('.carousel-item.active > .problem'), {minFontSize: 50, maxFontSize: 200});
};
$('document').ready(fitProblem);
document.addEventListener('DOMContentLoaded', fitProblem, false);
window.addEventListener('load', fitProblem, false )
addEventListener("readystatechange", (event) => fitProblem);

let myCarousel = document.querySelector('#problem_container');
let carousel = new bootstrap.Carousel(myCarousel);
myCarousel.addEventListener('slid.bs.carousel', function(e) {
    fitProblem();
});

let carousel_next = document.querySelector('.carousel-next');
carousel_next.addEventListener('click', function(e) {
    carousel.next();
});

let carousel_prev = document.querySelector('.carousel-prev');
carousel_prev.addEventListener('click', function(e) {
    carousel.prev();
});

let problems_data = JSON.parse(document.getElementById('problems_data').textContent);
console.log(problems_data);
console.log(111)