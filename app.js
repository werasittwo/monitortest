/**
 * ระบบติดตามตัวชี้วัด กพร. ประจำปีงบประมาณ พ.ศ. 2570
 * Main Frontend Application Logic
 */

const GOOGLE_SHEET_ID = '1Lro8WK25uexe97cFHHedqC5iu2B65VyfiQ2AWUXyIUw';
const GOOGLE_SHEET_EDIT_URL = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/edit?usp=sharing`;
const STORAGE_KEY_DATA = 'kpi_2570_dataset_v1';
const STORAGE_KEY_GAS_URL = 'kpi_2570_gas_webapp_url';

// ข้อมูลตัวอย่างเริ่มต้นตามโครงสร้างตัวชี้วัด กพร. ปี 2570 (ใช้กรณีเปิดครั้งแรกและใน Google Sheet ยังว่างอยู่)
const DEFAULT_KPI_DATA = [
  {
    id: 'KPI-2570-01',
    code: 'กพร.1.1',
    name: 'ร้อยละความสำเร็จของการดำเนินโครงการสำคัญตามแผนปฏิบัติราชการ ประจำปี พ.ศ. 2570',
    dimension: 'มิติที่ 1 ประสิทธิผลตามพันธกิจ',
    unit: 'ร้อยละ (%)',
    weight: 25,
    target: 100,
    actual: 94.5,
    polarity: 'higher',
    level1: 60,
    level2: 70,
    level3: 80,
    level4: 90,
    level5: 100,
    owner: 'กลุ่มยุทธศาสตร์และแผนงาน',
    evidenceUrl: 'https://docs.google.com/spreadsheets/d/1Lro8WK25uexe97cFHHedqC5iu2B65VyfiQ2AWUXyIUw/edit?usp=sharing',
    evidenceName: 'รายงานผลแผนปฏิบัติการ_Q3.pdf',
    note: 'ดำเนินการแล้วเสร็จ 18 จาก 19 กิจกรรมหลัก',
    updatedAt: '2026-10-20T10:30:00.000Z'
  },
  {
    id: 'KPI-2570-02',
    code: 'กพร.1.2',
    name: 'ร้อยละของประชาชนและผู้รับบริการที่เข้าถึงบริการดิจิทัลภาครัฐ (Digital Service Adoption)',
    dimension: 'มิติที่ 1 ประสิทธิผลตามพันธกิจ',
    unit: 'ร้อยละ (%)',
    weight: 15,
    target: 85,
    actual: 88.2,
    polarity: 'higher',
    level1: 65,
    level2: 70,
    level3: 75,
    level4: 80,
    level5: 85,
    owner: 'กลุ่มเทคโนโลยีดิจิทัลและสารสนเทศ',
    evidenceUrl: '',
    evidenceName: 'สถิติผู้ใช้งานระบบดิจิทัล_2570.xlsx',
    note: 'ทะลุเป้าหมายประจำปี 2570',
    updatedAt: '2026-10-20T11:15:00.000Z'
  },
  {
    id: 'KPI-2570-03',
    code: 'กพร.2.1',
    name: 'ระดับความพึงพอใจและความเชื่อมั่นของประชาชนต่อคุณภาพการให้บริการภาครัฐ',
    dimension: 'มิติที่ 2 คุณภาพการให้บริการ',
    unit: 'ร้อยละ (%)',
    weight: 15,
    target: 90,
    actual: 91.4,
    polarity: 'higher',
    level1: 70,
    level2: 75,
    level3: 80,
    level4: 85,
    level5: 90,
    owner: 'กลุ่มพัฒนาคุณภาพบริการประชาชน',
    evidenceUrl: '',
    evidenceName: 'ผลสำรวจความพึงพอใจ_2570.pdf',
    note: 'สำรวจจากกลุ่มตัวอย่าง 1,500 ราย',
    updatedAt: '2026-10-19T16:40:00.000Z'
  },
  {
    id: 'KPI-2570-04',
    code: 'กพร.2.2',
    name: 'ร้อยละของเรื่องร้องเรียนและข้อเสนอแนะที่ได้รับการแก้ไขแล้วเสร็จภายในระยะเวลาที่กำหนด (SLA)',
    dimension: 'มิติที่ 2 คุณภาพการให้บริการ',
    unit: 'ร้อยละ (%)',
    weight: 10,
    target: 95,
    actual: 86.0,
    polarity: 'higher',
    level1: 75,
    level2: 80,
    level3: 85,
    level4: 90,
    level5: 95,
    owner: 'ศูนย์รับเรื่องร้องเรียนและบริการเบ็ดเสร็จ',
    evidenceUrl: '',
    evidenceName: '',
    note: 'อยู่ระหว่างติดตามเร่งรัด 4 เรื่องคงค้าง',
    updatedAt: '2026-10-18T14:20:00.000Z'
  },
  {
    id: 'KPI-2570-05',
    code: 'กพร.3.1',
    name: 'ร้อยละการเบิกจ่ายงบประมาณรายจ่ายภาพรวมและงบลงทุน ประจำปีงบประมาณ พ.ศ. 2570',
    dimension: 'มิติที่ 3 ประสิทธิภาพของการปฏิบัติราชการ',
    unit: 'ร้อยละ (%)',
    weight: 15,
    target: 96,
    actual: 93.8,
    polarity: 'higher',
    level1: 80,
    level2: 84,
    level3: 88,
    level4: 92,
    level5: 96,
    owner: 'กลุ่มคลังและพัสดุ',
    evidenceUrl: '',
    evidenceName: 'รายงานการเบิกจ่าย_GFMIS.pdf',
    note: 'รอตรวจรับงวดสุดท้ายจำนวน 2 โครงการ',
    updatedAt: '2026-10-20T09:10:00.000Z'
  },
  {
    id: 'KPI-2570-06',
    code: 'กพร.3.2',
    name: 'จำนวนวันเฉลี่ยในการอนุมัติ/อนุญาตและให้บริการผ่านระบบอิเล็กทรอนิกส์ (ลดระยะเวลา)',
    dimension: 'มิติที่ 3 ประสิทธิภาพของการปฏิบัติราชการ',
    unit: 'วันทำการ',
    weight: 10,
    target: 3,
    actual: 3.2,
    polarity: 'lower',
    level1: 7,
    level2: 6,
    level3: 5,
    level4: 4,
    level5: 3,
    owner: 'กลุ่มพัฒนาระบบงานและลดขั้นตอน',
    evidenceUrl: '',
    evidenceName: '',
    note: 'ลดลงจากปีก่อนหน้า (เดิมเฉลี่ย 5.5 วัน)',
    updatedAt: '2026-10-17T15:00:00.000Z'
  },
  {
    id: 'KPI-2570-07',
    code: 'กพร.4.1',
    name: 'ระดับความสำเร็จของการพัฒนาองค์กรสู่ระบบราชการ 4.0 และธรรมาภิบาลข้อมูล (Data Governance)',
    dimension: 'มิติที่ 4 การพัฒนาองค์กร',
    unit: 'ร้อยละ (%)',
    weight: 10,
    target: 100,
    actual: 100,
    polarity: 'higher',
    level1: 60,
    level2: 70,
    level3: 80,
    level4: 90,
    level5: 100,
    owner: 'กลุ่มพัฒนาระบบบริหาร (กพร.)',
    evidenceUrl: '',
    evidenceName: 'ชุดหลักฐาน_PMQA4.0_2570.zip',
    note: 'ดำเนินการครบทั้ง 5 ขั้นตอนตามเกณฑ์ กพร.',
    updatedAt: '2026-10-20T13:00:00.000Z'
  }
];

// State
let kpiList = [];
let activeCategory = 'ALL';
let searchQuery = '';
let staffSearchQuery = '';
let gasWebAppUrl = localStorage.getItem(STORAGE_KEY_GAS_URL) || '';
let autoSlideInterval = null;

// ==========================================
// KPI CALCULATION ENGINE (เกณฑ์ กพร. 5 ระดับ)
// ==========================================

function calculateKpiMetrics(kpi) {
  const target = parseFloat(kpi.target) || 0;
  const actual = parseFloat(kpi.actual) || 0;
  const weight = parseFloat(kpi.weight) || 0;
  const polarity = kpi.polarity || 'higher'; // 'higher' = ยิ่งมากยิ่งดี, 'lower' = ยิ่งน้อยยิ่งดี

  const l1 = parseFloat(kpi.level1) || 0;
  const l2 = parseFloat(kpi.level2) || 0;
  const l3 = parseFloat(kpi.level3) || 0;
  const l4 = parseFloat(kpi.level4) || 0;
  const l5 = parseFloat(kpi.level5) || target;

  // คำนวณ % ความสำเร็จเทียบเป้าหมาย
  let progressPercent = 0;
  if (polarity === 'lower') {
    if (actual <= 0) {
      progressPercent = 0;
    } else if (actual <= target) {
      progressPercent = 100 + ((target - actual) / Math.max(target, 1)) * 20;
    } else {
      const span = Math.max(l1 - target, target, 1);
      progressPercent = Math.max(0, 100 - ((actual - target) / span) * 60);
    }
  } else {
    progressPercent = target > 0 ? (actual / target) * 100 : 0;
  }

  // คำนวณคะแนน กพร. ระดับ 1.0000 - 5.0000 (Linear Interpolation ตามช่วงเกณฑ์ 1-5)
  let score = 1.0;
  const thresholds = [l1, l2, l3, l4, l5];

  if (polarity === 'lower') {
    if (actual <= l5) {
      score = 5.0;
    } else if (actual >= l1) {
      score = 1.0;
    } else {
      for (let i = 0; i < 4; i++) {
        const highVal = thresholds[i];     // เช่น l1 = 7 วัน
        const lowVal = thresholds[i + 1];  // เช่น l2 = 6 วัน
        if (actual <= highVal && actual >= lowVal) {
          const ratio = (highVal - actual) / Math.max(highVal - lowVal, 0.0001);
          score = (i + 1) + ratio;
          break;
        }
      }
    }
  } else {
    if (actual >= l5) {
      score = 5.0;
    } else if (actual <= l1) {
      score = actual > 0 && l1 > 0 ? Math.max(0, (actual / l1) * 1.0) : 0;
    } else {
      for (let i = 0; i < 4; i++) {
        const lowVal = thresholds[i];
        const highVal = thresholds[i + 1];
        if (actual >= lowVal && actual <= highVal) {
          const ratio = (actual - lowVal) / Math.max(highVal - lowVal, 0.0001);
          score = (i + 1) + ratio;
          break;
        }
      }
    }
  }

  score = Math.min(5.0, Math.max(0, score));
  const weightedScore = (score * weight) / 100;

  // สถานะตัวชี้วัด
  let statusKey = 'ontrack';
  let statusText = 'กำลังดำเนินการ';
  if (score >= 4.5 || progressPercent >= 100) {
    statusKey = 'achieved';
    statusText = 'บรรลุเป้าหมาย';
  } else if (score >= 3.0 || progressPercent >= 80) {
    statusKey = 'ontrack';
    statusText = 'ตามแผน (On Track)';
  } else if (score >= 2.0 || progressPercent >= 60) {
    statusKey = 'warning';
    statusText = 'เฝ้าระวัง / เร่งรัด';
  } else {
    statusKey = 'critical';
    statusText = 'ต่ำกว่าเกณฑ์';
  }

  return {
    progressPercent: Math.round(progressPercent * 10) / 10,
     clampedPercent: Math.min(100, Math.max(0, progressPercent)),
    score: Number(score.toFixed(2)),
    weightedScore: Number(weightedScore.toFixed(4)),
    currentLevelInt: Math.min(5, Math.max(1, Math.floor(score))),
    statusKey,
    statusText
  };
}

// ==========================================
// GOOGLE SHEETS SYNC (JSONP READ + GAS WRITE)
// ==========================================

function updateSyncBadge(mode, text) {
  const badge = document.getElementById('syncStatusBadge');
  const label = document.getElementById('syncStatusText');
  if (!badge || !label) return;
  badge.className = 'sync-badge ' + mode;
  label.textContent = text;
}

// อ่านข้อมูลจาก Google Sheet โดยตรงด้วย JSONP (ไม่ต้องใช้ API Key และไม่ติด CORS)
function fetchFromGoogleSheetDirect() {
  return new Promise((resolve) => {
    updateSyncBadge('syncing', 'กำลังดึงข้อมูลจาก Google Sheet...');
    const callbackName = 'gvizCallback_' + Date.now();
    const script = document.createElement('script');
    const timeout = setTimeout(() => {
      cleanup();
      resolve(null);
    }, 6500);

    function cleanup() {
      clearTimeout(timeout);
      delete window[callbackName];
      if (script.parentNode) script.parentNode.removeChild(script);
    }

    window[callbackName] = function (response) {
      cleanup();
      try {
        if (!response || !response.table || !response.table.rows) {
          resolve([]);
          return;
        }
        const cols = response.table.cols.map(c => (c.label || '').trim());
        const rows = response.table.rows;
        const parsed = [];

        rows.forEach((r, idx) => {
          const cells = r.c || [];
          const getVal = (colIndex) => (cells[colIndex] && cells[colIndex].v !== null && cells[colIndex].v !== undefined) ? cells[colIndex].v : '';

          // ถ้าแถวแรกเป็น Header เพราะ Sheet ยังไม่มี label
          const firstCell = String(getVal(0)).trim();
          if (firstCell === 'id' && String(getVal(1)).trim() === 'code') return;
          if (!firstCell && !getVal(1) && !getVal(2)) return;

          const item = {
            id: String(getVal(0) || `KPI-2570-${idx + 1}`),
            code: String(getVal(1) || `กพร.${idx + 1}`),
            name: String(getVal(2) || 'ตัวชี้วัด กพร.'),
            dimension: String(getVal(3) || 'มิติที่ 1 ประสิทธิผลตามพันธกิจ'),
            unit: String(getVal(4) || 'ร้อยละ (%)'),
            weight: parseFloat(getVal(5)) || 10,
            target: parseFloat(getVal(6)) || 100,
            actual: parseFloat(getVal(7)) || 0,
            polarity: String(getVal(8) || 'higher'),
            level1: parseFloat(getVal(9)) || 60,
            level2: parseFloat(getVal(10)) || 70,
            level3: parseFloat(getVal(11)) || 80,
            level4: parseFloat(getVal(12)) || 90,
            level5: parseFloat(getVal(13)) || 100,
            owner: String(getVal(14) || '-'),
            evidenceUrl: String(getVal(15) || ''),
            evidenceName: String(getVal(16) || ''),
            note: String(getVal(17) || ''),
            updatedAt: String(getVal(18) || new Date().toISOString())
          };
          parsed.push(item);
        });

        resolve(parsed);
      } catch (e) {
        console.warn('Error parsing Google Sheet response:', e);
        resolve(null);
      }
    };

    script.onerror = () => {
      cleanup();
      resolve(null);
    };

    script.src = `https://docs.google.com/spreadsheets/d/${GOOGLE_SHEET_ID}/gviz/tq?tqx=out:json;responseHandler:${callbackName}&_=${Date.now()}`;
    document.body.appendChild(script);
  });
}

