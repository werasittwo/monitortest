/**
 * ระบบติดตามตัวชี้วัด กพร. ประจำปีงบประมาณ พ.ศ. 2570
 * กองประเมินผลกระทบต่อสุขภาพ กรมอนามัย
 */

const GOOGLE_SHEET_ID = '1Lro8WK25uexe97cFHHedqC5iu2B65VyfiQ2AWUXyIUw';
const STORAGE_KEY_DATA = 'kpi_2570_dataset_v3';
const STORAGE_KEY_CHECKLIST = 'kpi_2570_checklist_v3';
const STORAGE_KEY_GAS_URL = 'kpi_2570_gas_webapp_url';

// 1. ตัวชี้วัด 2 รายการตามเอกสารคำรับรองการปฏิบัติราชการ กรมอนามัย ประจำปีงบประมาณ พ.ศ. 2570
// ทุกอย่างยังไม่มีค่าเริ่มต้น (actual = 0)
const DEFAULT_KPI_DATA = [
  {
    id: 'KPI-70-327',
    code: 'ตัวชี้วัดที่ 3.27',
    name: 'ร้อยละขององค์กรปกครองส่วนท้องถิ่นพัฒนาเป็นเมืองสุขภาพดี',
    dimension: 'มิติที่ 3 ประสิทธิภาพของการปฏิบัติราชการ',
    unit: 'ร้อยละ',
    weight: 50,
    target: 100,
    actual: 0,
    polarity: 'higher',
    level1: 1,
    level2: 2,
    level3: 3,
    level4: 4,
    level5: 5,
    owner: 'นายวีรสิทธิ์ ธรรมเกื้อกูล, นายคณิตศร คงเย็น, นางสาวพนิตา เจริญสุข',
    evidenceType: 'link',
    evidenceUrl: 'https://healthycity.anamai.moph.go.th/',
    evidenceName: 'เว็บไซต์เมืองสุขภาพดี กรมอนามัย',
    note: 'เริ่มต้นดำเนินงานตามแผนปฏิบัติราชการ ปีงบประมาณ พ.ศ. 2570',
    updatedAt: ''
  },
  {
    id: 'KPI-70-326',
    code: 'ตัวชี้วัดที่ 3.26',
    name: 'ร้อยละของจังหวัดที่มีศักยภาพและความพร้อมในการป้องกันและรับมือความเสี่ยงต่อสุขภาพจากมลพิษทางอากาศและการเปลี่ยนแปลงสภาพภูมิอากาศ',
    dimension: 'มิติที่ 3 ประสิทธิภาพของการปฏิบัติราชการ',
    unit: 'ร้อยละ',
    weight: 50,
    target: 85,
    actual: 0,
    polarity: 'higher',
    level1: 1,
    level2: 2,
    level3: 3,
    level4: 4,
    level5: 5,
    owner: 'นางสาวโศรยา ชูศรี, นางสาวนฤภร บูรณนัติ, นางสาวกันย์ลภัส พึ่งประยูร, นายวีรสิทธิ์ ธรรมเกื้อกูล',
    evidenceType: 'link',
    evidenceUrl: 'https://hia.anamai.moph.go.th/th/airpollution-health',
    evidenceName: 'ข้อมูลวิชาการป้องกันผลกระทบต่อสุขภาพจากมลพิษทางอากาศ',
    note: 'เริ่มต้นดำเนินงานตามแผนปฏิบัติราชการ ปีงบประมาณ พ.ศ. 2570',
    updatedAt: ''
  }
];

