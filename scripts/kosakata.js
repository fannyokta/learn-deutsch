// ============================================================
//  KOSAKATA - Module
// ============================================================

let DATA_KOSAKATA = [];

// ===== LOAD DATA =====
async function loadKosakata() {
    const statusEl = document.getElementById('dataStatus');
    const tableEl = document.getElementById('artikel-table');
    
    try {
        const res = await fetch('data/kosakata.json');
        if (!res.ok) throw new Error('kosakata.json tidak ditemukan');
        const data = await res.json();
        DATA_KOSAKATA = data.kata_benda || [];
        
        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-green-500 text-white">✅ ${DATA_KOSAKATA.length} kata dimuat</span>`;
        }
        
        updateKosakataStats(DATA_KOSAKATA);
        renderKosakata(DATA_KOSAKATA);
        setupKosakataFilter(DATA_KOSAKATA);
        setupKosakataSearch(DATA_KOSAKATA);
        
    } catch (err) {
        console.error('Gagal load kosakata:', err);
        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-red-500 text-white">❌ ${err.message}</span>`;
        }
        if (tableEl) {
            tableEl.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-3 block"></i>
                    <p class="text-gray-600 dark:text-gray-300">Gagal memuat data kosakata.</p>
                    <small class="text-gray-400">Pastikan file <code class="bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">data/kosakata.json</code> ada</small>
                </div>
            `;
        }
    }
}

// ===== STATISTIK =====
function updateKosakataStats(data) {
    const total = data.length;
    const tempat = data.filter(d => d.kategori === 'Tempat').length;
    const orang = data.filter(d => d.kategori === 'Orang').length;
    const benda = data.filter(d => d.kategori === 'Benda').length;
    const abstrak = data.filter(d => d.kategori === 'Abstrak').length;
    
    const statTotal = document.getElementById('statTotal');
    const statTempat = document.getElementById('statTempat');
    const statOrang = document.getElementById('statOrang');
    const statBenda = document.getElementById('statBenda');
    const totalKataHero = document.getElementById('totalKataHero');
    const totalKategoriHero = document.getElementById('totalKategoriHero');
    
    if (statTotal) statTotal.textContent = total;
    if (statTempat) statTempat.textContent = tempat;
    if (statOrang) statOrang.textContent = orang;
    if (statBenda) statBenda.textContent = benda;
    if (totalKataHero) totalKataHero.textContent = total;
    if (totalKategoriHero) {
        const kategoriCount = new Set(data.map(d => d.kategori)).size;
        totalKategoriHero.textContent = kategoriCount;
    }
}

// ===== RENDER TABEL =====
function renderKosakata(data) {
    const container = document.getElementById('artikel-table');
    if (!container) return;
    
    const badgeMap = { 
        Orang: 'bg-amber-500', 
        Tempat: 'bg-blue-500', 
        Benda: 'bg-red-500', 
        Abstrak: 'bg-purple-500' 
    };
    
    if (!data || data.length === 0) {
        container.innerHTML = `
            <div class="text-center py-12 text-gray-400 dark:text-gray-500">
                <i class="fas fa-search text-3xl block mb-3 text-gray-300 dark:text-gray-600"></i>
                <span>😕 Tidak ada hasil yang cocok</span>
            </div>
        `;
        return;
    }
    
    let html = `
        <table class="w-full text-sm">
            <thead>
                <tr class="bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500">
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tl-lg">Kata (Jerman)</th>
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Arti</th>
                    <th class="text-center px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Der</th>
                    <th class="text-center px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Die</th>
                    <th class="text-center px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Das</th>
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Plural</th>
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tr-lg">Kategori</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
    `;
    
    data.forEach((d, index) => {
        const bgRow = index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50/70 dark:bg-slate-800/70';
        const derColor = d.der ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-300 dark:text-gray-600';
        const dieColor = d.die ? 'text-pink-600 dark:text-pink-400' : 'text-gray-300 dark:text-gray-600';
        const dasColor = d.das ? 'text-emerald-600 dark:text-emerald-400' : 'text-gray-300 dark:text-gray-600';
        
        html += `
            <tr class="${bgRow} hover:bg-indigo-50/70 dark:hover:bg-indigo-900/20 transition-colors duration-150 group">
                <td class="px-4 py-3.5 font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    ${d.kata}
                </td>
                <td class="px-4 py-3.5 text-gray-600 dark:text-gray-300">
                    ${d.arti}
                </td>
                <td class="px-4 py-3.5 text-center font-medium ${derColor}">
                    ${d.der ? '✔' : ''}
                </td>
                <td class="px-4 py-3.5 text-center font-medium ${dieColor}">
                    ${d.die ? '✔' : ''}
                </td>
                <td class="px-4 py-3.5 text-center font-medium ${dasColor}">
                    ${d.das ? '✔' : ''}
                </td>
                <td class="px-4 py-3.5 text-gray-600 dark:text-gray-300">
                    ${d.plural}
                </td>
                <td class="px-4 py-3.5">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white ${badgeMap[d.kategori] || 'bg-gray-500'}">
                        ${d.kategori === 'Tempat' ? '🏛️' : d.kategori === 'Orang' ? '👤' : d.kategori === 'Benda' ? '📦' : '💭'}
                        ${d.kategori}
                    </span>
                </td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}

