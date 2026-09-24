const REGISTRATION_OPEN = false;
/* ============================================================
   AMAGDARI · SCRIPT
   ============================================================ */

/* ============================================================
   🎨 APPLE TOUCH ICON — Canvas → PNG
   ============================================================ */
(function generateAppleIcon(){
  function drawIcon(size, cb) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    const s = size;

    const bgGrad = ctx.createLinearGradient(0, 0, s, s);
    bgGrad.addColorStop(0, '#1b1436');
    bgGrad.addColorStop(1, '#0a0812');
    ctx.fillStyle = bgGrad;

    const r = s * 0.22;
    ctx.beginPath();
    ctx.moveTo(r, 0);
    ctx.lineTo(s - r, 0);
    ctx.quadraticCurveTo(s, 0, s, r);
    ctx.lineTo(s, s - r);
    ctx.quadraticCurveTo(s, s, s - r, s);
    ctx.lineTo(r, s);
    ctx.quadraticCurveTo(0, s, 0, s - r);
    ctx.lineTo(0, r);
    ctx.quadraticCurveTo(0, 0, r, 0);
    ctx.closePath();
    ctx.fill();

    ctx.strokeStyle = 'rgba(212,162,76,0.35)';
    ctx.lineWidth = s * 0.011;
    ctx.beginPath();
    ctx.arc(s/2, s/2, s * 0.41, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(212,162,76,0.2)';
    ctx.lineWidth = s * 0.008;
    ctx.setLineDash([s * 0.028, s * 0.045]);
    ctx.beginPath();
    ctx.arc(s/2, s/2, s * 0.335, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    const goldGrad = ctx.createLinearGradient(s * 0.27, s * 0.12, s * 0.73, s * 0.88);
    goldGrad.addColorStop(0, '#f0cd8a');
    goldGrad.addColorStop(0.5, '#d4a24c');
    goldGrad.addColorStop(1, '#a97a2e');
    ctx.fillStyle = goldGrad;
    ctx.beginPath();
    ctx.moveTo(s/2, s * 0.12);
    ctx.lineTo(s * 0.74, s/2);
    ctx.lineTo(s/2, s * 0.88);
    ctx.lineTo(s * 0.26, s/2);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = '#0d0a17';
    ctx.beginPath();
    ctx.arc(s/2, s/2, s * 0.11, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = 'rgba(240,205,138,0.85)';
    ctx.lineWidth = s * 0.011;
    ctx.beginPath();
    ctx.arc(s/2, s/2, s * 0.11, 0, Math.PI * 2);
    ctx.stroke();

    cb(canvas.toDataURL('image/png'));
  }

  drawIcon(180, (png180) => {
    const el180 = document.getElementById('appleTouchIcon180');
    const el152 = document.getElementById('appleTouchIcon152');
    const el120 = document.getElementById('appleTouchIcon120');
    const elDef = document.getElementById('appleTouchIconDefault');
    if (el180) el180.href = png180;
    if (el152) el152.href = png180;
    if (el120) el120.href = png180;
    if (elDef) elDef.href = png180;

    const link192 = document.createElement('link');
    link192.rel = 'apple-touch-icon-precomposed';
    link192.href = png180;
    document.head.appendChild(link192);
  });
})();

/* ============================================================
   iOS: prevent double-tap zoom & gesture zoom
   ============================================================ */
(function(){
  let lastTouch = 0;
  document.addEventListener('touchend', function(e){
    const now = Date.now();
    if (now - lastTouch <= 300) {
      e.preventDefault();
    }
    lastTouch = now;
  }, { passive: false });

  document.addEventListener('gesturestart', function(e){ e.preventDefault(); });
  document.addEventListener('gesturechange', function(e){ e.preventDefault(); });
  document.addEventListener('gestureend', function(e){ e.preventDefault(); });
})();

/* ============================================================
   FIREBASE
   ============================================================ */
const firebaseConfig = {
  apiKey: "AIzaSyAkoL-ESuyownPJ6YLgELZvCOEN31PN_1M",
  authDomain: "amagdari-34610.firebaseapp.com",
  databaseURL: "https://amagdari-34610-default-rtdb.firebaseio.com",
  projectId: "amagdari-34610",
  storageBucket: "amagdari-34610.firebasestorage.app",
  messagingSenderId: "226907551797",
  appId: "1:226907551797:web:159f6d7d7ef97d8eb0997c"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.database();

/* ============================================================
   CONSTANTS
   ============================================================ */
const MEMBER_ORDER = ['gurika', 'barbare', 'anastasia', 'neliko'];
const MEMBERS = {
  gurika:    { name: 'Gurika Kartvelishvili',  initial: 'G', isDev: true,  adminPassword: 'kali' },
  barbare:   { name: 'Barbare Karchaidze',     initial: 'B' },
  anastasia: { name: 'Anastasia Bairamovi',    initial: 'A' },
  neliko:    { name: 'Neliko Tchurtchelauri',  initial: 'N' }
};
const FRAMES = [
  { id: 'gold', label: 'ოქრო' }, { id: 'silver', label: 'ვერცხლი' },
  { id: 'bronze', label: 'ბრინჯაო' }, { id: 'emerald', label: 'ზურმუხტი' },
  { id: 'crimson', label: 'სისხლი' }, { id: 'purple', label: 'ია' },
  { id: 'diamond', label: 'ალმასი' }, { id: 'flame', label: 'ალი' },
  { id: 'wave', label: 'ტალღა' }, { id: 'rune', label: 'რუნა' },
  { id: 'tribal', label: 'ტომობრივი' }, { id: 'void', label: 'სიცარიელე' }
];
const DEFAULT_NICK = {
  gurika: 'დეველოპერი', barbare: 'გუნდის წევრი',
  anastasia: 'გუნდის წევრი', neliko: 'გუნდის წევრი'
};
const EDITABLE_FIELDS = {
  heroText: 'მთავარი გვერდის ტექსტი',
  storyIntro: 'ამბის შესავალი ტექსტი',
  story1: 'I სცენა — როშკა',
  story2: 'II სცენა — დევის თავდასხმა',
  story3: 'III სცენა — გადაწყვეტილება',
  story4: 'IV სცენა — დაბრკოლება',
  story5: 'V სცენა — ბრძოლა ტბაში',
  story6: 'VI სცენა — მტრედად ქცევა'
};

const COMMENT_FORMSPREE_URL = 'https://formspree.io/f/xkjgzrpv';

let fbUser = null;
let fbProfile = null;
let membersSnapshot = {};
let siteContent = {};
let notifications = [];
let isGuest = false;
let lastFocused = null;

const $  = (s) => document.querySelector(s);
const $$ = (s) => document.querySelectorAll(s);
const esc = (s) => String(s || '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const phoneToEmail = (p) => String(p).replace(/\D/g, '') + '@amagdari.app';
const normalizePhone = (p) => String(p).replace(/\D/g, '');

function showToast(msg, type = '') {
  const t = $('#toast');
  t.textContent = msg;
  t.className = 'toast show ' + type;
  clearTimeout(showToast._t);
  showToast._t = setTimeout(() => t.classList.remove('show'), 2800);
}

function timeAgo(ts) {
  if (!ts) return '';
  const diff = Math.floor((Date.now() - ts) / 1000);
  if (diff < 60) return 'ახლახან';
  if (diff < 3600) return Math.floor(diff / 60) + ' წთ';
  if (diff < 86400) return Math.floor(diff / 3600) + ' სთ';
  return Math.floor(diff / 86400) + ' დღ';
}

function formatDate(ts) {
  if (!ts) return '—';
  const d = new Date(ts);
  const months = ['იანვარი','თებერვალი','მარტი','აპრილი','მაისი','ივნისი','ივლისი','აგვისტო','სექტემბერი','ოქტომბერი','ნოემბერი','დეკემბერი'];
  return `${d.getDate()} ${months[d.getMonth()]}, ${d.getFullYear()}`;
}

function resizePhoto(file, maxSize = 300) {
  return new Promise((resolve, reject) => {
    if (!file.type.startsWith('image/')) return reject(new Error('მხოლოდ სურათის ფაილი'));
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let { width, height } = img;
        if (width > height && width > maxSize) { height = Math.round(height * maxSize / width); width = maxSize; }
        else if (height > maxSize) { width = Math.round(width * maxSize / height); height = maxSize; }
        const canvas = document.createElement('canvas');
        canvas.width = width; canvas.height = height;
        canvas.getContext('2d').drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL('image/jpeg', 0.78));
      };
      img.onerror = () => reject(new Error('სურათის წაკითხვა ვერ მოხდა'));
      img.src = e.target.result;
    };
    reader.onerror = () => reject(new Error('ფაილის წაკითხვა ვერ მოხდა'));
    reader.readAsDataURL(file);
  });
}

/* STARS */
(function () {
  const wrap = $('#stars');
  if (!wrap) return;
  const count = window.innerWidth < 700 ? 45 : 95;
  const frag = document.createDocumentFragment();
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'star';
    const size = (Math.random() * 1.9 + 1).toFixed(1);
    s.style.width = size + 'px'; s.style.height = size + 'px';
    s.style.left = (Math.random() * 100).toFixed(2) + '%';
    s.style.top = (Math.random() * 100).toFixed(2) + '%';
    s.style.animationDelay = (Math.random() * 4).toFixed(2) + 's';
    s.style.animationDuration = (3 + Math.random() * 4).toFixed(2) + 's';
    frag.appendChild(s);
  }
  wrap.appendChild(frag);
})();

