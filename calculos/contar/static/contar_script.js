const small_screen_modal_element = document.getElementById('small_screen_info_modal');
const small_screen_modal = new bootstrap.Modal(small_screen_modal_element);

function handleSmallScreenModal(portrait) {
    if (portrait || window.innerWidth > 600) {
        small_screen_modal.hide();
    } else {
        small_screen_modal.show();
    };
};

window.matchMedia("(orientation: portrait)").addEventListener("change", e => {
    const portrait = e.matches;
    handleSmallScreenModal(portrait);
});

window.addEventListener('resize', event => {
    handleSmallScreenModal(window.matchMedia("(orientation: portrait)").matches);
});