// บันทึกข้อมูลไปยัง Google Sheet ผ่าน Google Apps Script Web App URL (ถ้าตั้งค่าไว้)
async function pushToGoogleSheet(action, payloadData) {
  saveToLocalCache();
  if (!gasWebAppUrl) {
    updateSyncBadge('local-only', 'บันทึกในเครื่องแล้ว (รอผูก Apps Script เพื่อเขียนลง Sheet)');
    return { ok: false, reason: 'no_gas_url' };
  }

  try {
    updateSyncBadge('syncing', 'กำลังซิงค์ลง Google Sheet...');
    const response = await fetch(gasWebAppUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify({ action, ...payloadData })
    });
    const resJson = await response.json();
    if (resJson.status === 'ok') {
      updateSyncBadge('', 'ซิงค์กับ Google Sheet สำเร็จ');
      return { ok: true, data: resJson };
    } else {
      throw new Error(resJson.message || 'Unknown error');
    }
  } catch (err) {
    console.warn('Apps Script sync notice:', err);
    updateSyncBadge('local-only', 'บันทึกในเบราว์เซอร์แล้ว (ตรวจสอบ URL Apps Script)');
    return { ok: false, error: err };
  }
}

function saveToLocalCache() {
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(kpiList));
}

async function initializeData() {
  // 1. ลองดึงจาก Google Sheet สดก่อน
  const sheetRows = await fetchFromGoogleSheetDirect();

  if (Array.isArray(sheetRows) && sheetRows.length > 0) {
    kpiList = sheetRows;
    saveToLocalCache();
    updateSyncBadge('', `เชื่อมต่อ Google Sheet สด (${sheetRows.length} ตัวชี้วัด)`);
    showToast('ดึงข้อมูลล่าสุดจาก Google Sheet สำเร็จ', 'emerald');
  } else {
    // 2. ถ้าใน Google Sheet ยังเป็นหน้าว่าง (0 แถว) ให้ใช้ข้อมูลใน LocalStorage หรือข้อมูลเริ่มต้น กพร. 2570
    const cached = localStorage.getItem(STORAGE_KEY_DATA);
    if (cached) {
      try {
        kpiList = JSON.parse(cached);
      } catch (e) {
        kpiList = [...DEFAULT_KPI_DATA];
      }
    } else {
      kpiList = [...DEFAULT_KPI_DATA];
      saveToLocalCache();
    }

    if (sheetRows !== null && sheetRows.length === 0) {
      updateSyncBadge('local-only', 'Google Sheet ยังว่างอยู่ • แสดงชุดข้อมูลตั้งต้นปี 2570');
      if (gasWebAppUrl) {
        await pushToGoogleSheet('replaceAll', { items: kpiList });
      }
    } else {
      updateSyncBadge('local-only', 'โหมดพร้อมใช้งาน (คลิก "ตั้งค่าซิงค์ Sheet" เพื่อเขียนข้อมูลกลับ)');
    }
  }

  renderAll();
}

