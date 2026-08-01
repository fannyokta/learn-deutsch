// ============================================================
//  TATA BAHASA - Module
// ============================================================

let DATA_KASUS = [];
let DATA_ARTIKEL_KASUS = [];

// ===== LOAD DATA =====
async function loadTataBahasa() {
    const statusEl = document.getElementById('dataStatus');
    const cardsEl = document.getElementById('kasus-cards');
    const tableEl = document.getElementById('kasus-table');
    
    try {
        const res = await fetch('data/tata-bahasa.json');
        if (!res.ok) throw new Error('tata-bahasa.json tidak ditemukan');
        const data = await res.json();
        DATA_KASUS = data.kasus || [];
        DATA_ARTIKEL_KASUS = data.artikel_per_kasus || [];
        
        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-green-500 text-white">✅ ${DATA_KASUS.length} kasus dimuat</span>`;
        }
        
        renderKasusCards(DATA_KASUS);
        renderKasusTable(DATA_ARTIKEL_KASUS);
        
    } catch (err) {
        console.error('Gagal load tata bahasa:', err);
        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-red-500 text-white">❌ ${err.message}</span>`;
        }
        if (cardsEl) {
            cardsEl.innerHTML = `
                <div class="text-center py-12 col-span-full">
                    <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-3 block"></i>
                    <p class="text-gray-600 dark:text-gray-300">Gagal memuat data tata bahasa.</p>
                    <small class="text-gray-400">Pastikan file <code class="bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">data/tata-bahasa.json</code> ada</small>
                </div>
            `;
        }
    }
}

// ===== RENDER CARDS KASUS =====
function renderKasusCards(data) {
    const container = document.getElementById('kasus-cards');
    if (!container) return;
    
    if (!data || data.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 dark:text-gray-500 col-span-full">😕 Tidak ada data kasus</div>`;
        return;
    }
    
    const iconMap = {
        'Nominativ': '📖',
        'Genitiv': '🔗',
        'Dativ': '🎯',
        'Akkusativ': '⚡'
    };
    
    let html = '';
    data.forEach(k => {
        const icon = k.icon || iconMap[k.nama] || '📌';
        html += `
            <div class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all group">
                <div class="text-center">
                    <div class="text-3xl mb-2">${icon}</div>
                    <h4 class="text-lg font-bold text-gray-800 dark:text-gray-100">${k.nama}</h4>
                    <p class="text-sm text-gray-500 dark:text-gray-400 mt-1"><span class="font-medium text-gray-700 dark:text-gray-300">Fungsi:</span> ${k.fungsi}</p>
                    <p class="text-sm text-gray-500 dark:text-gray-400"><span class="font-medium text-gray-700 dark:text-gray-300">Tanya:</span> <em class="text-indigo-600 dark:text-indigo-400">${k.tanya}</em></p>
                    <div class="mt-3 pt-3 border-t border-gray-100 dark:border-slate-700">
                        <p class="text-sm text-gray-600 dark:text-gray-300 italic">“<span class="text-indigo-600 dark:text-indigo-400 font-medium">${k.contoh_highlight || k.contoh}</span>”</p>
                        <p class="text-xs text-gray-400 dark:text-gray-500 mt-1">${k.contoh}</p>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// ===== RENDER TABEL ARTIKEL PER KASUS =====
function renderKasusTable(data) {
    const container = document.getElementById('kasus-table');
    if (!container) return;
    
    if (!data || data.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 dark:text-gray-500">😕 Tidak ada data artikel per kasus</div>`;
        return;
    }
    
    let html = `
        <table class="w-full text-sm">
            <thead>
                <tr class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tl-lg">Kasus</th>
                    <th class="text-center px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Maskulin</th>
                    <th class="text-center px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Feminin</th>
                    <th class="text-center px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Netral</th>
                    <th class="text-center px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tr-lg">Plural</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
    `;
    
    const rowColors = ['bg-white dark:bg-slate-800', 'bg-gray-50/70 dark:bg-slate-800/70'];
    
    data.forEach((d, index) => {
        const bgRow = rowColors[index % 2];
        const isNominativ = d.kasus === 'Nominativ';
        const isGenitiv = d.kasus === 'Genitiv';
        const isDativ = d.kasus === 'Dativ';
        const isAkkusativ = d.kasus === 'Akkusativ';
        
        let badgeColor = 'bg-gray-500';
        if (isNominativ) badgeColor = 'bg-blue-500';
        else if (isGenitiv) badgeColor = 'bg-purple-500';
        else if (isDativ) badgeColor = 'bg-emerald-500';
        else if (isAkkusativ) badgeColor = 'bg-red-500';
        
        html += `
            <tr class="${bgRow} hover:bg-indigo-50/70 dark:hover:bg-indigo-900/20 transition-colors duration-150">
                <td class="px-4 py-3.5">
                    <span class="inline-block px-3 py-1 rounded-full text-xs font-medium text-white ${badgeColor}">${d.kasus}</span>
                </td>
                <td class="px-4 py-3.5 text-center font-semibold text-gray-800 dark:text-gray-100">${d.maskulin}</td>
                <td class="px-4 py-3.5 text-center font-semibold text-gray-800 dark:text-gray-100">${d.feminin}</td>
                <td class="px-4 py-3.5 text-center font-semibold text-gray-800 dark:text-gray-100">${d.netral}</td>
                <td class="px-4 py-3.5 text-center font-semibold text-gray-800 dark:text-gray-100">${d.plural}</td>
            </tr>
        `;
    });
    
    html += `
            </tbody>
        </table>
    `;
    
    container.innerHTML = html;
}