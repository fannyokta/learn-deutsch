// ============================================================
//  KOMPONEN NAVBAR - Reusable untuk semua halaman
// ============================================================

// ===== KONFIGURASI MENU =====
const MENU_ITEMS = [
    { href: 'beranda.html', icon: 'fa-home', label: 'Beranda' },
    { href: 'negara.html', icon: 'fa-globe-asia', label: 'Negara' },
    { href: 'kosakata.html', icon: 'fa-book-open', label: 'Kosakata' },
    { href: 'tata-bahasa.html', icon: 'fa-graduation-cap', label: 'Tata Bahasa' },
    { href: 'pronomen.html', icon: 'fa-user-graduate', label: 'Pronomen' },
    { href: 'modalverben.html', icon: 'fa-toolbox', label: 'Modalverben' },
    {
        href: '#',
        icon: 'fa-bookmark',
        label: 'Pelajaran',
        submenu: [
            { href: 'pelajaran-fragen.html', icon: 'fa-question-circle', label: 'Fragen' },
            { href: 'pelajaran-zahlen.html', icon: 'fa-hashtag', label: 'Zahlen' },
            { href: 'pelajaran-zeit.html', icon: 'fa-clock', label: 'Zeit & Hobby' },
            { href: 'pelajaran-uhrzeit.html', icon: 'fa-stopwatch', label: 'Uhrzeit' },
            { href: 'pelajaran-berufe.html', icon: 'fa-briefcase', label: 'Berufe' },
            { href: 'pelajaran-stadt.html', icon: 'fa-city', label: 'Stadt' },
            { href: 'pelajaran-essen.html', icon: 'fa-utensils', label: 'Essen' },
            { href: 'pelajaran-familie.html', icon: 'fa-people-roof', label: 'Familie & Alltag' },
            { href: 'pelajaran-zeit-mit-freundin.html', icon: 'fa-heart', label: 'Zeit mit Freundin' },
        ]
    },
];

