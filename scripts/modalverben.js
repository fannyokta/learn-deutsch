// ============================================================
//  MODALVERBEN - Module
// ============================================================

let DATA_MODALVERBEN = [];
let DATA_PRONOMEN_MV = [];
let DATA_BEDEUTUNGEN = [];
let DATA_HINWEISE = [];
let DATA_DIALOG = null;

// ===== LOAD DATA =====
async function loadModalverben() {
    const statusEl = document.getElementById('dataStatus');
    const introEl = document.getElementById('penjelasan-box');
    const tableEl = document.getElementById('konjugasi-table');
    const cardsEl = document.getElementById('modalverben-cards');

    try {
        const res = await fetch('data/modalverben.json');
        if (!res.ok) throw new Error('modalverben.json tidak ditemukan');
        const data = await res.json();

        DATA_MODALVERBEN = data.modalverben || [];
        DATA_PRONOMEN_MV = data.pronomen || [];
        DATA_BEDEUTUNGEN = data.bedeutungen || [];
        DATA_HINWEISE = data.hinweise || [];
        DATA_DIALOG = data.dialog || null;

        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-green-500 text-white">✅ ${DATA_MODALVERBEN.length} modalverben dimuat</span>`;
        }

        renderPenjelasan(data.penjelasan);
        renderBedeutungenTable(DATA_BEDEUTUNGEN, DATA_HINWEISE);
        renderKonjugasiTable(DATA_MODALVERBEN, DATA_PRONOMEN_MV);
        renderModalverbenCards(DATA_MODALVERBEN);
        renderDialog(DATA_DIALOG);

    } catch (err) {
        console.error('Gagal load modalverben:', err);
        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-red-500 text-white">❌ ${err.message}</span>`;
        }
        if (cardsEl) {
            cardsEl.innerHTML = `
                <div class="text-center py-12 col-span-full">
                    <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-3 block"></i>
                    <p class="text-gray-600 dark:text-gray-300">Gagal memuat data modalverben.</p>
                    <small class="text-gray-400">Pastikan file <code class="bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">data/modalverben.json</code> ada</small>
                </div>
            `;
        }
    }
}

// ===== RENDER PENJELASAN =====
function renderPenjelasan(penjelasan) {
    const container = document.getElementById('penjelasan-box');
    if (!container || !penjelasan) return;

    container.innerHTML = `
        <h3 class="text-lg font-bold text-gray-800 dark:text-gray-100 mb-2">📘 ${penjelasan.judul}</h3>
        <p class="text-sm text-gray-600 dark:text-gray-300 mb-4">${penjelasan.isi}</p>
        <div class="bg-indigo-50 dark:bg-indigo-950/30 border border-indigo-200 dark:border-indigo-800/30 rounded-lg p-4">
            <p class="text-base font-mono text-indigo-700 dark:text-indigo-300">${penjelasan.contoh_pola}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400 mt-1">${penjelasan.keterangan_pola}</p>
        </div>
    `;
}

