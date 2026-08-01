// ============================================================
//  NEGARA - Module
// ============================================================

let DATA_NEGARA = [];

// ===== LOAD DATA =====
async function loadNegara() {
    const statusEl = document.getElementById('dataStatus');
    const tableEl = document.getElementById('negara-table');
    
    try {
        const res = await fetch('data/negara.json');
        if (!res.ok) throw new Error('negara.json tidak ditemukan');
        const data = await res.json();
        DATA_NEGARA = data.negara || [];
        
        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-green-500 text-white">✅ ${DATA_NEGARA.length} negara dimuat</span>`;
        }
        
        updateNegaraStats(DATA_NEGARA);
        renderNegara(DATA_NEGARA);
        setupNegaraSearch(DATA_NEGARA);
        
    } catch (err) {
        console.error('Gagal load negara:', err);
        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-red-500 text-white">❌ ${err.message}</span>`;
        }
        if (tableEl) {
            tableEl.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-3 block"></i>
                    <p class="text-gray-600 dark:text-gray-300">Gagal memuat data negara.</p>
                    <small class="text-gray-400">Pastikan file <code class="bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">data/negara.json</code> ada</small>
                </div>
            `;
        }
    }
}

// ===== STATISTIK =====
function updateNegaraStats(data) {
    const total = data.length;
    const asean = data.filter(d => d.wilayah === 'ASEAN').length;
    const eropa = data.filter(d => d.wilayah === 'EROPA').length;
    const lainnya = data.filter(d => d.wilayah === 'LAINNYA').length;
    
    const statTotal = document.getElementById('statTotal');
    const statASEAN = document.getElementById('statASEAN');
    const statEROPA = document.getElementById('statEROPA');
    const statLainnya = document.getElementById('statLainnya');
    const totalNegaraHero = document.getElementById('totalNegaraHero');
    const totalWilayahHero = document.getElementById('totalWilayahHero');
    
    if (statTotal) statTotal.textContent = total;
    if (statASEAN) statASEAN.textContent = asean;
    if (statEROPA) statEROPA.textContent = eropa;
    if (statLainnya) statLainnya.textContent = lainnya;
    if (totalNegaraHero) totalNegaraHero.textContent = total;
    if (totalWilayahHero) {
        const wilayahCount = new Set(data.map(d => d.wilayah)).size;
        totalWilayahHero.textContent = wilayahCount;
    }
}

// ===== RENDER TABEL =====
function renderNegara(data) {
    const container = document.getElementById('negara-table');
    if (!container) return;
    
    const badgeMap = { 
        ASEAN: 'bg-emerald-500', 
        EROPA: 'bg-blue-500', 
        LAINNYA: 'bg-purple-500' 
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
                <tr class="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tl-lg">Wilayah</th>
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Negara (Jerman)</th>
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Bahasa (Jerman)</th>
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Artikel</th>
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Negara (Indonesia)</th>
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tr-lg">Bahasa (Indonesia)</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
    `;
    
    data.forEach((d, index) => {
        const bgRow = index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50/70 dark:bg-slate-800/70';
        const wilayahIcon = d.wilayah === 'ASEAN' ? '🌏' : d.wilayah === 'EROPA' ? '🌍' : '🌎';
        
        html += `
            <tr class="${bgRow} hover:bg-indigo-50/70 dark:hover:bg-indigo-900/20 transition-colors duration-150 group">
                <td class="px-4 py-3.5">
                    <span class="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-white ${badgeMap[d.wilayah] || 'bg-gray-500'}">
                        ${wilayahIcon} ${d.wilayah}
                    </span>
                </td>
                <td class="px-4 py-3.5 font-semibold text-gray-800 dark:text-gray-100 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    ${d.negara_jerman}
                </td>
                <td class="px-4 py-3.5 text-gray-600 dark:text-gray-300">
                    ${d.bahasa_jerman}
                </td>
                <td class="px-4 py-3.5 text-center text-gray-500 dark:text-gray-400">
                    ${d.artikel ? `<span class="inline-block px-2 py-0.5 bg-indigo-100 dark:bg-indigo-900/40 text-indigo-700 dark:text-indigo-300 rounded text-xs font-medium">${d.artikel}</span>` : '—'}
                </td>
                <td class="px-4 py-3.5 font-medium text-gray-800 dark:text-gray-100">
                    ${d.negara_indonesia}
                </td>
                <td class="px-4 py-3.5 text-gray-600 dark:text-gray-300">
                    ${d.bahasa_indonesia}
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

// ===== SEARCH =====
function setupNegaraSearch(data) {
    const input = document.getElementById('searchNegara');
    const clear = document.getElementById('clearNegara');
    if (!input) return;
    
    input.addEventListener('input', function() {
        clear.classList.toggle('hidden', !this.value.length);
        const q = this.value.toLowerCase().trim();
        const filtered = data.filter(d => 
            Object.values(d).join(' ').toLowerCase().includes(q)
        );
        renderNegara(filtered);
    });
    
    if (clear) {
        clear.addEventListener('click', function() {
            input.value = '';
            clear.classList.add('hidden');
            renderNegara(data);
            input.focus();
        });
    }
}