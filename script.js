// ============================================================
//  LOAD FUNCTIONS
// ============================================================

async function loadNegara() {
    const statusEl = document.getElementById('dataStatus');
    const tableEl = document.getElementById('negara-table');
    try {
        const res = await fetch('data/negara.json');
        if (!res.ok) throw new Error('negara.json tidak ditemukan');
        const data = await res.json();
        const list = data.negara || [];
        if (statusEl) statusEl.innerHTML = `<span class="status-badge success">✅ ${list.length} negara dimuat</span>`;
        renderNegara(list);
        setupSearchNegara(list);
    } catch (err) {
        if (statusEl) statusEl.innerHTML = `<span class="status-badge error">❌ ${err.message}</span>`;
        if (tableEl) tableEl.innerHTML = `<div class="error-placeholder"><i class="fas fa-exclamation-circle"></i><p>Gagal memuat data negara.</p></div>`;
    }
}

async function loadKosakata() {
    const statusEl = document.getElementById('dataStatus');
    const tableEl = document.getElementById('artikel-table');
    try {
        const res = await fetch('data/kosakata.json');
        if (!res.ok) throw new Error('kosakata.json tidak ditemukan');
        const data = await res.json();
        const list = data.kata_benda || [];
        if (statusEl) statusEl.innerHTML = `<span class="status-badge success">✅ ${list.length} kata dimuat</span>`;
        renderArtikel(list);
        setupKosakata(list);
    } catch (err) {
        if (statusEl) statusEl.innerHTML = `<span class="status-badge error">❌ ${err.message}</span>`;
        if (tableEl) tableEl.innerHTML = `<div class="error-placeholder"><i class="fas fa-exclamation-circle"></i><p>Gagal memuat data kosakata.</p></div>`;
    }
}

async function loadTataBahasa() {
    const statusEl = document.getElementById('dataStatus');
    const cardsEl = document.getElementById('kasus-cards');
    const tableEl = document.getElementById('kasus-table');
    try {
        const res = await fetch('data/tata-bahasa.json');
        if (!res.ok) throw new Error('tata-bahasa.json tidak ditemukan');
        const data = await res.json();
        const kasus = data.kasus || [];
        const artikel = data.artikel_per_kasus || [];
        if (statusEl) statusEl.innerHTML = `<span class="status-badge success">✅ ${kasus.length} kasus dimuat</span>`;
        renderKasusCards(kasus);
        renderKasusTable(artikel);
    } catch (err) {
        if (statusEl) statusEl.innerHTML = `<span class="status-badge error">❌ ${err.message}</span>`;
        if (cardsEl) cardsEl.innerHTML = `<div class="error-placeholder"><i class="fas fa-exclamation-circle"></i><p>Gagal memuat data tata bahasa.</p></div>`;
    }
}

async function loadAllData() {
    try {
        const [resNegara, resKosakata, resTata] = await Promise.all([
            fetch('data/negara.json'),
            fetch('data/kosakata.json'),
            fetch('data/tata-bahasa.json')
        ]);
        const dataNegara = await resNegara.json();
        const dataKosakata = await resKosakata.json();
        const dataTata = await resTata.json();
        const negara = dataNegara.negara || [];
        const kosakata = dataKosakata.kata_benda || [];
        const kasus = dataTata.kasus || [];
        document.getElementById('totalNegara').textContent = negara.length;
        document.getElementById('totalKata').textContent = kosakata.length;
        document.getElementById('totalKasus').textContent = kasus.length;
    } catch (err) {
        console.warn('Gagal load data untuk home:', err);
    }
}

// ============================================================
//  RENDER FUNCTIONS
// ============================================================

function renderNegara(data) {
    const badgeMap = { ASEAN: 'badge-asean', EROPA: 'badge-eropa', LAINNYA: 'badge-lain' };
    let html = `<table><thead><tr><th>Wilayah</th><th>Negara (Jerman)</th><th>Bahasa (Jerman)</th><th>Artikel</th><th>Negara (Indonesia)</th><th>Bahasa (Indonesia)</th></tr></thead><tbody>`;
    if (!data || data.length === 0) {
        html += `<tr><td colspan="6" class="no-result">😕 Tidak ada data negara</td></tr>`;
    } else {
        data.forEach(d => {
            html += `<tr><td><span class="badge ${badgeMap[d.wilayah] || ''}">${d.wilayah}</span></td><td>${d.negara_jerman}</td><td>${d.bahasa_jerman}</td><td>${d.artikel || ''}</td><td>${d.negara_indonesia}</td><td>${d.bahasa_indonesia}</td></tr>`;
        });
    }
    html += `</tbody></table>`;
    const container = document.getElementById('negara-table');
    if (container) container.innerHTML = html;
}