// ===== RENDER TABEL BEDEUTUNGEN UND BEISPIELE =====
function renderBedeutungenTable(data, hinweise) {
    const container = document.getElementById('bedeutungen-table');
    const hinweiseContainer = document.getElementById('hinweise-box');
    if (!container) return;

    if (!data || data.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 dark:text-gray-500">😕 Tidak ada data bedeutungen</div>`;
        return;
    }

    let html = `
        <table class="w-full text-sm">
            <thead>
                <tr class="bg-gradient-to-r from-blue-500 to-cyan-500">
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tl-lg">Modalverb</th>
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Bedeutung</th>
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tr-lg">Beispiel</th>
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
    `;

    data.forEach((d, index) => {
        const bgRow = index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50/70 dark:bg-slate-800/70';
        const beispielHtml = (d.beispiele || []).map(b =>
            `<div>${b.de}${b.keterangan ? ` <span class="text-gray-400 dark:text-gray-500">(${b.keterangan})</span>` : ''}</div>`
        ).join('');

        html += `
            <tr class="${bgRow} hover:bg-indigo-50/70 dark:hover:bg-indigo-900/20 transition-colors duration-150">
                <td class="px-4 py-3.5 font-semibold text-gray-800 dark:text-gray-100 align-top whitespace-nowrap">${d.verb}</td>
                <td class="px-4 py-3.5 text-gray-600 dark:text-gray-300 align-top">${d.bedeutung}</td>
                <td class="px-4 py-3.5 text-gray-600 dark:text-gray-300 italic align-top space-y-1">${beispielHtml}</td>
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;

    if (hinweiseContainer && hinweise && hinweise.length) {
        hinweiseContainer.innerHTML = `
            <h4 class="text-sm font-bold text-gray-700 dark:text-gray-200 mb-2">📝 Hinweise</h4>
            <ul class="space-y-1.5">
                ${hinweise.map(h => `<li class="text-sm text-gray-600 dark:text-gray-300 flex gap-2"><span class="text-indigo-500">→</span><span>${h}</span></li>`).join('')}
            </ul>
        `;
    }
}

// ===== RENDER TABEL KONJUGASI (overview semua modalverben) =====
function renderKonjugasiTable(data, pronomen) {
    const container = document.getElementById('konjugasi-table');
    if (!container) return;

    if (!data || data.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 dark:text-gray-500">😕 Tidak ada data modalverben</div>`;
        return;
    }

    const pronomenKeys = ['ich', 'du', 'er_sie_es', 'wir', 'ihr', 'sie_Sie'];
    const pronomenLabels = pronomen && pronomen.length ? pronomen : ['ich', 'du', 'er/sie/es', 'wir', 'ihr', 'sie/Sie'];

    let html = `
        <table class="w-full text-sm">
            <thead>
                <tr class="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
                    <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tl-lg">Pronomen</th>
                    ${data.map((v, i) => `<th class="text-center px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider ${i === data.length - 1 ? 'rounded-tr-lg' : ''}">${v.verb}</th>`).join('')}
                </tr>
            </thead>
            <tbody class="divide-y divide-gray-100 dark:divide-slate-700 bg-white dark:bg-slate-800">
    `;

    pronomenKeys.forEach((key, index) => {
        const bgRow = index % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50/70 dark:bg-slate-800/70';
        html += `
            <tr class="${bgRow} hover:bg-indigo-50/70 dark:hover:bg-indigo-900/20 transition-colors duration-150">
                <td class="px-4 py-3.5 font-semibold text-gray-800 dark:text-gray-100">${pronomenLabels[index]}</td>
                ${data.map(v => `<td class="px-4 py-3.5 text-center text-gray-600 dark:text-gray-300">${v.konjugasi[key] || '-'}</td>`).join('')}
            </tr>
        `;
    });

    html += `
            </tbody>
        </table>
    `;

    container.innerHTML = html;
}

// ===== RENDER CARDS PER MODALVERB (arti, konteks, contoh) =====
function renderModalverbenCards(data) {
    const container = document.getElementById('modalverben-cards');
    if (!container) return;

    if (!data || data.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 dark:text-gray-500 col-span-full">😕 Tidak ada data modalverben</div>`;
        return;
    }

    let html = '';
    data.forEach(v => {
        html += `
            <div class="bg-white dark:bg-slate-800 rounded-xl p-5 border border-gray-200 dark:border-slate-700 shadow-sm hover:shadow-md transition-all">
                <div class="flex items-center gap-3 mb-2">
                    <span class="text-2xl">${v.icon || '🔹'}</span>
                    <div>
                        <h4 class="text-lg font-bold text-gray-800 dark:text-gray-100">${v.verb}</h4>
                        <p class="text-sm text-indigo-600 dark:text-indigo-400 font-medium">${v.arti}</p>
                    </div>
                </div>
                <p class="text-sm text-gray-500 dark:text-gray-400 mb-3">${v.konteks}</p>
                <div class="space-y-2 pt-3 border-t border-gray-100 dark:border-slate-700">
                    ${(v.contoh || []).map(c => `
                        <div>
                            <p class="text-sm text-gray-700 dark:text-gray-200 italic">"${c.de}"</p>
                            <p class="text-xs text-gray-400 dark:text-gray-500">${c.id}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
}

// ===== RENDER MINI DIALOG (Verabredung machen) =====
function renderDialog(dialog) {
    const titleEl = document.getElementById('dialog-title');
    const keteranganEl = document.getElementById('dialog-keterangan');
    const container = document.getElementById('dialog');
    if (!container) return;

    if (!dialog || !dialog.percakapan || dialog.percakapan.length === 0) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 dark:text-gray-500">😕 Tidak ada data dialog</div>`;
        return;
    }

    if (titleEl && dialog.judul) titleEl.textContent = `💬 ${dialog.judul}`;
    if (keteranganEl && dialog.keterangan) keteranganEl.textContent = dialog.keterangan;

    container.innerHTML = dialog.percakapan.map(t => {
        const isA = t.s === 'A';
        return `
            <div class="flex gap-3 ${isA ? '' : 'flex-row-reverse'}">
                <span class="shrink-0 w-8 h-8 rounded-full ${isA ? 'bg-indigo-500' : 'bg-pink-500'} text-white grid place-items-center font-bold text-sm">${t.s}</span>
                <div class="${isA ? 'bg-indigo-50 dark:bg-indigo-950/30 rounded-tl-none' : 'bg-pink-50 dark:bg-pink-950/30 rounded-tr-none'} rounded-lg p-3 flex-1">
                    <p class="font-medium text-gray-800 dark:text-gray-100">${t.de}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${t.id}</p>
                </div>
            </div>
        `;
    }).join('');
}