// ==========================================
// RENDERING ENGINE (PAGE 1 & PAGE 2)
// ==========================================

function renderAll() {
  renderExecutiveDashboard();
  renderStaffTable();
  updateLastUpdatedTime();
}

function updateLastUpdatedTime() {
  const el = document.getElementById('lastSyncTime');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' น.';
}

function renderExecutiveDashboard() {
  let totalWeight = 0;
  let weightedScoreSum = 0;
  let weightedProgressSum = 0;
  let countAchieved = 0;
  let countOnTrack = 0;
  let countWarning = 0;
  let countCritical = 0;

  const dimensionMap = {};

  kpiList.forEach(kpi => {
    const m = calculateKpiMetrics(kpi);
    const w = parseFloat(kpi.weight) || 0;
    totalWeight += w;
    weightedScoreSum += m.score * w;
    weightedProgressSum += m.clampedPercent * w;

    if (m.statusKey === 'achieved') countAchieved++;
    else if (m.statusKey === 'ontrack') countOnTrack++;
    else if (m.statusKey === 'warning') countWarning++;
    else countCritical++;

    const dim = kpi.dimension || 'มิติอื่นๆ';
    if (!dimensionMap[dim]) {
      dimensionMap[dim] = { weight: 0, weightedScore: 0, weightedProgress: 0, count: 0 };
    }
    dimensionMap[dim].weight += w;
    dimensionMap[dim].weightedScore += m.score * w;
    dimensionMap[dim].weightedProgress += m.clampedPercent * w;
    dimensionMap[dim].count += 1;
  });

  const avgProgress = totalWeight > 0 ? (weightedProgressSum / totalWeight) : 0;
  const avgScore = totalWeight > 0 ? (weightedScoreSum / totalWeight) : 0;

  // Update Hero Cards
  setText('heroOverallPercent', avgProgress.toFixed(1));
  setText('heroOverallScore', avgScore.toFixed(2));
  setText('heroTotalCount', kpiList.length);
  setText('heroAchievedCount', countAchieved);
  setText('heroOnTrackCount', countOnTrack);
  setText('heroWarningCount', countWarning + countCritical);
  setText('heroTotalWeight', totalWeight.toFixed(0));

  const heroBar = document.getElementById('heroOverallProgressBar');
  if (heroBar) heroBar.style.width = `${Math.min(100, avgProgress)}%`;

  // Update Radial Gauge
  const gaugeCircle = document.getElementById('radialGaugeCircle');
  if (gaugeCircle) {
    const circumference = 565.48; // 2 * PI * 90
    const offset = circumference - (Math.min(100, avgProgress) / 100) * circumference;
    gaugeCircle.style.strokeDashoffset = offset;
  }
  setText('gaugeCenterPercent', `${avgProgress.toFixed(1)}%`);
  setText('gaugeScorePill', `${avgScore.toFixed(2)} / 5.00`);
  setText('gaugeWeightPill', `${totalWeight.toFixed(0)}%`);

  // Render Dimension Breakdown
  const dimContainer = document.getElementById('dimensionBreakdownList');
  if (dimContainer) {
    const dims = Object.keys(dimensionMap);
    dimContainer.innerHTML = dims.map(dimName => {
      const d = dimensionMap[dimName];
      const dimProg = d.weight > 0 ? (d.weightedProgress / d.weight) : 0;
      const dimScore = d.weight > 0 ? (d.weightedScore / d.weight) : 0;
      return `
        <div class="dimension-item">
          <div class="dimension-top">
            <span class="dimension-name">${escapeHtml(dimName)} <small style="color:var(--text-muted)">(${d.count} ตัวชี้วัด • น้ำหนัก ${d.weight}%)</small></span>
            <div class="dimension-stats">
              <span style="color:var(--accent-cyan)">${dimProg.toFixed(1)}%</span>
              <span style="color:var(--accent-emerald)">⭐ ${dimScore.toFixed(2)}</span>
            </div>
          </div>
          <div class="cyber-progress-track">
            <div class="cyber-progress-fill" style="width:${Math.min(100, dimProg)}%"></div>
          </div>
        </div>
      `;
    }).join('');
  }

  // Render Status Summary Bars (Right Panel)
  renderStatusDistribution(countAchieved, countOnTrack, countWarning, countCritical, kpiList.length);

  // Render Category Filter Pills
  renderCategoryPills(Object.keys(dimensionMap));

  // Render KPI Projector Cards
  renderKpiCardsGrid();
}