function renderArtikel(data) {
    const badgeMap = { Orang: 'badge-orang', Tempat: 'badge-tempat', Benda: 'badge-benda', Abstrak: 'badge-abstrak' };
    let html = `<table><thead><tr><th>Kata (Jerman)</th><th>Arti</th><th>Der</th><th>Die</th><th>Das</th><th>Plural</th><th>Kategori</th></tr></thead><tbody>`;
    if (!data || data.length === 0) {
        html += `<tr><td colspan="7" class="no-result">😕 Tidak ada data kosakata</td></tr>`;
    } else {
        data.forEach(d => {
            html += `<tr><td><strong>${d.kata}</strong></td><td>${d.arti}</td><td>${d.der ? '✔' : ''}</td><td>${d.die ? '✔' : ''}</td><td>${d.das ? '✔' : ''}</td><td>${d.plural}</td><td><span class="badge ${badgeMap[d.kategori] || ''}">${d.kategori}</span></td></tr>`;
        });
    }
    html += `</tbody></table>`;
    const container = document.getElementById('artikel-table');
    if (container) container.innerHTML = html;
}

function renderKasusCards(data) {
    const container = document.getElementById('kasus-cards');
    if (!container) return;
    if (!data || data.length === 0) {
        container.innerHTML = `<div class="no-result">😕 Tidak ada data kasus</div>`;
        return;
    }
    let html = '';
    data.forEach(k => {
        html += `<div class="card-glass kasus-card">
            <div class="kasus-icon">${k.icon || '📌'}</div>
            <h4>${k.nama}</h4>
            <p><strong>Fungsi:</strong> ${k.fungsi}</p>
            <p><strong>Tanya:</strong> <em>${k.tanya}</em></p>
            <div class="kasus-example">“<strong>${k.contoh_highlight || k.contoh}</strong>”</div>
            <small style="display:block;margin-top:4px;color:var(--text-muted);font-size:0.75rem;">${k.contoh}</small>
        </div>`;
    });
    container.innerHTML = html;
}

function renderKasusTable(data) {
    const container = document.getElementById('kasus-table');
    if (!container) return;
    if (!data || data.length === 0) {
        container.innerHTML = `<div class="no-result">😕 Tidak ada data artikel per kasus</div>`;
        return;
    }
    let html = `<table><thead><tr><th>Kasus</th><th>Maskulin</th><th>Feminin</th><th>Netral</th><th>Plural</th></tr></thead><tbody>`;
    data.forEach(d => {
        html += `<tr><td><strong>${d.kasus}</strong></td><td>${d.maskulin}</td><td>${d.feminin}</td><td>${d.netral}</td><td>${d.plural}</td></tr>`;
    });
    html += `</tbody></table>`;
    container.innerHTML = html;
}

function renderPronomen() {
    const data = [
        ['ich (saya)', 'meiner', 'mir', 'mich'],
        ['du (kamu)', 'deiner', 'dir', 'dich'],
        ['er (dia lk)', 'seiner', 'ihm', 'ihn'],
        ['sie (dia pr)', 'ihrer', 'ihr', 'sie'],
        ['es (dia netral)', 'seiner', 'ihm', 'es'],
        ['wir (kami)', 'unser', 'uns', 'uns'],
        ['ihr (kalian)', 'euer', 'euch', 'euch'],
        ['sie (mereka)', 'ihrer', 'ihnen', 'sie'],
        ['Sie (Anda formal)', 'Ihrer', 'Ihnen', 'Sie']
    ];
    let html = `<table><thead><tr><th>Nominativ</th><th>Genitiv</th><th>Dativ</th><th>Akkusativ</th></tr></thead><tbody>`;
    data.forEach(d => {
        html += `<tr><td><strong>${d[0]}</strong></td><td>${d[1]}</td><td>${d[2]}</td><td>${d[3]}</td></tr>`;
    });
    html += `</tbody></table>`;
    const container = document.getElementById('pronomen-table');
    if (container) container.innerHTML = html;
}

function renderEndungen() {
    const data = [
        ['ich', '-e', 'ich mache'],
        ['du', '-st', 'du machst'],
        ['er/sie/es', '-t', 'er macht'],
        ['wir', '-en', 'wir machen'],
        ['ihr', '-t', 'ihr macht'],
        ['sie/Sie', '-en', 'sie machen']
    ];
    let html = `<table><thead><tr><th>Pronomen</th><th>Endung</th><th>Contoh</th></tr></thead><tbody>`;
    data.forEach(d => {
        html += `<tr><td>${d[0]}</td><td>${d[1]}</td><td>${d[2]}</td></tr>`;
    });
    html += `</tbody></table>`;
    const container = document.getElementById('endungen-table');
    if (container) container.innerHTML = html;
}

