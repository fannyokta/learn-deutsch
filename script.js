// ===== LOAD DATA DARI JSON =====
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        renderNegara(data.negara);
        renderArtikel(data.artikel);
        renderKasus();
        renderPronomen();
        renderEndungen();
        renderSein();
    })
    .catch(err => {
        document.querySelector('.container').innerHTML = `
            <h1>⚠️ Gagal load data</h1>
            <p>Pastikan file <code>data.json</code> ada dan isinya valid.</p>
            <p style="color:#e53e3e;">Error: ${err.message}</p>
        `;
    });

// ===== RENDER NEGARA =====
function renderNegara(data) {
    const badge = {
        'ASEAN': 'badge-asean',
        'EROPA': 'badge-eropa',
        'LAINNYA': 'badge-lain'
    };
    let html = `<table><thead><tr>
        <th>Wilayah</th><th>Negara (Jerman)</th><th>Bahasa (Jerman)</th>
        <th>Artikel</th><th>Negara (Indonesia)</th><th>Bahasa (Indonesia)</th>
    </tr></thead><tbody>`;
    data.forEach(d => {
        html += `<tr>
            <td><span class="badge ${badge[d.wilayah] || ''}">${d.wilayah}</span></td>
            <td>${d.negara_jerman}</td>
            <td>${d.bahasa_jerman}</td>
            <td>${d.artikel}</td>
            <td>${d.negara_indonesia}</td>
            <td>${d.bahasa_indonesia}</td>
        </tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('negara-table').innerHTML = html;
}

// ===== RENDER ARTIKEL =====
function renderArtikel(data) {
    const badgeKategori = {
        'Orang': 'badge-orang',
        'Tempat': 'badge-tempat',
        'Benda': 'badge-benda',
        'Abstrak': 'badge-abstrak'
    };
    let html = `<table><thead><tr>
        <th>Kata (Jerman)</th><th>Arti</th><th>Der</th><th>Die</th>
        <th>Das</th><th>Plural</th><th>Kategori</th>
    </tr></thead><tbody>`;
    data.forEach(d => {
        html += `<tr>
            <td>${d.kata}</td>
            <td>${d.arti}</td>
            <td>${d.der ? '✔' : ''}</td>
            <td>${d.die ? '✔' : ''}</td>
            <td>${d.das ? '✔' : ''}</td>
            <td>${d.plural}</td>
            <td><span class="badge ${badgeKategori[d.kategori] || ''}">${d.kategori}</span></td>
        </tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('artikel-table').innerHTML = html;
}

// ===== RENDER KASUS =====
function renderKasus() {
    const data = [
        ['Nominativ', 'der', 'die', 'das', 'die'],
        ['Genitiv', 'des', 'der', 'des', 'der'],
        ['Dativ', 'dem', 'der', 'dem', 'den (+n)'],
        ['Akkusativ', 'den', 'die', 'das', 'die']
    ];
    let html = `<table><thead><tr>
        <th>Kasus</th><th>Maskulin</th><th>Feminin</th><th>Netral</th><th>Plural</th>
    </tr></thead><tbody>`;
    data.forEach(d => {
        html += `<tr><td><strong>${d[0]}</strong></td><td>${d[1]}</td><td>${d[2]}</td><td>${d[3]}</td><td>${d[4]}</td></tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('kasus-table').innerHTML = html;
}

// ===== RENDER PRONOMEN =====
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
    let html = `<table><thead><tr>
        <th>Nominativ</th><th>Genitiv</th><th>Dativ</th><th>Akkusativ</th>
    </tr></thead><tbody>`;
    data.forEach(d => {
        html += `<tr><td><strong>${d[0]}</strong></td><td>${d[1]}</td><td>${d[2]}</td><td>${d[3]}</td></tr>`;
    });
    html += `</tbody></table>`;
    document.getElementById('pronomen-table').innerHTML = html;
}

// ===== RENDER ENDUNGEN =====
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
    document.getElementById('endungen-table').innerHTML = html;
}

// ===== RENDER SEIN =====
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
    document.getElementById('sein-table').innerHTML = html;
}

// ===== TAB SWITCH =====
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        this.classList.add('active');
        document.getElementById(this.dataset.tab).classList.add('active');
    });
});