// 2. ข้อมูล Checklist การนำเข้าข้อมูลลง Web หน่วยงาน และระบบ DOC 4.0
const DEFAULT_CHECKLIST_DATA = [
  {
    id: 'CHK-01',
    kpiCode: 'ตัวชี้วัดที่ 3.26',
    title: 'แบบฟอร์มที่ 1: การวิเคราะห์สถานการณ์ของตัวชี้วัดและผู้มีส่วนได้ส่วนเสีย',
    period: 'รอบที่ 1 (5 เดือนแรก)',
    deadline: '10 มี.ค. 70',
    webUploaded: false,
    webUploadDate: '',
    webUrl: '',
    docUploaded: false,
    docUploadDate: '',
    note: 'วิเคราะห์สถานการณ์ C, T, Le 3 ปีย้อนหลัง และกลุ่มผู้รับบริการ'
  },
  {
    id: 'CHK-02',
    kpiCode: 'ตัวชี้วัดที่ 3.26',
    title: 'แบบฟอร์มที่ 2: มาตรการและแผนขับเคลื่อนการดำเนินงานตัวชี้วัด',
    period: 'รอบที่ 1 (5 เดือนแรก)',
    deadline: '10 มี.ค. 70',
    webUploaded: false,
    webUploadDate: '',
    webUrl: '',
    docUploaded: false,
    docUploadDate: '',
    note: 'เสนอผู้บริหารอนุมัติแผนขับเคลื่อน และนำลิงก์ใส่ระบบ DOC'
  },
  {
    id: 'CHK-03',
    kpiCode: 'ตัวชี้วัดที่ 3.26',
    title: 'แบบฟอร์มที่ 3: รายงานการติดตามผลการดำเนินงานตัวชี้วัดทุกเดือน (เดือน 1 ถึง 5)',
    period: 'รอบที่ 1 (5 เดือนแรก)',
    deadline: '10 มี.ค. 70',
    webUploaded: false,
    webUploadDate: '',
    webUrl: '',
    docUploaded: false,
    docUploadDate: '',
    note: 'ติดตามและประเมินผลการดำเนินงาน'
  },
  {
    id: 'CHK-04',
    kpiCode: 'ตัวชี้วัดที่ 3.26',
    title: 'แบบฟอร์มที่ 4: รายงานผลผลิตและผลลัพธ์ของตัวชี้วัด',
    period: 'รอบที่ 1 (5 เดือนแรก)',
    deadline: '10 มี.ค. 70',
    webUploaded: false,
    webUploadDate: '',
    webUrl: '',
    docUploaded: false,
    docUploadDate: '',
    note: 'รายงานผลในระบบ DOC หัวข้อ ผลการดำเนินงานของตัวชี้วัด'
  },
  {
    id: 'CHK-05',
    kpiCode: 'ตัวชี้วัดที่ 3.27',
    title: 'แบบฟอร์มที่ 1: การวิเคราะห์สถานการณ์ของตัวชี้วัดและผู้มีส่วนได้ส่วนเสีย',
    period: 'รอบที่ 1 (5 เดือนแรก)',
    deadline: '10 มี.ค. 70',
    webUploaded: false,
    webUploadDate: '',
    webUrl: '',
    docUploaded: false,
    docUploadDate: '',
    note: 'วิเคราะห์สถานการณ์ C, T, Le 3 ปีย้อนหลัง และผู้รับบริการ'
  },
  {
    id: 'CHK-06',
    kpiCode: 'ตัวชี้วัดที่ 3.27',
    title: 'แบบฟอร์มที่ 2: มาตรการและแผนขับเคลื่อนการดำเนินงานตัวชี้วัด',
    period: 'รอบที่ 1 (5 เดือนแรก)',
    deadline: '10 มี.ค. 70',
    webUploaded: false,
    webUploadDate: '',
    webUrl: '',
    docUploaded: false,
    docUploadDate: '',
    note: 'เสนอผู้บริหารอนุมัติแผน และนำลิงก์ใส่ระบบ DOC'
  },
  {
    id: 'CHK-07',
    kpiCode: 'ตัวชี้วัดที่ 3.27',
    title: 'แบบฟอร์มที่ 3: รายงานการติดตามผลการดำเนินงานตัวชี้วัดทุกเดือน (เดือน 1 ถึง 5)',
    period: 'รอบที่ 1 (5 เดือนแรก)',
    deadline: '10 มี.ค. 70',
    webUploaded: false,
    webUploadDate: '',
    webUrl: '',
    docUploaded: false,
    docUploadDate: '',
    note: 'ติดตามและประเมินผลการดำเนินงาน'
  },
  {
    id: 'CHK-08',
    kpiCode: 'ตัวชี้วัดที่ 3.27',
    title: 'แบบฟอร์มที่ 4: รายงานผลผลิตและผลลัพธ์ของตัวชี้วัด',
    period: 'รอบที่ 1 (5 เดือนแรก)',
    deadline: '10 มี.ค. 70',
    webUploaded: false,
    webUploadDate: '',
    webUrl: '',
    docUploaded: false,
    docUploadDate: '',
    note: 'อปท. สมัครและประเมินตนเองตามเกณฑ์เมืองสุขภาพดี'
  },
  {
    id: 'CHK-09',
    kpiCode: 'ตัวชี้วัดที่ 3.26',
    title: 'แบบฟอร์มที่ 1 ถึง 4: รายงานสรุปผลการดำเนินงานรอบ 5 เดือนหลัง',
    period: 'รอบที่ 2 (5 เดือนหลัง)',
    deadline: '10 ส.ค. 70',
    webUploaded: false,
    webUploadDate: '',
    webUrl: '',
    docUploaded: false,
    docUploadDate: '',
    note: 'รายงานผลการดำเนินงานรอบหลัง และนำลิงก์ใส่ระบบ DOC'
  },
  {
    id: 'CHK-10',
    kpiCode: 'ตัวชี้วัดที่ 3.27',
    title: 'แบบฟอร์มที่ 1 ถึง 4: รายงานสรุปผลการดำเนินงานรอบ 5 เดือนหลัง',
    period: 'รอบที่ 2 (5 เดือนหลัง)',
    deadline: '10 ส.ค. 70',
    webUploaded: false,
    webUploadDate: '',
    webUrl: '',
    docUploaded: false,
    docUploadDate: '',
    note: 'อปท. ผ่านการประเมินรับรองเป็นเมืองสุขภาพดี'
  }
];