function renderSein() {
    const data = [
        ['ich', 'bin'],
        ['du', 'bist'],
        ['er/sie/es', 'ist'],
        ['wir', 'sind'],
        ['ihr', 'seid'],
        ['sie/Sie', 'sind']
    ];
    let html = `<table><thead><tr><th>Pronomen</th><th>sein</th></tr></thead><tbody>`;
    data.forEach(d => {
        html += `<tr><td>${d[0]}</td><td><strong>${d[1]}</strong></td></tr>`;
    });
    html += `</tbody></table>`;
    const container = document.getElementById('sein-table');
    if (container) container.innerHTML = html;
}

// ============================================================
//  SEARCH & FILTER
// ============================================================

function setupSearchNegara(list) {
    const input = document.getElementById('searchNegara');
    const clear = document.getElementById('clearNegara');
    if (!input) return;
    input.addEventListener('input', function() {
        clear.classList.toggle('visible', this.value.length > 0);
        const q = this.value.toLowerCase().trim();
        const filtered = list.filter(d => Object.values(d).join(' ').toLowerCase().includes(q));
        renderNegara(filtered);
    });
    if (clear) {
        clear.addEventListener('click', function() {
            input.value = '';
            this.classList.remove('visible');
            renderNegara(list);
            input.focus();
        });
    }
}

function setupKosakata(list) {
    const input = document.getElementById('searchKosakata');
    const clear = document.getElementById('clearKosakata');
    let currentFilter = 'all';
    
    // Filter buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            currentFilter = this.dataset.filter;
            applyFilterAndSearch(list, input.value, currentFilter);
        });
    });
    
    if (input) {
        input.addEventListener('input', function() {
            clear.classList.toggle('visible', this.value.length > 0);
            applyFilterAndSearch(list, this.value, currentFilter);
        });
    }
    if (clear) {
        clear.addEventListener('click', function() {
            input.value = '';
            this.classList.remove('visible');
            applyFilterAndSearch(list, '', currentFilter);
            input.focus();
        });
    }
}

function applyFilterAndSearch(list, query, kategori) {
    const q = query.toLowerCase().trim();
    let filtered = list;
    if (kategori !== 'all') {
        filtered = filtered.filter(d => d.kategori === kategori);
    }
    if (q) {
        filtered = filtered.filter(d => d.kata.toLowerCase().includes(q) || d.arti.toLowerCase().includes(q));
    }
    renderArtikel(filtered);
}

// ============================================================
//  DARK MODE
// ============================================================

function toggleDark() {
    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    document.documentElement.setAttribute('data-theme', isDark ? 'light' : 'dark');
    const icon = document.getElementById('darkIcon');
    const label = document.getElementById('darkLabel');
    if (icon) icon.className = isDark ? 'fas fa-moon' : 'fas fa-sun';
    if (label) label.textContent = isDark ? 'Gelap' : 'Terang';
    localStorage.setItem('theme', isDark ? 'light' : 'dark');
}

function loadTheme() {
    const saved = localStorage.getItem('theme') || 'light';
    document.documentElement.setAttribute('data-theme', saved);
    const icon = document.getElementById('darkIcon');
    const label = document.getElementById('darkLabel');
    if (icon) icon.className = saved === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
    if (label) label.textContent = saved === 'dark' ? 'Terang' : 'Gelap';
}

// ============================================================
//  DATA PELAJARAN (LOAD DARI JSON)
// ============================================================
let DATA_PELAJARAN = [];

async function loadPelajaran() {
    const statusEl = document.getElementById('dataStatus');
    const container = document.getElementById('pelajaran-container');
    const filterBar = document.getElementById('filterBar');
    
    try {
        const res = await fetch('data/pelajaran.json');
        if (!res.ok) throw new Error('pelajaran.json tidak ditemukan');
        const data = await res.json();
        DATA_PELAJARAN = data.kategori || [];
        
        if (statusEl) {
            statusEl.innerHTML = `<span class="status-badge success">✅ ${DATA_PELAJARAN.length} kategori dimuat</span>`;
        }
        
        // Buat filter buttons
        renderFilterButtons(DATA_PELAJARAN);
        
        // Render semua
        renderPelajaran(DATA_PELAJARAN);
        
        // Setup search
        setupPelajaranSearch(DATA_PELAJARAN);
        
    } catch (err) {
        console.error('Gagal load pelajaran:', err);
        if (statusEl) {
            statusEl.innerHTML = `<span class="status-badge error">❌ ${err.message}</span>`;
        }
        if (container) {
            container.innerHTML = `
                <div class="error-placeholder">
                    <i class="fas fa-exclamation-circle"></i>
                    <p>Gagal memuat data pelajaran.</p>
                    <small>Pastikan file <code>data/pelajaran.json</code> ada dan valid.</small>
                </div>
            `;
        }
    }
}