// ===== RENDER NAVBAR =====
function renderSidebar() {
    const container = document.getElementById('sidebarContainer');
    if (!container) return;

    const currentPage = window.location.pathname.split('/').pop() || 'beranda.html';

    // Brand
    const brand = `
        <a href="beranda.html" class="flex items-center gap-2 shrink-0">
            <span class="text-2xl">🇩🇪</span>
            <span class="text-lg font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Lernen</span>
        </a>
    `;

    // ===== Desktop nav items =====
    const desktopItems = MENU_ITEMS.map((item) => {
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isActive = item.href === currentPage;
        const isSubActive = hasSubmenu && item.submenu.some(sub => sub.href === currentPage);
        const isParentActive = isActive || isSubActive;

        const activeClass = isParentActive
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-md shadow-indigo-500/30'
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100 hover:-translate-y-0.5';

        if (!hasSubmenu) {
            return `
                <a href="${item.href}" class="nav-pill flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeClass}">
                    <i class="fas ${item.icon} text-xs"></i>
                    <span>${item.label}</span>
                </a>
            `;
        }

        // Dropdown trigger + panel
        const subLinks = item.submenu.map(sub => {
            const subActive = sub.href === currentPage;
            const subClass = subActive
                ? 'bg-indigo-50 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400 font-semibold'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 hover:text-indigo-600 dark:hover:text-indigo-400';
            return `
                <a href="${sub.href}" class="flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 ${subClass}">
                    <i class="fas ${sub.icon} w-4 text-center text-xs"></i>
                    <span>${sub.label}</span>
                </a>
            `;
        }).join('');

        return `
            <div class="relative nav-dropdown">
                <button type="button" data-dropdown-toggle class="nav-pill flex items-center gap-1.5 px-3.5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${activeClass}">
                    <i class="fas ${item.icon} text-xs"></i>
                    <span>${item.label}</span>
                    <i class="fas fa-chevron-down text-[0.6rem] transition-transform duration-200 dropdown-chevron"></i>
                </button>
                <div class="nav-dropdown-panel absolute left-1/2 -translate-x-1/2 top-[calc(100%+10px)] w-64 bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700 rounded-xl shadow-xl p-2 grid grid-cols-1 gap-0.5 opacity-0 scale-95 pointer-events-none -translate-y-1 transition-all duration-200 origin-top z-50">
                    ${subLinks}
                </div>
            </div>
        `;
    }).join('');

    // ===== Mobile menu items (flat list, submenu expanded inline) =====
    const mobileItems = MENU_ITEMS.map(item => {
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        const isActive = item.href === currentPage;
        const isSubActive = hasSubmenu && item.submenu.some(sub => sub.href === currentPage);
        const isParentActive = isActive || isSubActive;
        const activeClass = isParentActive
            ? 'bg-indigo-500 text-white'
            : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700';

        if (!hasSubmenu) {
            return `
                <a href="${item.href}" class="flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeClass}">
                    <i class="fas ${item.icon} w-5 text-center"></i>
                    <span>${item.label}</span>
                </a>
            `;
        }

        const subLinks = item.submenu.map(sub => {
            const subActive = sub.href === currentPage;
            const subClass = subActive
                ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-medium'
                : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100';
            return `
                <a href="${sub.href}" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-all ${subClass}">
                    <i class="fas ${sub.icon} w-4 text-center text-xs"></i>
                    <span>${sub.label}</span>
                </a>
            `;
        }).join('');

        return `
            <div>
                <button type="button" data-mobile-submenu-toggle class="w-full flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-sm font-medium transition-all ${activeClass}">
                    <i class="fas ${item.icon} w-5 text-center"></i>
                    <span>${item.label}</span>
                    <i class="fas fa-chevron-down ml-auto text-xs transition-transform duration-200"></i>
                </button>
                <div class="mobile-submenu hidden ml-6 mt-1 space-y-0.5 border-l-2 border-indigo-500/30 pl-3">
                    ${subLinks}
                </div>
            </div>
        `;
    }).join('');

    // ===== Full markup =====
    container.innerHTML = `
        <div class="px-4 md:px-6 py-2.5 flex items-center justify-between gap-4">
            ${brand}
            <nav class="hidden lg:flex items-center gap-1">
                ${desktopItems}
            </nav>
            <div class="flex items-center gap-2">
                <button id="darkToggle" class="w-9 h-9 grid place-items-center rounded-full bg-gray-100/80 dark:bg-slate-700/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
                    <i class="fas fa-moon" id="darkIcon"></i>
                </button>
                <button id="mobileMenuToggle" class="lg:hidden w-9 h-9 grid place-items-center rounded-full bg-gray-100/80 dark:bg-slate-700/80 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
                    <i class="fas fa-bars" id="mobileMenuIcon"></i>
                </button>
            </div>
        </div>
        <div id="mobileMenuPanel" class="lg:hidden absolute left-0 right-0 top-[calc(100%+10px)] bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/60 dark:border-slate-700/60 rounded-3xl shadow-xl p-3 max-h-[70vh] overflow-y-auto opacity-0 scale-95 pointer-events-none -translate-y-1 transition-all duration-200 origin-top space-y-1">
            ${mobileItems}
        </div>
    `;

    // ===== Desktop dropdown interactivity =====
    document.querySelectorAll('.nav-dropdown').forEach(group => {
        const toggle = group.querySelector('[data-dropdown-toggle]');
        const panel = group.querySelector('.nav-dropdown-panel');
        const chevron = group.querySelector('.dropdown-chevron');

        const open = () => {
            panel.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', '-translate-y-1');
            panel.classList.add('opacity-100', 'scale-100', 'translate-y-0');
            if (chevron) chevron.classList.add('rotate-180');
        };
        const close = () => {
            panel.classList.add('opacity-0', 'scale-95', 'pointer-events-none', '-translate-y-1');
            panel.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            if (chevron) chevron.classList.remove('rotate-180');
        };
        let isOpen = false;

        toggle.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            isOpen = !isOpen;
            if (isOpen) open(); else close();
        });

        document.addEventListener('click', (e) => {
            if (!group.contains(e.target)) {
                isOpen = false;
                close();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                isOpen = false;
                close();
            }
        });
    });

    // ===== Mobile menu toggle =====
    const mobileToggle = document.getElementById('mobileMenuToggle');
    const mobilePanel = document.getElementById('mobileMenuPanel');
    const mobileIcon = document.getElementById('mobileMenuIcon');
    let mobileOpen = false;
    if (mobileToggle && mobilePanel) {
        const openMobile = () => {
            mobilePanel.classList.remove('opacity-0', 'scale-95', 'pointer-events-none', '-translate-y-1');
            mobilePanel.classList.add('opacity-100', 'scale-100', 'translate-y-0');
            if (mobileIcon) mobileIcon.className = 'fas fa-xmark';
        };
        const closeMobile = () => {
            mobilePanel.classList.add('opacity-0', 'scale-95', 'pointer-events-none', '-translate-y-1');
            mobilePanel.classList.remove('opacity-100', 'scale-100', 'translate-y-0');
            if (mobileIcon) mobileIcon.className = 'fas fa-bars';
        };
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            mobileOpen = !mobileOpen;
            if (mobileOpen) openMobile(); else closeMobile();
        });
        document.addEventListener('click', (e) => {
            if (mobileOpen && !mobilePanel.contains(e.target) && !mobileToggle.contains(e.target)) {
                mobileOpen = false;
                closeMobile();
            }
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && mobileOpen) {
                mobileOpen = false;
                closeMobile();
            }
        });
    }

    // ===== Mobile submenu toggle =====
    document.querySelectorAll('[data-mobile-submenu-toggle]').forEach(btn => {
        btn.addEventListener('click', () => {
            const submenu = btn.nextElementSibling;
            const chevron = btn.querySelector('.fa-chevron-down');
            if (submenu) submenu.classList.toggle('hidden');
            if (chevron) chevron.classList.toggle('rotate-180');
        });
    });

    // Re-attach dark mode event listener
    const darkToggle = document.getElementById('darkToggle');
    if (darkToggle) {
        darkToggle.addEventListener('click', toggleDark);
    }

    // Load theme
    loadTheme();
}

// ============================================================
//  DARK MODE FUNCTIONS
// ============================================================
function toggleDark() {
    const isDark = document.documentElement.classList.toggle('dark');
    const icon = document.getElementById('darkIcon');
    const label = document.getElementById('darkLabel');
    if (icon) icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    if (label) label.textContent = isDark ? 'Terang' : 'Gelap';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
}

function loadTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    if (saved === 'dark') document.documentElement.classList.add('dark');
    const icon = document.getElementById('darkIcon');
    const label = document.getElementById('darkLabel');
    if (icon) icon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    if (label) label.textContent = saved === 'dark' ? 'Terang' : 'Gelap';
}
