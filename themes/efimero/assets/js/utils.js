export function setClickOutsideToClose(panel, ignores) {
    document.addEventListener("click", event => {
        let panelDom = document.getElementById(panel);
        let tDom = event.target;
        for (let ig of ignores) {
            let ie = document.getElementById(ig)
            if (ie == tDom || (ie?.contains(tDom))) {
                return;
            }
        }
        panelDom.classList.add("closed");
    });
}