// สถานะการทำงาน
let kpiList = [];
let checklistList = [];
let searchQuery = '';
let staffSearchQuery = '';
let checklistFilter = 'ALL';
let gasWebAppUrl = localStorage.getItem(STORAGE_KEY_GAS_URL) || '';

// ==========================================
// การคำนวณคะแนนตัวชี้วัด (เริ่มต้นยังไม่มีค่า)
// ==========================================
function calculateKpiMetrics(kpi) {
  const target = parseFloat(kpi.target) || 0;
  const actual = parseFloat(kpi.actual) || 0;
  const weight = parseFloat(kpi.weight) || 0;

  // ถ้ายังไม่มีผลงานจริง (actual <= 0)
  if (actual <= 0) {
    return {
      progressPercent: 0,
      clampedPercent: 0,
      score: 0.0,
      weightedScore: 0.0,
      currentLevelInt: 0,
      statusKey: 'waiting',
      statusText: 'รอผลการดำเนินงาน'
    };
  }

  const progressPercent = target > 0 ? (actual / target) * 100 : 0;
  const l1 = parseFloat(kpi.level1) || 1;
  const l5 = parseFloat(kpi.level5) || 5;

  let score = 1.0;
  if (actual >= target) {
    score = 5.0;
  } else {
    score = 1.0 + (progressPercent / 100) * 4.0;
  }
  score = Math.min(5.0, Math.max(0, score));
  const weightedScore = (score * weight) / 100;

  let statusKey = 'ontrack';
  let statusText = 'กำลังดำเนินการ';
  if (score >= 4.5 || progressPercent >= 100) {
    statusKey = 'achieved';
    statusText = 'บรรลุเป้าหมาย';
  } else if (score >= 3.0 || progressPercent >= 70) {
    statusKey = 'ontrack';
    statusText = 'เป็นไปตามแผน';
  } else {
    statusKey = 'warning';
    statusText = 'ต้องเร่งรัด';
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
// การโหลดและบันทึกข้อมูล
// ==========================================
function updateSyncBadge(text) {
  const label = document.getElementById('syncStatusText');
  if (label) label.textContent = text;
}

function saveToLocalCache() {
  localStorage.setItem(STORAGE_KEY_DATA, JSON.stringify(kpiList));
  localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(checklistList));
}

function initializeData() {
  // โหลดตัวชี้วัด (ใช้ DEFAULT_KPI_DATA เสมอ เพื่อให้เป็น 2 ตัวชี้วัดตามเอกสารใหม่)
  const cached = localStorage.getItem(STORAGE_KEY_DATA);
  if (cached) {
    try {
      const parsed = JSON.parse(cached);
      // ถ้าเป็นชุดข้อมูลเก่าที่มีมากกว่า 2 ตัวชี้วัด ให้รีเซ็ตเป็น 2 ตัวใหม่ตามข้อ 1
      if (Array.isArray(parsed) && parsed.length === 2 && (parsed[0].code.includes('3.26') || parsed[0].code.includes('3.27'))) {
        kpiList = parsed;
      } else {
        kpiList = JSON.parse(JSON.stringify(DEFAULT_KPI_DATA));
      }
    } catch (e) {
      kpiList = JSON.parse(JSON.stringify(DEFAULT_KPI_DATA));
    }
  } else {
    kpiList = JSON.parse(JSON.stringify(DEFAULT_KPI_DATA));
  }

  // โหลด Checklist
  const cachedChecklist = localStorage.getItem(STORAGE_KEY_CHECKLIST);
  if (cachedChecklist) {
    try {
      checklistList = JSON.parse(cachedChecklist);
    } catch (e) {
      checklistList = JSON.parse(JSON.stringify(DEFAULT_CHECKLIST_DATA));
    }
  } else {
    checklistList = JSON.parse(JSON.stringify(DEFAULT_CHECKLIST_DATA));
  }

  saveToLocalCache();
  updateSyncBadge('พร้อมใช้งาน');
  renderAll();
}

function renderAll() {
  renderExecutiveDashboard();
  renderStaffTable();
  renderChecklistTable();
  updateLastUpdatedTime();
}

function updateLastUpdatedTime() {
  const el = document.getElementById('lastSyncTime');
  if (!el) return;
  const now = new Date();
  el.textContent = now.toLocaleTimeString('th-TH', { hour: '2-digit', minute: '2-digit' }) + ' น.';
}

// ==========================================
// หน้า 1: สำหรับผู้บริหาร
// ==========================================
function renderExecutiveDashboard() {
  let totalWeight = 0;
  let weightedScoreSum = 0;
  let weightedProgressSum = 0;
  let countAchieved = 0;
  let countOnTrack = 0;
  let countWarning = 0;
  let countWaiting = 0;

  kpiList.forEach(kpi => {
    const m = calculateKpiMetrics(kpi);
    const w = parseFloat(kpi.weight) || 0;
    totalWeight += w;
    weightedScoreSum += m.score * w;
    weightedProgressSum += m.clampedPercent * w;

    if (m.statusKey === 'achieved') countAchieved++;
    else if (m.statusKey === 'ontrack') countOnTrack++;
    else if (m.statusKey === 'warning') countWarning++;
    else countWaiting++;
  });

  const avgProgress = totalWeight > 0 ? (weightedProgressSum / totalWeight) : 0;
  const avgScore = totalWeight > 0 ? (weightedScoreSum / totalWeight) : 0;

  setText('heroOverallPercent', avgProgress.toFixed(1));
  setText('heroOverallScore', avgScore.toFixed(2));
  setText('heroTotalCount', kpiList.length);
  setText('heroAchievedCount', countAchieved);
  setText('heroOnTrackCount', countOnTrack);
  setText('heroWarningCount', countWaiting);
  setText('heroTotalWeight', totalWeight.toFixed(0));

  const heroBar = document.getElementById('heroOverallProgressBar');
  if (heroBar) heroBar.style.width = `${Math.min(100, avgProgress)}%`;

  // Radial Gauge
  const gaugeCircle = document.getElementById('radialGaugeCircle');
  if (gaugeCircle) {
    const circumference = 565.48;
    const offset = circumference - (Math.min(100, avgProgress) / 100) * circumference;
    gaugeCircle.style.strokeDashoffset = offset;
  }
  setText('gaugeCenterPercent', `${avgProgress.toFixed(1)}%`);
  setText('gaugeScorePill', `${avgScore.toFixed(2)} / 5.00`);
  setText('gaugeWeightPill', `${totalWeight.toFixed(0)}%`);

  // สัดส่วนสถานะ
  renderStatusDistribution(countAchieved, countOnTrack, countWaiting, kpiList.length);

  // การ์ดตัวชี้วัดผู้บริหาร
  renderKpiCardsGrid();
}

function renderStatusDistribution(achieved, ontrack, waiting, total) {
  const container = document.getElementById('statusDistributionPanel');
  if (!container) return;
  const safeTotal = Math.max(total, 1);
  const rows = [
    { label: 'บรรลุเป้าหมาย (ระดับ 4.5 ถึง 5.0)', count: achieved, color: '#059669', pct: (achieved / safeTotal) * 100 },
    { label: 'เป็นไปตามแผน (ระดับ 3.0 ถึง 4.4)', count: ontrack, color: '#2563eb', pct: (ontrack / safeTotal) * 100 },
    { label: 'รอผลการดำเนินงาน (ต้นปีงบประมาณ)', count: waiting, color: '#627d98', pct: (waiting / safeTotal) * 100 }
  ];

  container.innerHTML = rows.map(r => `
    <div style="margin-bottom: 0.95rem;">
      <div style="display:flex; justify-content:space-between; font-size:0.92rem; margin-bottom:0.35rem;">
        <span>${r.label}</span>
        <strong style="font-family:var(--font-mono); color:${r.color}">${r.count} รายการ</strong>
      </div>
      <div class="cyber-progress-track" style="height:9px;">
        <div style="height:100%; width:${r.pct}%; background:${r.color}; border-radius:999px;"></div>
      </div>
    </div>
  `).join('');
}

function renderKpiCardsGrid() {
  const grid = document.getElementById('executiveKpiGrid');
  if (!grid) return;

  const q = searchQuery.trim().toLowerCase();
  const filtered = kpiList.filter(k => {
    return !q ||
      String(k.code).toLowerCase().includes(q) ||
      String(k.name).toLowerCase().includes(q) ||
      String(k.owner).toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    grid.innerHTML = `
      <div class="glass-panel" style="grid-column: 1 / -1; text-align:center; padding: 3rem;">
        <p style="font-size:1.15rem; color:var(--text-muted);">ไม่พบรายการตัวชี้วัด</p>
      </div>
    `;
    return;
  }

  grid.innerHTML = filtered.map(kpi => {
    const m = calculateKpiMetrics(kpi);
    const levels = [1, 2, 3, 4, 5];

    const stepperHtml = levels.map(lv => {
      let cls = 'level-step';
      if (lv === m.currentLevelInt) cls += ' current-level';
      else if (lv < m.currentLevelInt) cls += ' reached';
      return `<div class="${cls}">ระดับ ${lv}</div>`;
    }).join('');

    let evidenceHtml = '';
    if (kpi.evidenceUrl) {
      evidenceHtml = `<a href="${escapeAttr(kpi.evidenceUrl)}" target="_blank" rel="noopener" class="btn btn-sm" style="color:var(--accent-blue); text-decoration:none;">🔗 ${escapeHtml(kpi.evidenceName || 'เปิดเอกสารหลักฐาน')}</a>`;
    } else if (kpi.evidenceName) {
      evidenceHtml = `<span style="color:var(--accent-blue);">📄 ${escapeHtml(kpi.evidenceName)}</span>`;
    }

    return `
      <article class="kpi-card">
        <div>
          <div class="kpi-card-top">
            <div class="kpi-code-group">
              <span class="kpi-code-badge">${escapeHtml(kpi.code)}</span>
              <span class="kpi-dimension-tag">น้ำหนัก ${kpi.weight}%</span>
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
              <div class="metric-val highlight-blue">${kpi.actual > 0 ? formatNum(kpi.actual) : 'ยังไม่มีค่า'}</div>
              <div class="metric-unit-small">${kpi.actual > 0 ? escapeHtml(kpi.unit) : 'รอรายงาน'}</div>
            </div>
            <div class="metric-col">
              <div class="metric-label">ความสำเร็จ</div>
              <div class="metric-val highlight-blue">${m.progressPercent}%</div>
              <div class="metric-unit-small">ระดับ ${m.score.toFixed(2)}</div>
            </div>
          </div>

          <div>
            <div style="display:flex; justify-content:space-between; font-size:0.82rem; color:var(--text-secondary); margin-bottom:0.25rem;">
              <span>ความก้าวหน้า</span>
              <span style="font-family:var(--font-mono); font-weight:700; color:var(--accent-blue);">${m.progressPercent}%</span>
            </div>
            <div class="cyber-progress-track">
              <div class="cyber-progress-fill" style="width:${m.clampedPercent}%"></div>
            </div>
          </div>

          <div class="level-stepper" title="เกณฑ์การให้คะแนน 5 ระดับ">
            ${stepperHtml}
          </div>
        </div>

        <div class="kpi-card-footer">
          <span>ผู้รับผิดชอบ: ${escapeHtml(kpi.owner)}</span>
          ${evidenceHtml}
        </div>
      </article>
    `;
  }).join('');
}

// ==========================================
// หน้า 2: สำหรับเจ้าหน้าที่ (บันทึกข้อมูล/แก้ไข)
// ==========================================
function renderStaffTable() {
  const tbody = document.getElementById('staffTableBody');
  if (!tbody) return;

  const q = staffSearchQuery.trim().toLowerCase();
  const filtered = kpiList.filter(k => {
    return !q ||
      String(k.code).toLowerCase().includes(q) ||
      String(k.name).toLowerCase().includes(q) ||
      String(k.owner).toLowerCase().includes(q);
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="8" style="text-align:center; padding:2rem; color:var(--text-muted);">ไม่พบข้อมูลตัวชี้วัด</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(kpi => {
    const m = calculateKpiMetrics(kpi);

    let fileDisplay = '';
    if (kpi.evidenceUrl) {
      fileDisplay = `<a href="${escapeAttr(kpi.evidenceUrl)}" target="_blank" style="color:var(--accent-blue); font-weight:600; text-decoration:none;">🔗 ${escapeHtml(kpi.evidenceName || 'เปิดดูลิงก์')}</a>`;
    } else if (kpi.evidenceName) {
      fileDisplay = `<span>📄 ${escapeHtml(kpi.evidenceName)}</span>`;
    }

    return `
      <tr>
        <td><span class="kpi-code-badge">${escapeHtml(kpi.code)}</span></td>
        <td>
          <div style="font-weight:600; color:var(--text-primary); margin-bottom:0.2rem;">${escapeHtml(kpi.name)}</div>
          <div style="font-size:0.82rem; color:var(--text-muted);">ผู้รับผิดชอบ: ${escapeHtml(kpi.owner)}</div>
        </td>
        <td style="text-align:center; font-family:var(--font-mono);">${kpi.weight}%</td>
        <td style="text-align:right; font-family:var(--font-mono); font-weight:600;">${formatNum(kpi.target)} ${escapeHtml(kpi.unit)}</td>
        <td style="text-align:right;">
          <input
            type="number"
            step="any"
            class="quick-input"
            value="${kpi.actual > 0 ? kpi.actual : ''}"
            placeholder="0"
            onchange="quickUpdateActual('${escapeAttr(kpi.id)}', this.value)"
            title="พิมพ์ตัวเลขแล้วกด Enter เพื่อบันทึก"
          />
        </td>
        <td style="text-align:center;">
          <div style="font-family:var(--font-mono); font-weight:700; color:var(--accent-blue);">${m.progressPercent}%</div>
          <div style="font-size:0.78rem; color:var(--text-muted);">ระดับ ${m.score.toFixed(2)}</div>
        </td>
        <td>
          <span class="kpi-status-badge status-${m.statusKey}">${m.statusText}</span>
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:0.35rem;">
            ${fileDisplay}
            <button class="btn btn-sm" onclick="openKpiModal('${escapeAttr(kpi.id)}')">
              ✏️ แก้ไข / แนบหลักฐาน
            </button>
          </div>
        </td>
      </tr>
    `;
  }).join('');
}

function quickUpdateActual(kpiId, newValue) {
  const idx = kpiList.findIndex(k => String(k.id) === String(kpiId));
  if (idx === -1) return;
  kpiList[idx].actual = parseFloat(newValue) || 0;
  kpiList[idx].updatedAt = new Date().toISOString();

  saveToLocalCache();
  renderAll();
  showToast(`บันทึกตัวเลขผลงาน ${kpiList[idx].code} สำเร็จ`, 'blue');
}

// โมดัลแก้ไขตัวชี้วัด และการเลือกแนบไฟล์หรือลิงก์
let selectedEvidenceType = 'link';

function switchEvidenceType(type) {
  selectedEvidenceType = type;
  document.querySelectorAll('.evidence-toggle-btn').forEach(btn => btn.classList.remove('active'));
  if (type === 'file') {
    document.getElementById('evidenceToggleFile').classList.add('active');
    document.getElementById('evidenceFileSection').style.display = 'block';
    document.getElementById('evidenceLinkSection').style.display = 'none';
  } else {
    document.getElementById('evidenceToggleLink').classList.add('active');
    document.getElementById('evidenceFileSection').style.display = 'none';
    document.getElementById('evidenceLinkSection').style.display = 'block';
  }
}

function openKpiModal(kpiId) {
  const modal = document.getElementById('kpiFormModal');
  const kpi = kpiList.find(k => String(k.id) === String(kpiId));
  if (!kpi) return;

  document.getElementById('kpiModalTitle').textContent = `แก้ไขข้อมูล: ${kpi.code}`;
  document.getElementById('f_id').value = kpi.id;
  document.getElementById('f_code').value = kpi.code;
  document.getElementById('f_name').value = kpi.name;
  document.getElementById('f_weight').value = kpi.weight;
  document.getElementById('f_target').value = kpi.target;
  document.getElementById('f_actual').value = kpi.actual > 0 ? kpi.actual : '';
  document.getElementById('f_owner').value = kpi.owner;
  document.getElementById('f_evidenceUrl').value = kpi.evidenceUrl || '';
  document.getElementById('f_evidenceName').value = kpi.evidenceName || '';
  document.getElementById('f_note').value = kpi.note || '';

  if (kpi.evidenceType === 'file') {
    switchEvidenceType('file');
  } else {
    switchEvidenceType('link');
  }

  modal.classList.add('open');
}

function closeKpiModal() {
  document.getElementById('kpiFormModal').classList.remove('open');
}

function handleSaveKpiForm(event) {
  event.preventDefault();
  const idVal = document.getElementById('f_id').value;
  const idx = kpiList.findIndex(k => String(k.id) === String(idVal));
  if (idx === -1) return;

  kpiList[idx].name = document.getElementById('f_name').value.trim();
  kpiList[idx].weight = parseFloat(document.getElementById('f_weight').value) || 0;
  kpiList[idx].target = parseFloat(document.getElementById('f_target').value) || 0;
  kpiList[idx].actual = parseFloat(document.getElementById('f_actual').value) || 0;
  kpiList[idx].owner = document.getElementById('f_owner').value.trim();
  kpiList[idx].evidenceType = selectedEvidenceType;
  kpiList[idx].evidenceUrl = document.getElementById('f_evidenceUrl').value.trim();
  kpiList[idx].evidenceName = document.getElementById('f_evidenceName').value.trim();
  kpiList[idx].note = document.getElementById('f_note').value.trim();
  kpiList[idx].updatedAt = new Date().toISOString();

  saveToLocalCache();
  closeKpiModal();
  renderAll();
  showToast(`บันทึกข้อมูล ${kpiList[idx].code} สำเร็จ`, 'blue');
}

function handleModalFileUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  document.getElementById('f_evidenceName').value = file.name;
  if (!document.getElementById('f_evidenceUrl').value) {
    document.getElementById('f_evidenceUrl').value = URL.createObjectURL(file);
  }
  showToast(`เลือกไฟล์ "${file.name}" เรียบร้อย`, 'blue');
}

// ==========================================
// หน้า 3: Checklist เจ้าหน้าที่บริหารยุทธศาสตร์
// ==========================================
function renderChecklistTable() {
  const tbody = document.getElementById('checklistTableBody');
  if (!tbody) return;

  let totalTasks = checklistList.length;
  let webDone = 0;
  let docDone = 0;

  checklistList.forEach(item => {
    if (item.webUploaded) webDone++;
    if (item.docUploaded) docDone++;
  });

  setText('chkTotalCount', totalTasks);
  setText('chkWebCount', `${webDone} / ${totalTasks}`);
  setText('chkDocCount', `${docDone} / ${totalTasks}`);

  const filtered = checklistList.filter(item => {
    if (checklistFilter === 'ALL') return true;
    return item.kpiCode.includes(checklistFilter);
  });

  tbody.innerHTML = filtered.map(item => {
    return `
      <tr>
        <td style="font-weight:600;"><span class="kpi-code-badge">${escapeHtml(item.kpiCode)}</span></td>
        <td>
          <div style="font-weight:600; color:var(--text-primary); margin-bottom:0.15rem;">${escapeHtml(item.title)}</div>
          <div style="font-size:0.8rem; color:var(--text-muted);">${escapeHtml(item.period)}</div>
        </td>
        <td style="font-family:var(--font-mono); font-weight:600; color:var(--accent-blue); white-space:nowrap;">
          📅 ${escapeHtml(item.deadline)}
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:0.35rem;">
            <label style="display:inline-flex; align-items:center; gap:0.4rem; cursor:pointer; font-size:0.9rem;">
              <input type="checkbox" class="checkbox-custom" ${item.webUploaded ? 'checked' : ''} onchange="toggleChecklistWeb('${item.id}', this.checked)" />
              <span>${item.webUploaded ? '<strong style="color:var(--accent-emerald)">อัปโหลดแล้ว</strong>' : 'ยังไม่อัปโหลด'}</span>
            </label>
            <input type="date" class="date-input" value="${item.webUploadDate || ''}" onchange="updateChecklistWebDate('${item.id}', this.value)" title="ระบุวันที่อัปโหลดลงเว็บหน่วยงาน" />
          </div>
        </td>
        <td>
          <div style="display:flex; flex-direction:column; gap:0.35rem;">
            <label style="display:inline-flex; align-items:center; gap:0.4rem; cursor:pointer; font-size:0.9rem;">
              <input type="checkbox" class="checkbox-custom" ${item.docUploaded ? 'checked' : ''} onchange="toggleChecklistDoc('${item.id}', this.checked)" />
              <span>${item.docUploaded ? '<strong style="color:var(--accent-emerald)">อัปโหลดแล้ว</strong>' : 'ยังไม่อัปโหลด'}</span>
            </label>
            <input type="date" class="date-input" value="${item.docUploadDate || ''}" onchange="updateChecklistDocDate('${item.id}', this.value)" title="ระบุวันที่อัปโหลดลงระบบ DOC" />
          </div>
        </td>
        <td>
          <input
            type="text"
            class="form-control"
            style="font-size:0.86rem; padding:0.4rem 0.6rem;"
            value="${escapeHtml(item.note)}"
            placeholder="ระบุหมายเหตุ..."
            onchange="updateChecklistNote('${item.id}', this.value)"
          />
        </td>
      </tr>
    `;
  }).join('');
}

function filterChecklist(kpiCode) {
  checklistFilter = kpiCode;
  document.querySelectorAll('.checklist-pill').forEach(btn => btn.classList.remove('active'));
  if (kpiCode === 'ALL') document.getElementById('pillChkAll').classList.add('active');
  else if (kpiCode === '3.26') document.getElementById('pillChk326').classList.add('active');
  else if (kpiCode === '3.27') document.getElementById('pillChk327').classList.add('active');
  renderChecklistTable();
}

function toggleChecklistWeb(id, checked) {
  const item = checklistList.find(x => x.id === id);
  if (!item) return;
  item.webUploaded = checked;
  if (checked && !item.webUploadDate) {
    item.webUploadDate = new Date().toISOString().slice(0, 10);
  }
  saveToLocalCache();
  renderChecklistTable();
  showToast('อัปเดตสถานะเว็บหน่วยงานสำเร็จ', 'blue');
}

function updateChecklistWebDate(id, dateStr) {
  const item = checklistList.find(x => x.id === id);
  if (!item) return;
  item.webUploadDate = dateStr;
  if (dateStr) item.webUploaded = true;
  saveToLocalCache();
  renderChecklistTable();
}

function toggleChecklistDoc(id, checked) {
  const item = checklistList.find(x => x.id === id);
  if (!item) return;
  item.docUploaded = checked;
  if (checked && !item.docUploadDate) {
    item.docUploadDate = new Date().toISOString().slice(0, 10);
  }
  saveToLocalCache();
  renderChecklistTable();
  showToast('อัปเดตสถานะระบบ DOC สำเร็จ', 'blue');
}

function updateChecklistDocDate(id, dateStr) {
  const item = checklistList.find(x => x.id === id);
  if (!item) return;
  item.docUploadDate = dateStr;
  if (dateStr) item.docUploaded = true;
  saveToLocalCache();
  renderChecklistTable();
}

function updateChecklistNote(id, noteText) {
  const item = checklistList.find(x => x.id === id);
  if (!item) return;
  item.note = noteText;
  saveToLocalCache();
}

// ==========================================
// การควบคุมหน้าจอและเมนู
// ==========================================
function switchPage(pageId) {
  document.querySelectorAll('.page-view').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.nav-tab-btn').forEach(b => b.classList.remove('active'));

  const targetPage = document.getElementById(`page-${pageId}`);
  const targetTab = document.getElementById(`tab-btn-${pageId}`);
  if (targetPage) targetPage.classList.add('active');
  if (targetTab) targetTab.classList.add('active');
}

// 4. ปุ่มเต็มจอ
function toggleFullscreen() {
  document.body.classList.toggle('projector-mode');
  if (!document.fullscreenElement) {
    if (document.documentElement.requestFullscreen) {
      document.documentElement.requestFullscreen().catch(() => {});
    }
    showToast('เปิดโหมดเต็มจอ', 'blue');
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen().catch(() => {});
    }
    showToast('ออกจากโหมดเต็มจอ', 'blue');
  }
}

// ==========================================
// เครื่องมือตัวช่วย
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
  if (str === undefined || str === null) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function escapeAttr(str) {
  if (str === undefined || str === null) return '';
  return String(str).replace(/'/g, "\\'").replace(/"/g, '&quot;');
}

function showToast(message, color = 'blue') {
  const container = document.getElementById('toastContainer');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<span>✨</span><span>${escapeHtml(message)}</span>`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

window.addEventListener('DOMContentLoaded', () => {
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

  initializeData();
});
