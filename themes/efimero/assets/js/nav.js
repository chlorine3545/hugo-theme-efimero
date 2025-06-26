import { initThemeSwitch } from "./nav/theme";
import { initColorSettingsTrigger } from "./nav/colorPanel";
import { setClickOutsideToClose } from "./utils";
import { initMenuToggle, initMobileMenuItems, initNavMenuSwitch } from "./nav/menu";
import { initHueFunc } from "./nav/hue";

// 统一的IIFE调用
(function () {
    // 初始化主题切换
    initThemeSwitch();

    // 桌面端导航菜单
    initMenuToggle();

    // 移动端导航菜单
    initMobileMenuItems();
    initNavMenuSwitch();

    // 初始化颜色设置
    initColorSettingsTrigger();

    // 色调调节设置
    initHueFunc();

    // 点击外部关闭
    setClickOutsideToClose("nav-menu-panel", ["nav-menu-panel", "nav-menu-switch"]);
    setClickOutsideToClose("color-settings-panel", ["color-settings-panel", "color-settings-trigger"]);
})();