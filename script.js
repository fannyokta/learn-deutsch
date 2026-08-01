// ============================================================
//  DATA LENGKAP
// ============================================================
const DATA = {
  negara: [
    { wilayah: "ASEAN", negara_jerman: "Indonesien", bahasa_jerman: "Indonesisch", artikel: "", negara_indonesia: "Indonesia", bahasa_indonesia: "Bahasa Indonesia" },
    { wilayah: "ASEAN", negara_jerman: "Malaysia", bahasa_jerman: "Malaysisch / Malaiisch", artikel: "", negara_indonesia: "Malaysia", bahasa_indonesia: "Bahasa Melayu" },
    { wilayah: "ASEAN", negara_jerman: "Singapur", bahasa_jerman: "Englisch, Chinesisch, Malaiisch, Tamil", artikel: "", negara_indonesia: "Singapura", bahasa_indonesia: "Inggris, Mandarin, Melayu, Tamil" },
    { wilayah: "ASEAN", negara_jerman: "Thailand", bahasa_jerman: "Thailändisch", artikel: "", negara_indonesia: "Thailand", bahasa_indonesia: "Bahasa Thai" },
    { wilayah: "ASEAN", negara_jerman: "Philippinen", bahasa_jerman: "Tagalog / Filipino", artikel: "die (Pl.)", negara_indonesia: "Filipina", bahasa_indonesia: "Tagalog / Filipino" },
    { wilayah: "ASEAN", negara_jerman: "Vietnam", bahasa_jerman: "Vietnamesisch", artikel: "", negara_indonesia: "Vietnam", bahasa_indonesia: "Bahasa Vietnam" },
    { wilayah: "ASEAN", negara_jerman: "Brunei", bahasa_jerman: "Malaiisch", artikel: "", negara_indonesia: "Brunei", bahasa_indonesia: "Bahasa Melayu" },
    { wilayah: "ASEAN", negara_jerman: "Kambodscha", bahasa_jerman: "Khmer", artikel: "", negara_indonesia: "Kamboja", bahasa_indonesia: "Bahasa Khmer" },
    { wilayah: "ASEAN", negara_jerman: "Laos", bahasa_jerman: "Laotisch", artikel: "", negara_indonesia: "Laos", bahasa_indonesia: "Bahasa Laos" },
    { wilayah: "ASEAN", negara_jerman: "Myanmar", bahasa_jerman: "Birmanisch / Burmesisch", artikel: "", negara_indonesia: "Myanmar", bahasa_indonesia: "Bahasa Myanmar" },
    { wilayah: "ASEAN", negara_jerman: "Osttimor", bahasa_jerman: "Tetum, Portugiesisch", artikel: "", negara_indonesia: "Timor Leste", bahasa_indonesia: "Tetum, Portugis" },
    { wilayah: "EROPA", negara_jerman: "Deutschland", bahasa_jerman: "Deutsch", artikel: "", negara_indonesia: "Jerman", bahasa_indonesia: "Bahasa Jerman" },
    { wilayah: "EROPA", negara_jerman: "Frankreich", bahasa_jerman: "Französisch", artikel: "", negara_indonesia: "Prancis", bahasa_indonesia: "Bahasa Prancis" },
    { wilayah: "EROPA", negara_jerman: "Italien", bahasa_jerman: "Italienisch", artikel: "", negara_indonesia: "Italia", bahasa_indonesia: "Bahasa Italia" },
    { wilayah: "EROPA", negara_jerman: "Spanien", bahasa_jerman: "Spanisch", artikel: "", negara_indonesia: "Spanyol", bahasa_indonesia: "Bahasa Spanyol" },
    { wilayah: "EROPA", negara_jerman: "Österreich", bahasa_jerman: "Deutsch", artikel: "", negara_indonesia: "Austria", bahasa_indonesia: "Bahasa Jerman" },
    { wilayah: "EROPA", negara_jerman: "Schweiz", bahasa_jerman: "Deutsch, Französisch, Italienisch, Rätoromanisch", artikel: "die", negara_indonesia: "Swiss", bahasa_indonesia: "Jerman, Prancis, Italia, Romansh" },
    { wilayah: "EROPA", negara_jerman: "Niederlande", bahasa_jerman: "Niederländisch", artikel: "die (Pl.)", negara_indonesia: "Belanda", bahasa_indonesia: "Bahasa Belanda" },
    { wilayah: "EROPA", negara_jerman: "Belgien", bahasa_jerman: "Niederländisch, Französisch, Deutsch", artikel: "", negara_indonesia: "Belgia", bahasa_indonesia: "Belanda, Prancis, Jerman" },
    { wilayah: "EROPA", negara_jerman: "Polen", bahasa_jerman: "Polnisch", artikel: "", negara_indonesia: "Polandia", bahasa_indonesia: "Bahasa Polandia" },
    { wilayah: "EROPA", negara_jerman: "Schweden", bahasa_jerman: "Schwedisch", artikel: "", negara_indonesia: "Swedia", bahasa_indonesia: "Bahasa Swedia" },
    { wilayah: "EROPA", negara_jerman: "Norwegen", bahasa_jerman: "Norwegisch", artikel: "", negara_indonesia: "Norwegia", bahasa_indonesia: "Bahasa Norwegia" },
    { wilayah: "EROPA", negara_jerman: "Dänemark", bahasa_jerman: "Dänisch", artikel: "", negara_indonesia: "Denmark", bahasa_indonesia: "Bahasa Denmark" },
    { wilayah: "EROPA", negara_jerman: "Portugal", bahasa_jerman: "Portugiesisch", artikel: "", negara_indonesia: "Portugal", bahasa_indonesia: "Bahasa Portugis" },
    { wilayah: "EROPA", negara_jerman: "Griechenland", bahasa_jerman: "Griechisch", artikel: "", negara_indonesia: "Yunani", bahasa_indonesia: "Bahasa Yunani" },
    { wilayah: "EROPA", negara_jerman: "Ukraine", bahasa_jerman: "Ukrainisch", artikel: "die", negara_indonesia: "Ukraina", bahasa_indonesia: "Bahasa Ukraina" },
    { wilayah: "EROPA", negara_jerman: "Rumänien", bahasa_jerman: "Rumänisch", artikel: "", negara_indonesia: "Rumania", bahasa_indonesia: "Bahasa Rumania" },
    { wilayah: "EROPA", negara_jerman: "Türkei", bahasa_jerman: "Türkisch", artikel: "die", negara_indonesia: "Turki", bahasa_indonesia: "Bahasa Turki" },
    { wilayah: "LAINNYA", negara_jerman: "Vereinigtes Königreich", bahasa_jerman: "Englisch", artikel: "", negara_indonesia: "Britania Raya", bahasa_indonesia: "Bahasa Inggris" },
    { wilayah: "LAINNYA", negara_jerman: "Vereinigte Staaten von Amerika", bahasa_jerman: "Englisch", artikel: "die (Pl.)", negara_indonesia: "Amerika Serikat", bahasa_indonesia: "Bahasa Inggris" },
    { wilayah: "LAINNYA", negara_jerman: "Japan", bahasa_jerman: "Japanisch", artikel: "", negara_indonesia: "Jepang", bahasa_indonesia: "Bahasa Jepang" },
    { wilayah: "LAINNYA", negara_jerman: "China", bahasa_jerman: "Chinesisch", artikel: "", negara_indonesia: "Tiongkok", bahasa_indonesia: "Bahasa Mandarin" }
  ],
  artikel: [
    { kata: "Name", arti: "Nama", der: true, die: false, das: false, plural: "die Namen", kategori: "Orang" },
    { kata: "Vorname", arti: "Nama Depan", der: true, die: false, das: false, plural: "die Vornamen", kategori: "Orang" },
    { kata: "Nachname", arti: "Nama Belakang", der: true, die: false, das: false, plural: "die Nachnamen", kategori: "Orang" },
    { kata: "Stadt", arti: "Kota", der: false, die: true, das: false, plural: "Städte", kategori: "Tempat" },
    { kata: "E-Mail-Adresse", arti: "Alamat Email", der: false, die: true, das: false, plural: "E-Mail-Adressen", kategori: "Benda" },
    { kata: "Handynummer", arti: "Nomor HP", der: false, die: true, das: false, plural: "Handynummern", kategori: "Benda" },
    { kata: "Telefonnummer", arti: "Nomor Telepon", der: false, die: true, das: false, plural: "Telefonnummern", kategori: "Benda" },
    { kata: "Zahl", arti: "Angka", der: false, die: true, das: false, plural: "Zahlen", kategori: "Abstrak" },
    { kata: "Antwort", arti: "Jawaban", der: false, die: true, das: false, plural: "Antworten", kategori: "Abstrak" },
    { kata: "Partner", arti: "Pasangan (lk)", der: true, die: false, das: false, plural: "Partner", kategori: "Orang" },
    { kata: "Partnerin", arti: "Pasangan (pr)", der: false, die: true, das: false, plural: "Partnerinnen", kategori: "Orang" },
    { kata: "Person", arti: "Orang", der: false, die: true, das: false, plural: "Personen", kategori: "Orang" },
    { kata: "Text", arti: "Teks", der: true, die: false, das: false, plural: "Texte", kategori: "Benda" },
    { kata: "Wort", arti: "Kata", der: false, die: false, das: true, plural: "Wörter", kategori: "Abstrak" },
    { kata: "Autobahn", arti: "Jalan Tol", der: false, die: true, das: false, plural: "Autobahnen", kategori: "Tempat" },
    { kata: "Flasche", arti: "Botol", der: false, die: true, das: false, plural: "Flaschen", kategori: "Benda" },
    { kata: "Kindergarten", arti: "Taman Anak-anak", der: true, die: false, das: false, plural: "Kindergärten", kategori: "Tempat" },
    { kata: "Koffer", arti: "Koper", der: true, die: false, das: false, plural: "Koffer", kategori: "Benda" }
  ]
};