/* STORY TABS */
(function initStoryTabs(){
  const tabs = document.querySelectorAll('.story-tab');
  const panels = document.querySelectorAll('.story-panel');
  if (!tabs.length || !panels.length) return;

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const target = tab.dataset.tab;
      tabs.forEach(t => {
        const isActive = t === tab;
        t.classList.toggle('active', isActive);
        t.setAttribute('aria-selected', isActive ? 'true' : 'false');
      });
      panels.forEach(p => {
        p.classList.toggle('active', p.id === 'panel-' + target);
      });

      const activePanel = document.getElementById('panel-' + target);
      if (activePanel) {
        const hiddenItems = activePanel.querySelectorAll('.reveal:not(.visible)');
        hiddenItems.forEach((el, i) => {
          setTimeout(() => {
            el.classList.add('visible');
          }, i * 60);
        });
      }
    });
  });
})();

/* COMMENT FORM */
(function initCommentForm(){
  const form = $('#commentForm');
  if (!form) return;

  const status = $('#commentStatus');
  const submitBtn = $('#commentSubmit');
  const submitText = $('#commentSubmitText');
  const nameInput = $('#commentName');
  const messageInput = $('#commentMessage');

  function showStatus(type, msg) {
    status.className = 'comment-status show ' + type;
    const iconSvg = type === 'success'
      ? '<polyline points="20 6 9 17 4 12"/>'
      : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>';
    status.innerHTML = `<svg viewBox="0 0 24 24">${iconSvg}</svg><span>${esc(msg)}</span>`;
  }

  function clearStatus() {
    status.className = 'comment-status';
    status.innerHTML = '';
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    clearStatus();

    const name = nameInput.value.trim();
    const message = messageInput.value.trim();

    if (!message) {
      showStatus('error', 'კომენტარი ცარიელია — გთხოვ დაწერე რამე.');
      messageInput.focus();
      return;
    }
    if (message.length < 2) {
      showStatus('error', 'კომენტარი ძალიან მოკლეა.');
      messageInput.focus();
      return;
    }

    submitBtn.disabled = true;
    submitText.textContent = '⏳ იგზავნება...';

    try {
      const res = await fetch(COMMENT_FORMSPREE_URL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: name || '(ანონიმური)',
          message: message,
          _subject: 'ახალი კომენტარი — ამაგდარი',
          source: 'amagdari-site',
          sentAt: new Date().toISOString()
        })
      });

      if (res.ok) {
        showStatus('success', '✓ გმადლობთ! კომენტარი წარმატებით გაიგზავნა.');
        form.reset();
        submitText.textContent = 'გაგზავნა';
        submitBtn.disabled = false;
        setTimeout(() => clearStatus(), 6000);
      } else {
        const data = await res.json().catch(() => ({}));
        const errMsg = (data && data.errors && data.errors[0] && data.errors[0].message) || 'ვერ გაიგზავნა.';
        showStatus('error', 'შეცდომა: ' + errMsg);
        submitText.textContent = 'გაგზავნა';
        submitBtn.disabled = false;
      }
    } catch (ex) {
      console.error(ex);
      showStatus('error', 'კავშირის შეცდომა — სცადე თავიდან.');
      submitText.textContent = 'გაგზავნა';
      submitBtn.disabled = false;
    }
  });
})();

/* MEMBERS LISTENER */
db.ref('members').on('value', snap => {
  membersSnapshot = snap.val() || {};
  renderTeam();
  renderProfile();
  checkAllRegistered();
});

/* SITE CONTENT */
db.ref('siteContent').on('value', snap => {
  siteContent = snap.val() || {};
  applySiteContent();
});

function applySiteContent() {
  Object.keys(EDITABLE_FIELDS).forEach(key => {
    const el = document.querySelector(`[data-editable="${key}"]`);
    if (el && siteContent[key]) el.innerHTML = siteContent[key];
  });
}

/* RENDER TEAM */
function renderTeam() {
  const grid = $('#teamGrid');
  if (!grid) return;

  grid.innerHTML = MEMBER_ORDER.map(id => {
    const meta = MEMBERS[id];
    const m = membersSnapshot[id] || {};
    const displayName = m.displayName || meta.name;
    const nickname = m.nickname || DEFAULT_NICK[id];
    const frame = m.frame || 'gold';
    const photo = m.photo;
    const isDev = meta.isDev;

    const photoHtml = photo
      ? `<img src="${photo}" alt="" />`
      : `<span class="initial">${esc(meta.initial)}</span>`;

    return `
      <article class="card member${isDev ? ' dev' : ''} reveal">
        <div class="mem-top">
          <svg viewBox="0 0 120 14" aria-hidden="true">
            <line x1="0" y1="7" x2="42" y2="7" stroke="currentColor" stroke-width="0.8"/>
            <path d="M52 7 L57 2 L62 7 L57 12 Z" fill="none" stroke="currentColor" stroke-width="1"/>
            <circle cx="57" cy="7" r="1.2" fill="currentColor"/>
            <path d="M70 7 L73 4 L76 7 L73 10 Z" fill="currentColor"/>
            <line x1="78" y1="7" x2="120" y2="7" stroke="currentColor" stroke-width="0.8"/>
          </svg>
        </div>
        ${isDev ? `<span class="dev-badge"><svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>DEV</span>` : ''}
        <div class="avatar frame-${frame}">${photoHtml}</div>
        <h3 class="member-name">${esc(displayName)}</h3>
        <div class="mem-divider">
          <span class="d-line"></span>
          <svg class="d-shape" viewBox="0 0 10 10" aria-hidden="true">
            <path d="M5 0 L10 5 L5 10 L0 5 Z" fill="none" stroke="currentColor" stroke-width="1"/>
            <circle cx="5" cy="5" r="1.2" fill="currentColor"/>
          </svg>
          <span class="d-line"></span>
        </div>
        <p class="member-role">${esc(nickname)}</p>
        <div class="member-actions">
          <button class="member-profile-btn" data-member="${id}">
            პროფილის ნახვა
            <svg viewBox="0 0 24 24"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
          </button>
        </div>
      </article>
    `;
  }).join('');

  grid.querySelectorAll('[data-member]').forEach(btn => {
    btn.addEventListener('click', () => openMemberModal(btn.dataset.member));
  });

  const items = grid.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          entry.target.style.transitionDelay = (i * 90) + 'ms';
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });
    items.forEach(el => io.observe(el));
  } else {
    items.forEach(el => el.classList.add('visible'));
  }
}

