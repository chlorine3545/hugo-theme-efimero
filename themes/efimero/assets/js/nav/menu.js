export function initMenuToggle() {
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => {
        const submenu = item.querySelector('.submenu');
        if (submenu) {
            let hideTimeout;
            // 显示子菜单
            const showSubmenu = () => {
                clearTimeout(hideTimeout);
                submenu.classList.remove('hidden');
            };
            // 隐藏子菜单
            const hideSubmenu = () => {
                hideTimeout = setTimeout(() => {
                    submenu.classList.add('hidden');
                }, 300); // 延迟时间根据需求调整
            };

            // 鼠标进入父菜单项或子菜单时显示子菜单
            item.addEventListener('mouseenter', showSubmenu);
            submenu.addEventListener('mouseenter', showSubmenu);

            // 鼠标离开父菜单项或子菜单时隐藏子菜单
            item.addEventListener('mouseleave', hideSubmenu);
            submenu.addEventListener('mouseleave', hideSubmenu);
        }
    });
}

// 移动端菜单项的点击事件监听器
export function initMobileMenuItems() {
    const mobileMenuItems = document.querySelectorAll('#nav-menu-panel .mobile-menu-item');
    mobileMenuItems.forEach(item => {
        const toggleButton = item.querySelector('button[aria-label="Toggle Submenu"]');
        if (toggleButton) {
            toggleButton.addEventListener('click', function () {
                const submenu = item.querySelector('.mobile-submenu');
                if (submenu) {
                    submenu.classList.toggle('hidden');
                }
            });
        }
    });
}

// 打开/关闭移动端菜单
export function initNavMenuSwitch() {
    const navMenuSwitch = document.getElementById('nav-menu-switch');
    const navMenuPanel = document.getElementById('nav-menu-panel');
    navMenuSwitch.addEventListener('click', () => {
        navMenuPanel.classList.toggle('closed');
    });
}