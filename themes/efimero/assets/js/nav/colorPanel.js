const colorSettingsTrigger = document.getElementById('color-settings-trigger');
const colorSettingsPanel = document.getElementById('color-settings-panel');

export function initColorSettingsTrigger() {
    colorSettingsTrigger.addEventListener('click', function () {
        colorSettingsPanel.classList.toggle('closed');
    });
}