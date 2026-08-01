// ============================================================
//  KOMPONEN SIDEBAR - Reusable untuk semua halaman
// ============================================================

// ===== KONFIGURASI MENU =====
const MENU_ITEMS = [
    { href: 'index.html', icon: 'fa-home', label: 'Beranda' },
    { href: 'negara.html', icon: 'fa-globe-asia', label: 'Negara' },
    { href: 'kosakata.html', icon: 'fa-book-open', label: 'Kosakata' },
    { href: 'tata-bahasa.html', icon: 'fa-graduation-cap', label: 'Tata Bahasa' },
    { href: 'pronomen.html', icon: 'fa-user-graduate', label: 'Pronomen' },
    { 
        href: '#', 
        icon: 'fa-bookmark', 
        label: 'Pelajaran',
        submenu: [
            { href: 'pelajaran-fragen.html', icon: 'fa-question-circle', label: 'Fragen' },
            { href: 'pelajaran-zahlen.html', icon: 'fa-hashtag', label: 'Zahlen' },
            { href: 'pelajaran-zeit.html', icon: 'fa-clock', label: 'Zeit & Hobby' },
        ]
    },
];

// ===== RENDER SIDEBAR =====
function renderSidebar() {
    const container = document.getElementById('sidebarContainer');
    if (!container) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    
    // Brand
    const brand = `
        <div class="flex items-center gap-2.5 pb-5 mb-4 border-b border-gray-200 dark:border-slate-700">
            <span class="text-3xl">🇩🇪</span>
            <span class="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-600 bg-clip-text text-transparent">Lernen</span>
            <span class="bg-gradient-to-r from-indigo-500 to-purple-600 text-white text-[0.6rem] font-bold px-2 py-0.5 rounded-full ml-auto">v3</span>
        </div>
    `;

    // Nav Items
    const navItems = MENU_ITEMS.map(item => {
        const isActive = item.href === currentPage;
        const hasSubmenu = item.submenu && item.submenu.length > 0;
        
        // Cek apakah salah satu submenu aktif
        let isSubActive = false;
        if (hasSubmenu) {
            isSubActive = item.submenu.some(sub => sub.href === currentPage);
        }
        
        const isParentActive = isActive || isSubActive;
        
        const activeClass = isParentActive 
            ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/30' 
            : 'text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-gray-900 dark:hover:text-gray-100';
        const iconClass = isParentActive ? 'text-white' : 'text-gray-400 dark:text-gray-500';
        
        // Parent item
        let html = `
            <div class="nav-group">
                <a href="${item.href}" class="nav-btn flex items-center gap-3 px-3.5 py-2.5 rounded-lg transition-all ${activeClass}">
                    <i class="fas ${item.icon} w-5 text-center ${iconClass}"></i>
                    <span>${item.label}</span>
                    ${hasSubmenu ? `<i class="fas fa-chevron-down ml-auto text-xs ${isParentActive ? 'text-white' : 'text-gray-400'}"></i>` : ''}
                </a>
        `;
        
        // Submenu
        if (hasSubmenu) {
            const subActiveClass = isSubActive ? 'block' : 'hidden';
            html += `
                <div class="submenu ${subActiveClass} ml-6 mt-1 space-y-0.5 border-l-2 border-indigo-500/30 pl-3">
            `;
            
            item.submenu.forEach(sub => {
                const isSubActive = sub.href === currentPage;
                const subActiveClass = isSubActive 
                    ? 'bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 font-medium' 
                    : 'text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100';
                
                html += `
                    <a href="${sub.href}" class="flex items-center gap-2.5 px-3 py-1.5 rounded-lg text-sm transition-all ${subActiveClass}">
                        <i class="fas ${sub.icon} w-4 text-center text-xs"></i>
                        <span>${sub.label}</span>
                    </a>
                `;
            });
            
            html += `
                </div>
            `;
        }
        
        html += `</div>`;
        return html;
    }).join('');

    // Footer (Dark Mode Toggle)
    const footer = `
        <div class="border-t border-gray-200 dark:border-slate-700 pt-3 mt-2">
            <button id="darkToggle" class="flex items-center gap-2.5 w-full px-3.5 py-2.5 rounded-lg bg-gray-100 dark:bg-slate-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600 transition-all">
                <i class="fas fa-moon" id="darkIcon"></i>
                <span id="darkLabel">Gelap</span>
            </button>
        </div>
    `;

    container.innerHTML = brand + `<nav class="flex-1 flex flex-col gap-1">${navItems}</nav>` + footer;

    // ===== Event listener untuk toggle submenu =====
    document.querySelectorAll('.nav-group > .nav-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            const parent = this.parentElement;
            const submenu = parent.querySelector('.submenu');
            const icon = this.querySelector('.fa-chevron-down');
            
            // Cek apakah ini parent yang punya submenu
            if (submenu) {
                e.preventDefault();
                submenu.classList.toggle('hidden');
                if (icon) {
                    icon.classList.toggle('rotate-180');
                }
            }
        });
    });

    // ===== Buka submenu jika salah satu sub aktif =====
    document.querySelectorAll('.nav-group').forEach(group => {
        const submenu = group.querySelector('.submenu');
        if (submenu && !submenu.classList.contains('hidden')) {
            const icon = group.querySelector('.fa-chevron-down');
            if (icon) icon.classList.add('rotate-180');
        }
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