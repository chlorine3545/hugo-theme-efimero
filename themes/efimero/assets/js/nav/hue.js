const hueValue = document.getElementById('hueValue');
const colorSlider = document.getElementById('colorSlider');
const resetHueButton = document.getElementById('reset-hue');

function getDefaultHue() {
    return 215; // 示例默认值
}

function getHue() {
    return parseInt(localStorage.getItem('hue') || getDefaultHue());
}

function setHue(hue) {
    document.documentElement.style.setProperty('--hue', hue);
    localStorage.setItem('hue', hue);
}

function resetHue() {
    const defaultHue = getDefaultHue();
    setHue(defaultHue);
    return defaultHue;
}

export function initHueFunc() {
    let hue = getHue();
    const defaultHue = getDefaultHue();

    function updateHue(newHue) {
        hue = newHue;
        hueValue.textContent = hue;
        setHue(hue);
    }

    colorSlider.value = hue;
    updateHue(hue);

    colorSlider.addEventListener('input', function () {
        updateHue(colorSlider.value);
    });

    resetHueButton.addEventListener('click', function () {
        hue = resetHue();
        colorSlider.value = hue;
        updateHue(hue);
    });
}