function renderStatusDistribution(achieved, ontrack, warning, critical, total) {
  const container = document.getElementById('statusDistributionPanel');
  if (!container) return;
  const safeTotal = Math.max(total, 1);
  const rows = [
    { label: 'บรรลุเป้าหมายแล้ว (ระดับ 4.5 - 5.0)', count: achieved, color: '#10b981', pct: (achieved / safeTotal) * 100 },
    { label: 'เป็นไปตามแผน (ระดับ 3.0 - 4.4)', count: ontrack, color: '#38bdf8', pct: (ontrack / safeTotal) * 100 },
    { label: 'เฝ้าระวัง / ต้องเร่งรัด (ระดับ 2.0 - 2.9)', count: warning, color: '#f59e0b', pct: (warning / safeTotal) * 100 },
    { label: 'ต่ำกว่าเกณฑ์ (ต่ำกว่าระดับ 2.0)', count: critical, color: '#f43f5e', pct: (critical / safeTotal) * 100 }
  ];

  container.innerHTML = rows.map(r => `
    <div style="margin-bottom: 1rem;">
      <div style="display:flex; justify-content:space-between; font-size:0.92rem; margin-bottom:0.35rem;">
        <span>${r.label}</span>
        <strong style="font-family:var(--font-mono); color:${r.color}">${r.count} รายการ (${r.pct.toFixed(0)}%)</strong>
      </div>
      <div class="cyber-progress-track" style="height:10px;">
        <div style="height:100%; width:${r.pct}%; background:${r.color}; border-radius:999px; transition:width 0.6s ease;"></div>
      </div>
    </div>
  `).join('');
}

function renderCategoryPills(dimensions) {
  const container = document.getElementById('categoryPillsContainer');
  if (!container) return;
  const allCats = ['ALL', ...dimensions];
  container.innerHTML = allCats.map(cat => {
    const activeClass = activeCategory === cat ? 'active' : '';
    const label = cat === 'ALL' ? `ทั้งหมด (${kpiList.length})` : cat;
    return `<button class="cat-pill ${activeClass}" onclick="setCategoryFilter('${escapeAttr(cat)}')">${escapeHtml(label)}</button>`;
  }).join('');
}

function setCategoryFilter(cat) {
  activeCategory = cat;
  renderExecutiveDashboard();
}

