/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAppControls, type Theme, THEME_DETAILS } from './uiUtils';
import LanguageSwitcher from './LanguageSwitcher';

const Footer: React.FC<{}> = () => {
    const { theme, handleThemeChange, t } = useAppControls();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const currentThemeInfo = THEME_DETAILS.find(td => td.id === theme) || THEME_DETAILS[0];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleSelectTheme = (newTheme: Theme) => {
        handleThemeChange(newTheme);
        setIsDropdownOpen(false);
    };

    return (
        <footer className="base-font left-0 right-0 footer-themed-bg p-2 z-50 text-neutral-300 text-xs sm:text-sm border-t border-white/10">
            <div className="max-w-screen-xl ml-auto flex flex-col sm:flex-row justify-center sm:justify-between items-center gap-1 sm:gap-2 px-4">
                <div className="text-neutral-400 whitespace-nowrap">
                    {/* <a
                        href="http://sdvn.vn/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:text-yellow-400 transition-colors duration-200"
                    >
                        {t('footer_copyright')}
                    </a> */}
                </div>
                <div className="flex items-center flex-wrap justify-center gap-1 sm:gap-2">
                    <div className="flex items-center gap-2">
                        <LanguageSwitcher />
                        <div ref={dropdownRef} className="theme-dropdown">
                             <AnimatePresence>
                                {isDropdownOpen && (
                                    <motion.ul
                                        className="theme-dropdown-panel"
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.15, ease: 'easeOut' }}
                                        role="listbox"
                                    >
                                        {THEME_DETAILS.map(themeInfo => (
                                            <li
                                                key={themeInfo.id}
                                                className="theme-dropdown-item"
                                                onClick={() => handleSelectTheme(themeInfo.id)}
                                                role="option"
                                                aria-selected={theme === themeInfo.id}
                                                tabIndex={0}
                                            >
                                                <span
                                                    className="theme-swatch"
                                                    style={{ background: `linear-gradient(to right, ${themeInfo.colors[0]}, ${themeInfo.colors[1]})` }}
                                                ></span>
                                                <span className="base-font">{themeInfo.name}</span>
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                            </AnimatePresence>

                            <button
                                id="theme-select-button"
                                type="button"
                                className="theme-dropdown-button"
                                onClick={() => setIsDropdownOpen(prev => !prev)}
                                aria-haspopup="listbox"
                                aria-expanded={isDropdownOpen}
                                aria-label="Chọn giao diện nền"
                            >
                                <span className="flex items-center gap-2">
                                     <span
                                        className="theme-swatch"
                                        style={{ background: `linear-gradient(to right, ${currentThemeInfo.colors[0]}, ${currentThemeInfo.colors[1]})` }}
                                    ></span>
                                    <span className="base-font">{currentThemeInfo.name}</span>
                                </span>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-neutral-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {/* <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-xs text-neutral-500 mr-4 flex-shrink-0">
                            Video Platforms:
                        </p>
                        <div className="flex items-center gap-2 flex-wrap justify-end">
                            {[
                                { name: 'Kling', url: 'https://app.klingai.com/global/image-to-video/frame-mode/new' },
                                { name: 'Veo', url: 'https://labs.google/fx/vi/tools/flow' },
                                { name: 'Higgsfield', url: 'https://higgsfield.ai/' },
                                { name: 'Dreamina', url: 'https://dreamina.capcut.com/ai-tool/home' },
                                { name: 'Sora', url: 'https://sora.chatgpt.com/explore' },
                                { name: 'Wan', url: 'https://wan.video/' },
                                { name: 'ComfyUI', url: 'https://colab.research.google.com/github/StableDiffusionVN/SDVN-WebUI/blob/main/SDVN_WebUI_v3.ipynb' },
                                { name: 'Runway', url: 'https://runwayml.com/' },
                                { name: 'Midjourney', url: 'https://www.midjourney.com/explore?tab=random' },
                            ].map(platform => (
                                <a
                                    key={platform.name}
                                    href={platform.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-neutral-800 text-neutral-300 text-xs px-3 py-1 rounded-md hover:bg-neutral-700 hover:text-white transition-colors"
                                >
                                    {platform.name}
                                </a>
                            ))}
                        </div>
                    </div> */}
                         <a
                        href="https://thinkclimax.com/contact-us/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/40 border border-white/20 rounded-md px-3 py-1 text-neutral-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:bg-black/60 transition-colors"
                        aria-label="Gửi góp ý"
                    >
                        {t('footer_feedback')}
                    </a>
                     <a
                        href="https://thuvienphapluat.vn/phap-luat/ho-tro-phap-luat/tong-hop-so-tai-khoan-mat-tran-to-quoc-viet-nam--ban-cuu-tro-trung-uong-vietcombank-vietinbank-bidv-234684.html"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="bg-black/40 border border-white/20 rounded-md px-3 py-1 text-neutral-200 focus:ring-2 focus:ring-yellow-400 focus:outline-none hover:bg-black/60 transition-colors"
                        aria-label="Donate"
                    >
                        Donate
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
