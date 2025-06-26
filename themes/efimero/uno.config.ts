import { defineConfig } from "unocss";
import { presetUno, presetIcons, presetAttributify, presetTypography } from "unocss";
import presetLegacyCompat from '@unocss/preset-legacy-compat';
import { IconifyJSON } from '@iconify/types'; // 引入 IconifyJSON 类型

import carbonIcons from '@iconify-json/carbon/icons.json';
import mdiIcons from '@iconify-json/mdi/icons.json';
import simpleIcons from '@iconify-json/simple-icons/icons.json';

export default defineConfig({
    presets: [
        presetAttributify(),
        presetUno(),
        presetTypography(),
        presetIcons({
            collections: {
                carbon: () => carbonIcons as IconifyJSON, // 确保类型匹配
                mdi: () => mdiIcons as IconifyJSON,
                simple: async () => simpleIcons as IconifyJSON,
            },
            scale: 1.2,
            warn: true,
        }),
        presetLegacyCompat({
            commaStyleColorFunction: true,
        })
    ],
    safelist: [
        'i-carbon-information',
        'i-carbon-idea',
        'i-carbon-warning-alt',
        'i-carbon-warning',
        'i-carbon-warning-filled',
        // 添加颜色类
        'bg-blue-100', 'border-blue-200', 'text-blue-700',
        'bg-green-100', 'border-green-200', 'text-green-700',
        'bg-purple-100', 'border-purple-200', 'text-purple-700',
        'bg-yellow-100', 'border-yellow-200', 'text-yellow-700',
        'bg-red-100', 'border-red-200', 'text-red-700',
        // 暗色模式类
        'dark:bg-blue-900', 'dark:border-blue-700', 'dark:text-blue-100', 'dark:text-blue-300',
        'dark:bg-green-900', 'dark:border-green-700', 'dark:text-green-100', 'dark:text-green-300',
        'dark:bg-purple-900', 'dark:border-purple-700', 'dark:text-purple-100', 'dark:text-purple-300',
        'dark:bg-yellow-900', 'dark:border-yellow-700', 'dark:text-yellow-100', 'dark:text-yellow-300',
        'dark:bg-red-900', 'dark:border-red-700', 'dark:text-red-100', 'dark:text-red-300',
    ],
    shortcuts: {
        // shortcuts to multiple utilities
        "un-postcard": "flex flex-col-reverse md:flex-col w-full rounded-[var(--radius-large)] overflow-hidden relative",
        "un-postcard-in": "pl-6 md:pl-9 pr-6 md:pr-2 pt-6 md:pt-7 pb-6 relative w-[99%]",
        "un-postcard-title": `
      transition w-full block font-bold mb-3 text-3xl 
      hover:text-[var(--primary)] dark:hover:text-[var(--primary)]
      active:text-[var(--title-active)] dark:active:text-[var(--title-active)]
      before:content-['']
      before:w-1 before:h-5 before:rounded-md before:bg-[var(--primary)] mt-[-2.5px]
      before:absolute before:top-[35px] before:left-[18px] before:hidden md:before:block`,
        "un-list-line": `transition-all mx-auto w-1 h-1 rounded group-hover:h-5
      bg-[oklch(0.5_0.05_var(--hue))] group-hover:bg-[var(--primary)]
      outline outline-4 z-50
      outline-[var(--card-bg)]
      group-hover:outline-[var(--btn-plain-bg-hover)]
      group-active:outline-[var(--btn-plain-bg-active)]`
    },
    rules: [
        [
            /^text-(\d+)$/,
            ([, d]) => {
                return `
        .text-${d} { color: rgb(0 0 0 / ${parseInt(d) / 100}); }
        :is(.dark .text-${d}) { color: rgb(255 255 255 / ${parseInt(d) / 100
                    }); }
        `;
            },
        ],
        
    ],
    // shortcuts: [[/^text-(\d+)$/, ([, d]) => `text-${d} dark:text-${d}`]],
});
