// ============================================================
//  ZEIT MIT FREUNDIN - Module
// ============================================================

let DATA_ZMF_PJ = [];
let DATA_ZMF_ORDINAL = null;
let DATA_ZMF_AKTIVITAS = null;

// ===== LOAD DATA =====
async function loadZeitMitFreundin() {
    const statusEl = document.getElementById('dataStatus');
    const cardsEl = document.getElementById('pj-container');

    try {
        const res = await fetch('data/zeit-mit-freundin.json');
        if (!res.ok) throw new Error('zeit-mit-freundin.json tidak ditemukan');
        const data = await res.json();

        DATA_ZMF_PJ = data.pertanyaan_jawaban || [];
        DATA_ZMF_ORDINAL = data.ordinalzahlen || null;
        DATA_ZMF_AKTIVITAS = data.aktivitas || null;

        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-green-500 text-white">✅ Materi dimuat</span>`;
        }

        renderPenjelasan(data.penjelasan);
        renderOrdinalzahlen(DATA_ZMF_ORDINAL);
        renderPertanyaanJawaban(DATA_ZMF_PJ);
        renderAktivitas(DATA_ZMF_AKTIVITAS);
        renderDialog(data.dialog_pesta, 'dialog-pesta-title', 'dialog-pesta-keterangan', 'dialog-pesta');
        renderDialog(data.dialog_freizeit, 'dialog-freizeit-title', 'dialog-freizeit-keterangan', 'dialog-freizeit');

    } catch (err) {
        console.error('Gagal load zeit-mit-freundin:', err);
        if (statusEl) {
            statusEl.innerHTML = `<span class="inline-block px-3.5 py-1 rounded-full text-sm font-medium bg-red-500 text-white">❌ ${err.message}</span>`;
        }
        if (cardsEl) {
            cardsEl.innerHTML = `
                <div class="text-center py-12">
                    <i class="fas fa-exclamation-circle text-4xl text-red-500 mb-3 block"></i>
                    <p class="text-gray-600 dark:text-gray-300">Gagal memuat materi.</p>
                    <small class="text-gray-400">Pastikan file <code class="bg-gray-100 dark:bg-slate-700 px-2 py-0.5 rounded">data/zeit-mit-freundin.json</code> ada</small>
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
        <ul class="space-y-1.5">
            ${(penjelasan.poin || []).map(p => `<li class="text-sm text-gray-600 dark:text-gray-300 flex gap-2"><span class="text-indigo-500">→</span><span>${p}</span></li>`).join('')}
        </ul>
    `;
}

// ===== RENDER ORDINALZAHLEN (aturan + tabel) =====
function renderOrdinalzahlen(data) {
    const aturanEl = document.getElementById('ordinal-aturan');
    const tabelEl = document.getElementById('ordinal-tabel');
    if (!data) return;

    if (aturanEl) {
        aturanEl.innerHTML = (data.aturan || []).map(a => `
            <div class="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-4 border border-gray-100 dark:border-slate-600">
                <h4 class="font-semibold text-gray-800 dark:text-gray-100 mb-1">${a.judul}</h4>
                <p class="text-sm text-gray-600 dark:text-gray-300">${a.penjelasan}</p>
                <p class="text-sm text-indigo-600 dark:text-indigo-400 mt-1 italic">${a.contoh}</p>
            </div>
        `).join('');
    }

    if (tabelEl) {
        const rows = (data.tabel || []).map((t, i) => {
            const bgRow = i % 2 === 0 ? 'bg-white dark:bg-slate-800' : 'bg-gray-50/70 dark:bg-slate-800/70';
            return `
                <tr class="${bgRow} hover:bg-indigo-50/70 dark:hover:bg-indigo-900/20 transition-colors duration-150">
                    <td class="px-4 py-2.5 font-semibold text-gray-800 dark:text-gray-100">${t.ditulis}</td>
                    <td class="px-4 py-2.5 text-gray-600 dark:text-gray-300">${t.kardinal}</td>
                    <td class="px-4 py-2.5 text-indigo-600 dark:text-indigo-400 font-medium">${t.ordinal}</td>
                    <td class="px-4 py-2.5 text-emerald-600 dark:text-emerald-400 italic">${t.am_bentuk}</td>
                </tr>
            `;
        }).join('');

        tabelEl.innerHTML = `
            <table class="w-full text-sm">
                <thead>
                    <tr class="bg-gradient-to-r from-rose-500 via-pink-500 to-fuchsia-500">
                        <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tl-lg">Tanggal</th>
                        <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Kardinalzahl</th>
                        <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider">Ordinalzahl</th>
                        <th class="text-left px-4 py-3.5 text-white font-semibold text-xs uppercase tracking-wider rounded-tr-lg">Bentuk „am“</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-gray-100 dark:divide-slate-700">
                    ${rows}
                </tbody>
            </table>
        `;
    }
}

// ===== RENDER PERTANYAAN & JAWABAN (Datum, Geburtstag, Geboren) =====
function renderPertanyaanJawaban(kategori) {
    const container = document.getElementById('pj-container');
    if (!container) return;

    if (!kategori || !kategori.length) {
        container.innerHTML = `<div class="text-center py-12 text-gray-400 dark:text-gray-500">😕 Tidak ada data</div>`;
        return;
    }

    let html = '';
    kategori.forEach(kat => {
        html += `
            <div class="bg-white dark:bg-slate-800 rounded-xl p-5 md:p-6 mb-4 shadow-sm border border-gray-200 dark:border-slate-700">
                <h3 class="text-lg font-semibold flex items-center gap-2 text-gray-800 dark:text-gray-100 mb-3 pb-3 border-b border-gray-200 dark:border-slate-700">
                    ${kat.icon || '📌'} ${kat.nama}
                </h3>
                <div class="grid grid-cols-1 gap-2.5">
        `;

        (kat.items || []).forEach(item => {
            const tingkatBadge = item.tingkat === 'formal'
                ? '<span class="inline-block px-2.5 py-0.5 rounded-full text-[0.6rem] font-semibold uppercase bg-blue-500 text-white">Formal</span>'
                : '<span class="inline-block px-2.5 py-0.5 rounded-full text-[0.6rem] font-semibold uppercase bg-emerald-500 text-white">Informal</span>';

            html += `
                <div class="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3.5 border border-gray-100 dark:border-slate-600 hover:translate-x-1 hover:shadow-md transition-all group">
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

// ===== RENDER AKTIVITAS DRINNEN & DRAUSSEN =====
function renderAktivitas(data) {
    const drinnenEl = document.getElementById('aktivitas-drinnen');
    const draussenEl = document.getElementById('aktivitas-draussen');
    if (!data) return;

    const cardHtml = a => `
        <div class="bg-gray-50 dark:bg-slate-700/50 rounded-lg p-3 text-center hover:shadow-md transition-all">
            <div class="text-2xl mb-1">${a.icon}</div>
            <p class="font-semibold text-gray-800 dark:text-gray-100 text-sm">${a.de}</p>
            <p class="text-xs text-gray-500 dark:text-gray-400">${a.id}</p>
        </div>
    `;

    if (drinnenEl) drinnenEl.innerHTML = (data.drinnen || []).map(cardHtml).join('');
    if (draussenEl) draussenEl.innerHTML = (data.draussen || []).map(cardHtml).join('');
}

// ===== RENDER MINI DIALOG (reusable untuk pesta & freizeit) =====
function renderDialog(dialog, titleId, keteranganId, containerId) {
    const titleEl = document.getElementById(titleId);
    const keteranganEl = document.getElementById(keteranganId);
    const container = document.getElementById(containerId);
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
                <span class="shrink-0 w-8 h-8 rounded-full ${isA ? 'bg-indigo-500' : 'bg-pink-500'} text-white grid place-items-center font-bold text-sm">${(t.nama || t.s).charAt(0)}</span>
                <div class="${isA ? 'bg-indigo-50 dark:bg-indigo-950/30 rounded-tl-none' : 'bg-pink-50 dark:bg-pink-950/30 rounded-tr-none'} rounded-lg p-3 flex-1">
                    <p class="text-xs font-semibold text-gray-400 dark:text-gray-500 mb-0.5">${t.nama || t.s}</p>
                    <p class="font-medium text-gray-800 dark:text-gray-100">${t.de}</p>
                    <p class="text-xs text-gray-500 dark:text-gray-400">${t.id}</p>
                </div>
            </div>
        `;
    }).join('');
}