// ============================================================
//  RENDER FUNCTIONS
// ============================================================
function renderNegara(data) {
    const badgeMap = { ASEAN: 'badge-asean', EROPA: 'badge-eropa', LAINNYA: 'badge-lain' };
    let html = `<table><thead><tr>
        <th>Wilayah</th><th>Negara (Jerman)</th><th>Bahasa (Jerman)</th>
        <th>Artikel</th><th>Negara (Indonesia)</th><th>Bahasa (Indonesia)</th>
    </tr></thead><tbody>`;
    if (data.length === 0) {
        html += `<tr><td colspan="6" class="no-result">😕 Tidak ada hasil yang cocok</td></tr>`;
    } else {
        data.forEach(d => {
            html += `<tr>
                <td><span class="badge ${badgeMap[d.wilayah] || ''}">${d.wilayah}</span></td>
                <td>${d.negara_jerman}</td>
                <td>${d.bahasa_jerman}</td>
                <td>${d.artikel}</td>
                <td>${d.negara_indonesia}</td>
                <td>${d.bahasa_indonesia}</td>
            </tr>`;
        });
    }
    html += `</tbody></table>`;
    const container = document.getElementById('negara-table');
    if (container) container.innerHTML = html;
}

function renderArtikel(data) {
    const badgeMap = { Orang: 'badge-orang', Tempat: 'badge-tempat', Benda: 'badge-benda', Abstrak: 'badge-abstrak' };
    let html = `<table><thead><tr>
        <th>Kata (Jerman)</th><th>Arti</th><th>Der</th><th>Die</th><th>Das</th><th>Plural</th><th>Kategori</th>
    </tr></thead><tbody>`;
    if (data.length === 0) {
        html += `<tr><td colspan="7" class="no-result">😕 Tidak ada hasil yang cocok</td></tr>`;
    } else {
        data.forEach(d => {
            html += `<tr>
                <td><strong>${d.kata}</strong></td>
                <td>${d.arti}</td>
                <td>${d.der ? '✔' : ''}</td>
                <td>${d.die ? '✔' : ''}</td>
                <td>${d.das ? '✔' : ''}</td>
                <td>${d.plural}</td>
                <td><span class="badge ${badgeMap[d.kategori] || ''}">${d.kategori}</span></td>
            </tr>`;
        });
    }
    html += `</tbody></table>`;
    const container = document.getElementById('artikel-table');
    if (container) container.innerHTML = html;
}