function renderFilterButtons(kategori) {
    const filterBar = document.getElementById('filterBar');
    if (!filterBar) return;
    
    // Hapus semua kecuali tombol "Semua"
    filterBar.innerHTML = `<button class="filter-btn active" data-filter="all">📋 Semua</button>`;
    
    kategori.forEach(k => {
        const btn = document.createElement('button');
        btn.className = 'filter-btn';
        btn.dataset.filter = k.nama;
        btn.textContent = `${k.icon || '📌'} ${k.nama}`;
        filterBar.appendChild(btn);
    });
    
    // Event listener untuk filter
    filterBar.querySelectorAll('.filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            filterBar.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            const filter = this.dataset.filter;
            const searchInput = document.getElementById('searchPelajaran');
            applyPelajaranFilter(DATA_PELAJARAN, filter, searchInput ? searchInput.value : '');
        });
    });
}

function renderPelajaran(kategori, filter = 'all', query = '') {
    const container = document.getElementById('pelajaran-container');
    if (!container) return;
    
    let filteredKategori = kategori;
    
    // Filter by kategori
    if (filter !== 'all') {
        filteredKategori = filteredKategori.filter(k => k.nama === filter);
    }
    
    // Filter by search query
    const q = query.toLowerCase().trim();
    if (q) {
        filteredKategori = filteredKategori.map(k => {
            const items = k.items.filter(item => 
                item.pertanyaan.toLowerCase().includes(q) ||
                item.jawaban.toLowerCase().includes(q) ||
                item.tingkat.toLowerCase().includes(q)
            );
            return { ...k, items };
        }).filter(k => k.items.length > 0);
    }
    
    if (!filteredKategori || filteredKategori.length === 0 || filteredKategori.every(k => k.items.length === 0)) {
        container.innerHTML = `<div class="no-result">😕 Tidak ada hasil yang cocok</div>`;
        return;
    }
    
    let html = '';
    filteredKategori.forEach(kat => {
        if (kat.items.length === 0) return;
        
        html += `
            <div class="pelajaran-kategori">
                <div class="kategori-header">
                    <h2>${kat.icon || '📌'} ${kat.nama}</h2>
                    <span class="kategori-count">${kat.items.length} pertanyaan</span>
                </div>
                <div class="kategori-items">
        `;
        
        kat.items.forEach(item => {
            const tingkatBadge = item.tingkat === 'formal' 
                ? '<span class="badge-formal">🔵 Formal</span>' 
                : '<span class="badge-informal">🟢 Informal</span>';
            
            html += `
                <div class="item-card card-glass">
                    <div class="item-header">
                        <span class="item-pertanyaan">${item.pertanyaan}</span>
                        ${tingkatBadge}
                    </div>
                    <div class="item-jawaban">
                        <i class="fas fa-arrow-right"></i>
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

function setupPelajaranSearch(kategori) {
    const input = document.getElementById('searchPelajaran');
    const clear = document.getElementById('clearPelajaran');
    if (!input) return;
    
    let currentFilter = 'all';
    
    // Ambil filter aktif
    document.querySelectorAll('#filterBar .filter-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            currentFilter = this.dataset.filter;
        });
    });
    
    input.addEventListener('input', function() {
        clear.classList.toggle('visible', this.value.length > 0);
        const filter = document.querySelector('#filterBar .filter-btn.active');
        const filterValue = filter ? filter.dataset.filter : 'all';
        renderPelajaran(kategori, filterValue, this.value);
    });
    
    if (clear) {
        clear.addEventListener('click', function() {
            input.value = '';
            this.classList.remove('visible');
            const filter = document.querySelector('#filterBar .filter-btn.active');
            const filterValue = filter ? filter.dataset.filter : 'all';
            renderPelajaran(kategori, filterValue, '');
            input.focus();
        });
    }
}

function applyPelajaranFilter(kategori, filter, query) {
    renderPelajaran(kategori, filter, query);
}