// ===== FILTER =====
function setupKosakataFilter(data) {
    const filterBar = document.getElementById('filterBar');
    if (!filterBar) return;
    
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            // Reset semua button
            filterBar.querySelectorAll('.filter-btn').forEach(b => {
                b.classList.remove('active', 'bg-indigo-500', 'text-white', 'shadow-indigo-500/30', 'border-indigo-500');
                b.classList.add('bg-white', 'dark:bg-slate-800', 'text-gray-600', 'dark:text-gray-300', 'border-gray-200', 'dark:border-slate-700');
            });
            // Aktifkan button yang diklik
            this.classList.add('active', 'bg-indigo-500', 'text-white', 'shadow-indigo-500/30', 'border-indigo-500');
            this.classList.remove('bg-white', 'dark:bg-slate-800', 'text-gray-600', 'dark:text-gray-300', 'border-gray-200', 'dark:border-slate-700');
            
            const searchInput = document.getElementById('searchKosakata');
            applyKosakataFilter(data, this.dataset.filter, searchInput ? searchInput.value : '');
        });
    });
}

// ===== SEARCH =====
function setupKosakataSearch(data) {
    const input = document.getElementById('searchKosakata');
    const clear = document.getElementById('clearKosakata');
    if (!input) return;
    
    input.addEventListener('input', function() {
        clear.classList.toggle('hidden', !this.value.length);
        const activeFilter = document.querySelector('#filterBar .filter-btn.active');
        const filterValue = activeFilter ? activeFilter.dataset.filter : 'all';
        applyKosakataFilter(data, filterValue, this.value);
    });
    
    if (clear) {
        clear.addEventListener('click', function() {
            input.value = '';
            clear.classList.add('hidden');
            const activeFilter = document.querySelector('#filterBar .filter-btn.active');
            const filterValue = activeFilter ? activeFilter.dataset.filter : 'all';
            applyKosakataFilter(data, filterValue, '');
            input.focus();
        });
    }
}

// ===== APPLY FILTER =====
function applyKosakataFilter(data, filter, query) {
    const q = query.toLowerCase().trim();
    let filtered = data;
    
    if (filter !== 'all') {
        filtered = filtered.filter(d => d.kategori === filter);
    }
    
    if (q) {
        filtered = filtered.filter(d => 
            d.kata.toLowerCase().includes(q) || 
            d.arti.toLowerCase().includes(q)
        );
    }
    
    renderKosakata(filtered);
}