function renderKasus() {
    const data = [
        ['Nominativ', 'der', 'die', 'das', 'die'],
        ['Genitiv', 'des', 'der', 'des', 'der'],
        ['Dativ', 'dem', 'der', 'dem', 'den (+n)'],
        ['Akkusativ', 'den', 'die', 'das', 'die']
    ];
    let html = `<table><thead><tr><th>Kasus</th><th>Maskulin</th><th>Feminin</th><th>Netral</th><th>Plural</th></tr></thead><tbody>`;
    data.forEach(d => {
        html += `<tr><td><strong>${d[0]}</strong></td><td>${d[1]}</td><td>${d[2]}</td><td>${d[3]}</td><td>${d[4]}</td></tr>`;
    });
    html += `</tbody></table>`;
    const container = document.getElementById('kasus-table');
    if (container) container.innerHTML = html;
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
//  SEARCH & FILTER FUNCTIONS
// ============================================================
function filterNegara(query) {
    const q = query.toLowerCase().trim();
    const filtered = DATA.negara.filter(d => 
        Object.values(d).join(' ').toLowerCase().includes(q)
    );
    renderNegara(filtered);
}

function filterKosakata(query, kategori) {
    const q = query.toLowerCase().trim();
    let filtered = DATA.artikel;
    if (kategori !== 'all') {
        filtered = filtered.filter(d => d.kategori === kategori);
    }
    if (q) {
        filtered = filtered.filter(d => 
            d.kata.toLowerCase().includes(q) || 
            d.arti.toLowerCase().includes(q)
        );
    }
    renderArtikel(filtered);
}

// ============================================================
//  STATS
// ============================================================
function updateStats() {
    const totalNegara = document.getElementById('totalNegara');
    const totalKata = document.getElementById('totalKata');
    if (totalNegara) totalNegara.textContent = DATA.negara.length;
    if (totalKata) totalKata.textContent = DATA.artikel.length;
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