function renderKpiCardsGrid() {
  const grid = document.getElementById('executiveKpiGrid');
  if (!grid) return;

  const filtered = kpiList.filter(k => {
    const matchCat = activeCategory === 'ALL' || k.dimension === activeCategory;
    const q = searchQuery.trim().toLowerCase();
    const matchSearch = !q ||
      String(k.code).toLowerCase().includes(q) ||
      String(k.name).toLowerCase().includes(q) ||
      String(k.owner).toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="glass-panel" style="grid-column: 1 / -1; text-align:center; padding: 3rem;">
        <p style="font-size:1.2rem; color:var(--text-muted);">ไม่พบรายการตัวชี้วัดที่ค้นหา</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(kpi => {
    const m = calculateKpiMetrics(kpi);
    const levels = [kpi.level1, kpi.level2, kpi.level3, kpi.level4, kpi.level5];

    const stepperHtml = levels.map((lv, idx) => {
      const lvNum = idx + 1;
      let cls = 'level-step';
      if (lvNum === m.currentLevelInt) cls += ' current-level';
      else if (lvNum < m.currentLevelInt) cls += ' reached';
      return `
        <div class="${cls}">
          <div>ระดับ ${lvNum}</div>
          <div style="font-family:var(--font-mono); font-size:0.78rem;">${lv}</div>
        </div>
      `;
    }).join('');

    const evidenceHtml = kpi.evidenceUrl
      ? `<a href="${escapeAttr(kpi.evidenceUrl)}" target="_blank" rel="noopener" class="evidence-link">📎 ${escapeHtml(kpi.evidenceName || 'ดูเอกสารหลักฐาน')}</a>`
      : (kpi.evidenceName ? `<span style="color:var(--accent-cyan)">📄 ${escapeHtml(kpi.evidenceName)}</span>` : `<span style="color:var(--text-muted)">ไม่มีไฟล์แนบ</span>`);

    return `
      <article class="kpi-card">
        <div>
          <div class="kpi-card-top">
            <div class="kpi-code-group">
              <span class="kpi-code-badge">${escapeHtml(kpi.code)}</span>
              <span class="kpi-dimension-tag">${escapeHtml(kpi.dimension)}</span>
            </div>
            <span class="kpi-status-badge status-${m.statusKey}">${m.statusText}</span>
          </div>

          <h3 class="kpi-title">${escapeHtml(kpi.name)}</h3>

          <div class="kpi-metrics-box">
            <div class="metric-col">
              <div class="metric-label">เป้าหมายปี 2570</div>
              <div class="metric-val">${formatNum(kpi.target)}</div>
              <div class="metric-unit-small">${escapeHtml(kpi.unit)}</div>
            </div>
            <div class="metric-col">
              <div class="metric-label">ผลงานจริง</div>
              <div class="metric-val highlight-cyan">${formatNum(kpi.actual)}</div>
              <div class="metric-unit-small">${escapeHtml(kpi.unit)}</div>
            </div>
            <div class="metric-col">
              <div class="metric-label">ความสำเร็จ / คะแนน</div>
              <div class="metric-val highlight-emerald">${m.progressPercent}%</div>
              <div class="metric-unit-small">ระดับ ${m.score.toFixed(2)} (น้ำหนัก ${kpi.weight}%)</div>
            </div>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.82rem; color:var(--text-secondary);">
              <span>ความก้าวหน้าเทียบเป้าหมาย</span>
              <span style="font-family:var(--font-mono); font-weight:700; color:var(--accent-cyan);">${m.progressPercent}%</span>
            </div>
            <div class="cyber-progress-track">
              <div class="cyber-progress-fill" style="width:${m.clampedPercent}%"></div>
            </div>
          </div>

          <div class="level-stepper" title="เกณฑ์การให้คะแนน กพร. 5 ระดับ">
            ${stepperHtml}
          </div>
        </div>

        <div class="kpi-card-footer">
          <span>👤 ${escapeHtml(kpi.owner || '-')}</span>
          ${evidenceHtml}
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================
// PAGE 2: STAFF TABLE & CRUD MANAGEMENT
// ==========================================

function renderStaffTable() {
  const tbody = document.getElementById('staffTableBody');
  if (!tbody) return;

  const q = staffSearchQuery.trim().toLowerCase();
  const filtered = kpiList.filter(k => {
    return !q ||
      String(k.code).toLowerCase().includes(q) ||
      String(k.name).toLowerCase().includes(q) ||
      String(k.dimension).toLowerCase().includes(q) ||
      String(k.owner).toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="9" style="text-align:center; padding:2.5rem; color:var(--text-muted);">ไม่พบข้อมูลตัวชี้วัด</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(kpi => {
    const m = calculateKpiMetrics(kpi);
    const fileBadge = kpi.evidenceUrl
      ? `<a href="${escapeAttr(kpi.evidenceUrl)}" target="_blank" class="evidence-link">📎 ${escapeHtml(kpi.evidenceName || 'เปิดไฟล์')}</a>`
      : (kpi.evidenceName ? `<span>📄 ${escapeHtml(kpi.evidenceName)}</span>` : `<span style="color:var(--text-muted)">-</span>`);

    return `
      <tr>
        <td><span class="kpi-code-badge">${escapeHtml(kpi.code)}</span></td>
        <td>
          <div style="font-weight:600; color:var(--text-primary); margin-bottom:0.2rem;">${escapeHtml(kpi.name)}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(kpi.dimension)} • ผู้รับผิดชอบ: ${escapeHtml(kpi.owner || '-')}</div>
        </td>
        <td style="text-align:center; font-family:var(--font-mono);">${kpi.weight}%</td>
        <td style="text-align:right; font-family:var(--font-mono); font-weight:600;">${formatNum(kpi.target)} <small style="color:var(--text-muted)">${escapeHtml(kpi.unit)}</small></td>
        <td style="text-align:right;">
          <input
            type="number"
            step="any"
            class="quick-input"
            value="${kpi.actual}"
            onchange="quickUpdateActual('${escapeAttr(kpi.id)}', this.value)"
            title="พิมพ์ตัวเลขผลงานจริงแล้วกด Enter เพื่อบันทึกทันที"
          />
        </td>
        <td style="text-align:center;">
          <div style="font-family:var(--font-mono); font-weight:700; color:var(--accent-cyan);">${m.progressPercent}%</div>
          <div style="font-size:0.76rem; color:var(--accent-emerald);">ระดับ ${m.score.toFixed(2)}</div>
        </td>
        <td>
          <span class="kpi-status-badge status-${m.statusKey}">${m.statusText}</span>
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:0.3rem;">
            ${fileBadge}
            <button class="btn btn-sm" onclick="triggerRowFileUpload('${escapeAttr(kpi.id)}')" style="font-size:0.75rem; padding:0.25rem 0.55rem;">
              ⬆️ อัปโหลดหลักฐาน
            </button>
          </div>
        </td>
        <td>
          <div class="row-actions">
            <button class="btn btn-sm" onclick="openKpiModal('${escapeAttr(kpi.id)}')">✏️ แก้ไข</button>
            <button class="btn btn-sm btn-danger" onclick="deleteKpiItem('${escapeAttr(kpi.id)}')">🗑️ ลบ</button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

// อัปเดตตัวเลขผลงานจริงแบบด่วนจากตาราง
async function quickUpdateActual(kpiId, newValue) {
  const idx = kpiList.findIndex(k => String(k.id) === String(kpiId));
  if (idx === -1) return;
  kpiList[idx].actual = parseFloat(newValue) || 0;
  kpiList[idx].updatedAt = new Date().toISOString();

  renderAll();
  showToast(`อัปเดตผลงาน "${kpiList[idx].code}" เป็น ${kpiList[idx].actual} เรียบร้อยแล้ว`, 'cyan');
  await pushToGoogleSheet('upsert', { item: kpiList[idx] });
}

// เปิด Modal เพิ่ม / แก้ไข ตัวชี้วัด
function openKpiModal(kpiId = null) {
  const modal = document.getElementById('kpiFormModal');
  const title = document.getElementById('kpiModalTitle');
  const form = document.getElementById('kpiDataForm');
  form.reset();

  if (kpiId) {
    const kpi = kpiList.find(k => String(k.id) === String(kpiId));
    if (!kpi) return;
    title.textContent = `✏️ แก้ไขตัวชี้วัด: ${kpi.code}`;
    document.getElementById('f_id').value = kpi.id;
    document.getElementById('f_code').value = kpi.code;
    document.getElementById('f_name').value = kpi.name;
    document.getElementById('f_dimension').value = kpi.dimension;
    document.getElementById('f_unit').value = kpi.unit;
    document.getElementById('f_weight').value = kpi.weight;
    document.getElementById('f_target').value = kpi.target;
    document.getElementById('f_actual').value = kpi.actual;
    document.getElementById('f_polarity').value = kpi.polarity || 'higher';
    document.getElementById('f_level1').value = kpi.level1;
    document.getElementById('f_level2').value = kpi.level2;
    document.getElementById('f_level3').value = kpi.level3;
    document.getElementById('f_level4').value = kpi.level4;
    document.getElementById('f_level5').value = kpi.level5;
    document.getElementById('f_owner').value = kpi.owner || '';
    document.getElementById('f_evidenceUrl').value = kpi.evidenceUrl || '';
    document.getElementById('f_evidenceName').value = kpi.evidenceName || '';
    document.getElementById('f_note').value = kpi.note || '';
  } else {
    title.textContent = '➕ เพิ่มตัวชี้วัด กพร. ใหม่ (ปี 2570)';
    document.getElementById('f_id').value = '';
    document.getElementById('f_code').value = `กพร.${kpiList.length + 1}`;
    document.getElementById('f_dimension').value = 'มิติที่ 1 ประสิทธิผลตามพันธกิจ';
    document.getElementById('f_unit').value = 'ร้อยละ (%)';
    document.getElementById('f_weight').value = 10;
    document.getElementById('f_target').value = 100;
    document.getElementById('f_actual').value = 0;
    document.getElementById('f_polarity').value = 'higher';
    document.getElementById('f_level1').value = 60;
    document.getElementById('f_level2').value = 70;
    document.getElementById('f_level3').value = 80;
    document.getElementById('f_level4').value = 90;
    document.getElementById('f_level5').value = 100;
  }

  modal.classList.add('open');
}

function closeKpiModal() {
  document.getElementById('kpiFormModal').classList.remove('open');
}

async function handleSaveKpiForm(event) {
  event.preventDefault();
  const idVal = document.getElementById('f_id').value.trim();
  const isNew = !idVal;

  const item = {
    id: isNew ? `KPI-2570-${Date.now()}` : idVal,
    code: document.getElementById('f_code').value.trim(),
    name: document.getElementById('f_name').value.trim(),
    dimension: document.getElementById('f_dimension').value.trim(),
    unit: document.getElementById('f_unit').value.trim(),
    weight: parseFloat(document.getElementById('f_weight').value) || 0,
    target: parseFloat(document.getElementById('f_target').value) || 0,
    actual: parseFloat(document.getElementById('f_actual').value) || 0,
    polarity: document.getElementById('f_polarity').value,
    level1: parseFloat(document.getElementById('f_level1').value) || 0,
    level2: parseFloat(document.getElementById('f_level2').value) || 0,
    level3: parseFloat(document.getElementById('f_level3').value) || 0,
    level4: parseFloat(document.getElementById('f_level4').value) || 0,
    level5: parseFloat(document.getElementById('f_level5').value) || 0,
    owner: document.getElementById('f_owner').value.trim(),
    evidenceUrl: document.getElementById('f_evidenceUrl').value.trim(),
    evidenceName: document.getElementById('f_evidenceName').value.trim(),
    note: document.getElementById('f_note').value.trim(),
    updatedAt: new Date().toISOString()
  };

  if (isNew) {
    kpiList.push(item);
  } else {
    const idx = kpiList.findIndex(k => String(k.id) === String(item.id));
    if (idx >= 0) kpiList[idx] = item;
  }

  closeKpiModal();
  renderAll();
  showToast(isNew ? `เพิ่มตัวชี้วัด "${item.code}" สำเร็จ` : `บันทึกการแก้ไข "${item.code}" สำเร็จ`, 'emerald');
  await pushToGoogleSheet('upsert', { item });
}

async function deleteKpiItem(kpiId) {
  const item = kpiList.find(k => String(k.id) === String(kpiId));
  if (!item) return;
  if (!confirm(`ยืนยันการลบตัวชี้วัด "${item.code}: ${item.name}" หรือไม่?`)) return;

  kpiList = kpiList.filter(k => String(k.id) !== String(kpiId));
  renderAll();
  showToast(`ลบตัวชี้วัด "${item.code}" เรียบร้อยแล้ว`, 'rose');
  await pushToGoogleSheet('delete', { id: kpiId });
}

// ==========================================
// FILE UPLOAD (EVIDENCE ATTACHMENT & CSV BULK IMPORT)
// ==========================================

let currentUploadKpiId = null;

function triggerRowFileUpload(kpiId) {
  currentUploadKpiId = kpiId;
  const fileInput = document.getElementById('hiddenEvidenceFileInput');
  fileInput.value = '';
  fileInput.click();
}

async function handleEvidenceFileSelected(event) {
  const file = event.target.files[0];
  if (!file || !currentUploadKpiId) return;

  const idx = kpiList.findIndex(k => String(k.id) === String(currentUploadKpiId));
  if (idx === -1) return;

  showToast(`กำลังอัปโหลดไฟล์ "${file.name}"...`, 'cyan');

  const reader = new FileReader();
  reader.onload = async function (e) {
    const dataUrl = e.target.result;
    const base64Data = dataUrl.split(',')[1];

    // ถ้าเชื่อมต่อ Google Apps Script ไว้ จะอัปโหลดขึ้น Google Drive อัตโนมัติ
    if (gasWebAppUrl) {
      const res = await pushToGoogleSheet('uploadFile', {
        kpiId: currentUploadKpiId,
        fileName: file.name,
        mimeType: file.type,
        base64Data
      });
      if (res.ok && res.data && res.data.fileUrl) {
        kpiList[idx].evidenceUrl = res.data.fileUrl;
        kpiList[idx].evidenceName = file.name;
        saveToLocalCache();
        renderAll();
        showToast(`อัปโหลดไฟล์ขึ้น Google Drive และบันทึกใน Sheet สำเร็จ!`, 'emerald');
        return;
      }
    }

    // กรณีใช้งานแบบ Local หรือยังไม่ได้ใส่ URL Apps Script (สร้าง Object URL / Data URL สำหรับเปิดดูได้ทันที)
    kpiList[idx].evidenceName = file.name;
    if (file.size <= 1.5 * 1024 * 1024) {
      kpiList[idx].evidenceUrl = dataUrl;
    } else {
      kpiList[idx].evidenceUrl = URL.createObjectURL(file);
    }
    kpiList[idx].updatedAt = new Date().toISOString();
    saveToLocalCache();
    renderAll();
    showToast(`แนบไฟล์หลักฐาน "${file.name}" สำเร็จ`, 'emerald');
  };
  reader.readAsDataURL(file);
}

// นำเข้าข้อมูลตัวชี้วัดจากไฟล์ CSV
function handleCsvFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = async function (e) {
    const text = e.target.result;
    const parsedRows = parseCSV(text);
    if (parsedRows.length <= 1) {
      showToast('ไม่พบข้อมูลในไฟล์ CSV กรุณาตรวจสอบรูปแบบไฟล์', 'rose');
      return;
    }

    const headers = parsedRows[0].map(h => h.trim());
    const newItems = [];

    for (let i = 1; i < parsedRows.length; i++) {
      const r = parsedRows[i];
      if (r.length < 3 || (!r[0] && !r[1] && !r[2])) continue;

      const getByHeader = (name, fallbackIdx) => {
        const hIdx = headers.findIndex(h => h.toLowerCase() === name.toLowerCase());
        return hIdx >= 0 ? r[hIdx] : (r[fallbackIdx] || '');
      };

      newItems.push({
        id: getByHeader('id', 0) || `KPI-2570-${Date.now()}-${i}`,
        code: getByHeader('code', 1) || `กพร.${i}`,
        name: getByHeader('name', 2) || `ตัวชี้วัดที่ ${i}`,
        dimension: getByHeader('dimension', 3) || 'มิติที่ 1 ประสิทธิผลตามพันธกิจ',
        unit: getByHeader('unit', 4) || 'ร้อยละ (%)',
        weight: parseFloat(getByHeader('weight', 5)) || 10,
        target: parseFloat(getByHeader('target', 6)) || 100,
        actual: parseFloat(getByHeader('actual', 7)) || 0,
        polarity: getByHeader('polarity', 8) || 'higher',
        level1: parseFloat(getByHeader('level1', 9)) || 60,
        level2: parseFloat(getByHeader('level2', 10)) || 70,
        level3: parseFloat(getByHeader('level3', 11)) || 80,
        level4: parseFloat(getByHeader('level4', 12)) || 90,
        level5: parseFloat(getByHeader('level5', 13)) || 100,
        owner: getByHeader('owner', 14) || '-',
        evidenceUrl: getByHeader('evidenceUrl', 15) || '',
        evidenceName: getByHeader('evidenceName', 16) || '',
        note: getByHeader('note', 17) || '',
        updatedAt: new Date().toISOString()
      });
    }

    if (newItems.length > 0) {
      kpiList = newItems;
      renderAll();
      showToast(`นำเข้าข้อมูลจากไฟล์ CSV จำนวน ${newItems.length} ตัวชี้วัดสำเร็จ!`, 'emerald');
      await pushToGoogleSheet('replaceAll', { items: kpiList });
    }
  };
  reader.readAsText(file, 'UTF-8');
}

function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentVal = '';
  let inQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    const next = text[i + 1];
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        currentVal += '"';
        i++;
      } else if (ch === '"') {
        inQuotes = false;
      } else {
        currentVal += ch;
      }
    } else {
      if (ch === '"') {
        inQuotes = true;
      } else if (ch === ',') {
        currentRow.push(currentVal);
        currentVal = '';
      } else if (ch === '\n' || (ch === '\r' && next === '\n')) {
        if (ch === '\r') i++;
        currentRow.push(currentVal);
        rows.push(currentRow);
        currentRow = [];
        currentVal = '';
      } else {
        currentVal += ch;
      }
    }
  }
  if (currentVal || currentRow.length > 0) {
    currentRow.push(currentVal);
    rows.push(currentRow);
  }
  return rows;
}

