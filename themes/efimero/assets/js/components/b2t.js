function soraTabi() {
    window.scroll({ top: 0, behavior: 'smooth' });
}

function scrollFunction() {
    let btn = document.getElementById('sora-tabi-btn');
    if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
        btn.classList.remove('hide')
    } else {
        btn.classList.add('hide')
    }
}
window.onscroll = scrollFunction