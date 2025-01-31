export function initThemeSwitch() {
    const schemeSwitch = document.getElementById('scheme-switch');
    const htmlElement = document.documentElement;

    // 从本地存储中获取用户偏好
    const userPreference = localStorage.getItem('color-scheme');
    if (userPreference) {
        htmlElement.classList.remove('light', 'dark');
        htmlElement.classList.add(userPreference);
    }

    schemeSwitch.addEventListener('click', function () {
        let currentScheme = htmlElement.classList.contains('dark') ? 'dark' : 'light';
        let newScheme = currentScheme === 'dark' ? 'light' : 'dark';

        htmlElement.classList.remove('light', 'dark');
        htmlElement.classList.add(newScheme);

        // 保存用户偏好到本地存储
        localStorage.setItem('color-scheme', newScheme);
    });
}