function exportToCsv() {
  const headers = [
    'id', 'code', 'name', 'dimension', 'unit', 'weight', 'target', 'actual',
    'polarity', 'level1', 'level2', 'level3', 'level4', 'level5',
    'owner', 'evidenceUrl', 'evidenceName', 'note', 'updatedAt'
  ];
  const csvLines = [headers.join(',')];
  kpiList.forEach(item => {
    const line = headers.map(h => {
      const val = item[h] !== undefined && item[h] !== null ? String(item[h]) : '';
      return `"${val.replace(/"/g, '""')}"`;
    });
    csvLines.push(line.join(','));
  });

  const blob = new Blob(['\uFEFF' + csvLines.join('\r\n')], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `KPI_2570_Export_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
  showToast('ส่งออกไฟล์ CSV สำเร็จ (สามารถนำไป Import ลง Google Sheet ได้ทันที)', 'emerald');
}

// ==========================================
// NAVIGATION, PROJECTOR MODE & SETTINGS MODAL
// ==========================================

function switchPage(pageId) {
  document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(`page-${pageId}`).classList.add('active');
  document.getElementById(`tab-btn-${pageId}`).classList.add('active');
}

function toggleProjectorMode() {
  document.body.classList.toggle('projector-mode');
  const isProj = document.body.classList.contains('projector-mode');
  if (isProj && !document.fullscreenElement && document.documentElement.requestFullscreen) {
    document.documentElement.requestFullscreen().catch(() => {});
  } else if (!isProj && document.fullscreenElement && document.exitFullscreen) {
    document.exitFullscreen().catch(() => {});
  }
  showToast(isProj ? 'เปิดโหมดขึ้นโปรเจคเตอร์ (ขยายตัวอักษร + เต็มจอ)' : 'ออกจากโหมดโปรเจคเตอร์', 'cyan');
}

function toggleThemeMode() {
  document.body.classList.toggle('theme-light-projector');
  const isDarkForest = document.body.classList.contains('theme-light-projector');
  const btn = document.getElementById('themeToggleBtn');
  if (btn) btn.innerHTML = isDarkForest ? '🌿 โหมดเขียวอ่อนสบายตา (Natural Light)' : '🌲 โหมดเขียวเข้ม (Forest Dark)';
}

function toggleAutoPresentation() {
  const btn = document.getElementById('autoSlideBtn');
  if (autoSlideInterval) {
    clearInterval(autoSlideInterval);
    autoSlideInterval = null;
    if (btn) btn.innerHTML = '▶️ นำเสนออัตโนมัติ';
    showToast('หยุดการสลับหมวดหมู่อัตโนมัติ', 'cyan');
    return;
  }

  const dims = ['ALL', ...new Set(kpiList.map(k => k.dimension))];
  let idx = 0;
  if (btn) btn.innerHTML = '⏸️ หยุดนำเสนอ';
  showToast('เริ่มโหมดนำเสนอผู้บริหารอัตโนมัติ (สลับทุก 8 วินาที)', 'emerald');

  autoSlideInterval = setInterval(() => {
    idx = (idx + 1) % dims.length;
    setCategoryFilter(dims[idx]);
  }, 8000);
}

function openSyncModal() {
  document.getElementById('gasUrlInput').value = gasWebAppUrl;
  document.getElementById('syncSettingsModal').classList.add('open');
}

function closeSyncModal() {
  document.getElementById('syncSettingsModal').classList.remove('open');
}

async function saveSyncSettings() {
  const url = document.getElementById('gasUrlInput').value.trim();
  gasWebAppUrl = url;
  localStorage.setItem(STORAGE_KEY_GAS_URL, url);
  closeSyncModal();

  if (url) {
    showToast('บันทึก Web App URL แล้ว กำลังซิงค์ข้อมูลขึ้น Google Sheet...', 'cyan');
    await pushToGoogleSheet('replaceAll', { items: kpiList });
  } else {
    updateSyncBadge('local-only', 'โหมดอ่าน Google Sheet + บันทึกในเบราว์เซอร์');
    showToast('บันทึกการตั้งค่าเรียบร้อยแล้ว', 'emerald');
  }
}

async function forceSyncNow() {
  if (gasWebAppUrl) {
    await pushToGoogleSheet('replaceAll', { items: kpiList });
    showToast('ส่งข้อมูลทั้งหมดขึ้น Google Sheet เรียบร้อยแล้ว', 'emerald');
  } else {
    const rows = await fetchFromGoogleSheetDirect();
    if (rows && rows.length > 0) {
      kpiList = rows;
      saveToLocalCache();
      renderAll();
      showToast(`ดึงข้อมูลล่าสุดจาก Google Sheet (${rows.length} รายการ) สำเร็จ`, 'emerald');
    } else {
      openSyncModal();
    }
  }
}

function copyAppsScriptCode() {
  const codeEl = document.getElementById('appsScriptCodeBlock');
  if (!codeEl) return;
  navigator.clipboard.writeText(codeEl.textContent).then(() => {
    showToast('คัดลอกโค้ด Google Apps Script แล้ว! นำไปวางในส่วนขยาย > Apps Script ได้เลย', 'emerald');
  });
}

// ==========================================
// UTILITIES
// ==========================================

function setText(id, text) {
  const el = document.getElementById(id);
  if (el) el.textContent = text;
}

function formatNum(n) {
  const num = parseFloat(n);
  if (isNaN(num)) return '0';
  return Number.isInteger(num) ? num.toLocaleString('th-TH') : num.toLocaleString('th-TH', { maximumFractionDigits: 2 });
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  return String(str ?? '').replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function showToast(message, color = 'cyan') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  const colorMap = {
    cyan: 'var(--accent-cyan)',
    emerald: 'var(--accent-emerald)',
    rose: 'var(--accent-rose)'
  };
  toast.style.borderLeftColor = colorMap[color] || colorMap.cyan;
  toast.innerHTML = `<span>✨</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3800);
}

// Setup Event Listeners on Load
window.addEventListener('DOMContentLoaded', () => {
  // Search inputs
  const execSearch = document.getElementById('execSearchInput');
  if (execSearch) {
    execSearch.addEventListener('input', (e) => {
      searchQuery = e.target.value;
      renderKpiCardsGrid();
    });
  }

  const staffSearch = document.getElementById('staffSearchInput');
  if (staffSearch) {
    staffSearch.addEventListener('input', (e) => {
      staffSearchQuery = e.target.value;
      renderStaffTable();
    });
  }

  // Drag and drop for CSV Dropzone
  const csvDropzone = document.getElementById('csvDropzone');
  if (csvDropzone) {
    csvDropzone.addEventListener('dragover', (e) => {
      e.preventDefault();
      csvDropzone.classList.add('dragover');
    });
    csvDropzone.addEventListener('dragleave', () => {
      csvDropzone.classList.remove('dragover');
    });
    csvDropzone.addEventListener('drop', (e) => {
      e.preventDefault();
      csvDropzone.classList.remove('dragover');
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        handleCsvFileUpload({ target: { files: e.dataTransfer.files } });
      }
    });
  }

  initializeData();
});
