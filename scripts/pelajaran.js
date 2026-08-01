// ============================================================
//  PELAJARAN - Module
// ============================================================

let DATA_PELAJARAN = [];

// ===== LOAD DATA =====
async function loadPelajaran() {
    const statusEl = document.getElementById('dataStatus');
    const container = document.getElementById('pelajaran-container');
    
    try {
        const res = await fetch('data/pelajaran.json');
        if (!res.ok) throw new Error('pelajaran.json tidak ditemukan');
        const data = await res.json();
        DATA_PELAJARAN = data.kategori || [];
        
        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-green-500 text-white">✅ ${DATA_PELAJARAN.length} kategori dimuat</span>`;
        }
        
        renderFilterButtons(DATA_PELAJARAN);
        renderPelajaran(DATA_PELAJARAN);
        setupPelajaranSearch(DATA_PELAJARAN);
        
    } catch (err) {
        console.error('Gagal load pelajaran:', err);
        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-red-500 text-white">❌ ${err.message}</span>`;
        }
        if (container) {
            container.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-3 block"></i>
                    <p class="text-gray-600 dark:text-gray-300">Gagal memuat data pelajaran.</p>
                    <small class="text-gray-400">Pastikan file <code class="bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">data/pelajaran.json</code> ada</small>
                </div>
            `;
        }
    }
}

// ===== RENDER FILTER BUTTONS =====
function renderFilterButtons(kategori) {
    const bar = document.getElementById('filterBar');
    if (!bar) return;
    
    bar.innerHTML = `<button class="filter-btn active px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 bg-indigo-500 text-white text-sm font-medium shadow-sm shadow-indigo-500/30" data-filter="all">📋 Semua</button>`;
    
    kategori.forEach(k => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn px-4 py-1.5 rounded-full border border-gray-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-gray-600 dark:text-gray-300 text-sm font-medium hover:bg-gray-50 dark:hover:bg-slate-700 transition-all';
        btn.dataset.filter = k.nama;
        btn.textContent = `${k.icon || '📌'} ${k.nama}`;
        bar.appendChild(btn);
    });
    
    bar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            bar.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-indigo-500', 'text-white', 'shadow-indigo-500/30', 'border-indigo-500');
                b.classList.add('bg-white', 'dark:bg-slate-800', 'text-gray-600', 'dark:text-gray-300', 'border-gray-200', 'dark:border-slate-700');
            });
            this.classList.add('active', 'bg-indigo-500', 'text-white', 'shadow-indigo-500/30', 'border-indigo-500');
            this.classList.remove('bg-white', 'dark:bg-slate-800', 'text-gray-600', 'dark:text-gray-300', 'border-gray-200', 'dark:border-slate-700');
            
            const searchInput = document.getElementById('searchPelajaran');
            applyPelajaranFilter(DATA_PELAJARAN, this.dataset.filter, searchInput ? searchInput.value : '');
        });
    });
}

// ===== RENDER PELAJARAN =====
function renderPelajaran(kategori, filter = 'all', query = '') {
    const container = document.getElementById('pelajaran-container');
    if (!container) return;
    
    let filtered = kategori;
    if (filter !== 'all') filtered = filtered.filter(k => k.nama === filter);
    
    const q = query.toLowerCase().trim();
    if (q) {
        filtered = filtered.map(k => ({
            ...k,
            items: k.items.filter(i => 
                i.pertanyaan.toLowerCase().includes(q) || 
                i.jawaban.toLowerCase().includes(q)
            )
        })).filter(k => k.items.length > 0);
    }
    
    if (!filtered.length || filtered.every(k => !k.items.length)) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-400 dark:text-gray-500">
                <i class="fas fa-search text-3xl block mb-3 text-gray-300 dark:text-gray-600"></i>
                <span>😕 Tidak ada hasil yang cocok</span>
            </div>
        `;
        return;
    }
    
    let html = '';
    filtered.forEach(kat => {
        if (!kat.items || kat.items.length === 0) return;
        
        html += `
            <div class="bg-white dark:bg-slate-800 rounded-xl p-5 md:p-6 mb-6 shadow-sm border border-gray-200 dark:border-slate-700 hover:shadow-md transition-all">
                <div class="flex items-center justify-between flex-wrap gap-2 pb-3 mb-3 border-b border-gray-200 dark:border-slate-700">
                    <h2 class="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100">
                        ${kat.icon || '📌'} ${kat.nama}
                    </h2>
                    <span class="text-xs text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-slate-700 px-3 py-1 rounded-full">${kat.items.length} pertanyaan</span>
                </div>
                <div class="grid grid-cols-1 gap-2.5">
        `;
        
        kat.items.forEach(item => {
            const tingkatBadge = item.tingkat === 'formal' 
                ? '<span class="inline-block px-2.5 py-0.5 rounded-full text-[0.6rem] font-semibold uppercase bg-blue-500 text-white">Formal</span>'
                : '<span class="inline-block px-2.5 py-0.5 rounded-full text-[0.6rem] font-semibold uppercase bg-emerald-500 text-white">Informal</span>';
            
            html += `
                <div class="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3.5 md:p-4 border border-gray-100 dark:border-slate-600 hover:translate-x-1 hover:shadow-md transition-all group">
                    <div class="flex items-center flex-wrap gap-2 mb-1.5">
                        <span class="font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">${item.pertanyaan}</span>
                        ${tingkatBadge}
                    </div>
                    <div class="flex items-start gap-2.5 text-gray-600 dark:text-gray-300 text-sm">
                        <i class="fas fa-arrow-right text-indigo-500 mt-1 text-xs"></i>
                        <span>${item.jawaban}</span>
                    </div>
                </div>
            `;
        });
        
        html += `
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ===== SEARCH =====
function setupPelajaranSearch(kategori) {
    const input = document.getElementById('searchPelajaran');
    const clear = document.getElementById('clearPelajaran');
    if (!input) return;
    
    input.addEventListener('input', function() {
        clear.classList.toggle('hidden', !this.value.length);
        const activeFilter = document.querySelector('#filterBar .filter-btn.active');
        const filterValue = activeFilter ? activeFilter.dataset.filter : 'all';
        applyPelajaranFilter(kategori, filterValue, this.value);
    });
    
    if (clear) {
        clear.addEventListener('click', function() {
            input.value = '';
            clear.classList.add('hidden');
            const activeFilter = document.querySelector('#filterBar .filter-btn.active');
            const filterValue = activeFilter ? activeFilter.dataset.filter : 'all';
            applyPelajaranFilter(kategori, filterValue, '');
            input.focus();
        });
    }
}

// ===== APPLY FILTER =====
function applyPelajaranFilter(kategori, filter, query) {
    renderPelajaran(kategori, filter, query);
}