/* MEMBER MODAL */
function openMemberModal(memberId) {
  const meta = MEMBERS[memberId];
  if (!meta) return;

  const m = membersSnapshot[memberId] || {};
  const displayName = m.displayName || meta.name;
  const nickname = m.nickname || DEFAULT_NICK[memberId];
  const frame = m.frame || 'gold';
  const photo = m.photo;
  const bio = m.bio || '';
  const createdAt = m.claimedAt || m.createdAt || null;
  const isDev = meta.isDev;

  const photoHtml = photo
    ? `<img src="${photo}" alt="" />`
    : `<span class="initial">${esc(meta.initial)}</span>`;

  const badgesHtml = `
    ${isDev ? `<span class="member-modal-badge dev"><svg viewBox="0 0 24 24"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>DEVELOPER</span>` : ''}
    <span class="member-modal-badge"><svg viewBox="0 0 24 24"><path d="M12 2 L15 8 L22 9 L17 14 L18 21 L12 18 L6 21 L7 14 L2 9 L9 8 Z"/></svg>გუნდის წევრი</span>
  `;

  const bioSection = bio
    ? `<div class="member-section">
         <h3 class="member-section-title">
           <svg viewBox="0 0 24 24"><path d="M4 4 h12 a4 4 0 0 1 4 4 v12 h-12 a4 4 0 0 1 -4 -4 z"/><line x1="4" y1="4" x2="4" y2="20"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/></svg>
           ჩემ შესახებ
         </h3>
         <div class="member-bio">${esc(bio)}</div>
       </div>`
    : `<div class="member-section">
         <h3 class="member-section-title">
           <svg viewBox="0 0 24 24"><path d="M4 4 h12 a4 4 0 0 1 4 4 v12 h-12 a4 4 0 0 1 -4 -4 z"/><line x1="4" y1="4" x2="4" y2="20"/></svg>
           ჩემ შესახებ
         </h3>
         <div class="member-bio empty">ჯერ არაფერი დაუწერია</div>
       </div>`;

  $('#memberModalBox').innerHTML = `
    <div class="member-modal-header${isDev ? ' dev-mode' : ''}">
      <button class="member-modal-close" data-member-close aria-label="დახურვა">
        <svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>

      <div class="member-modal-avatar frame-${frame}">${photoHtml}</div>

      <h2 class="member-modal-name">${esc(displayName)}</h2>
      <p class="member-modal-nick">${esc(nickname)}</p>
      <div class="member-modal-badges">${badgesHtml}</div>
    </div>

    <div class="member-modal-body">
      <div class="member-stats">
        <div class="member-stat">
          <div class="member-stat-icon">
            <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><polyline points="12 7 12 12 15 15"/></svg>
          </div>
          <div class="member-stat-label">გაწევრიანდა</div>
          <div class="member-stat-value">${createdAt ? formatDate(createdAt) : '—'}</div>
        </div>
        <div class="member-stat">
          <div class="member-stat-icon">
            <svg viewBox="0 0 24 24"><path d="M12 2 L15 8 L22 9 L17 14 L18 21 L12 18 L6 21 L7 14 L2 9 L9 8 Z"/></svg>
          </div>
          <div class="member-stat-label">სტატუსი</div>
          <div class="member-stat-value">${isDev ? 'დეველოპერი' : 'წევრი'}</div>
        </div>
      </div>

      ${bioSection}

      <div class="member-section">
        <h3 class="member-section-title">
          <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 3 v18 M3 12 h18"/></svg>
          ინფორმაცია
        </h3>
        <div class="member-info-list">
          <div class="member-info-row">
            <span class="member-info-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4.4 3.6-7 8-7s8 2.6 8 7"/></svg>
            </span>
            <div>
              <div class="member-info-label">სახელი</div>
              <div class="member-info-value">${esc(displayName)}</div>
            </div>
          </div>
          <div class="member-info-row">
            <span class="member-info-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15 Q10 12 12 12 Q14 12 16 15"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/></svg>
            </span>
            <div>
              <div class="member-info-label">ნიკნეიმი</div>
              <div class="member-info-value">${esc(nickname)}</div>
            </div>
          </div>
          <div class="member-info-row">
            <span class="member-info-icon">
              <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg>
            </span>
            <div>
              <div class="member-info-label">ჩარჩო</div>
              <div class="member-info-value">${esc(FRAMES.find(f => f.id === frame)?.label || 'ოქრო')}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  $('#memberModalBox').querySelectorAll('[data-member-close]').forEach(el => {
    el.addEventListener('click', closeMemberModal);
  });

  lastFocused = document.activeElement;
  $('#memberModal').classList.add('open');
  $('#memberModal').setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';

  const closeBtn = $('#memberModalBox').querySelector('.member-modal-close');
  if (closeBtn) setTimeout(() => closeBtn.focus(), 150);
}

function closeMemberModal() {
  $('#memberModal').classList.remove('open');
  $('#memberModal').setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
  if (lastFocused) lastFocused.focus();
}

function checkAllRegistered() {
  const allTaken = MEMBER_ORDER.every(id => membersSnapshot[id] && membersSnapshot[id].claimedBy);
  const gate = $('#authGate');
  const loginBtn = $('#loginBtn');
  const nav = $('#bottomNav');

  if (allTaken && !fbUser && !isGuest) {
    gate.classList.add('hidden');
    $('#mainSite').classList.add('visible');
    document.body.classList.remove('no-nav');
    loginBtn.classList.remove('hidden');
    nav.classList.add('hidden');
  }
}

/* AUTH STATE */
auth.onAuthStateChanged(async (user) => {
  fbUser = user;

  if (user) {
    isGuest = false;
    const snap = await db.ref('users/' + user.uid).once('value');
    fbProfile = snap.val() || {};

    db.ref('users/' + user.uid).on('value', s => {
      fbProfile = s.val() || {};
      afterAuthReady();
    });

    db.ref('notifications/' + user.uid).on('value', s => {
      const val = s.val() || {};
      notifications = Object.keys(val).map(k => ({ id: k, ...val[k] }))
        .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
      renderNotifBadge();
      renderNotifList();
    });
  } else {
    fbProfile = null;
    notifications = [];
    afterAuthReady();
  }
});

function afterAuthReady() {
  if (fbUser && fbProfile && fbProfile.memberId) {
    $('#authGate').classList.add('hidden');
    $('#mainSite').classList.add('visible');
    $('#loginBtn').classList.add('hidden');
    $('#notifBtn').classList.remove('hidden');
    $('#bottomNav').classList.remove('hidden');
    document.body.classList.remove('no-nav');
    renderProfile();
    renderEditor();
    renderNotifBadge();
    return;
  }

  if (fbUser && (!fbProfile || !fbProfile.memberId)) {
    $('#authGate').classList.remove('hidden');
    $('#mainSite').classList.remove('visible');
    $('#bottomNav').classList.add('hidden');
    document.body.classList.add('no-nav');
    renderMemberPicker();
    return;
  }

  const allTaken = MEMBER_ORDER.every(id => membersSnapshot[id] && membersSnapshot[id].claimedBy);

  if (allTaken && !isGuest) {
    $('#authGate').classList.add('hidden');
    $('#mainSite').classList.add('visible');
    $('#loginBtn').classList.remove('hidden');
    $('#notifBtn').classList.add('hidden');
    $('#bottomNav').classList.add('hidden');
    document.body.classList.add('no-nav');
    return;
  }

  if (isGuest) {
    $('#authGate').classList.add('hidden');
    $('#mainSite').classList.add('visible');
    $('#loginBtn').classList.remove('hidden');
    $('#notifBtn').classList.add('hidden');
    $('#bottomNav').classList.add('hidden');
    document.body.classList.add('no-nav');
    return;
  }

  $('#authGate').classList.remove('hidden');
  $('#mainSite').classList.remove('visible');
  $('#bottomNav').classList.add('hidden');
  document.body.classList.add('no-nav');
  if (!$('#authContent').dataset.view) renderAuthHome();
}

function setAuthView(view) {
  $('#authContent').dataset.view = view;
  $('#authBack').classList.toggle('hidden', view === 'home');
}

/* ============================================================
   ✅ UPDATED: renderAuthHome — big viewer btn + small member/account
   ============================================================ */
function renderAuthHome() {
  setAuthView('home');
  const allTaken = MEMBER_ORDER.every(id => membersSnapshot[id] && membersSnapshot[id].claimedBy);

  $('#authContent').innerHTML = `
    <svg class="auth-emblem" viewBox="0 0 64 64" aria-hidden="true">
      <defs><linearGradient id="ae1" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#f0cd8a"/><stop offset=".5" stop-color="#d4a24c"/><stop offset="1" stop-color="#a97a2e"/></linearGradient></defs>
      <circle cx="32" cy="32" r="30" fill="none" stroke="rgba(212,162,76,.35)" stroke-width="1"/>
      <circle cx="32" cy="32" r="24" fill="none" stroke="rgba(212,162,76,.2)" stroke-width="1" stroke-dasharray="3 5"/>
      <path d="M32 9 L48 32 L32 55 L16 32 Z" fill="url(#ae1)"/>
      <circle cx="32" cy="32" r="6.2" fill="#0d0a17"/>
    </svg>
    <h1 class="auth-title">ამაგდარი</h1>
    <p class="auth-sub">ქართული მითოლოგია · ანიმაცია</p>
    <p class="auth-lead">
      ${allTaken
        ? 'გუნდის ყველა წევრი დარეგისტრირებულია. შემოდი მნახველის სახით ან შედი შენს ექაუნთში.'
        : 'კეთილი იყოს შენი მობრძანება. შემოდი მნახველის სახით საიტის სანახავად, ან დარეგისტრირდი როგორც გუნდის წევრი.'}
    </p>
    <div class="auth-actions">
      <button class="auth-btn primary auth-btn-big" data-action="guest">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
        მნახველის სტატუსით შესვლა
      </button>

      ${!allTaken ? `
  <button class="auth-btn auth-btn-small" data-action="register" ${!REGISTRATION_OPEN ? 'disabled' : ''}>
    რეგისტრაცია გუნდის წევრად${!REGISTRATION_OPEN ? ' (დახურულია)' : ''}
  </button>
` : ''}

      <button class="auth-btn auth-btn-small" data-action="login">
        შესვლა ექაუნთში
      </button>
    </div>
  `;

  $$('[data-action]').forEach(b => {
    b.addEventListener('click', () => {
      const a = b.dataset.action;
      if (a === 'register') renderRegisterForm();
      if (a === 'login') renderLoginForm();
      if (a === 'guest') enterGuest();
    });
  });
}

function renderRegisterForm() {
  setAuthView('register');
  $('#authContent').innerHTML = `
    <h1 class="auth-title" style="font-size:2rem">რეგისტრაცია</h1>
    <p class="auth-sub">შექმენი ექაუნთი</p>
    <form id="regForm" autocomplete="off">
      <div class="form-group">
        <label class="form-label" for="regPhone">ტელეფონის ნომერი</label>
        <input class="form-input" id="regPhone" type="tel" inputmode="tel" placeholder="+995 5XX XXX XXX" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="regPass">პაროლი</label>
        <input class="form-input" id="regPass" type="password" placeholder="მინიმუმ 6 სიმბოლო" minlength="6" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="regPass2">გაიმეორე პაროლი</label>
        <input class="form-input" id="regPass2" type="password" placeholder="დაწერე ისევ" required />
      </div>
      <div class="form-error" id="regError"></div>
      <div class="form-actions">
        <button class="auth-btn primary" type="submit" id="regSubmit">→ რეგისტრაცია</button>
      </div>
    </form>
  `;

  $('#regForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const phone = normalizePhone($('#regPhone').value);
    const pass = $('#regPass').value;
    const pass2 = $('#regPass2').value;
    const err = $('#regError');
    err.textContent = '';

    if (phone.length < 8) { err.textContent = 'ტელეფონის ნომერი არასწორია.'; return; }
    if (pass.length < 6) { err.textContent = 'პაროლი მინიმუმ 6 სიმბოლო უნდა იყოს.'; return; }
    if (pass !== pass2) { err.textContent = 'პაროლები არ ემთხვევა.'; return; }

    const submit = $('#regSubmit');
    submit.disabled = true;
    submit.textContent = '⏳ მუშაობს...';

    try {
      const cred = await auth.createUserWithEmailAndPassword(phoneToEmail(phone), pass);
      await db.ref('users/' + cred.user.uid).set({
        phone: phone,
        memberId: null,
        displayName: '',
        nickname: '',
        bio: '',
        frame: 'gold',
        createdAt: firebase.database.ServerValue.TIMESTAMP
      });
      showToast('✓ რეგისტრაცია წარმატებულია', 'success');
    } catch (ex) {
      console.error(ex);
      let msg = 'შეცდომა.';
      if (ex.code === 'auth/email-already-in-use') msg = 'ეს ნომერი უკვე დარეგისტრირებულია.';
      if (ex.code === 'auth/weak-password') msg = 'პაროლი ძალიან სუსტია.';
      err.textContent = msg;
      submit.disabled = false;
      submit.textContent = '→ რეგისტრაცია';
    }
  });
}

function renderLoginForm() {
  setAuthView('login');
  $('#authContent').innerHTML = `
    <h1 class="auth-title" style="font-size:2rem">შესვლა</h1>
    <p class="auth-sub">შენი ექაუნთი</p>
    <form id="loginForm" autocomplete="off">
      <div class="form-group">
        <label class="form-label" for="logPhone">ტელეფონის ნომერი</label>
        <input class="form-input" id="logPhone" type="tel" inputmode="tel" placeholder="+995 5XX XXX XXX" required />
      </div>
      <div class="form-group">
        <label class="form-label" for="logPass">პაროლი</label>
        <input class="form-input" id="logPass" type="password" required />
      </div>
      <div class="form-error" id="logError"></div>
      <div class="form-actions">
        <button class="auth-btn primary" type="submit" id="logSubmit">→ შესვლა</button>
      </div>
    </form>
  `;

  $('#loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();
    const phone = normalizePhone($('#logPhone').value);
    const pass = $('#logPass').value;
    const err = $('#logError');
    err.textContent = '';

    const submit = $('#logSubmit');
    submit.disabled = true;
    submit.textContent = '⏳ მუშაობს...';

    try {
      await auth.signInWithEmailAndPassword(phoneToEmail(phone), pass);
      showToast('✓ წარმატებით შეხვედი', 'success');
    } catch (ex) {
      console.error(ex);
      err.textContent = 'ტელეფონის ნომერი ან პაროლი არასწორია.';
      submit.disabled = false;
      submit.textContent = '→ შესვლა';
    }
  });
}

function enterGuest() {
  isGuest = true;
  $('#authGate').classList.add('hidden');
  $('#mainSite').classList.add('visible');
  $('#loginBtn').classList.remove('hidden');
  $('#notifBtn').classList.add('hidden');
  $('#bottomNav').classList.add('hidden');
  document.body.classList.add('no-nav');
  checkAllRegistered();
  showToast('👁 მნახველის რეჟიმი', '');
}

function renderMemberPicker() {
  setAuthView('picker');

  const items = MEMBER_ORDER.map(id => {
    const meta = MEMBERS[id];
    const m = membersSnapshot[id] || {};
    const taken = m.claimedBy && m.claimedBy !== (fbUser && fbUser.uid);
    return `
      <button class="picker-item" data-pick="${id}" ${taken ? 'disabled' : ''}>
        <span class="picker-avatar">${meta.initial}</span>
        <span class="picker-name">${esc(meta.name)}</span>
      </button>
    `;
  }).join('');

  $('#authContent').innerHTML = `
    <h1 class="auth-title" style="font-size:1.7rem">ვინ ხარ?</h1>
    <p class="auth-sub">აირჩიე შენი სახელი</p>
    <p class="picker-intro">აირჩიე <strong>შენი სახელი</strong> გუნდიდან, რომ შეხვიდე შენს ექაუნთზე.</p>
    <div class="picker-list">${items}</div>
  `;

  $$('.picker-item').forEach(btn => {
    if (btn.disabled) return;
    btn.addEventListener('click', () => confirmPick(btn.dataset.pick));
  });
}

function confirmPick(memberId) {
  const meta = MEMBERS[memberId];
  const needsPass = !!meta.adminPassword;

  setAuthView('confirm');
  $('#authContent').innerHTML = `
    <div class="confirm-box">
      <div class="picker-avatar">${meta.initial}</div>
      <h2 class="confirm-name">${esc(meta.name)}</h2>
      <p class="confirm-text">გუნდის წევრი</p>
      <p class="confirm-question">ნამდვილად ${esc(meta.name)} ხარ?</p>
    </div>
    ${needsPass ? `
      <div class="form-group">
        <label class="form-label" for="adminPass">სპეციალური პაროლი</label>
        <input class="form-input" id="adminPass" type="password" placeholder="შეიყვანე სპეციალური პაროლი" />
      </div>
    ` : ''}
    <div class="form-error" id="pickError"></div>
    <div class="form-actions">
      <button class="auth-btn primary" id="pickConfirm">✓ დიახ, მე ვარ</button>
      <button class="auth-btn" id="pickCancel">← არა, სხვა ვარ</button>
    </div>
  `;

  $('#pickCancel').addEventListener('click', renderMemberPicker);
  $('#pickConfirm').addEventListener('click', async () => {
    const err = $('#pickError');
    err.textContent = '';

    if (needsPass) {
      const pass = $('#adminPass').value;
      if (pass !== meta.adminPassword) {
        err.textContent = 'პაროლი არასწორია.';
        return;
      }
    }

    const btn = $('#pickConfirm');
    btn.disabled = true;
    btn.textContent = '⏳ მუშაობს...';

    try {
      const result = await db.ref('members/' + memberId + '/claimedBy').transaction(cur => {
        if (cur === null) return fbUser.uid;
        if (cur === fbUser.uid) return fbUser.uid;
        return;
      });

      if (!result.committed) {
        err.textContent = 'ეს პიროვნება უკვე დაკავებულია.';
        btn.disabled = false;
        btn.textContent = '✓ დიახ, მე ვარ';
        return;
      }

      const now = Date.now();
      const updates = {};
      updates['users/' + fbUser.uid + '/memberId'] = memberId;
      updates['users/' + fbUser.uid + '/displayName'] = meta.name;
      updates['users/' + fbUser.uid + '/nickname'] = DEFAULT_NICK[memberId] || 'გუნდის წევრი';
      updates['members/' + memberId + '/displayName'] = meta.name;
      updates['members/' + memberId + '/nickname'] = DEFAULT_NICK[memberId] || 'გუნდის წევრი';
      updates['members/' + memberId + '/frame'] = 'gold';
      updates['members/' + memberId + '/claimedAt'] = now;
      await db.ref().update(updates);

      showToast('✓ წარმატებით შეხვედი', 'success');
      setAuthView('home');
    } catch (ex) {
      console.error(ex);
      err.textContent = 'შეცდომა: ' + (ex.message || ex);
      btn.disabled = false;
      btn.textContent = '✓ დიახ, მე ვარ';
    }
  });
}

/* NAV */
$$('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const view = btn.dataset.view;
    $$('.view').forEach(v => v.classList.remove('active'));
    $('#view' + view.charAt(0).toUpperCase() + view.slice(1)).classList.add('active');
    $$('.nav-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    if (view === 'profile') renderProfile();
    if (view === 'editor') renderEditor();
  });
});

/* PROFILE PAGE */
function renderProfile() {
  if (!fbUser || !fbProfile || !fbProfile.memberId) {
    $('#profileContent').innerHTML = '<div style="text-align:center;padding:60px 22px;color:var(--muted)">გთხოვ შეხვიდე ექაუნთში.</div>';
    return;
  }

  const memberId = fbProfile.memberId;
  const meta = MEMBERS[memberId];
  const displayName = fbProfile.displayName || meta.name;
  const nickname = fbProfile.nickname || DEFAULT_NICK[memberId];
  const frame = fbProfile.frame || 'gold';
  const photo = fbProfile.photo;
  const bio = fbProfile.bio || '';

  $('#profileContent').innerHTML = `
    <div class="profile-hero">
      <div class="profile-avatar-big avatar frame-${frame}" id="profileAvatarBig">
        <div class="avatar-inner">
          ${photo ? `<img src="${photo}" alt="" />` : `<span class="initial">${esc(meta.initial)}</span>`}
        </div>
        <div class="edit-overlay">
          <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg>
        </div>
      </div>
      <h2 class="profile-name-big">${esc(displayName)}</h2>
      <p class="profile-nick-big">${esc(nickname)}</p>
      ${meta.isDev ? `<span class="profile-badge-big"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/></svg>DEV</span>` : ''}
    </div>
    <div class="profile-section-list">
      <button class="profile-action" id="btnEditName">
        <span class="profile-action-icon"><svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4z"/></svg></span>
        <span class="profile-action-body">
          <span class="profile-action-label">სახელის შეცვლა</span>
          <span class="profile-action-hint">${esc(displayName)}</span>
        </span>
        <svg class="profile-action-arrow" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <button class="profile-action" id="btnEditNick">
        <span class="profile-action-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M8 15 Q10 12 12 12 Q14 12 16 15"/><circle cx="9" cy="9" r="1"/><circle cx="15" cy="9" r="1"/></svg></span>
        <span class="profile-action-body">
          <span class="profile-action-label">ნიკნეიმის შეცვლა</span>
          <span class="profile-action-hint">${esc(nickname)}</span>
        </span>
        <svg class="profile-action-arrow" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <button class="profile-action" id="btnEditBio">
        <span class="profile-action-icon"><svg viewBox="0 0 24 24"><path d="M4 4 h12 a4 4 0 0 1 4 4 v12 h-12 a4 4 0 0 1 -4 -4 z"/><line x1="4" y1="4" x2="4" y2="20"/><line x1="8" y1="9" x2="16" y2="9"/><line x1="8" y1="13" x2="14" y2="13"/></svg></span>
        <span class="profile-action-body">
          <span class="profile-action-label">ჩემ შესახებ</span>
          <span class="profile-action-hint">${bio ? bio.slice(0, 40) + (bio.length > 40 ? '...' : '') : 'ჯერ არაფერი დაგიწერია'}</span>
        </span>
        <svg class="profile-action-arrow" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <button class="profile-action" id="btnEditPhoto">
        <span class="profile-action-icon"><svg viewBox="0 0 24 24"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><path d="M21 15 L16 10 L5 21"/></svg></span>
        <span class="profile-action-body">
          <span class="profile-action-label">პროფილის ფოტო</span>
          <span class="profile-action-hint">${photo ? 'დაყენებულია' : 'ჯერ არ არის'}</span>
        </span>
        <svg class="profile-action-arrow" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <button class="profile-action" id="btnEditFrame">
        <span class="profile-action-icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4"/></svg></span>
        <span class="profile-action-body">
          <span class="profile-action-label">პროფილის ჩარჩო</span>
          <span class="profile-action-hint">${FRAMES.find(f => f.id === frame)?.label || 'ოქრო'}</span>
        </span>
        <svg class="profile-action-arrow" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
      <button class="profile-action danger" id="btnLogout">
        <span class="profile-action-icon"><svg viewBox="0 0 24 24"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg></span>
        <span class="profile-action-body">
          <span class="profile-action-label">ექაუნთიდან გასვლა</span>
          <span class="profile-action-hint">გამოხვიდე სისტემიდან</span>
        </span>
        <svg class="profile-action-arrow" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"/></svg>
      </button>
    </div>
  `;

  $('#profileAvatarBig').addEventListener('click', () => openPhotoModal());
  $('#btnEditName').addEventListener('click', editName);
  $('#btnEditNick').addEventListener('click', editNickname);
  $('#btnEditBio').addEventListener('click', editBio);
  $('#btnEditPhoto').addEventListener('click', openPhotoModal);
  $('#btnEditFrame').addEventListener('click', openFramePicker);
  $('#btnLogout').addEventListener('click', doLogout);
}

async function editName() {
  const current = fbProfile.displayName || MEMBERS[fbProfile.memberId].name;
  const val = prompt('ახალი სახელი:', current);
  if (val === null) return;
  const name = val.trim();
  if (!name) { showToast('სახელი ცარიელია', 'error'); return; }
  if (name.length > 60) { showToast('სახელი ძალიან გრძელია', 'error'); return; }
  try {
    const updates = {};
    updates['users/' + fbUser.uid + '/displayName'] = name;
    updates['members/' + fbProfile.memberId + '/displayName'] = name;
    await db.ref().update(updates);
    showToast('✓ სახელი შეიცვალა', 'success');
  } catch (ex) {
    showToast('შეცდომა: ' + ex.message, 'error');
  }
}

async function editNickname() {
  const current = fbProfile.nickname || DEFAULT_NICK[fbProfile.memberId];
  const val = prompt('ახალი ნიკნეიმი:', current);
  if (val === null) return;
  const nick = val.trim();
  if (!nick) { showToast('ნიკნეიმი ცარიელია', 'error'); return; }
  if (nick.length > 40) { showToast('ნიკნეიმი ძალიან გრძელია', 'error'); return; }
  try {
    const updates = {};
    updates['users/' + fbUser.uid + '/nickname'] = nick;
    updates['members/' + fbProfile.memberId + '/nickname'] = nick;
    await db.ref().update(updates);
    showToast('✓ ნიკნეიმი შეიცვალა', 'success');
  } catch (ex) {
    showToast('შეცდომა: ' + ex.message, 'error');
  }
}

async function editBio() {
  const current = fbProfile.bio || '';
  const val = prompt('ჩემ შესახებ (მაქს. 300 სიმბოლო):', current);
  if (val === null) return;
  const bio = val.trim();
  if (bio.length > 300) { showToast('ტექსტი ძალიან გრძელია (მაქს. 300)', 'error'); return; }
  try {
    const updates = {};
    updates['users/' + fbUser.uid + '/bio'] = bio;
    updates['members/' + fbProfile.memberId + '/bio'] = bio;
    await db.ref().update(updates);
    showToast('✓ განახლდა', 'success');
  } catch (ex) {
    showToast('შეცდომა: ' + ex.message, 'error');
  }
}

function openFramePicker() {
  const current = fbProfile.frame || 'gold';
  const html = `
    <div class="frame-grid">
      ${FRAMES.map(f => `
        <button class="frame-option${f.id === current ? ' selected' : ''}" data-frame="${f.id}" aria-label="${esc(f.label)}">
          <span class="preview frame-${f.id}">${esc(MEMBERS[fbProfile.memberId].initial)}</span>
        </button>
      `).join('')}
    </div>
    <p style="text-align:center;color:var(--muted);font-size:.78rem;margin-top:16px">
      ${esc(FRAMES.find(f => f.id === current).label)}
    </p>
  `;

  openModal('აირჩიე ჩარჩო', html, (modal) => {
    const styles = {
      gold: 'border:2px solid #d4a24c;box-shadow:0 0 8px rgba(212,162,76,.7)',
      silver: 'border:2px solid #c0c0d0;box-shadow:0 0 8px rgba(192,192,208,.7)',
      bronze: 'border:2px solid #b87333;box-shadow:0 0 8px rgba(184,115,51,.7)',
      emerald: 'border:2px solid #4ec9b0;box-shadow:0 0 8px rgba(78,201,176,.7)',
      crimson: 'border:2px solid #e35d5d;box-shadow:0 0 8px rgba(227,93,93,.7)',
      purple: 'border:2px solid #a78bfa;box-shadow:0 0 8px rgba(167,139,250,.7)',
      diamond: 'border:2px solid #e0e8ff;box-shadow:0 0 10px rgba(224,232,255,.9)',
      flame: 'border:2px solid #ff9a3c;box-shadow:0 0 12px rgba(255,100,0,.9)',
      wave: 'border:2px solid #4da6ff;box-shadow:0 0 10px rgba(77,166,255,.85)',
      rune: 'border:2px solid #b794f6;box-shadow:0 0 10px rgba(183,148,246,.9)',
      tribal: 'border:2px solid #d4a24c;box-shadow:0 0 8px rgba(212,162,76,.8)',
      void: 'border:2px solid #2a2a3a;box-shadow:inset 0 0 12px rgba(0,0,0,.9),0 0 8px rgba(100,100,180,.5)'
    };
    modal.querySelectorAll('.frame-option .preview').forEach(el => {
      const id = el.parentElement.dataset.frame;
      el.style.cssText = 'width:100%;height:100%;border-radius:50%;display:grid;place-items:center;background:linear-gradient(160deg,#1a140f,#0a0806);font-family:"JetBrains Mono",monospace;font-size:1.1rem;font-weight:700;color:#f0cd8a;' + (styles[id] || '');
    });

    modal.querySelectorAll('.frame-option').forEach(btn => {
      btn.addEventListener('click', async () => {
        const fid = btn.dataset.frame;
        try {
          const updates = {};
          updates['users/' + fbUser.uid + '/frame'] = fid;
          updates['members/' + fbProfile.memberId + '/frame'] = fid;
          await db.ref().update(updates);
          showToast('✓ ჩარჩო შეიცვალა', 'success');
          closeModal();
        } catch (ex) {
          showToast('შეცდომა: ' + ex.message, 'error');
        }
      });
    });
  });
}

function openPhotoModal() {
  $('#photoModal').classList.add('open');
  lastFocused = document.activeElement;
}

$('#photoChooseBtn').addEventListener('click', () => $('#photoInput').click());
$('#photoInput').addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;
  try {
    const base64 = await resizePhoto(file, 300);
    const updates = {};
    updates['users/' + fbUser.uid + '/photo'] = base64;
    updates['members/' + fbProfile.memberId + '/photo'] = base64;
    await db.ref().update(updates);
    showToast('✓ ფოტო განახლდა', 'success');
    closeAllModals();
  } catch (ex) {
    showToast('შეცდომა: ' + ex.message, 'error');
  }
});

$('#photoRemoveBtn').addEventListener('click', async () => {
  try {
    const updates = {};
    updates['users/' + fbUser.uid + '/photo'] = null;
    updates['members/' + fbProfile.memberId + '/photo'] = null;
    await db.ref().update(updates);
    showToast('✓ ფოტო წაშლილია', 'success');
    closeAllModals();
  } catch (ex) {
    showToast('შეცდომა: ' + ex.message, 'error');
  }
});

async function doLogout() {
  if (!confirm('ნამდვილად გინდა გასვლა?')) return;
  try {
    await auth.signOut();
    isGuest = false;
    showToast('✓ გამოხვედი', 'success');
    location.reload();
  } catch (ex) {
    showToast('შეცდომა', 'error');
  }
}

/* EDITOR PAGE */
function renderEditor() {
  if (!fbUser || !fbProfile || !fbProfile.memberId) {
    $('#editorContent').innerHTML = '<div style="text-align:center;padding:60px 22px;color:var(--muted)">გთხოვ შეხვიდე ექაუნთში.</div>';
    return;
  }

  const isAdmin = fbProfile.memberId === 'gurika';

  $('#editorContent').innerHTML = `
    <p class="editor-intro">
      შენ შეგიძლია შეცვალო მთავარი გვერდის ტექსტი. ცვლილება <strong>პირდაპირ არ აისახება</strong> —
      გაიგზავნება მოთხოვნა ადმინთან დასამტკიცებლად.
    </p>
    <div id="editorFields"></div>
    ${isAdmin ? `
      <div class="admin-panel">
        <h3 class="admin-title">⏳ მოლოდინში მოთხოვნები</h3>
        <div id="adminRequests"></div>
      </div>
    ` : ''}
  `;

  renderEditorFields();
  if (isAdmin) renderAdminRequests();
}

function renderEditorFields() {
  const wrap = $('#editorFields');
  if (!wrap) return;

  wrap.innerHTML = Object.keys(EDITABLE_FIELDS).map(key => {
    const current = siteContent[key] || '';
    const label = EDITABLE_FIELDS[key];
    return `
      <div class="editor-field">
        <div class="editor-field-label">${esc(label)} <span class="tag">${esc(key)}</span></div>
        <div class="editor-current">${current || '<em style="color:var(--muted)">ჯერ ცარიელია</em>'}</div>
        <textarea class="editor-textarea" data-field="${key}" placeholder="შეიყვანე ახალი ტექსტი..."></textarea>
        <button class="btn btn-primary editor-submit" data-submit="${key}">→ მოთხოვნის გაგზავნა</button>
      </div>
    `;
  }).join('');

  $$('[data-submit]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const key = btn.dataset.submit;
      const ta = document.querySelector(`[data-field="${key}"]`);
      const newVal = ta.value.trim();
      if (!newVal) { showToast('ცარიელია', 'error'); return; }

      const oldVal = siteContent[key] || '';

      try {
        await db.ref('requests').push({
          from: fbUser.uid,
          fromMemberId: fbProfile.memberId,
          fromName: fbProfile.displayName || MEMBERS[fbProfile.memberId].name,
          field: key,
          fieldLabel: EDITABLE_FIELDS[key],
          oldValue: oldVal,
          newValue: newVal,
          status: 'pending',
          createdAt: firebase.database.ServerValue.TIMESTAMP
        });

        const gurikaUid = membersSnapshot.gurika && membersSnapshot.gurika.claimedBy;
        if (gurikaUid && gurikaUid !== fbUser.uid) {
          await db.ref('notifications/' + gurikaUid).push({
            type: 'request',
            title: 'ახალი მოთხოვნა',
            text: `${fbProfile.displayName || fbProfile.memberId}-მ გამოგზავნა მოთხოვნა: ${EDITABLE_FIELDS[key]}`,
            read: false,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          });
        }

        showToast('✓ მოთხოვნა გაიგზავნა', 'success');
        ta.value = '';
      } catch (ex) {
        showToast('შეცდომა: ' + ex.message, 'error');
      }
    });
  });
}

function renderAdminRequests() {
  const wrap = $('#adminRequests');
  if (!wrap) return;

  db.ref('requests').on('value', s => {
    const all = [];
    s.forEach(child => { all.push({ id: child.key, ...child.val() }); });
    const pending = all.filter(r => r.status === 'pending')
      .sort((a, b) => (b.createdAt || 0) - (a.createdAt || 0));
    renderReqs(pending);
  });

  function renderReqs(reqs) {
    if (!reqs.length) {
      wrap.innerHTML = '<div class="admin-empty">ჯერ არავის გამოუგზავნია მოთხოვნა.</div>';
      return;
    }

    wrap.innerHTML = reqs.map(r => `
      <div class="request-card" data-req="${r.id}">
        <div class="request-header">
          <span class="request-from">${esc(r.fromName || 'უცნობი')}</span>
          <span class="request-time">${timeAgo(r.createdAt)}</span>
        </div>
        <div class="request-field">${esc(r.fieldLabel || r.field)}</div>
        <div class="request-diff">
          <div class="old">${esc(r.oldValue || '(ცარიელი)')}</div>
          <div class="new">${esc(r.newValue || '')}</div>
        </div>
        <div class="request-actions">
          <button class="approve" data-approve="${r.id}">✓ დამტკიცება</button>
          <button class="reject" data-reject="${r.id}">✕ უარყოფა</button>
        </div>
      </div>
    `).join('');

    wrap.querySelectorAll('[data-approve]').forEach(btn => {
      btn.addEventListener('click', () => handleRequest(btn.dataset.approve, true));
    });
    wrap.querySelectorAll('[data-reject]').forEach(btn => {
      btn.addEventListener('click', () => handleRequest(btn.dataset.reject, false));
    });
  }

  async function handleRequest(reqId, approve) {
    try {
      const reqSnap = await db.ref('requests/' + reqId).once('value');
      const req = reqSnap.val();
      if (!req) return;

      if (approve) {
        await db.ref('siteContent/' + req.field).set(req.newValue);
      }

      await db.ref('requests/' + reqId).update({
        status: approve ? 'approved' : 'rejected',
        reviewedAt: firebase.database.ServerValue.TIMESTAMP,
        reviewedBy: fbUser.uid
      });

      if (req.from) {
        await db.ref('notifications/' + req.from).push({
          type: approve ? 'approved' : 'rejected',
          title: approve ? '✓ დამტკიცდა' : '✕ უარყოფილია',
          text: `${req.fieldLabel}: შენი მოთხოვნა ${approve ? 'დამტკიცდა' : 'უარყოფილია'}`,
          read: false,
          createdAt: firebase.database.ServerValue.TIMESTAMP
        });
      }

      showToast(approve ? '✓ დამტკიცდა' : '✕ უარყოფილია', approve ? 'success' : 'error');
    } catch (ex) {
      showToast('შეცდომა: ' + ex.message, 'error');
    }
  }
}

/* NOTIFICATIONS */
function renderNotifBadge() {
  const unread = notifications.filter(n => !n.read).length;
  const badge = $('#notifBadge');
  if (!badge) return;
  if (unread > 0) {
    badge.textContent = unread > 9 ? '9+' : String(unread);
    badge.classList.remove('hidden');
  } else {
    badge.classList.add('hidden');
  }
}

function renderNotifList() {
  const wrap = $('#notifList');
  if (!wrap) return;

  if (!notifications.length) {
    wrap.innerHTML = '<div class="admin-empty">შეტყობინებები არ არის.</div>';
    return;
  }

  wrap.innerHTML = notifications.map(n => {
    const iconSvg = n.type === 'approved'
      ? '<polyline points="20 6 9 17 4 12"/>'
      : n.type === 'rejected'
        ? '<line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>'
        : '<circle cx="12" cy="12" r="10"/><path d="M12 8 L12 12 L14 14"/>';
    const cls = n.type === 'approved' ? 'approved' : n.type === 'rejected' ? 'rejected' : '';
    return `
      <div class="notif-item ${n.read ? 'read' : 'unread'} ${cls}">
        <span class="notif-icon"><svg viewBox="0 0 24 24">${iconSvg}</svg></span>
        <div class="notif-body">
          <div class="notif-title">${esc(n.title || 'შეტყობინება')}</div>
          <div class="notif-text">${esc(n.text || '')}</div>
          <div class="notif-time">${timeAgo(n.createdAt)}</div>
        </div>
      </div>
    `;
  }).join('');
}

$('#notifBtn').addEventListener('click', async () => {
  $('#notifModal').classList.add('open');
  if (fbUser) {
    const updates = {};
    notifications.filter(n => !n.read).forEach(n => {
      updates[n.id + '/read'] = true;
    });
    if (Object.keys(updates).length) {
      await db.ref('notifications/' + fbUser.uid).update(updates);
    }
  }
});

$('#loginBtn').addEventListener('click', () => {
  isGuest = false;
  $('#authGate').classList.remove('hidden');
  setAuthView('home');
  renderAuthHome();
});

/* MODAL SYSTEM */
function openModal(title, bodyHtml, afterOpen) {
  const modal = $('#modal');
  const box = $('#modalBox');
  box.innerHTML = `
    <div class="modal-header">
      <h2 class="modal-title">${esc(title)}</h2>
      <button class="modal-close" data-close aria-label="დახურვა"><svg viewBox="0 0 24 24"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg></button>
    </div>
    <div>${bodyHtml}</div>
  `;
  box.querySelectorAll('[data-close]').forEach(el => el.addEventListener('click', closeModal));
  modal.classList.add('open');
  if (afterOpen) afterOpen(box);
}
function closeModal() { $('#modal').classList.remove('open'); }
function closeAllModals() { $$('.modal').forEach(m => m.classList.remove('open')); }

$$('[data-close]').forEach(el => el.addEventListener('click', closeModal));
$$('[data-char-close]').forEach(el => el.addEventListener('click', () => $('#charModal').classList.remove('open')));
$$('[data-notif-close]').forEach(el => el.addEventListener('click', () => $('#notifModal').classList.remove('open')));
$$('[data-photo-close]').forEach(el => el.addEventListener('click', () => $('#photoModal').classList.remove('open')));
$$('[data-member-close]').forEach(el => el.addEventListener('click', closeMemberModal));

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closeAllModals();
    closeMemberModal();
  }
});

/* CHARACTER MODAL */
const CHAR_PROFILES = {
  hero: {
    icon: '★', alias: 'პროტაგონისტი', name: 'იახსარი',
    subtitle: 'ქართული მითოლოგიის მთავარი გმირი',
    stats: [
      { label: 'ასაკი', value: '25' },
      { label: 'ეპოქა', value: 'XIII' },
      { label: 'როლი', value: 'გმირი' }
    ],
    sections: [
      { title: 'გარეგნობა', html: '<p style="color:#cfc7e6;font-weight:300;line-height:1.7">მაღალი, დაკუნთული მამაკაცია, გრძელი შავი თმითა და სქელი წვერით.</p>' },
      { title: 'პიროვნული მახასიათებლები', html: '<p style="color:#cfc7e6;font-weight:300;line-height:1.7">მამაცი, ძლიერი, სამართლიანი, დამცველი, ღვთის ერთგული, გამბედავი და უშიშარი, გამჭრიახი.</p>' },
      { title: 'განსაკუთრებული უნარები', html: '<p style="color:#cfc7e6;font-weight:300;line-height:1.7">⚔️ ზებუნებრივი ძალა · 🛡️ ბოროტ ძალებთან ბრძოლა · ⚡ მტრის დამარცხება · 🗡️ მეომრული ოსტატობა · 🏔️ მფარველობა · 🔥 ღვთაებრივი ძალა</p>' },
      { title: 'ჩაცმულობა', html: '<p style="color:#cfc7e6;font-weight:300;line-height:1.7">ხევსურული ჩოხა, ქალავნები, ქამარ-ხანძალი, ხევსურული ქუდი, ხმალი, ლახტი.</p>' },
      { title: 'რისი სწამს', html: '<p style="color:#cfc7e6;font-weight:300;line-height:1.7;font-style:italic">სწამს უზენაესი სამართლიანობის, ღმერთის ნებისა და ღვთისშვილის მოვალეობის.</p>' },
      { title: 'მიზანი', html: '<p style="color:#cfc7e6;font-weight:300;line-height:1.7">🎯 დევების სრული აღმოფხვრა, ადამიანთა განთავისუფლება, მშვიდობის აღდგენა.</p>' }
    ]
  },
  villain: {
    icon: '👹', alias: 'ანტაგონისტი', name: 'გორო',
    subtitle: 'დევი, უკანასკნელი ბნელი ძალა',
    stats: [
      { label: 'ასაკი', value: '404' },
      { label: 'რასა', value: 'დევი' },
      { label: 'როლი', value: 'მტერი' }
    ],
    sections: [
      { title: 'გარეგნობა', html: '<p style="color:#cfc7e6;font-weight:300;line-height:1.7">გოლიათური ტანის დევი, <strong style="color:#ffb3b3">ორი რქით</strong>.</p>' },
      { title: 'პიროვნული თვისებები', html: '<p style="color:#cfc7e6;font-weight:300;line-height:1.7">სასტიკი, ველური, ხარბი, ბოროტი.</p>' },
      { title: 'ჩაცმულობა და იარაღი', html: '<p style="color:#cfc7e6;font-weight:300;line-height:1.7">ტყავის მოსასხამი, ხის შუბი.</p>' },
      { title: 'ამბავში მისი როლი', html: '<p style="color:#cfc7e6;font-weight:300;line-height:1.7;font-style:italic">უკანასკნელი დევი, თავს ესხმის სოფელ როშკას, იტაცებს საქონელს და აშინებს მოსახლეობას. იახსარი მას აბუდელაურის თეთრ ტბაში დაეწევა და დაამარცხებს.</p>' }
    ]
  }
};

$$('.profile-btn[data-char]').forEach(btn => {
  btn.addEventListener('click', () => {
    const key = btn.dataset.char;
    const p = CHAR_PROFILES[key];
    if (!p) return;

    $('#charModalTitle').textContent = p.name;

    const statsHtml = p.stats ? `
      <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:24px">
        ${p.stats.map(s => `
          <div style="text-align:center;padding:14px 8px;background:rgba(255,255,255,.03);border:1px solid rgba(212,162,76,.2);border-radius:14px">
            <div style="font-family:'JetBrains Mono',monospace;font-size:.58rem;letter-spacing:.18em;text-transform:uppercase;color:var(--muted);margin-bottom:5px">${esc(s.label)}</div>
            <div style="font-size:1.05rem;font-weight:700;color:var(--gold-light)">${esc(s.value)}</div>
          </div>
        `).join('')}
      </div>
    ` : '';

    const sectionsHtml = p.sections ? p.sections.map(sec => `
      <div style="margin-bottom:22px">
        <h3 style="display:flex;align-items:center;gap:9px;font-family:'JetBrains Mono',monospace;font-size:.66rem;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--gold);margin-bottom:12px">
          <span>${esc(sec.title)}</span>
          <span style="flex:1;height:1px;background:linear-gradient(90deg, currentColor, transparent);opacity:.3"></span>
        </h3>
        ${sec.html}
      </div>
    `).join('') : '';

    $('#charModalBody').innerHTML = `
      <div style="text-align:center;margin-bottom:20px">
        <span style="display:inline-block;font-family:'JetBrains Mono',monospace;font-size:.6rem;font-weight:700;letter-spacing:.24em;text-transform:uppercase;padding:5px 14px;border-radius:999px;margin-bottom:12px;color:#1a1206;background:linear-gradient(135deg,#d4a24c,#f0cd8a)">${esc(p.alias)}</span>
        <div style="font-size:1.5rem;font-weight:800;color:#fff2d4;letter-spacing:.04em">${esc(p.name)}</div>
        <div style="font-size:.84rem;color:var(--muted);margin-top:6px;font-style:italic">${esc(p.subtitle)}</div>
      </div>
      ${statsHtml}
      ${sectionsHtml}
    `;

    $('#charModal').classList.add('open');
  });
});

$('#watchBtn').addEventListener('click', () => {
  openModal('ანიმაცია ჯერ არ დაწყებულა', `
    <p style="color:var(--muted);font-size:.94rem;line-height:1.7;margin-bottom:24px">
      ჩვენ ჯერ კიდევ მუშაობის პროცესში ვართ. სცენარი, პერსონაჟები და ვიზუალი მზადდება.
      მალე გაჩვენებთ პირველ კადრებს.
    </p>
    <button class="btn btn-primary" style="width:100%;justify-content:center" data-close>კარგი, დაველოდები</button>
  `);
});

/* REVEAL ANIMATIONS */
(function () {
  const items = document.querySelectorAll('.reveal:not(.card.member)');
  if (!('IntersectionObserver' in window)) {
    items.forEach(el => el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  items.forEach(el => io.observe(el));
})();

$('#authBack').addEventListener('click', renderAuthHome);

renderAuthHome();
