/* ═══ DARK MODE TOGGLE ═══ */
function toggleTheme() {
  const html = document.documentElement;
  const btn = document.getElementById('themeToggle');
  if (html.getAttribute('data-theme') === 'dark') {
    html.removeAttribute('data-theme');
    btn.textContent = '🌙';
    localStorage.setItem('neear-theme', 'light');
  } else {
    html.setAttribute('data-theme', 'dark');
    btn.textContent = '☀️';
    localStorage.setItem('neear-theme', 'dark');
  }
}
(function() {
  const saved = localStorage.getItem('neear-theme');
  if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    setTimeout(() => { const b = document.getElementById('themeToggle'); if(b) b.textContent = '☀️'; }, 0);
  }
})();

/* ═══ DATA ═══ */
const POST_COLORS = [{bg:'#52EFDA',text:'#00100E'},{bg:'#E7FF6C',text:'#00100E'},{bg:'#FC93FA',text:'#00100E'},{bg:'#1DB5A1',text:'#00100E'},{bg:'#6BFFB8',text:'#00100E'}];
const SPIN_SEGMENTS = [1,5,2,25,3,10,1,5];
const SPIN_COLORS = ['#52EFDA','#E7FF6C','#FC93FA','#1DB5A1','#6BFFB8','#52EFDA','#E7FF6C','#FC93FA'];
const SPIN_WEIGHTS = SPIN_SEGMENTS.map(v=>1/v);
const SPIN_WEIGHT_TOTAL = SPIN_WEIGHTS.reduce((a,b)=>a+b,0);
const SPIN_ANGLES = SPIN_WEIGHTS.map(w=>(w/SPIN_WEIGHT_TOTAL)*2*Math.PI);
const SPIN_CUMULATIVE = [];
SPIN_ANGLES.reduce((acc,a,i)=>{SPIN_CUMULATIVE[i]=acc;return acc+a;},0);
const ROTATIONS = [2.1,-1.8,3.4,-0.9,1.5,-3.2,2.7,-1.1,0.6,-2.5,3.1,-0.4,1.9,-2.8,0.3,-1.6,2.4,-3.0];
const DIVISIONS = [{name:'Bronze',emoji:'🥉',min:0},{name:'Argent',emoji:'🥈',min:100},{name:'Or',emoji:'🥇',min:300},{name:'Diamant',emoji:'💎',min:600}];
const LEVELS = [{emoji:'🌱',name:'Pousse'},{emoji:'🌿',name:'Connecté'},{emoji:'⚡',name:'Actif'},{emoji:'🔥',name:'Influent'},{emoji:'💎',name:'Légende'},{emoji:'👑',name:'Icône'}];
function getDivision(pts){let d=DIVISIONS[0];for(const div of DIVISIONS)if(pts>=div.min)d=div;return d;}
function getLevel(xp){const l=Math.floor(xp/100);return LEVELS[Math.min(l,LEVELS.length-1)];}

const FIRST_NAMES=["Malik","Léa","Théo","Inès","Hugo","Camille","Noa","Jade","Enzo","Lina","Lucas","Emma","Louis","Chloé","Nathan","Manon","Raphaël","Zoé","Arthur","Léna","Jules","Alice","Adam","Sarah","Tom","Eva","Mathis","Lou","Noah","Clara","Ethan","Margot","Axel","Anna","Sacha","Juliette","Liam","Romane","Gabin","Ambre","Mael","Océane","Paul","Lucie","Rayan","Rose","Victor","Agathe","Eliott","Lola","Gabriel","Nina","Timéo","Lily","Maxime","Clémence","Samuel","Pauline","Baptiste","Jeanne","Valentin","Charlotte","Nolan","Capucine","Oscar","Victoire","Léon","Adèle","Robin","Célia","Aaron","Mia","Tristan","Elsa","Aurélien","Iris","Bastien","Diane","Alexis","Estelle","Damien","Fanny","Florian","Salomé","Julien","Margaux","Kylian","Apolline","Dylan","Constance","Yann","Mathilde","Dorian","Héloïse","Théophile","Colombe","Côme","Blanche","Félix","Alix"];
const UCOLORS=['#52EFDA','#FC93FA','#E7FF6C','#6BFFB8','#1DB5A1'];

// Generate unique SVG avatar for each user
function generateAvatarSVG(id, color) {
  const seed = id * 2654435761 >>> 0;
  const r = (n) => ((seed * (n+1) * 16807) % 2147483647) / 2147483647;
  // Skin tones
  const skins = ['#FDDCB5','#F5C6A0','#E0A370','#C68642','#8D5524','#6B3A1F'];
  const skin = skins[Math.floor(r(1)*skins.length)];
  // Hair colors
  const hairs = ['#2C1B0E','#4A2F1B','#8B4513','#D4A76A','#C0392B','#1A1A2E','#F5D085'];
  const hair = hairs[Math.floor(r(2)*hairs.length)];
  // Hair styles
  const hairStyle = Math.floor(r(3)*5);
  // Shirt colors
  const shirts = ['#3498DB','#E74C3C','#2ECC71','#9B59B6','#1DB5A1','#1ABC9C','#34495E','#E7FF6C','#52EFDA','#FC93FA'];
  const shirt = shirts[Math.floor(r(4)*shirts.length)];
  
  let hairPath = '';
  switch(hairStyle) {
    case 0: hairPath = `<ellipse cx="50" cy="32" rx="24" ry="20" fill="${hair}"/>`; break;
    case 1: hairPath = `<ellipse cx="50" cy="30" rx="26" ry="18" fill="${hair}"/><rect x="26" y="30" width="48" height="8" rx="3" fill="${hair}"/>`; break;
    case 2: hairPath = `<path d="M26,42 Q26,14 50,14 Q74,14 74,42 L70,36 Q68,18 50,18 Q32,18 30,36 Z" fill="${hair}"/>`; break;
    case 3: hairPath = `<ellipse cx="50" cy="28" rx="28" ry="16" fill="${hair}"/><ellipse cx="50" cy="34" rx="22" ry="10" fill="${hair}"/>`; break;
    case 4: hairPath = `<path d="M28,40 Q28,16 50,14 Q72,16 72,40 L68,30 Q66,20 50,18 Q34,20 32,30 Z" fill="${hair}"/><rect x="28" y="34" width="6" height="16" rx="3" fill="${hair}"/><rect x="66" y="34" width="6" height="16" rx="3" fill="${hair}"/>`; break;
  }
  
  const hasGlasses = r(5) > 0.65;
  const glasses = hasGlasses ? `<circle cx="40" cy="42" r="7" fill="none" stroke="#333" stroke-width="2"/><circle cx="60" cy="42" r="7" fill="none" stroke="#333" stroke-width="2"/><line x1="47" y1="42" x2="53" y2="42" stroke="#333" stroke-width="2"/>` : '';
  
  const smile = r(6) > 0.5 
    ? `<path d="M42,50 Q50,56 58,50" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>` 
    : `<path d="M44,51 Q50,55 56,51" fill="none" stroke="#333" stroke-width="1.5" stroke-linecap="round"/>`;

  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
    <circle cx="50" cy="50" r="50" fill="${color}"/>
    <path d="M20,88 Q20,68 50,65 Q80,68 80,88 Q65,95 50,95 Q35,95 20,88Z" fill="${shirt}"/>
    <circle cx="50" cy="42" r="22" fill="${skin}"/>
    ${hairPath}
    <circle cx="40" cy="40" r="2.5" fill="#333"/>
    <circle cx="60" cy="40" r="2.5" fill="#333"/>
    ${glasses}
    ${smile}
  </svg>`;
}

function getAvatarDataURI(id, color) {
  const svg = generateAvatarSVG(id, color);
  return 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svg)));
}

function avatarImg(id, color, size) {
  return `<img src="${getAvatarDataURI(id, color)}" alt="avatar" style="width:${size}px;height:${size}px;border-radius:50%;object-fit:cover;">`;
}

function generateUsers(count){const users=[{id:1,name:"Malik B.",avatar:"MB",xp:620,monthPts:1847,isPioneer:true,color:"#52EFDA"},{id:2,name:"Léa D.",avatar:"LD",xp:510,monthPts:842,isPioneer:true,color:"#FC93FA"},{id:3,name:"Théo P.",avatar:"TP",xp:480,monthPts:723,isPioneer:false,color:"#E7FF6C"},{id:4,name:"Inès K.",avatar:"IK",xp:450,monthPts:654,isPioneer:true,color:"#6BFFB8"},{id:5,name:"Hugo R.",avatar:"HR",xp:390,monthPts:512,isPioneer:false,color:"#FFD93D"},{id:6,name:"Camille S.",avatar:"CS",xp:370,monthPts:478,isPioneer:false,color:"#52EFDA"},{id:7,name:"Noa T.",avatar:"NT",xp:340,monthPts:352,isPioneer:true,color:"#FC93FA"},{id:8,name:"Jade M.",avatar:"JM",xp:290,monthPts:287,isPioneer:false,color:"#E7FF6C"},{id:9,name:"Enzo L.",avatar:"EL",xp:240,monthPts:198,isPioneer:false,color:"#6BFFB8"},{id:10,name:"Lina W.",avatar:"LW",xp:180,monthPts:134,isPioneer:true,color:"#FFD93D"}];let seed=42;const rand=()=>{seed=(seed*16807)%2147483647;return(seed-1)/2147483646;};for(let i=11;i<=count;i++){const fn=FIRST_NAMES[(i-1)%FIRST_NAMES.length];const li="ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(rand()*26)];users.push({id:i,name:`${fn} ${li}.`,avatar:`${fn[0]}${li}`,xp:Math.floor(60+rand()*400),monthPts:Math.max(3,Math.floor(130-(i-10)*0.6+rand()*30)),isPioneer:rand()>0.7,color:UCOLORS[i%5]});}return users;}

const USERS=generateUsers(200);
// EASTER EGG : XP calé à 6600 = niveau 67
const CURRENT_USER = {
  id: 7, name: "Noa T.", avatar: "NT", xp: 6600, monthPts: 352, isPioneer: true, color: "#FC93FA",
  likesReceived: 87, rank: 7, coins: 1000,
  ownedItems: ['frame-turquoise','hat-crown'], 
  equippedItems: ['frame-turquoise'],
  postLimit: 5,        // Ajout : Limite de 5 post-it
  nextReset: null      // Ajout : Date du prochain reset
};

function getNextMonday8AM() {
  const now = new Date();
  const nextMonday = new Date(now);
  // Trouve le prochain lundi (ou aujourd'hui si on est lundi avant 8h)
  nextMonday.setDate(now.getDate() + ((1 + 7 - now.getDay()) % 7 || 7));
  nextMonday.setHours(8, 0, 0, 0);
  return nextMonday.getTime();
}

function checkWeeklyReset() {
  const now = new Date().getTime();
  
  // Si c'est la première connexion ou qu'on a dépassé lundi 8h
  if (!CURRENT_USER.nextReset || now >= CURRENT_USER.nextReset) {
    // 1. On remet les post-it à 5
    CURRENT_USER.postLimit = 5;
    
    // 2. On remet toutes les missions à 0
    MISSIONS.forEach(m => { 
      m.current = 0; 
      m.claimed = false; 
    });
    
    // 3. On programme le prochain reset
    CURRENT_USER.nextReset = getNextMonday8AM();
  }
}

/* ═══ VARIABLES DU CARROUSEL POST-IT ═══ */
let boardSortBy = 'recent';
const now = new Date().getTime();
let currentViewedUserId = null; // Mémorise l'id du membre consulté

let posts = [
  {id:1, text:"Et si on pouvait voir sur une carte toutes les personnes qu'on a scannées ? Genre une heatmap de nos rencontres ", authorId:1, likes:67, date:"07 Avr 2026", timestamp: now - 3600000, colorIdx:0},
  {id:2, text:"Un mode 'événement' où tous les participants d'un salon peuvent se retrouver dans un annuaire temporaire", authorId:2, likes:43, date:"07 Avr 2026", timestamp: now - 7200000, colorIdx:1},
  {id:3, text:"Intégrer un mini CRM directement dans Neear pour taguer ses contacts par priorité ", authorId:3, likes:38, date:"07 Avr 2026", timestamp: now - 10800000, colorIdx:2},
  {id:4, text:"Pouvoir envoyer un message de remerciement automatique après un scan ", authorId:4, likes:29, date:"06 Avr 2026", timestamp: now - 86400000, colorIdx:3},
  {id:5, text:"Un widget LinkedIn qui affiche ta carte Neear sur ton profil", authorId:5, likes:24, date:"06 Avr 2026", timestamp: now - 90000000, colorIdx:4},
  {id:6, text:"Mode 'icebreaker' : la carte te génère un sujet de conversation en fonction du profil de la personne scannée ", authorId:6, likes:21, date:"05 Avr 2026", timestamp: now - 172800000, colorIdx:0},
  {id:7, text:"Notifications quand quelqu'un que tu as scanné poste sur LinkedIn. Rester top of mind facilement ", authorId:1, likes:18, date:"05 Avr 2026", timestamp: now - 180000000, colorIdx:1},
  {id:8, text:"Carte NFC en bois gravée au laser avec son QR code. Premium ultime pour les artisans ", authorId:8, likes:15, date:"04 Avr 2026", timestamp: now - 259200000, colorIdx:2},
  {id:9, text:"Un tableau de bord avec les stats de toutes ses rencontres : combien de scans/semaine, taux de recontact, etc.", authorId:7, likes:12, date:"04 Avr 2026", timestamp: now - 265000000, colorIdx:3},
  {id:10, text:"Pouvoir partager sa carte par AirDrop / NearbyShare en plus du NFC. Double combo ", authorId:9, likes:10, date:"03 Avr 2026", timestamp: now - 345600000, colorIdx:4},
  {id:11, text:"Un annuaire communautaire Neear par ville. Genre les pages jaunes du networking 2.0 ", authorId:2, likes:8, date:"03 Avr 2026", timestamp: now - 350000000, colorIdx:0},
  {id:12, text:"Ajouter des tags automatiques selon l'événement où tu scannes quelqu'un (salon, afterwork, conf…)", authorId:10, likes:6, date:"02 Avr 2026", timestamp: now - 432000000, colorIdx:1}
];

const likedPosts=new Set();
let lbPage=1;
let selectedColor=0;
let wheelRotation=0;
let hasSpun=false;
let shopCategory='all';
let inventoryCategory = 'all';
function filterInventory(cat) {
  inventoryCategory = cat;
  renderShop();
  renderProfilePage();
}
let eggTriggered = false;

const MISSIONS=[{id:'scan',icon:"",title:"Scanne 5 personnes",current:3,target:5,pts:25,claimed:false},{id:'postit',icon:"",title:"Colle 3 post-it",current:1,target:3,pts:15,claimed:false},{id:'parrain',icon:"",title:"Parraine 1 ami",current:0,target:1,pts:50,claimed:false},{id:'avis',icon:"",title:"Laisse un avis Google",current:0,target:1,pts:30,claimed:false},{id:'like',icon:"",title:"Like 10 post-it",current:7,target:10,pts:10,claimed:false}];

/* ═══ SVG ICONS ═══ */
function svgIcon(id, size) {
  size = size || 48;
  const icons = {
    'hat-crown': `<svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 44h44l6-24-14 10-14-16-14 16-14-10 6 24z" fill="#FFD93D" stroke="#E8B800" stroke-width="2" stroke-linejoin="round"/><rect x="10" y="44" width="44" height="8" rx="2" fill="#FFD93D" stroke="#E8B800" stroke-width="2"/><circle cx="18" cy="48" r="2" fill="#E8B800"/><circle cx="32" cy="48" r="2" fill="#E8B800"/><circle cx="46" cy="48" r="2" fill="#E8B800"/><circle cx="32" cy="14" r="3" fill="#FFD93D" stroke="#E8B800" stroke-width="1.5"/><circle cx="8" cy="20" r="2.5" fill="#FFD93D" stroke="#E8B800" stroke-width="1.5"/><circle cx="56" cy="20" r="2.5" fill="#FFD93D" stroke="#E8B800" stroke-width="1.5"/></svg>`,
    'hat-star': `<svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 6l7.5 15.2L56 23.8l-12 11.7 2.8 16.5L32 44l-14.8 8 2.8-16.5-12-11.7 16.5-2.6L32 6z" fill="#52EFDA" stroke="#1DB5A1" stroke-width="2" stroke-linejoin="round"/><path d="M32 16l4.5 9.1 10 1.6-7.2 7 1.7 10L32 39l-9 4.7 1.7-10-7.2-7 10-1.6L32 16z" fill="#A3F7E8" opacity="0.5"/></svg>`,
    'hat-rocket': `<svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 6c-6 10-8 22-8 32h16c0-10-2-22-8-32z" fill="#E8F0EE" stroke="#8AACA5" stroke-width="2" stroke-linejoin="round"/><path d="M24 38c-6 2-10 6-10 10h10V38z" fill="#FC93FA" stroke="#D06BD0" stroke-width="1.5"/><path d="M40 38c6 2 10 6 10 10H40V38z" fill="#FC93FA" stroke="#D06BD0" stroke-width="1.5"/><ellipse cx="32" cy="30" rx="4" ry="5" fill="#52EFDA" stroke="#1DB5A1" stroke-width="1.5"/><path d="M28 48c0 5 2 10 4 12 2-2 4-7 4-12" fill="#FFD93D" stroke="#E8B800" stroke-width="1.5"/><path d="M30 48c0 3 1 7 2 9 1-2 2-6 2-9" fill="#FC93FA" opacity="0.6"/></svg>`,
    'hat-lightning': `<svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M38 4L16 34h14L26 60 48 28H34L38 4z" fill="#E7FF6C" stroke="#B8CC42" stroke-width="2" stroke-linejoin="round"/><path d="M36 10L20 32h10l-4 18 16-22H34l2-18z" fill="#F5FFB3" opacity="0.5"/></svg>`,
    'hat-gem': `<svg viewBox="0 0 64 64" width="${size}" height="${size}" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M32 56L6 24l8-12h36l8 12L32 56z" fill="#C77DFF" stroke="#9B4DCA" stroke-width="2" stroke-linejoin="round"/><path d="M6 24h52" stroke="#9B4DCA" stroke-width="1.5"/><path d="M22 12l-4 12L32 56l14-32-4-12" stroke="#9B4DCA" stroke-width="1.5" fill="none"/><path d="M18 24L32 56l14-32H18z" fill="#D9A3FF" opacity="0.35"/><path d="M22 12h20l-4 12H26l-4-12z" fill="#E8C6FF" opacity="0.4"/></svg>`,
    'badge-1': `<img src="${BADGE_SVGS['badge-1']}" width="${size}" height="${size}" style="object-fit:contain;">`,
    'badge-2': `<img src="${BADGE_SVGS['badge-2']}" width="${size}" height="${size}" style="object-fit:contain;">`,
    'badge-3': `<img src="${BADGE_SVGS['badge-3']}" width="${size}" height="${size}" style="object-fit:contain;">`,
    'badge-4': `<img src="${BADGE_SVGS['badge-4']}" width="${size}" height="${size}" style="object-fit:contain;">`,
    'badge-5': `<img src="${BADGE_SVGS['badge-5']}" width="${size}" height="${size}" style="object-fit:contain;">`,
  };
  return icons[id] || '';
}

function getItemPreview(item) {
  if (item.category === 'accessories' || item.category === 'badges') return svgIcon(item.id, 48);
  if (item.category === 'frames' && item.preview && FRAME_SVGS && FRAME_SVGS[item.preview]) return `<img src="${FRAME_SVGS[item.preview]}" style="width:48px;height:48px;object-fit:contain;">`;
  return item.preview;
}
function getItemPreviewSmall(item, size) {
  if (item.category === 'accessories' || item.category === 'badges') return svgIcon(item.id, size || 22);
  if (item.category === 'frames' && item.preview && FRAME_SVGS && FRAME_SVGS[item.preview]) return `<img src="${FRAME_SVGS[item.preview]}" style="width:${size||22}px;height:${size||22}px;object-fit:contain;">`;
  return item.preview;
}

/* ═══ SHOP DATA ═══ */
const FRAME_SVGS = {
  'business': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzcuOSAxNjAiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzIxOTEtNyk7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yLCAuY2xzLTMsIC5jbHMtNCwgLmNscy01LCAuY2xzLTYsIC5jbHMtNywgLmNscy04IHsKICAgICAgICBzdHJva2U6ICNkZDJjYTc7CiAgICAgICAgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOwogICAgICB9CgogICAgICAuY2xzLTEsIC5jbHMtMiwgLmNscy0zLCAuY2xzLTQsIC5jbHMtNSwgLmNscy03IHsKICAgICAgICBzdHJva2Utd2lkdGg6IDJweDsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMTkxLTMpOwogICAgICB9CgogICAgICAuY2xzLTMgewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzIxOTEtNik7CiAgICAgIH0KCiAgICAgIC5jbHMtNCB7CiAgICAgICAgZmlsbDogdXJsKCNEw6lncmFkw6lfc2Fuc19ub21fMjE5MS01KTsKICAgICAgfQoKICAgICAgLmNscy05IHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMTkxKTsKICAgICAgfQoKICAgICAgLmNscy01IHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMTkxLTIpOwogICAgICB9CgogICAgICAuY2xzLTYgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgIH0KCiAgICAgIC5jbHMtNyB7CiAgICAgICAgZmlsbDogdXJsKCNEw6lncmFkw6lfc2Fuc19ub21fMjE5MS00KTsKICAgICAgfQoKICAgICAgLmNscy04IHsKICAgICAgICBmaWxsOiAjZGQyY2E3OwogICAgICAgIHN0cm9rZS13aWR0aDogLjVweDsKICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIxOTEiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIxOTEiIHgxPSIwIiB5MT0iODAiIHgyPSIxNzcuOSIgeTI9IjgwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2ZjOTNmYSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4wNyIgc3RvcC1jb2xvcj0iI2ZiODRmMSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4yMiIgc3RvcC1jb2xvcj0iI2Y5NWRkYyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii40MSIgc3RvcC1jb2xvcj0iI2Y1MWZiYSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZjQwMGE5Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjU5IiBzdG9wLWNvbG9yPSIjZjMwNGE3Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjY4IiBzdG9wLWNvbG9yPSIjZjExMWEyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjc3IiBzdG9wLWNvbG9yPSIjZWQyNzlhIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjg3IiBzdG9wLWNvbG9yPSIjZTk0NThmIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjk3IiBzdG9wLWNvbG9yPSIjZTM2YzgyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2UxN2I3ZCIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIxOTEtMiIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjE5MSIgeDE9IjguMDYiIHkxPSIxNDQuMTUiIHgyPSI1Ny45OCIgeTI9IjE0NC4xNSIgeGxpbms6aHJlZj0iI0TDqWdyYWTDqV9zYW5zX25vbV8yMTkxIi8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV8yMTkxLTMiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIxOTEiIHgxPSI2LjQ5IiB5MT0iMTM2LjQ4IiB4Mj0iNTQuNzQiIHkyPSIxMzYuNDgiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMjE5MSIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMjE5MS00IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSAyMTkxIiB4MT0iMy4xMyIgeTE9IjEyOC42IiB4Mj0iNTEuNzciIHkyPSIxMjguNiIgeGxpbms6aHJlZj0iI0TDqWdyYWTDqV9zYW5zX25vbV8yMTkxIi8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV8yMTkxLTUiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIxOTEiIHgxPSIxMC4yOCIgeTE9IjEyMi4zMiIgeDI9IjU4LjU0IiB5Mj0iMTIyLjMyIiB4bGluazpocmVmPSIjRMOpZ3JhZMOpX3NhbnNfbm9tXzIxOTEiLz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIxOTEtNiIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjE5MSIgeDE9IjUuMzYiIHkxPSIxMTQuODQiIHgyPSI1My43NiIgeTI9IjExNC44NCIgeGxpbms6aHJlZj0iI0TDqWdyYWTDqV9zYW5zX25vbV8yMTkxIi8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV8yMTkxLTciIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIxOTEiIHgxPSIxMC4wNSIgeTE9IjEwNy41IiB4Mj0iNTguNDEiIHkyPSIxMDcuNSIgeGxpbms6aHJlZj0iI0TDqWdyYWTDqV9zYW5zX25vbV8yMTkxIi8+CiAgPC9kZWZzPgogIDxwYXRoIGNsYXNzPSJjbHMtOSIgZD0iTTE2NS45NSw4MC45MWwxMS4yNS0yNi4yNy0yOS41My0xNy41MS03Ljc0LTIwLjgzLTI3Ljc4LDEuMjFMODkuMywwbC0yMi44NSwxOC4xMS0zMi0yLjQxLTYuNjgsMjYuMjZMMCw1My4xM2wxMy4zNiwyNi4yNi05LjE0LDI1LjA2LDIxLjgsMTUuNCw4LjQzLDI1LjY2LDI4Ljg0LTIuNDEsMjYuMDEsMTYuOSwyMi44NS0xOC43MiwzMy40LDQuMjMsNC45Mi0yNy4xNywyNy40Mi0xNC40OS0xMS45NS0yMi45NFpNMTQ3LjM0LDExNi40M2wtNC42NiwyNS43NS0zMS42NS00LTIxLjY2LDE3Ljc0LTI0LjY1LTE2LjAyLTI3LjMyLDIuMjktOC0yNC4zMi0yMC42Ni0xNC41OSw4LjY2LTIzLjc0LTEyLjY2LTI0Ljg5LDI2LjMyLTEwLjU4LDYuMzMtMjQuODksMzAuMzIsMi4yOSwyMS42NS0xNy4xNywyMS42NiwxNi42LDI2LjMyLTEuMTUsNy4zMywxOS43NCwyNy45OSwxNi42LTEwLjY3LDI0Ljg5LDExLjMzLDIxLjc0LTI1Ljk5LDEzLjczWiIvPgogIDxnPgogICAgPGxpbmUgY2xhc3M9ImNscy02IiB4MT0iMzUuMTkiIHkxPSIxMTcuMTgiIHgyPSI0OC43MiIgeTI9IjEyOC41Ii8+CiAgICA8bGluZSBjbGFzcz0iY2xzLTYiIHgxPSIzNS4yNyIgeTE9IjEyNy45IiB4Mj0iNDIuMDQiIHkyPSIxMzMuMjYiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtNSIgZD0iTTguMjMsMTQxLjg1bC0uMTcsMy4wM2MtLjA0Ljc0LjUsMS40MiwxLjM1LDEuNjgsNS4wNywxLjU0LDIzLjI3LDYuMDcsNDcuMDkuMjEsMS4wNS0uMjYsMS42OS0xLjE0LDEuNDQtMi4wMmwtMS4xNi00LjE3Yy0uMjYtLjk0LTEuNDEtMi4xOC0yLjU0LTEuOTQtNi4xMiwxLjMyLTI2LjY2LDQuNDUtNDUuMTIuNy0xLjI2LS4yNi0uODIsMS40NC0uODgsMi41WiIvPgogICAgPHBhdGggY2xhc3M9ImNscy04IiBkPSJNNTAuMzYsMTQwLjk2YzAsMS4zMS03Ljk1LDMuMzEtMTcuNzYsMy4zMXMtMTcuNzYtMS45LTE3Ljc2LTMuMjEsNy45NS0xLjUyLDE3Ljc2LTEuNTIsMTcuNzYuMTIsMTcuNzYsMS40MloiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTYuNDksMTMzLjkzdjIuMzhjMCwxLjIuODUsMi4yNywyLjEyLDIuNjQsNS44NSwxLjcxLDIzLjE4LDUuNjQsNDQuMzkuMDIsMS4wNC0uMjgsMS43Ni0xLjEzLDEuNzQtMi4xMWwtLjc1LTMuMjRjLS4wMi0uOTUtMS41OS0zLjI1LTQuMTctMi4zMS0zLjE2LDEuMTYtMzcuNDQsMy42MS00Mi4yLDEuNjUtLjU2LS4yMy0xLjE0LjQyLTEuMTQuOThaIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTgiIGQ9Ik00OC42MSwxMzMuNDFjLjg5LDEuMDYtNy43MSwyLjkyLTE3LjUyLDIuOTJzLTE3Ljc2LTEuMDYtMTcuNzYtMi4zNiw3Ljk1LTIuMzYsMTcuNzYtMi4zNiwxNi41OC43LDE3LjUyLDEuODFaIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTciIGQ9Ik05LjkzLDEyMy4zNXMtNy4wMy40LTYuOCwzLjcybC4yNywyLjUxYy0uMDIuNy40LDEuMzUsMS4xMSwxLjcsMy4yNSwxLjU2LDE0LjM3LDQuODksNDUuMzIuMDMsMS4xMi0uMTgsMS45NC0xLjAxLDEuOTQtMS45OXYtMi45NXMtMzYuNTcsMS45MS00MS44NC0zLjAyWiIvPgogICAgPGVsbGlwc2UgY2xhc3M9ImNscy04IiBjeD0iMjcuMSIgY3k9IjEyNi4yMiIgcng9IjE3Ljc2IiByeT0iMi4zNiIvPgogICAgPHBhdGggY2xhc3M9ImNscy00IiBkPSJNMTAuMjgsMTE5LjkxdjIuMjdjMCwxLjE1Ljg1LDIuMTcsMi4xMiwyLjUyLDUuODUsMS42MywyMy4xOCw1LjM5LDQ0LjM5LjAyLDEuMDQtLjI2LDEuNzYtMS4wOCwxLjc0LTIuMDJsLS4wNi0zLjEzYy0uMDItLjkxLS42Ny0xLjczLTEuNjUtMi4wNy0xLjM1LS40OC0zLjc3LS41OS02LjM1LjMyLTMuNjksMS4zLTMyLjc0LDEuNDQtMzkuMDYsMS4xNi0uNjItLjAzLTEuMTQuNC0xLjE0Ljk0WiIvPgogICAgPGVsbGlwc2UgY2xhc3M9ImNscy04IiBjeD0iMzUuNjYiIGN5PSIxMTkuMTciIHJ4PSIxNy43NiIgcnk9IjIuMzYiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTkuMzUsMTA5LjQ2cy0zLjUyLS4zLTMuOTgsMy42MmwuMDcsMi4yM2MuMDMsMS4wNi44MywyLDIsMi4zNSw1LjI4LDEuNTksMjEuMDYsNS4xMSw0NC4yNC0uNDcsMS4xNy0uMjgsMS45OS0xLjE4LDIuMDItMi4yM2wuMDctMi43OXMtMjcuNTQsNS4zMy00NC40Mi0yLjcyWiIvPgogICAgPGVsbGlwc2UgY2xhc3M9ImNscy04IiBjeD0iMzAuMTUiIGN5PSIxMTIuNiIgcng9IjE3Ljc2IiByeT0iMi4zNiIvPgogICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTEuNTQsMTAzLjNjNi43NC0xLjQyLDI3Ljc4LTQuNTIsNDUuNzksMCwxLjY5LjQyLjg2LDIuMTYuOTMsMy42N2wuMTMsMS45OWMuMDgsMS44NC0xLjM3LDEuNTItMy4zOSwyLjE0LTYuNywyLjA0LTIyLjcxLDUuNS00Mi4yMS4wMy0xLjYxLS40NS0yLjc0LS42NC0yLjc0LTIuMDlsLjA2LTIuNDdjMC0xLjUtLjI2LTIuOTEsMS40NC0zLjI3WiIvPgogICAgPGVsbGlwc2UgY2xhc3M9ImNscy04IiBjeD0iMzQuOTUiIGN5PSIxMDUuNjkiIHJ4PSIxNy43NiIgcnk9IjIuMzYiLz4KICA8L2c+Cjwvc3ZnPg==',
  'cre_atif': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzguNDEgMTYwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMjc4LTQpOwogICAgICB9CgogICAgICAuY2xzLTEsIC5jbHMtMiwgLmNscy0zLCAuY2xzLTQsIC5jbHMtNSwgLmNscy02LCAuY2xzLTcsIC5jbHMtOCwgLmNscy05LCAuY2xzLTEwLCAuY2xzLTExLCAuY2xzLTEyIHsKICAgICAgICBzdHJva2U6ICMwYzQxNmQ7CiAgICAgICAgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNzgtOCk7CiAgICAgIH0KCiAgICAgIC5jbHMtMyB7CiAgICAgICAgZmlsbDogdXJsKCNEw6lncmFkw6lfc2Fuc19ub21fMjI3OC03KTsKICAgICAgfQoKICAgICAgLmNscy00IHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMjc4LTkpOwogICAgICB9CgogICAgICAuY2xzLTUgewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNzgtMyk7CiAgICAgIH0KCiAgICAgIC5jbHMtNiB7CiAgICAgICAgZmlsbDogdXJsKCNEw6lncmFkw6lfc2Fuc19ub21fMjI3OC01KTsKICAgICAgfQoKICAgICAgLmNscy03IHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMjc4LTIpOwogICAgICB9CgogICAgICAuY2xzLTggewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNzgtMTEpOwogICAgICB9CgogICAgICAuY2xzLTEzIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMjc4KTsKICAgICAgfQoKICAgICAgLmNscy05IHsKICAgICAgICBmaWxsOiBub25lOwogICAgICB9CgogICAgICAuY2xzLTEwIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMjc4LTYpOwogICAgICB9CgogICAgICAuY2xzLTExIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMjc4LTEwKTsKICAgICAgfQoKICAgICAgLmNscy0xMiB7CiAgICAgICAgZmlsbDogdXJsKCNEw6lncmFkw6lfc2Fuc19ub21fMjI3OC0xMik7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV8yMjc4IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSAyMjc4IiB4MT0iMTkuMjgiIHkxPSI4MCIgeDI9IjE3OC40MSIgeTI9IjgwIiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iIzkzZTJlNyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4wOCIgc3RvcC1jb2xvcj0iIzg0ZGRlNCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4yNCIgc3RvcC1jb2xvcj0iIzVkY2ZkYyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii40NiIgc3RvcC1jb2xvcj0iIzFmYmFjZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii41MSIgc3RvcC1jb2xvcj0iIzExYjZjZCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii42IiBzdG9wLWNvbG9yPSIjMTBiMWM5Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjciIHN0b3AtY29sb3I9IiMwZWE0YmYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuOCIgc3RvcC1jb2xvcj0iIzBhOGVhZiIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii45IiBzdG9wLWNvbG9yPSIjMDU3MDk4Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzAwNGU3ZiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNzgtMiIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjI3OCIgeDE9IjcuMTEiIHkxPSIxMDcuNjYiIHgyPSI2NS4yOCIgeTI9IjEwNy42NiIgeGxpbms6aHJlZj0iI0TDqWdyYWTDqV9zYW5zX25vbV8yMjc4Ii8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV8yMjc4LTMiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIyNzgiIHgxPSIyNS4wNyIgeTE9IjczLjUiIHgyPSIzMS4xNCIgeTI9IjczLjUiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMjI3OCIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMjI3OC00IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSAyMjc4IiB4MT0iNDAuODYiIHkxPSI3My4yOCIgeDI9IjQ2LjY1IiB5Mj0iNzMuMjgiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMjI3OCIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMjI3OC01IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSAyMjc4IiB4MT0iNC4wNSIgeTE9IjE0Mi41MSIgeDI9IjUwLjM5IiB5Mj0iMTQyLjUxIiB4bGluazpocmVmPSIjRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNzgiLz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNzgtNiIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjI3OCIgeDE9IjExLjM0IiB5MT0iMTUwLjQ0IiB4Mj0iMTguNyIgeTI9IjE1MC40NCIgeGxpbms6aHJlZj0iI0TDqWdyYWTDqV9zYW5zX25vbV8yMjc4Ii8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV8yMjc4LTciIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIyNzgiIHgxPSIuNTEiIHkxPSIxNTEuMzgiIHgyPSIxMC42MiIgeTI9IjE1MS4zOCIgeGxpbms6aHJlZj0iI0TDqWdyYWTDqV9zYW5zX25vbV8yMjc4Ii8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV8yMjc4LTgiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIyNzgiIHgxPSIyOS4wMyIgeTE9IjE1MS40MSIgeDI9IjM5LjE1IiB5Mj0iMTUxLjQxIiB4bGluazpocmVmPSIjRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNzgiLz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNzgtOSIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjI3OCIgeDE9IjU5LjQ3IiB5MT0iMTM3LjgyIiB4Mj0iNTkuNzkiIHkyPSIxMzcuODIiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMjI3OCIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMjI3OC0xMCIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjI3OCIgeDE9IjQ4Ljk0IiB5MT0iMTMzLjcxIiB4Mj0iNzUuNzUiIHkyPSIxMzMuNzEiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMjI3OCIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMjI3OC0xMSIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjI3OCIgeDE9IjUyLjUyIiB5MT0iMTI0Ljc1IiB4Mj0iNTguMjgiIHkyPSIxMjQuNzUiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMjI3OCIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMjI3OC0xMiIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjI3OCIgeDE9IjU5LjQ3IiB5MT0iMTM3LjgyIiB4Mj0iNTkuNzkiIHkyPSIxMzcuODIiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMjI3OCIvPgogIDwvZGVmcz4KICA8cGF0aCBjbGFzcz0iY2xzLTEzIiBkPSJNNDAuNTQsMTEzLjg4Yy0uMjcuMTctLjU3LjMzLS44OC41LDAsMC0uMzUsMS4yNy0xLjA0LDIuMzZsMy4yMywyLjU1Yy42OS0uNjMsMS42Ni0xLjMsMi45OS0yLjAxbC00LjMtMy40Wk0xNjcuNzIsODAuOTFsMTAuMDYtMjYuMjctMjYuNDEtMTcuNTEtNi45Mi0yMC44My0yNC44NCwxLjIxTDk5LjE2LDBsLTIwLjQ0LDE4LjExLTI4LjYyLTIuNDEtNS45NywyNi4yNi0yNC44NCwxMS4xNywxMS45NSwyNi4yNi04LjE3LDI1LjA2LDIuMTQsMS42OCw4LjIsNi40OGMuNDYtLjg5LDEuMDktMS45NSwxLjg4LTIuODlsLTYuNzktNS4zNi0xLjM4LTEuMDksNy43NS0yMy43NC0xMS4zMy0yNC44OSwyMy41NC0xMC41OCw1LjY3LTI0Ljg5LDI3LjEyLDIuMjksMTkuMzctMTcuMTcsMTkuMzcsMTYuNiwyMy41NC0xLjE1LDYuNTYsMTkuNzQsMjUuMDMsMTYuNi05LjU0LDI0Ljg5LDEwLjE0LDIxLjc0LTIzLjI1LDEzLjczLTQuMTcsMjUuNzUtMjguMzEtNC0xOS4zNywxNy43NC0yMi4wNS0xNi4wMi02LjE4LjU4LTE4LjI1LDEuNzEtMi4xMS03LjE1cy0uMDIuMDEtLjAzLjAyYzAsMC0uODMsMi45OS0yLjQ2LDMuNzdsMS45Niw2LjY5LDEwLjIzLS45Niw1Ljc1LS41NCw2LjU3LS42MSwzLjI1LS4zLDIzLjI3LDE2LjksMjAuNDQtMTguNzIsMjkuODgsNC4yMyw0LjQtMjcuMTcsMjQuNTMtMTQuNDktMTAuNjktMjIuOTRaTTQ4LDEyNi4wOWMtMS4yMywwLTIuNTQtLjA5LTMuNy0uMzJsMS41MSw1LjE0Yy43OC0xLjA1LDEuNzQtMi4wMiwyLjg2LTIuNTVsLS42Ny0yLjI3WiIvPgogIDxwb2x5Z29uIGNsYXNzPSJjbHMtNyIgcG9pbnRzPSI1MC4zOSAxNDAuMTUgNy4xMSAxNDAuMTUgNy4yNSA3NS4xNyA2NS4xNCA3NS4zNSA2NS4yOCAxMzkuNzkgNTAuMzkgMTQwLjE1Ii8+CiAgPHBhdGggY2xhc3M9ImNscy01IiBkPSJNMjUuMDcsNzUuMTNsLjg0LTMuMXM2LjMyLS44MSw1LjA2LDEuMjFsLS4yOCwxLjc1LTUuNjIuMTNaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNNDEuNDUsNzQuODVzLTEuOTctNC4xOCwxLjI2LTIuODNjMCwwLDQuMjItMS43NSwzLjY1LDEuNzVsLjI4LDEuMjEtNS4yLS4xM1oiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik03LjExLDE0MC4xNXMtNC4zNi0uMjctMi42NywzLjFjMCwwLTEuOTcsMi40Myw0LjA3LDEuMzVsNDEuODctLjI3di0zLjc4bC00My4yOC0uNFoiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTEwIiBkPSJNMTMuNzIsMTQ0Ljg3cy00LjAzLDEwLjA3LTEuNTksMTAuODRjMCwwLDQuODksMS45MSw0LjQtMi45NWwyLjE4LTcuOTYtNC45OS4wN1oiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik0uNTUsMTQ2LjY1bDEwLjA3LjAydjIuNzlsLS45My4wNXMxLjEyLDYuNjYtMi4xMSw2LjUxbC00LjUuMDdzLTIuMzUuNzktMS41Ny02LjQybC0xLjAxLS4wMi4wNS0yLjk5WiIvPgogIDxsaW5lIGNsYXNzPSJjbHMtOSIgeDE9Ii43OSIgeTE9IjE0OS42MyIgeDI9IjkuNzEiIHkyPSIxNDkuNTMiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0yOS4wOCwxNDYuNjhsMTAuMDcuMDJ2Mi43OWwtLjkzLjA1czEuMTIsNi42Ni0yLjExLDYuNTFsLTQuNS4wN3MtMi4zNS43OS0xLjU3LTYuNDJsLTEuMDEtLjAyLjA1LTIuOTlaIi8+CiAgPGxpbmUgY2xhc3M9ImNscy05IiB4MT0iMjkuMzEiIHkxPSIxNDkuNjYiIHgyPSIzOC4yNCIgeTI9IjE0OS41NiIvPgogIDxnPgogICAgPGc+CiAgICAgIDxwYXRoIGNsYXNzPSJjbHMtNCIgZD0iTTU5LjQ4LDEzNy44di4wM3MuMzEtLjAzLjMxLS4wM2gtLjMxWiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTExIiBkPSJNNzAuNDYsMTM5LjQ4di0xLjZsLTIuNzUtLjAyLDUuMDUtMTYuOTVjMy4yMy0zLjkxLjQyLTQuMTguNDItNC4xOC0zLjM3LTEuNTUtMi42LDMuODUtMi42LDMuODVsLTUuMzQsMTcuMjdoLjM1cy01Ljc3LS4wMy01Ljc3LS4wM2wxLjI4LS4xMSwyLjE4LTIxLjcxYzEuNTQtMy41MS0uMjEtNS44LS4yMS01LjgtMS4xOS40Ny0xLjI3LDUuNTktMS4yNyw1LjU5bC0yLjMxLDIyLjAzaC4zMXMtLjMxLjAzLS4zMS4wM3YtLjAzcy01Ljg0LS4wNC01Ljg0LS4wNGwyLjI2LS4wNy00LjI5LTE5LjQyYy0uNDItMy4wNC0xLjc2LTMuNTgtMS43Ni0zLjU4LTEuNzYsMS44OS0uNDIsNC4zMi0uNDIsNC4zMmw0LjE0LDE4Ljc1LTIuODYtLjAyaC0uNTRsLS4xNywxMS4xN2MtLjU0LDYuODgsNC44Nyw2Ljg4LDQuODcsNi44OGwuMDUsMS40NGgxMC4yMXYtMS40NGM0Ljk5LjM2LDUuNzEtNS4yMSw1LjcxLTUuMjEsMTEuMjQtMTMuMjItLjQtMTEuMTEtLjQtMTEuMTFaTTcwLjYyLDE0Ny45M2wtLjA1LTYuNDNjOC40My0yLjUyLjA1LDYuNDMuMDUsNi40M1oiLz4KICAgICAgPHBhdGggY2xhc3M9ImNscy04IiBkPSJNNTguMjgsMTM3Ljc3bC0yLjM5LS4wNy0yLjM5LTIxLjU4Yy0yLjUzLTQuNTIuNjMtNC4yNS42My00LjI1LDMuNTgtMS4wOCwxLjc2LDQuMTgsMS43Niw0LjE4bDIuMzksMjEuNzFaIi8+CiAgICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMTIiIHBvaW50cz0iNTkuNzkgMTM3LjgxIDU5LjQ3IDEzNy44NCA1OS40OCAxMzcuOCA1OS43OSAxMzcuODEiLz4KICAgIDwvZz4KICAgIDxsaW5lIGNsYXNzPSJjbHMtOSIgeDE9IjY1LjU4IiB5MT0iMTM3Ljg1IiB4Mj0iNjcuNzEiIHkyPSIxMzcuODYiLz4KICA8L2c+Cjwvc3ZnPg==',
  'jaune': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMjU5KTsKICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNTkiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIyNTkiIHgxPSIwIiB5MT0iODAiIHgyPSIxNjAiIHkyPSI4MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNlN2Y3NmMiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMTkiIHN0b3AtY29sb3I9IiNlZWQ1NzAiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNTMiIHN0b3AtY29sb3I9IiNmZjhmN2IiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNjIiIHN0b3AtY29sb3I9IiNmYzhkNzUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNzQiIHN0b3AtY29sb3I9IiNmNjg4NjUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuODciIHN0b3AtY29sb3I9IiNlYjdmNGIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuOTciIHN0b3AtY29sb3I9IiNlMTc3MzEiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTgwLDBDMzUuODIsMCwwLDM1LjgxLDAsODBzMzUuODIsODAsODAsODAsODAtMzUuODIsODAtODBTMTI0LjE5LDAsODAsMFpNODAuNTgsMTUwLjk4Yy0zOS4xNSwwLTcwLjg5LTMxLjczLTcwLjg5LTcwLjg5UzQxLjQzLDkuMiw4MC41OCw5LjJzNzAuODksMzEuNzQsNzAuODksNzAuODktMzEuNzQsNzAuODktNzAuODksNzAuODlaIi8+Cjwvc3ZnPg==',
  'reseau': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzguOSAxNjAiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzIwOTktNCk7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yLCAuY2xzLTMsIC5jbHMtNCwgLmNscy01IHsKICAgICAgICBzdHJva2U6ICMxNTg0ODQ7CiAgICAgICAgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOwogICAgICAgIHN0cm9rZS13aWR0aDogMnB4OwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzIwOTktNik7CiAgICAgIH0KCiAgICAgIC5jbHMtNiB7CiAgICAgICAgZmlsbDogdXJsKCNEw6lncmFkw6lfc2Fuc19ub21fMjA5OSk7CiAgICAgIH0KCiAgICAgIC5jbHMtMyB7CiAgICAgICAgZmlsbDogdXJsKCNEw6lncmFkw6lfc2Fuc19ub21fMjA5OS01KTsKICAgICAgfQoKICAgICAgLmNscy00IHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMDk5LTMpOwogICAgICB9CgogICAgICAuY2xzLTUgewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzIwOTktMik7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV8yMDk5IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSAyMDk5IiB4MT0iMS42NCIgeTE9IjgwIiB4Mj0iMTc4LjkiIHkyPSI4MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiM1MmVmZGEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMTEiIHN0b3AtY29sb3I9IiM0NGUwY2YiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMzIiIHN0b3AtY29sb3I9IiMyM2I5YjMiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNTEiIHN0b3AtY29sb3I9IiMwMDkyOTciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNjIiIHN0b3AtY29sb3I9IiMwNDkxOTciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNzQiIHN0b3AtY29sb3I9IiMxMTkwOTciLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuODciIHN0b3AtY29sb3I9IiMyNzhlOTgiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjNDU4Yzk4Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzQ2OGM5OSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIwOTktMiIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjA5OSIgeDE9IjE3LjMxIiB5MT0iOTcuNTMiIHgyPSI0Ni4zOSIgeTI9Ijk3LjUzIiB4bGluazpocmVmPSIjRMOpZ3JhZMOpX3NhbnNfbm9tXzIwOTkiLz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIwOTktMyIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjA5OSIgeDE9IjI4LjkyIiB5MT0iMTE1LjkyIiB4Mj0iMzUuMjIiIHkyPSIxMTUuOTIiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMjA5OSIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMjA5OS00IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSAyMDk5IiB4MT0iMSIgeTE9IjEyOC42MSIgeDI9IjYzLjM1IiB5Mj0iMTI4LjYxIiB4bGluazpocmVmPSIjRMOpZ3JhZMOpX3NhbnNfbm9tXzIwOTkiLz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIwOTktNSIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjA5OSIgeDE9IjEwLjM2IiB5MT0iMTM3LjE2IiB4Mj0iNTQuMzgiIHkyPSIxMzcuMTYiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMjA5OSIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMjA5OS02IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSAyMDk5IiB4MT0iNS44NSIgeTE9IjE1MS42NSIgeDI9IjU4Ljk4IiB5Mj0iMTUxLjk3IiB4bGluazpocmVmPSIjRMOpZ3JhZMOpX3NhbnNfbm9tXzIwOTkiLz4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9ImNscy02IiBkPSJNMzguOSwxNDIuMThsLTMuMTYtOS42NWgtNC4wM3M0LjI1LDEyLjk4LDQuMjUsMTIuOThsMTAuNTMtLjg5LjIzLTMuMS03LjgyLjY2Wk0zNC4zNSwxMjguMjhoLTQuMDNzLjY5LDIuMDkuNjksMi4wOWw0LjAzLjAyLS42OS0yLjFaTTI3LjMyLDExNy4wNGgtLjE1cy4yNi4zLjI2LjNsLS4xMS0uM1pNMTY2Ljk5LDgwLjkxbDExLjIxLTI2LjI3LTI5LjQyLTE3LjUxLTcuNzEtMjAuODMtMjcuNjgsMS4yMUw5MC42MiwwbC0yMi43NywxOC4xMS0zMS44OC0yLjQxLTYuNjUsMjYuMjZMMS42NCw1My4xM2wxMy4zMSwyNi4yNi05LjEsMjUuMDYsOC42Miw2LjExLDEuNjEsMS4xNS44Ny42MWMyLjI0LDEuMjYsNC45LDEuOTksNy43NywyLjAyaC4xNGMuMzYsMCwuNzEtLjAxLDEuMDYtLjA0bC0xNS40OS0xMC45OC0uMDctLjA1LjA0LS4xMiwzLjUzLTkuNjksNS4wNi0xMy45My0xMi42Mi0yNC44OSwyNi4yMy0xMC41OCw2LjMxLTI0Ljg5LDMwLjIxLDIuMjksMjEuNTgtMTcuMTcsMjEuNTgsMTYuNiwyNi4yMi0xLjE1LDcuMzEsMTkuNzQsMjcuODksMTYuNi0xMC42MywyNC44OSwxMS4yOSwyMS43NC0yNS45LDEzLjczLTQuNjQsMjUuNzUtMzEuNTQtNC0yMS41OCwxNy43NC0yNC41Ni0xNi4wMi0zLjQ4LjMtNS42Ny40Ny0uMjUsMy4xLDQuMTktLjM1LDMuNzgtLjMxLDI1LjkyLDE2LjksMjIuNzctMTguNzIsMzMuMjgsNC4yMyw0LjkxLTI3LjE3LDI3LjMzLTE0LjQ5LTExLjkxLTIyLjk0Wk01MC4wMSwxNDQuMzNsMy4yMi0uMjcuMjMtMy4xLTMuMjEuMjctLjI0LDMuMVpNMjcuMTcsMTE3LjA1bC4yNi4yOS0uMTEtLjNoLS4xNVpNMjcuNDMsMTE3LjM0bC0uMTEtLjNoLS4xNXMtMy4zOS4xMi0zLjM5LjEybDMuNzksMi42OC4wOC4yNS41Ny0uNjYtLjc5LTIuMTFaTTMwLjIzLDEyMC40M2wxLjczLDEuOTEuMzItLjM3LTIuMDQtMS41NFpNMzAuMjMsMTIwLjQzbDEuNzMsMS45MS4zMi0uMzctMi4wNC0xLjU0Wk0zMi4yOCwxMjEuOTdsMS4zNiw0LjE0LTQuMDMtLjAyLTEuMTctMy41OCwxLjgtMi4wOSwyLjA0LDEuNTRaIi8+CiAgPGc+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTUiIGQ9Ik00Ni4zOSw5Ny41M2MwLDYuNjQtNS45NCwxMi4wOC0xMy40NywxMi41NS0uMzUuMDItLjcxLjA0LTEuMDYuMDQtMi45MiwwLTUuNjMtLjc0LTcuOS0yLjAyLS45LS41MS0xLjc0LTEuMS0yLjQ4LTEuNzYtMi4xOC0xLjkyLTMuNjQtNC40My00LjA0LTcuMjQtLjAxLS4wNS0uMDItLjExLS4wMy0uMTctLjA2LS40Ni0uMDktLjkyLS4wOS0xLjQsMC0zLjE4LDEuMzYtNi4wOCwzLjYyLTguMjksMi42Ni0yLjYyLDYuNTctNC4yOSwxMC45My00LjI5LDguMDMsMCwxNC41NCw1LjYzLDE0LjU0LDEyLjU4WiIvPgogICAgPHBvbHlnb24gY2xhc3M9ImNscy00IiBwb2ludHM9IjM1LjIyIDExNS4yMiAzNC42NSAxMTUuODggMzEuOTMgMTE5LjAyIDI4LjkyIDExNS43MiAyOS4wNyAxMTMgMzAuNzggMTEyLjk0IDM0LjMyIDExMi44MiAzNS4yMiAxMTUuMjIiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTYzLjI5LDEzNi40OWMtLjA3LDEuMDYtLjIyLDIuMTItLjQ4LDMuMTItLjA1LjItLjEuMzgtLjE2LjU3LS4zOCwxLjIyLS45MywyLjMyLTEuNzMsMy4yMi0uOTksMS4xNS0yLjQsMS45NC00LjMzLDIuMTVsLjE0LTEuOC4yNS0zLjEuMDQtLjU2LjI0LTMuMS44NC0xMC43Ny0xNi4wNi0uMDgtNC4wMy0uMDItNC4zOC0uMDItNC4wMy0uMDItMjIuNjYtLjExLDEuNDEsMTkuMzFzLTYuNDMtMS4xNi03LjI0LTYuNzVjLS4yNS0xLjczLDAtNC4xNC4wNi02Ljc5LDAtLjYuMDgtNC40OS4xOS01LjUxLjg1LTcuMTQsMy45Ny0xMy45MiwxNC43MS0xNC41NCwxLjkxLS4xMiw0LjA4LS4wNCw2LjUuMjhsMi4xMywyLjM1LDIuNDYsMi43MS4yNi4yOSwyLjgxLDMuMDksMS43MywxLjkxLjMyLS4zNywzLjE2LTMuNjgsMi45Mi0zLjM5LDIuNjEtMy4wNHMyMi4xLTMuMDcsMjEuNjksMTUuNGMtLjAxLjU5LjkzLDQuOTIuNjIsOS4yNFoiLz4KICAgIDxwb2x5Z29uIGNsYXNzPSJjbHMtMyIgcG9pbnRzPSI1NC4zOCAxMjguMzIgNTMuNzMgMTM3LjMgNTMuNSAxNDAuNCA1My40NiAxNDAuOTYgNTMuMjQgMTQ0LjA2IDUzLjA4IDE0Ni4wOSAxMi4wNyAxNDYuMDkgMTAuMzYgMTI4LjIzIDMwLjMyIDEyOC4yNyAzNC4zNSAxMjguMjggMzguNzIgMTI4LjI5IDQyLjc1IDEyOC4zIDU0LjM4IDEyOC4zMiIvPgogICAgPHBvbHlnb24gY2xhc3M9ImNscy0yIiBwb2ludHM9IjUuODcgMTQ4LjQ1IDU5IDE0OC4zNSA1Ni4wOCAxNTQuNzkgOS4xNCAxNTUuMyA1Ljg3IDE0OC40NSIvPgogIDwvZz4KPC9zdmc+',
  'rose': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMTY5KTsKICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIxNjkiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIxNjkiIHgxPSIwIiB5MT0iODAiIHgyPSIxNjAiIHkyPSI4MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNmYzkzZmEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMDUiIHN0b3AtY29sb3I9IiNmYjgwZWYiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMTQiIHN0b3AtY29sb3I9IiNmODUxZDUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMjYiIHN0b3AtY29sb3I9IiNmNDA1YWIiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMjciIHN0b3AtY29sb3I9IiNmNDAwYTkiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIxIiBzdG9wLWNvbG9yPSIjZTE3YjdkIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogIDwvZGVmcz4KICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik04MCwwQzM1LjgyLDAsMCwzNS44MiwwLDgwczM1LjgyLDgwLDgwLDgwLDgwLTM1LjgyLDgwLTgwUzEyNC4xOCwwLDgwLDBaTTc5Ljk5LDE1MC4zOWMtMzguNTksMC02OS44Ny0zMS41NS02OS44Ny03MC40N1M0MS4zOSw5LjQ0LDc5Ljk5LDkuNDRzNjkuODcsMzEuNTYsNjkuODcsNzAuNDgtMzEuMjgsNzAuNDctNjkuODcsNzAuNDdaIi8+Cjwvc3ZnPg==',
  'social': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzguNjkgMTYwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMjcwLTIpOwogICAgICAgIHN0cm9rZTogI2ZmZjsKICAgICAgfQoKICAgICAgLmNscy0xLCAuY2xzLTIgewogICAgICAgIHN0cm9rZS1taXRlcmxpbWl0OiAxMDsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiBub25lOwogICAgICAgIHN0cm9rZTogI2UyNTIxYTsKICAgICAgICBzdHJva2Utd2lkdGg6IDJweDsKICAgICAgfQoKICAgICAgLmNscy0zIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMjcwKTsKICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNzAiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIyNzAiIHgxPSI4LjA2IiB5MT0iODAiIHgyPSIxNzguNjkiIHkyPSI4MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9IjAiIHN0b3AtY29sb3I9IiNlN2Y3NmMiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMSIgc3RvcC1jb2xvcj0iI2VhZTg2ZSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4yOSIgc3RvcC1jb2xvcj0iI2YzYzE3MyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii41IiBzdG9wLWNvbG9yPSIjZmY4ZjdiIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjYxIiBzdG9wLWNvbG9yPSIjZmQ4ZDc2Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjczIiBzdG9wLWNvbG9yPSIjZjc4OTY5Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjg2IiBzdG9wLWNvbG9yPSIjZWY4MjUzIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjk4IiBzdG9wLWNvbG9yPSIjZTI3ODM1Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iI2UxNzczMSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIyNzAtMiIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMjI3MCIgeDE9Ii43OSIgeTE9IjEzMS44IiB4Mj0iODUuNjkiIHkyPSIxMzEuOCIgeGxpbms6aHJlZj0iI0TDqWdyYWTDqV9zYW5zX25vbV8yMjcwIi8+CiAgPC9kZWZzPgogIDxwYXRoIGNsYXNzPSJjbHMtMyIgZD0iTTE2Ny4yMyw4MC45MWwxMC43OS0yNi4yNy0yOC4zMi0xNy41MS03LjQyLTIwLjgzLTI2LjY0LDEuMjFMOTMuNzEsMGwtMjEuOTIsMTguMTEtMzAuNjktMi40MS02LjQxLDI2LjI2LTI2LjY0LDExLjE3LDEyLjgxLDI2LjI2LTguNzYsMjUuMDYsMjAuOTEsMTUuNCw4LjA5LDI1LjY2LDI3LjY2LTIuNDEsMjQuOTUsMTYuOSwyMS45Mi0xOC43MiwzMi4wNCw0LjIzLDQuNzItMjcuMTcsMjYuMy0xNC40OS0xMS40Ni0yMi45NFpNMTQ5LjM4LDExNi40M2wtNC40NywyNS43NS0zMC4zNi00LTIwLjc4LDE3Ljc0LTIzLjY0LTE2LjAyLTI2LjIsMi4yOS03LjY3LTI0LjMyLTE5LjgxLTE0LjU5LDguMzEtMjMuNzQtMTIuMTQtMjQuODksMjUuMjUtMTAuNTgsNi4wOC0yNC44OSwyOS4wOCwyLjI5LDIwLjc3LTE3LjE3LDIwLjc4LDE2LjYsMjUuMjQtMS4xNSw3LjAzLDE5Ljc0LDI2Ljg1LDE2LjYtMTAuMjMsMjQuODksMTAuODcsMjEuNzQtMjQuOTMsMTMuNzNaIi8+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODQuODQsMTI0LjAzbC01Ljg2LDUuMjRjLTEuMTIsMS0yLjkzLDEtNC4wNCwwbC0yLjM1LDEuNjcuMTksNC4zOS01LjE5LDQuMjVjMCwuMDcuMDguMjUuMDguMjUuMS4xNi4yMS4zMi4zMi40OC44MywxLjIsMS43NywyLjI0LDEuMzIsMi45MS0yLjYyLDMuOTUtNS42MSwyLjI3LTUuNjEsMi4yNy41NCw4LjY3LTYuNDksNC4xNi02Ljc5LDMuOTksNC4wMiw4LjQzLTUuMzUsNS42Ny01LjM1LDUuNjctMy4yMiw3Ljk5LTEwLjAzLS4wOC0xMC4wMy0uMDhsLjA2LS4wNC0xLjAyLS42NC0zLjY1LDIuOTZjLTcuMywyLjgyLTUuMDYtMy45My01LjA2LTMuOTMtOC44MiwxLjk2LTUuNjctNC43OC01LjY3LTQuNzgtNy4xMywyLjU4LTYuMjQtMi45My01Ljg3LTQuMDktLjAxLDAtLjAyLDAtLjAzLDAtNy4zNiwxLjExLTUuNC01LjczLTUuNC01LjczbC4zNC0uMjgtLjIzLS4xNWMtLjA3LS4wNS0uMTUtLjEtLjItLjE3bC0xLjg3LTIuMDJjLS4xNS0uMTYtLjIzLS4zNi0uMjQtLjU3bC0uMDktMy4yOWMwLS4yNi0uMTQtLjUtLjM2LS42N2wtMS4zMi0xLjA1Yy0uMjItLjE4LS4zNC0uNDItLjM1LS42Ny0xLjAzLjM3LTIuMjUuMTgtMy4wOC0uNTdsLTUuODYtNS4yNGMtMS4xMi0xLTEuMTItMi42MiwwLTMuNjJsMTYuNDctMTQuNzRjMS4xMi0xLDIuOTMtMSw0LjA1LDBsNS44Niw1LjI0YzEuMDMuOTIsMS4xMSwyLjM4LjIzLDMuMzlsLjk4LDEuMDVjLjE4LjExLjY5LS4xMi45LS4xMmwxMC43NC0uMDNjLjU5LS4wMSwyLjA5LS4yMiwyLjA5LS4yMmwxNS45LS4yNS0uMzYtLjMzYy0xLjEyLTEtMS4xMi0yLjYyLDAtMy42Mmw1Ljg2LTUuMjVjMS4xMi0xLDIuOTMtMSw0LjA1LDBsMTYuNDYsMTQuNzRjMS4xMiwxLDEuMTIsMi42MiwwLDMuNjJaIi8+CiAgPGc+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xOCwxMDYuMjhMMS42OCwxMjAuODljLS45MS44Mi0uOTEsMi4xNCwwLDIuOTVsNi4wMyw1LjRjLjkxLjgyLDIuMzkuODIsMy4zLDBsMTYuMzItMTQuNjFjLjkxLS44Mi45MS0yLjE0LDAtMi45NWwtNi4wMy01LjRjLS45MS0uODItMi4zOS0uODItMy4zLDBaIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik02Ny45OCwxMDYuMTVsMTYuMzIsMTQuNjFjLjkxLjgyLjkxLDIuMTQsMCwyLjk1bC02LjAzLDUuNGMtLjkxLjgyLTIuMzkuODItMy4zLDBsLTE2LjMyLTE0LjYxYy0uOTEtLjgyLS45MS0yLjE0LDAtMi45NWw2LjAzLTUuNGMuOTEtLjgyLDIuMzktLjgyLDMuMywwWiIvPgogICAgPHBvbHlsaW5lIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIyNy4wNyAxMTQuNzMgMjguOTIgMTE2LjI0IDQwLjk4IDExNi4yNCIvPgogICAgPHBvbHlsaW5lIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSIxMC40OSAxMjkuMzYgMTMuMTkgMTMxLjQgMTIuODUgMTM2LjE0IDE0Ljg3IDEzOS4wOCIvPgogICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMjIuMzcsMTMyLjU4bC02Ljc3LDYuMDZjLTEuMjUsMS4xMi0xLjI1LDIuOTQsMCw0LjA2bC43LjYyYzEuMjUsMS4xMiwzLjI4LDEuMTIsNC41MywwbDYuNzctNi4wNmMxLjI1LTEuMTIsMS4yNS0yLjk0LDAtNC4wNmwtLjctLjYyYy0xLjI1LTEuMTItMy4yOC0xLjEyLTQuNTMsMFoiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTI3Ljg0LDEzNy42OWwtNi43Nyw2LjA2Yy0xLjI1LDEuMTItMS4yNSwyLjk0LDAsNC4wNmwuNy42MmMxLjI1LDEuMTIsMy4yOCwxLjEyLDQuNTMsMGw2Ljc3LTYuMDZjMS4yNS0xLjEyLDEuMjUtMi45NCwwLTQuMDZsLS43LS42MmMtMS4yNS0xLjEyLTMuMjgtMS4xMi00LjUzLDBaIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0zMy40OSwxNDIuMzdsLTYuNzcsNi4wNmMtMS4yNSwxLjEyLTEuMjUsMi45NCwwLDQuMDZsLjcuNjJjMS4yNSwxLjEyLDMuMjgsMS4xMiw0LjUzLDBsNi43Ny02LjA2YzEuMjUtMS4xMiwxLjI1LTIuOTQsMC00LjA2bC0uNy0uNjJjLTEuMjUtMS4xMi0zLjI4LTEuMTItNC41MywwWiIvPgogICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzguNjUsMTQ3LjMzbC02LjA5LDUuNDVjLTEuMjUsMS4xMi0xLjI1LDIuOTQsMCw0LjA2bC4zOC4zNGMxLjI1LDEuMTIsMy4yOCwxLjEyLDQuNTMsMGw2LjA5LTUuNDVjMS4yNS0xLjEyLDEuMjUtMi45NCwwLTQuMDZsLS4zOC0uMzRjLTEuMjUtMS4xMi0zLjI4LTEuMTItNC41MywwWiIvPgogICAgPHBvbHlsaW5lIGNsYXNzPSJjbHMtMiIgcG9pbnRzPSI3NC4wNyAxMjguODggNzEuNTggMTMwLjc5IDcyLjA0IDEzNS43MSA2OC4zNCAxMzguNzMiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTU5Ljc4LDExNS43N2wtMTYuMzEtLjQyYy0xLjExLjAzLTIuMTcuNDQtMi45NSwxLjE1bC0xMC42NywxMC4yMSIvPgogICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMzAuNjksMTI2LjY0bDEuNTIsMS4yMWMzLjAyLDEuNDcsNi43MywxLjIyLDkuNDctLjY0bDMuODQtMi42MSw1LjU2LjIzIi8+CiAgICA8bGluZSBjbGFzcz0iY2xzLTIiIHgxPSI1MC43NiIgeTE9IjEyNC43NiIgeDI9IjY4LjU1IiB5Mj0iMTM5LjQiLz4KICAgIDxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjQ5LjE2IiB5MT0iMTMzLjI4IiB4Mj0iNjIuMjIiIHkyPSIxNDQuMTUiLz4KICAgIDxsaW5lIGNsYXNzPSJjbHMtMiIgeDE9IjQyLjQxIiB5MT0iMTM3LjQzIiB4Mj0iNTUuNCIgeTI9IjE0OC4zOCIvPgogICAgPGxpbmUgY2xhc3M9ImNscy0yIiB4MT0iNDQuMjciIHkxPSIxNDkuMzYiIHgyPSI1MS4wMSIgeTI9IjE1NC45NCIvPgogICAgPGxpbmUgY2xhc3M9ImNscy0yIiB4MT0iNDAuOTgiIHkxPSIxNTMuOTYiIHgyPSI0Ni4yMSIgeTI9IjE1OC4yNyIvPgogICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNTAuNjksMTU0LjhsLjA1LjAyLDEuMjUuNzJjMS4xLjkyLDYuNzctLjM4LDUuMzQtNS4zNmwtMS45NC0xLjgxIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik00NiwxNTguMDVjMS42Ny44NSw2LjIxLjE4LDQuMDMtNC4wMSIvPgogICAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNNTUuNzYsMTQ4Ljg2bC4wNy4wNCwxLjU4LDEuMDhjMS40NSwxLjI4LDguMzMtLjA0LDQuOS01LjUzbC0yLjYxLTIuNDIiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTYxLjc1LDE0My45MmwuMDcuMDQsMS4wOC44YzEuNDIsMS4yNiw3Ljc3LS40OCw1LjI2LTQuNjgtLjEyLS4yMS0uNTYtLjcxLS43LS45MWwtMS4zNS0xLjg5Ii8+CiAgPC9nPgo8L3N2Zz4=',
  'turquoise': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNjAgMTYwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8yMDk0KTsKICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzIwOTQiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDIwOTQiIHgxPSIwIiB5MT0iODAiIHgyPSIxNjAiIHkyPSI4MCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4wNCIgc3RvcC1jb2xvcj0iIzUyZWZkYSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4yMiIgc3RvcC1jb2xvcj0iIzJmYzdiZCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4zOSIgc3RvcC1jb2xvcj0iIzE1YWFhOCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii41NCIgc3RvcC1jb2xvcj0iIzA1OTg5YiIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii42NSIgc3RvcC1jb2xvcj0iIzAwOTI5NyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii43MiIgc3RvcC1jb2xvcj0iIzEzOTA5NyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii44OSIgc3RvcC1jb2xvcj0iIzM4OGQ5OCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii45NyIgc3RvcC1jb2xvcj0iIzQ2OGM5OSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNODAsMEMzNS44MiwwLDAsMzUuODIsMCw4MHMzNS44Miw4MCw4MCw4MCw4MC0zNS44MSw4MC04MFMxMjQuMTgsMCw4MCwwWk04MC4zMywxNTAuNzJjLTM4LjQ5LDAtNjkuNy0zMS41MS02OS43LTcwLjM4UzQxLjg0LDkuOTYsODAuMzMsOS45NnM2OS43LDMxLjUxLDY5LjcsNzAuMzctMzEuMjEsNzAuMzgtNjkuNyw3MC4zOFoiLz4KPC9zdmc+',
};

const BADGE_SVGS = {
  'badge-1': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzAgMTcwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV83Nik7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAxMHB4OwogICAgICB9CgogICAgICAuY2xzLTEsIC5jbHMtMiB7CiAgICAgICAgc3Ryb2tlOiAjMDAwOwogICAgICAgIHN0cm9rZS1taXRlcmxpbWl0OiAxMDsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiBub25lOwogICAgICAgIHN0cm9rZS1saW5lY2FwOiByb3VuZDsKICAgICAgICBzdHJva2Utd2lkdGg6IDE0cHg7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV83NiIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gNzYiIHgxPSI3MC4xOCIgeTE9IjY5LjE0IiB4Mj0iMTcwLjAyIiB5Mj0iMTkwLjA1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2U3ZmY2YyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4zNiIgc3RvcC1jb2xvcj0iIzg0ZjRiNCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii41NCIgc3RvcC1jb2xvcj0iIzUyZWZkYSIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTU4LjEsOTUuMTRjNi41My01LjUyLDExLjg0LTEzLjY5LS43LTIwLjg4LTMuOTktMi4yOS01Ljc0LTYuOTgtNC4xMi0xMS4xOSwzLjE1LTguMjIsNS4wNy0yMC4yNi05Ljg4LTIxLjYzLTMuOTQtLjM2LTcuMTMtMy4yOS03LjUzLTcuMTEtMS4wMS05LjYtNS40LTI0LjUzLTIzLjQ0LTE2Ljg1LTUsMi4xMy0xMC44My43MS0xNC4zNC0zLjM0LTYuNC03LjM5LTE2Ljg5LTE1LjMzLTI1LjM1LTEuNzEtMy4wOSw0Ljk4LTkuNTcsNi45Ny0xNS4wMSw0LjUzLTguNTctMy44NS0xOS4yLTUuNS0xOC4yNiwxMC43Ny4zMSw1LjQtMy44LDEwLjA0LTkuMzYsMTAuNTMtOS41Ny44NC0yMS4xLDQuNy0xNS44NCwxOS4xNiwyLjIzLDYuMTIuODYsMTIuOTgtMy44NSwxNy41OS01LjQxLDUuMjktOS4yNCwxMi43OSwxLjA4LDE5LjY4LDQuNTIsMy4wMSw2LjEzLDguNzIsMy43OSwxMy41My00LjI0LDguNzEtNi43MywyMC43NCwxMS4wOCwyMS44LDUuMjIuMzEsOS40Myw0LjM2LDkuOCw5LjQyLjY5LDkuNTMsNC4yNiwyMS42NywxOC44NiwxNC44OCw1LjEzLTIuMzksMTEuMjktMS4zNSwxNS4yOSwyLjU3LDYuODEsNi42NywxNy40OSwxMy40NywyNS43MSwxLjc5LDQuMDgtNS44LDExLjU4LTguMzYsMTguNDQtNi4xNCw4LjkzLDIuODksMTkuMjEsMy4zNSwxOS4yNy05Ljc2LjAzLTYuMjksNS4wNi0xMS40OSwxMS41NC0xMS43MiwxMC4yMy0uMzYsMjAuODMtNC4wMSwxMC41MS0xOS45NS0zLjM0LTUuMTYtMi40MS0xMS45NiwyLjMzLTE1Ljk3WiIvPgogIDxnPgogICAgPGxpbmUgY2xhc3M9ImNscy0yIiB4MT0iNTEuODgiIHkxPSI4Mi42OCIgeDI9Ijc3Ljc1IiB5Mj0iMTA3LjExIi8+CiAgICA8bGluZSBjbGFzcz0iY2xzLTIiIHgxPSIxMjAuNzUiIHkxPSI2NS40MSIgeDI9Ijc3Ljc1IiB5Mj0iMTA3LjExIi8+CiAgPC9nPgo8L3N2Zz4=',
  'badge-2': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzAgMTcwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiAjZjlkZDEwOwogICAgICAgIHN0cm9rZTogI2FkOTgxYzsKICAgICAgfQoKICAgICAgLmNscy0xLCAuY2xzLTIsIC5jbHMtMywgLmNscy00LCAuY2xzLTUgewogICAgICAgIHN0cm9rZS1taXRlcmxpbWl0OiAxMDsKICAgICAgfQoKICAgICAgLmNscy0xLCAuY2xzLTUgewogICAgICAgIHN0cm9rZS13aWR0aDogMnB4OwogICAgICB9CgogICAgICAuY2xzLTIgewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzc2KTsKICAgICAgfQoKICAgICAgLmNscy0yLCAuY2xzLTMsIC5jbHMtNCB7CiAgICAgICAgc3Ryb2tlOiAjMDAwOwogICAgICB9CgogICAgICAuY2xzLTIsIC5jbHMtNCB7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAxMHB4OwogICAgICB9CgogICAgICAuY2xzLTMgewogICAgICAgIGZpbGw6IG5vbmU7CiAgICAgICAgc3Ryb2tlLWxpbmVjYXA6IHJvdW5kOwogICAgICAgIHN0cm9rZS13aWR0aDogMTRweDsKICAgICAgfQoKICAgICAgLmNscy02IHsKICAgICAgICBmaWxsOiAjZjI5YjBmOwogICAgICB9CgogICAgICAuY2xzLTQgewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzE4NSk7CiAgICAgIH0KCiAgICAgIC5jbHMtNyB7CiAgICAgICAgZmlsbDogIzJiMmIyYjsKICAgICAgfQoKICAgICAgLmNscy01IHsKICAgICAgICBmaWxsOiAjZWZlZmVmOwogICAgICAgIHN0cm9rZTogI2I3YjRiMDsKICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzc2IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSA3NiIgeDE9IjcwLjE4IiB5MT0iNjkuMTQiIHgyPSIxNzAuMDIiIHkyPSIxOTAuMDUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjZTdmZjZjIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjM2IiBzdG9wLWNvbG9yPSIjODRmNGI0Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjU0IiBzdG9wLWNvbG9yPSIjNTJlZmRhIi8+CiAgICA8L2xpbmVhckdyYWRpZW50PgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMTg1IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSAxODUiIHgxPSI3MC4xOCIgeTE9IjY5LjE0IiB4Mj0iMTcwLjAyIiB5Mj0iMTkwLjA1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iMCIgc3RvcC1jb2xvcj0iI2U4ZWI0MSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4wOSIgc3RvcC1jb2xvcj0iI2U4ZTYzZSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4yIiBzdG9wLWNvbG9yPSIjZWJkODM2Ii8+CiAgICAgIDxzdG9wIG9mZnNldD0iLjMiIHN0b3AtY29sb3I9IiNmMGMyMjkiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNDIiIHN0b3AtY29sb3I9IiNmNmEyMTgiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNTMiIHN0b3AtY29sb3I9IiNmZTdhMDEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNTQiIHN0b3AtY29sb3I9IiNmZjc4MDAiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGNsYXNzPSJjbHMtMiIgZD0iTTE1OC4xLDk1LjE0YzYuNTMtNS41MiwxMS44NC0xMy42OS0uNy0yMC44OC0zLjk5LTIuMjktNS43NC02Ljk4LTQuMTItMTEuMTksMy4xNS04LjIyLDUuMDctMjAuMjYtOS44OC0yMS42My0zLjk0LS4zNi03LjEzLTMuMjktNy41My03LjExLTEuMDEtOS42LTUuNC0yNC41My0yMy40NC0xNi44NS01LDIuMTMtMTAuODMuNzEtMTQuMzQtMy4zNC02LjQtNy4zOS0xNi44OS0xNS4zMy0yNS4zNS0xLjcxLTMuMDksNC45OC05LjU3LDYuOTctMTUuMDEsNC41My04LjU3LTMuODUtMTkuMi01LjUtMTguMjYsMTAuNzcuMzEsNS40LTMuOCwxMC4wNC05LjM2LDEwLjUzLTkuNTcuODQtMjEuMSw0LjctMTUuODQsMTkuMTYsMi4yMyw2LjEyLjg2LDEyLjk4LTMuODUsMTcuNTktNS40MSw1LjI5LTkuMjQsMTIuNzksMS4wOCwxOS42OCw0LjUyLDMuMDEsNi4xMyw4LjcyLDMuNzksMTMuNTMtNC4yNCw4LjcxLTYuNzMsMjAuNzQsMTEuMDgsMjEuOCw1LjIyLjMxLDkuNDMsNC4zNiw5LjgsOS40Mi42OSw5LjUzLDQuMjYsMjEuNjcsMTguODYsMTQuODgsNS4xMy0yLjM5LDExLjI5LTEuMzUsMTUuMjksMi41Nyw2LjgxLDYuNjcsMTcuNDksMTMuNDcsMjUuNzEsMS43OSw0LjA4LTUuOCwxMS41OC04LjM2LDE4LjQ0LTYuMTQsOC45MywyLjg5LDE5LjIxLDMuMzUsMTkuMjctOS43Ni4wMy02LjI5LDUuMDYtMTEuNDksMTEuNTQtMTEuNzIsMTAuMjMtLjM2LDIwLjgzLTQuMDEsMTAuNTEtMTkuOTUtMy4zNC01LjE2LTIuNDEtMTEuOTYsMi4zMy0xNS45N1oiLz4KICA8Zz4KICAgIDxsaW5lIGNsYXNzPSJjbHMtMyIgeDE9IjUxLjg4IiB5MT0iODIuNjgiIHgyPSI3Ny43NSIgeTI9IjEwNy4xMSIvPgogICAgPGxpbmUgY2xhc3M9ImNscy0zIiB4MT0iMTIwLjc1IiB5MT0iNjUuNDEiIHgyPSI3Ny43NSIgeTI9IjEwNy4xMSIvPgogIDwvZz4KICA8cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNTguMSw5NS4xNGM2LjUzLTUuNTIsMTEuODQtMTMuNjktLjctMjAuODgtMy45OS0yLjI5LTUuNzQtNi45OC00LjEyLTExLjE5LDMuMTUtOC4yMiw1LjA3LTIwLjI2LTkuODgtMjEuNjMtMy45NC0uMzYtNy4xMy0zLjI5LTcuNTMtNy4xMS0xLjAxLTkuNi01LjQtMjQuNTMtMjMuNDQtMTYuODUtNSwyLjEzLTEwLjgzLjcxLTE0LjM0LTMuMzQtNi40LTcuMzktMTYuODktMTUuMzMtMjUuMzUtMS43MS0zLjA5LDQuOTgtOS41Nyw2Ljk3LTE1LjAxLDQuNTMtOC41Ny0zLjg1LTE5LjItNS41LTE4LjI2LDEwLjc3LjMxLDUuNC0zLjgsMTAuMDQtOS4zNiwxMC41My05LjU3Ljg0LTIxLjEsNC43LTE1Ljg0LDE5LjE2LDIuMjMsNi4xMi44NiwxMi45OC0zLjg1LDE3LjU5LTUuNDEsNS4yOS05LjI0LDEyLjc5LDEuMDgsMTkuNjgsNC41MiwzLjAxLDYuMTMsOC43MiwzLjc5LDEzLjUzLTQuMjQsOC43MS02LjczLDIwLjc0LDExLjA4LDIxLjgsNS4yMi4zMSw5LjQzLDQuMzYsOS44LDkuNDIuNjksOS41Myw0LjI2LDIxLjY3LDE4Ljg2LDE0Ljg4LDUuMTMtMi4zOSwxMS4yOS0xLjM1LDE1LjI5LDIuNTcsNi44MSw2LjY3LDE3LjQ5LDEzLjQ3LDI1LjcxLDEuNzksNC4wOC01LjgsMTEuNTgtOC4zNiwxOC40NC02LjE0LDguOTMsMi44OSwxOS4yMSwzLjM1LDE5LjI3LTkuNzYuMDMtNi4yOSw1LjA2LTExLjQ5LDExLjU0LTExLjcyLDEwLjIzLS4zNiwyMC44My00LjAxLDEwLjUxLTE5Ljk1LTMuMzQtNS4xNi0yLjQxLTExLjk2LDIuMzMtMTUuOTdaIi8+CiAgPGc+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik02My4xMiw1NS4zNHMtNi42LDE3LjE2LDQuMjMsMjMuNDZjMCwwLTExLjA5LDEwLjg1LTEwLjA0LDE2LjE1czI3LjQ3LDM5Ljg2LDU4LjExLDYuNTZjMCwwLS43OS0xOS4xNy0xMS44OS0yMS4xOSwwLDAsMTIuNjgtNi41Niw0Ljc1LTI0Ljk4aC00NS4xN1oiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtNSIgZD0iTTU1Ljg3LDU2LjQxczguOTQtMzIuNzEsMzcuNTctMjQuMDRjMCwwLDE5LjY4LDMuMjIsMjIuMjMsMjkuNzRsLTkuOTctNC45Ni00LjYsNi4yLTEwLjIyLTYuMi03LjE2LDQuMjEtMTMuMDMtNS45NS0xNC44Mi45OVoiLz4KICAgIDxwYXRoIGNsYXNzPSJjbHMtNSIgZD0iTTUwLDk5Ljc4cy03LjE2LDM5LjE1LDMxLjY5LDQyLjg3YzAsMCwzOC44NCw1LjQ1LDM5LjYxLTI4LjI1LDAsMCwxLjI4LTEzLjg4LTEuMjgtMTQuMTNsLTEyLjI3LDQuNzEtOC40My01LjQ1LTEzLjgsNi42OS0xMS4yNC0xMC45LTguOTQsOC40My04LjQzLTguNDMtNi45LDQuNDZaIi8+CiAgICA8ZWxsaXBzZSBjbGFzcz0iY2xzLTciIGN4PSI3Ny45OCIgY3k9IjY2LjU4IiByeD0iMi45OCIgcnk9IjIuODEiLz4KICAgIDxlbGxpcHNlIGNsYXNzPSJjbHMtNyIgY3g9IjkzLjgiIGN5PSI2Ni42NSIgcng9IjIuOTgiIHJ5PSIyLjgxIi8+CiAgICA8cG9seWdvbiBjbGFzcz0iY2xzLTYiIHBvaW50cz0iODEuOTMgNzAuMTggOTAuMTIgNjkuODggODYuMjggNzYuOTEgODEuOTMgNzAuMTgiLz4KICA8L2c+Cjwvc3ZnPg==',
  'badge-3': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzAgMTcwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV82NjApOwogICAgICAgIHN0cm9rZS13aWR0aDogNnB4OwogICAgICB9CgogICAgICAuY2xzLTEsIC5jbHMtMiB7CiAgICAgICAgc3Ryb2tlOiAjMDAwOwogICAgICAgIHN0cm9rZS1taXRlcmxpbWl0OiAxMDsKICAgICAgfQoKICAgICAgLmNscy0yIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV80NjcpOwogICAgICAgIHN0cm9rZS13aWR0aDogMTBweDsKICAgICAgfQogICAgPC9zdHlsZT4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzQ2NyIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gNDY3IiB4MT0iNzAuMTgiIHkxPSI2OS4xNCIgeDI9IjE3MC4wMiIgeTI9IjE5MC4wNSIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4wMiIgc3RvcC1jb2xvcj0iI2U3NjU2YyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4xMyIgc3RvcC1jb2xvcj0iI2U5NjY2MiIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4zMiIgc3RvcC1jb2xvcj0iI2VmNmE0YSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii41NiIgc3RvcC1jb2xvcj0iI2Y5NzEyMSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii42OCIgc3RvcC1jb2xvcj0iI2ZmNzUwYiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzY2MCIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gNjYwIiB4MT0iODIuMTQiIHkxPSI4NC40OSIgeDI9IjExMS40NCIgeTI9IjExOS45OCIgZ3JhZGllbnRVbml0cz0idXNlclNwYWNlT25Vc2UiPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4wMiIgc3RvcC1jb2xvcj0iI2U3ZWI2YyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4xMSIgc3RvcC1jb2xvcj0iI2U4ZTE2NSIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii4yNiIgc3RvcC1jb2xvcj0iI2VkYzk1MyIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii40NSIgc3RvcC1jb2xvcj0iI2Y0YTAzNiIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii42NyIgc3RvcC1jb2xvcj0iI2ZlNjkwZCIvPgogICAgICA8c3RvcCBvZmZzZXQ9Ii42OCIgc3RvcC1jb2xvcj0iI2ZmNjUwYiIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICA8L2RlZnM+CiAgPHBhdGggY2xhc3M9ImNscy0yIiBkPSJNMTU4LjEsOTUuMTRjNi41My01LjUyLDExLjg0LTEzLjY5LS43LTIwLjg4LTMuOTktMi4yOS01Ljc0LTYuOTgtNC4xMi0xMS4xOSwzLjE1LTguMjIsNS4wNy0yMC4yNi05Ljg4LTIxLjYzLTMuOTQtLjM2LTcuMTMtMy4yOS03LjUzLTcuMTEtMS4wMS05LjYtNS40LTI0LjUzLTIzLjQ0LTE2Ljg1LTUsMi4xMy0xMC44My43MS0xNC4zNC0zLjM0LTYuNC03LjM5LTE2Ljg5LTE1LjMzLTI1LjM1LTEuNzEtMy4wOSw0Ljk4LTkuNTcsNi45Ny0xNS4wMSw0LjUzLTguNTctMy44NS0xOS4yLTUuNS0xOC4yNiwxMC43Ny4zMSw1LjQtMy44LDEwLjA0LTkuMzYsMTAuNTMtOS41Ny44NC0yMS4xLDQuNy0xNS44NCwxOS4xNiwyLjIzLDYuMTIuODYsMTIuOTgtMy44NSwxNy41OS01LjQxLDUuMjktOS4yNCwxMi43OSwxLjA4LDE5LjY4LDQuNTIsMy4wMSw2LjEzLDguNzIsMy43OSwxMy41My00LjI0LDguNzEtNi43MywyMC43NCwxMS4wOCwyMS44LDUuMjIuMzEsOS40Myw0LjM2LDkuOCw5LjQyLjY5LDkuNTMsNC4yNiwyMS42NywxOC44NiwxNC44OCw1LjEzLTIuMzksMTEuMjktMS4zNSwxNS4yOSwyLjU3LDYuODEsNi42NywxNy40OSwxMy40NywyNS43MSwxLjc5LDQuMDgtNS44LDExLjU4LTguMzYsMTguNDQtNi4xNCw4LjkzLDIuODksMTkuMjEsMy4zNSwxOS4yNy05Ljc2LjAzLTYuMjksNS4wNi0xMS40OSwxMS41NC0xMS43MiwxMC4yMy0uMzYsMjAuODMtNC4wMSwxMC41MS0xOS45NS0zLjM0LTUuMTYtMi40MS0xMS45NiwyLjMzLTE1Ljk3WiIvPgogIDxwb2x5Z29uIGNsYXNzPSJjbHMtMSIgcG9pbnRzPSI2NC41IDkyLjYxIDExMi4wNCAzNy41NSA4OC42OCA4MS4yOCAxMDYuNjEgODYuODIgNjAuNDIgMTQxLjM1IDg0LjYgOTcuMzUgNjQuNSA5Mi42MSIvPgo8L3N2Zz4=',
  'badge-4': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzAgMTcwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV83NzIpOwogICAgICAgIHN0cm9rZTogIzAwMDsKICAgICAgICBzdHJva2Utd2lkdGg6IDEwcHg7CiAgICAgIH0KCiAgICAgIC5jbHMtMSwgLmNscy0yIHsKICAgICAgICBzdHJva2UtbWl0ZXJsaW1pdDogMTA7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbDogdXJsKCNEw6lncmFkw6lfc2Fuc19ub21fODI5KTsKICAgICAgICBzdHJva2U6ICM3MDRmMGY7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAzcHg7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV83NzIiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDc3MiIgeDE9IjcwLjE4IiB5MT0iNjkuMTQiIHgyPSIxNzAuMDIiIHkyPSIxOTAuMDUiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMDIiIHN0b3AtY29sb3I9IiNlNzY1MjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMjciIHN0b3AtY29sb3I9IiNlNDQzMTkiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNjgiIHN0b3AtY29sb3I9IiNkZjA3MGIiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV84MjkiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDgyOSIgeDE9IjU2Ljk4IiB5MT0iNDkuMzIiIHgyPSIxMTMuMDkiIHkyPSIxMTcuMjgiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMDIiIHN0b3AtY29sb3I9IiNlN2QzMjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuMzciIHN0b3AtY29sb3I9IiNlMmIxMmEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNjgiIHN0b3AtY29sb3I9IiNkZjkxMzMiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxwYXRoIGNsYXNzPSJjbHMtMSIgZD0iTTE1OC4xLDk1LjE0YzYuNTMtNS41MiwxMS44NC0xMy42OS0uNy0yMC44OC0zLjk5LTIuMjktNS43NC02Ljk4LTQuMTItMTEuMTksMy4xNS04LjIyLDUuMDctMjAuMjYtOS44OC0yMS42My0zLjk0LS4zNi03LjEzLTMuMjktNy41My03LjExLTEuMDEtOS42LTUuNC0yNC41My0yMy40NC0xNi44NS01LDIuMTMtMTAuODMuNzEtMTQuMzQtMy4zNC02LjQtNy4zOS0xNi44OS0xNS4zMy0yNS4zNS0xLjcxLTMuMDksNC45OC05LjU3LDYuOTctMTUuMDEsNC41My04LjU3LTMuODUtMTkuMi01LjUtMTguMjYsMTAuNzcuMzEsNS40LTMuOCwxMC4wNC05LjM2LDEwLjUzLTkuNTcuODQtMjEuMSw0LjctMTUuODQsMTkuMTYsMi4yMyw2LjEyLjg2LDEyLjk4LTMuODUsMTcuNTktNS40MSw1LjI5LTkuMjQsMTIuNzksMS4wOCwxOS42OCw0LjUyLDMuMDEsNi4xMyw4LjcyLDMuNzksMTMuNTMtNC4yNCw4LjcxLTYuNzMsMjAuNzQsMTEuMDgsMjEuOCw1LjIyLjMxLDkuNDMsNC4zNiw5LjgsOS40Mi42OSw5LjUzLDQuMjYsMjEuNjcsMTguODYsMTQuODgsNS4xMy0yLjM5LDExLjI5LTEuMzUsMTUuMjksMi41Nyw2LjgxLDYuNjcsMTcuNDksMTMuNDcsMjUuNzEsMS43OSw0LjA4LTUuOCwxMS41OC04LjM2LDE4LjQ0LTYuMTQsOC45MywyLjg5LDE5LjIxLDMuMzUsMTkuMjctOS43Ni4wMy02LjI5LDUuMDYtMTEuNDksMTEuNTQtMTEuNzIsMTAuMjMtLjM2LDIwLjgzLTQuMDEsMTAuNTEtMTkuOTUtMy4zNC01LjE2LTIuNDEtMTEuOTYsMi4zMy0xNS45N1oiLz4KICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xMTcuOTQsNTcuMTljLTEuOTUtMS45LTQuNTctMi41Ny02LjcxLTIuNzUtMi4yNC0uMTktMy45OC0xLjk2LTQuMTYtNC4xM2wtLjI1LTIuODloLjUxbC0yMy42LS4zN2gtLjk1cy0uMDEtLjAxLS4wMS0uMDFsLS43Mi4wMi0yMy4wOC43NWguNTFsLS4xNCwyLjA0Yy0uMTgsMi41OS0yLjM0LDQuNTktNS4wMSw0Ljc0LTIuNjUuMTUtNS44NCwxLTcuOTYsMy43OS01LjUsNy4yNi01LjI2LDIzLjQsMTUuODIsMzQuMjYuNjYuMzQsMS4yNi44LDEuNywxLjM4LDEuNzQsMi4yMiw2Ljc4LDguMDgsMTIuMyw5LjM1LDIuMy41MiwzLjg2LDIuNjEsMy44Niw0LjkxdjMuOTVjLS4wMiwyLjgtMi4zNSw1LjA0LTUuMjMsNS4wNS01LjQuMDMtMTIuNDQsMS42My03LjQ2LDEwLjc0bDE3LjM5LS4xcy4xMS4wMS4xNi4wMWwxNS41LS4xN2M0Ljk4LTkuNDktMi43MS0xMC43NS04LjE3LTEwLjU5LTIuNTcuMDgtNC43Mi0xLjgzLTQuNzgtNC4zM2wtLjA0LTEuNDZjLS4wNy0zLjgyLDIuMjUtNy4yNCw1LjgyLTguODYsNC42Ni0yLjExLDguNjEtNi45NiwxMC4wNS04Ljg2LjQtLjUzLjkyLS45OCwxLjUyLTEuMjksMjMuODgtMTIuNjgsMjAuMjYtMjguMTksMTMuMTMtMzUuMTdaTTUzLjA2LDYwLjk0aDcuMTRsMS4wMiwyMy41M3MtMTAuNC0xLjM5LTguMTYtMjMuNTNaTTEwNC4zNyw4My42N2wxLjAyLTIzLjUyaDcuMTRjMi4yNCwyMi4xMy04LjE2LDIzLjUyLTguMTYsMjMuNTJaIi8+Cjwvc3ZnPg==',
  'badge-5': 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzEiIGRhdGEtbmFtZT0iQ2FscXVlIDEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZpZXdCb3g9IjAgMCAxNzAgMTcwIj4KICA8ZGVmcz4KICAgIDxzdHlsZT4KICAgICAgLmNscy0xIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8xMjQ2LTQpOwogICAgICB9CgogICAgICAuY2xzLTEsIC5jbHMtMiwgLmNscy0zLCAuY2xzLTQsIC5jbHMtNSwgLmNscy02IHsKICAgICAgICBzdHJva2U6ICMwMDA7CiAgICAgICAgc3Ryb2tlLW1pdGVybGltaXQ6IDEwOwogICAgICB9CgogICAgICAuY2xzLTEsIC5jbHMtMiwgLmNscy0zLCAuY2xzLTUsIC5jbHMtNiB7CiAgICAgICAgc3Ryb2tlLXdpZHRoOiAycHg7CiAgICAgIH0KCiAgICAgIC5jbHMtMiB7CiAgICAgICAgZmlsbDogdXJsKCNEw6lncmFkw6lfc2Fuc19ub21fMTI0Ni0zKTsKICAgICAgfQoKICAgICAgLmNscy0zIHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8xMjQ2LTUpOwogICAgICB9CgogICAgICAuY2xzLTQgewogICAgICAgIGZpbGw6IHVybCgjRMOpZ3JhZMOpX3NhbnNfbm9tXzEyMjApOwogICAgICAgIHN0cm9rZS13aWR0aDogMTBweDsKICAgICAgfQoKICAgICAgLmNscy01IHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8xMjQ2KTsKICAgICAgfQoKICAgICAgLmNscy02IHsKICAgICAgICBmaWxsOiB1cmwoI0TDqWdyYWTDqV9zYW5zX25vbV8xMjQ2LTIpOwogICAgICB9CiAgICA8L3N0eWxlPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMTIyMCIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMTIyMCIgeDE9IjUiIHkxPSI4NSIgeDI9IjE2NSIgeTI9Ijg1IiBncmFkaWVudFVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+CiAgICAgIDxzdG9wIG9mZnNldD0iLjQiIHN0b3AtY29sb3I9IiNlZDFlNzkiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuNTciIHN0b3AtY29sb3I9IiNkMDEzNmUiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuODEiIHN0b3AtY29sb3I9IiNhYjA1NjEiLz4KICAgICAgPHN0b3Agb2Zmc2V0PSIuOTQiIHN0b3AtY29sb3I9IiM5ZTAwNWQiLz4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV8xMjQ2IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSAxMjQ2IiB4MT0iOTEuMjciIHkxPSI2OS4yNiIgeDI9IjkxLjQ4IiB5Mj0iNjkuMjYiIGdyYWRpZW50VW5pdHM9InVzZXJTcGFjZU9uVXNlIj4KICAgICAgPHN0b3Agb2Zmc2V0PSIwIiBzdG9wLWNvbG9yPSIjYTY3YzUyIi8+CiAgICAgIDxzdG9wIG9mZnNldD0iMSIgc3RvcC1jb2xvcj0iIzYwMzgxMyIvPgogICAgPC9saW5lYXJHcmFkaWVudD4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzEyNDYtMiIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMTI0NiIgeDE9IjkxLjQ4IiB5MT0iNjkuMjUiIHgyPSI5MS43NSIgeTI9IjY5LjI1IiB4bGluazpocmVmPSIjRMOpZ3JhZMOpX3NhbnNfbm9tXzEyNDYiLz4KICAgIDxsaW5lYXJHcmFkaWVudCBpZD0iRMOpZ3JhZMOpX3NhbnNfbm9tXzEyNDYtMyIgZGF0YS1uYW1lPSJEw6lncmFkw6kgc2FucyBub20gMTI0NiIgeDE9IjY1Ljc3IiB5MT0iNTAuOTQiIHgyPSIxMDAuNTEiIHkyPSI1MC45NCIgeGxpbms6aHJlZj0iI0TDqWdyYWTDqV9zYW5zX25vbV8xMjQ2Ii8+CiAgICA8bGluZWFyR3JhZGllbnQgaWQ9IkTDqWdyYWTDqV9zYW5zX25vbV8xMjQ2LTQiIGRhdGEtbmFtZT0iRMOpZ3JhZMOpIHNhbnMgbm9tIDEyNDYiIHgxPSI0MC4yOCIgeTE9IjcyLjMxIiB4Mj0iMTI2LjU3IiB5Mj0iNzIuMzEiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMTI0NiIvPgogICAgPGxpbmVhckdyYWRpZW50IGlkPSJEw6lncmFkw6lfc2Fuc19ub21fMTI0Ni01IiBkYXRhLW5hbWU9IkTDqWdyYWTDqSBzYW5zIG5vbSAxMjQ2IiB4MT0iNDAuMjgiIHkxPSIxMDIuNjkiIHgyPSIxMjYuNTciIHkyPSIxMDIuNjkiIHhsaW5rOmhyZWY9IiNEw6lncmFkw6lfc2Fuc19ub21fMTI0NiIvPgogIDwvZGVmcz4KICA8cGF0aCBjbGFzcz0iY2xzLTQiIGQ9Ik0xNTguMSw5NS4xNGM2LjUzLTUuNTIsMTEuODQtMTMuNjktLjctMjAuODgtMy45OS0yLjI5LTUuNzQtNi45OC00LjEyLTExLjE5LDMuMTUtOC4yMiw1LjA3LTIwLjI2LTkuODgtMjEuNjMtMy45NC0uMzYtNy4xMy0zLjI5LTcuNTMtNy4xMS0xLjAxLTkuNi01LjQtMjQuNTMtMjMuNDQtMTYuODUtNSwyLjEzLTEwLjgzLjcxLTE0LjM0LTMuMzQtNi40LTcuMzktMTYuODktMTUuMzMtMjUuMzUtMS43MS0zLjA5LDQuOTgtOS41Nyw2Ljk3LTE1LjAxLDQuNTMtOC41Ny0zLjg1LTE5LjItNS41LTE4LjI2LDEwLjc3LjMxLDUuNC0zLjgsMTAuMDQtOS4zNiwxMC41My05LjU3Ljg0LTIxLjEsNC43LTE1Ljg0LDE5LjE2LDIuMjMsNi4xMi44NiwxMi45OC0zLjg1LDE3LjU5LTUuNDEsNS4yOS05LjI0LDEyLjc5LDEuMDgsMTkuNjgsNC41MiwzLjAxLDYuMTMsOC43MiwzLjc5LDEzLjUzLTQuMjQsOC43MS02LjczLDIwLjc0LDExLjA4LDIxLjgsNS4yMi4zMSw5LjQzLDQuMzYsOS44LDkuNDIuNjksOS41Myw0LjI2LDIxLjY3LDE4Ljg2LDE0Ljg4LDUuMTMtMi4zOSwxMS4yOS0xLjM1LDE1LjI5LDIuNTcsNi44MSw2LjY3LDE3LjQ5LDEzLjQ3LDI1LjcxLDEuNzksNC4wOC01LjgsMTEuNTgtOC4zNiwxOC40NC02LjE0LDguOTMsMi44OSwxOS4yMSwzLjM1LDE5LjI3LTkuNzYuMDMtNi4yOSw1LjA2LTExLjQ5LDExLjU0LTExLjcyLDEwLjIzLS4zNiwyMC44My00LjAxLDEwLjUxLTE5Ljk1LTMuMzQtNS4xNi0yLjQxLTExLjk2LDIuMzMtMTUuOTdaIi8+CiAgPGc+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTUiIGQ9Ik05MS4yNyw2OS4yNWgwcy4yMSwwLC4yMSwwaC0uMjFaIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTYiIGQ9Ik05MS42OCw2OS4yNWgtLjJzLjI3LjAxLjI3LjAxYy0uMDIsMC0uMDUtLjAxLS4wNy0uMDFaIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik02Ni4wNCw1NS45NGg1LjYycy0xLjUyLTUsNS4xNS00LjMxbDEyLjUzLjExczYuOTEtLjU3LDUuMTUsMy45N2g1Ljc0czIuMjItOC43NC01Ljc0LTkuNjVsLTIyLjcyLS4xMXMtNy40OS0uMjMtNS43NCw5Ljk5WiIvPgogICAgPHBhdGggY2xhc3M9ImNscy0xIiBkPSJNMTI2LjU3LDY0LjA2djE5Ljk3Yy02Ljc3LjQ5LTM5LjcsMi41Ni04Ni4yOS4zOXYtMjAuMzZjMC0yLjY3LDIuMjMtNC44Myw0Ljk3LTQuODNoNzYuMzRjMi43NSwwLDQuOTgsMi4xNiw0Ljk4LDQuODNaIi8+CiAgICA8cGF0aCBjbGFzcz0iY2xzLTMiIGQ9Ik05MS40Nyw4OC41MmwzNS4xLS4xMXYyMy43M2MwLDIuNjYtMi4yMyw0LjgyLTQuOTgsNC44Mkg0NS4yNWMtMi43NSwwLTQuOTctMi4xNi00Ljk3LTQuODJ2LTIzLjE4bDM0Ljc4LS4yMS4xMiw0Ljg4LDE2LjE4LjIzLjEyLTUuMzRaIi8+CiAgPC9nPgo8L3N2Zz4=',
};

const SHOP_ITEMS = [
  {id:'frame-turquoise',name:'Cadre Turquoise',category:'frames',preview:'turquoise',price:15,desc:'Cercle dégradé turquoise'},
  {id:'frame-rose',name:'Cadre Rose',category:'frames',preview:'rose',price:20,desc:'Cercle dégradé rose'},
  {id:'frame-jaune',name:'Cadre Jaune',category:'frames',preview:'jaune',price:25,desc:'Cercle dégradé jaune-orangé'},
  {id:'frame-reseau',name:'Cadre Réseau',category:'frames',preview:'reseau',price:40,desc:'Cadre étoilé réseau'},
  {id:'frame-business',name:'Cadre Business',category:'frames',preview:'business',price:45,desc:'Cadre étoilé business'},
  {id:'frame-social',name:'Cadre Social',category:'frames',preview:'social',price:50,desc:'Cadre étoilé social'},
  {id:'frame-creatif',name:'Cadre Créatif',category:'frames',preview:'cre_atif',price:55,desc:'Cadre étoilé créatif'},
  {id:'hat-crown',name:'Couronne',category:'accessories',preview:'hat-crown',price:50,desc:'La couronne du roi'},
  {id:'hat-star',name:'Étoile',category:'accessories',preview:'hat-star',price:20,desc:'Brille comme une star'},
  {id:'hat-rocket',name:'Fusée',category:'accessories',preview:'hat-rocket',price:35,desc:'En route vers le top'},
  {id:'hat-lightning',name:'Éclair',category:'accessories',preview:'hat-lightning',price:25,desc:'Rapide comme l\'éclair'},
  {id:'hat-gem',name:'Gemme',category:'accessories',preview:'hat-gem',price:40,desc:'Pierre précieuse rare'},
  {id:'badge-1',name:'Émeraude',category:'badges',preview:'badge-1',price:20,desc:'Badge vert émeraude'},
  {id:'badge-2',name:'Soleil',category:'badges',preview:'badge-2',price:30,desc:'Badge soleil doré'},
  {id:'badge-3',name:'Flamme',category:'badges',preview:'badge-3',price:40,desc:'Badge flamme ardente'},
  {id:'badge-4',name:'Inferno',category:'badges',preview:'badge-4',price:60,desc:'Badge inferno rouge'},
  {id:'badge-5',name:'Magenta',category:'badges',preview:'badge-5',price:80,desc:'Badge magenta premium'},
  {id:'color-gradient1',name:'Dégradé Sunset',category:'colors',preview:'',price:25,desc:'Fond dégradé coucher de soleil'},
  {id:'color-gradient2',name:'Dégradé Ocean',category:'colors',preview:'',price:25,desc:'Fond dégradé océan'},
  {id:'color-gradient3',name:'Dégradé Aurora',category:'colors',preview:'',price:35,desc:'Fond dégradé aurore boréale'},
];
const SHOP_CATEGORIES = [{id:'all',name:'Tout',emoji:''},{id:'frames',name:'Cadres',emoji:''},{id:'accessories',name:'Accessoires',emoji:''},{id:'badges',name:'Badges',emoji:''},{id:'colors',name:'Couleurs',emoji:''}];
const COINS_REWARDS = [{rank:1,coins:50},{rank:2,coins:40},{rank:3,coins:30},{rank:Infinity,coins:20}];
function getCoinsForRank(r){for(const c of COINS_REWARDS)if(r<=c.rank)return c.coins;return 20;}

/* ═══ PAGE SWITCHING ═══ */
function switchPage(page){
  closeMobileMenu();
  window.scrollTo(0, 0);
  document.querySelectorAll('.page-content').forEach(p=>p.classList.remove('active'));
  document.querySelectorAll('.page-tab').forEach(t=>t.classList.remove('active'));
  document.getElementById('page-'+page).classList.add('active');
  document.querySelector(`.page-tab[onclick="switchPage('${page}')"]`).classList.add('active');
  
  // Gérer l'affichage du bouton de post-it
  const fabPostit = document.getElementById('fabPostit');
  if (page === 'community' || page === 'profile' || page === 'members') {
    fabPostit.style.display = 'flex'; // Affiché sur ces pages car le tableau y est présent
    // Reset du label sauf si on est appelé depuis viewUserProfile (qui le re-set après)
    if (page !== 'members') fabPostit.textContent = 'Coller un post-it';
  } else {
    fabPostit.style.display = 'none'; // Masqué sur la boutique et le réseau
    fabPostit.textContent = 'Coller un post-it';
  }
  
  if(page==='shop') renderShop();
  if(page==='profile') renderProfilePage();
  if(page==='referral') renderReferralPage();
  if(page==='members') {
    document.getElementById('backToMembersBtn').style.display = 'none';
    document.getElementById('memberSearchContainer').style.display = 'block';
    renderMembersList();
  }
}

/* ═══ RENDER ═══ */
function getUser(id){return USERS.find(u=>u.id===id)||CURRENT_USER;}
function getEquippedAccessory(){const acc=CURRENT_USER.equippedItems.find(id=>SHOP_ITEMS.find(s=>s.id===id&&s.category==='accessories'));if(acc){return svgIcon(acc, 22);}return '';}

function renderHero(){
  const u=USERS.sort((a,b)=>b.monthPts-a.monthPts)[0];
  const div=getDivision(u.monthPts);
  const daysLeft=Math.floor(Math.random()*10)+2;
  const top3Posts = posts.filter(p => !p.targetId).sort((a,b) => b.likes - a.likes).slice(0, 3); 
  const postsHtml = top3Posts.map((p, index) => {
    const tc = POST_COLORS[p.colorIdx % 5];
    const rot = index === 0 ? -2 : index === 1 ? 3 : -1; 
    const author = getUser(p.authorId); // Récupération de l'auteur

    return `
      <div class="hero-postit-mini" style="background:${tc.bg};color:${tc.text};transform:rotate(${rot}deg);">
        <div class="mini-label">TOP #${index + 1} LIKÉ</div>
        <div style="margin-bottom: 8px;">
          ${p.text.length > 70 ? p.text.slice(0, 70) + '...' : p.text}
        </div>
        <!-- Nouvelle section pour l'auteur et les likes -->
        <div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top: auto;">
          <div style="font-size: 10px; font-weight: 700; opacity: 0.75;">Par ${author.name}</div>
          <div class="mini-likes" style="margin-top: 0;">❤️ ${p.likes}</div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('heroBanner').innerHTML=`
    <div class="hero-avatar" style="background:transparent;">${avatarImg(u.id, u.color, 96)}</div>
    <div class="hero-info">
      <div class="label">Top Pionnier du mois</div>
      <h3>${u.name} <span>${div.emoji} ${div.name}</span></h3>
      <div class="score">${u.monthPts.toLocaleString('fr-FR')} pts</div>

      <div class="reset-info">Reset dans ${daysLeft} jours</div>
      <div class="tagline">Le pionnier le plus actif. Tu veux sa place ?</div>
    </div>
    <div class="hero-top-posts">
      ${postsHtml}
    </div>`;
}

// ── Rendu du Carrousel avec Scroll natif & JS Drag ──
function renderBoard() {
  let sorted = posts.filter(p => !p.targetId); // Posts publics uniquement
  
  if (boardSortBy === 'popular') sorted.sort((a, b) => b.likes - a.likes);
  else if (boardSortBy === 'recent') sorted.sort((a, b) => b.timestamp - a.timestamp);

  const postCountEl = document.getElementById('postCount');
  if (postCountEl) postCountEl.textContent = `${sorted.length} idées partagées`;

  const track = document.getElementById('boardGrid');
  if (!track) return;

  const itemsHtml = sorted.map((p, idx) => {
    const c = POST_COLORS[p.colorIdx % 5];
    const author = getUser(p.authorId);
    const rot = ROTATIONS[idx % ROTATIONS.length];
    const glow = p.likes > 20 ? `0 0 16px ${c.bg}55` : 'none';
    const pin = p.likes > 50 ? '<div class="pin-icon" style="font-size:14px;font-weight:900;color:rgba(0,0,0,0.4);">●</div>' : '';
    const pioneer = author.isPioneer ? '<span class="pioneer-badge">Pionnier</span>' : '';
    const liked = likedPosts.has(p.id) ? 'liked' : '';
    
    const isMine = p.authorId === CURRENT_USER.id;
    const deleteBtn = isMine ? `<button class="postit-delete" onclick="deletePost(event, ${p.id})" title="Supprimer">✕</button>` : '';
    
    return `<div class="postit" style="background:${c.bg};color:${c.text};transform:rotate(${rot}deg);box-shadow:0 4px 12px rgba(0,0,0,0.25),${glow};">
      ${deleteBtn}
      ${pin}${pioneer}
      <div style="margin-top:${author.isPioneer?4:0}px">${p.text}</div>
      <div class="postit-footer">
        <div class="postit-author" onclick="animatePostitsAndGoToProfile(event, this, ${author.id})">
          <div class="mini-avatar">${avatarImg(author.id, author.color, 20)}</div>
          <div style="display:flex; flex-direction:column; gap:2px;">
            <span>${author.name}</span>
            <span style="font-size:9.5px; opacity:0.65; font-weight:700;">${p.date}</span>
          </div>
        </div>
        <button class="postit-like ${liked}" onclick="likePost(${p.id})">❤️ ${p.likes}</button>
      </div>
    </div>`;
  }).join('');

  // NOUVEAU : On ne boucle le carrousel que s'il y a plus de 3 posts !
  const isInfinite = sorted.length > 3;
  track.setAttribute('data-infinite', isInfinite);
  track.innerHTML = isInfinite 
    ? `<div class="marquee-group">${itemsHtml}</div><div class="marquee-group">${itemsHtml}</div>`
    : `<div class="marquee-group" style="padding-right:0;">${itemsHtml}</div>`;
}

// Initialisation et gestion du Carrousel Magique (avec inertie)
let carouselSpeed = 0.8;
let animFrame;
let isDragging = false;
let startX, startScrollLeft;
let velocity = 0; 
let prevX = 0;    

function initCarousel() {
  const wrapper = document.getElementById('boardCarouselWrapper');
  if (!wrapper) return;

  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - wrapper.offsetLeft;
    startScrollLeft = wrapper.scrollLeft;
    prevX = startX;
    velocity = 0; 
  });
  
  window.addEventListener('mouseup', () => { 
    isDragging = false; 
  });
  
  wrapper.addEventListener('mousemove', (e) => {
    if(!isDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    velocity = prevX - x; 
    prevX = x;
    wrapper.scrollLeft = startScrollLeft - (x - startX) * 2;
  });

  wrapper.addEventListener('scroll', () => {
    const track = document.getElementById('boardGrid');
    if(!track || track.getAttribute('data-infinite') !== 'true') return;
    
    const halfWidth = track.scrollWidth / 2;
    if(wrapper.scrollLeft >= halfWidth) {
      wrapper.scrollLeft -= halfWidth;
      if(isDragging) startScrollLeft -= halfWidth;
    } else if (wrapper.scrollLeft <= 0) {
      wrapper.scrollLeft += halfWidth - 1;
      if(isDragging) startScrollLeft += halfWidth;
    }
  });

  function play() {
    const track = document.getElementById('boardGrid');
    const isInfinite = track && track.getAttribute('data-infinite') === 'true';
    
    if(!isDragging) {
      if (Math.abs(velocity) > 0.5) {
        wrapper.scrollLeft += velocity;
        velocity *= 0.95; 
      } else if (isInfinite) {
        velocity = 0;
        wrapper.scrollLeft += carouselSpeed;
      }
    }
    if(animFrame) cancelAnimationFrame(animFrame);
    animFrame = requestAnimationFrame(play);
  }
  play();
}

// Initialisation et gestion du Carrousel Magique (avec inertie)
   

function initCarousel() {
  const wrapper = document.getElementById('boardCarouselWrapper');
  if (!wrapper) return;

  wrapper.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.pageX - wrapper.offsetLeft;
    startScrollLeft = wrapper.scrollLeft;
    prevX = startX;
    velocity = 0; 
  });
  
  window.addEventListener('mouseup', () => { 
    isDragging = false; 
  });
  
  wrapper.addEventListener('mousemove', (e) => {
    if(!isDragging) return;
    e.preventDefault();
    
    const x = e.pageX - wrapper.offsetLeft;
    
    velocity = prevX - x; 
    prevX = x;

    const walk = (x - startX) * 2; 
    wrapper.scrollLeft = startScrollLeft - walk;
  });

  wrapper.addEventListener('scroll', () => {
    const track = document.getElementById('boardGrid');
    if(!track) return;
    
    const halfWidth = track.scrollWidth / 2;
    
    if(wrapper.scrollLeft >= halfWidth) {
      wrapper.scrollLeft -= halfWidth;
      if(isDragging) startScrollLeft -= halfWidth;
    } else if (wrapper.scrollLeft <= 0) {
      wrapper.scrollLeft += halfWidth - 1;
      if(isDragging) startScrollLeft += halfWidth;
    }
  });

  function play() {
    if(!isDragging) {
      if (Math.abs(velocity) > 0.5) {
        wrapper.scrollLeft += velocity;
        velocity *= 0.95; 
      } else {
        velocity = 0;
        wrapper.scrollLeft += carouselSpeed;
      }
    }
    animFrame = requestAnimationFrame(play);
  }
  play();
}

function sortBoard() {
  const selectElem = document.getElementById('boardSortSelect');
  if (selectElem) boardSortBy = selectElem.value;
  renderBoard();
}

function createPost() {
  const now = new Date().getTime();
  checkWeeklyReset();

  if (CURRENT_USER.postLimit <= 0) {
    alert("Limite hebdomadaire atteinte ! Tes 5 post-it reviendront lundi prochain à 8h. ⏳");
    return;
  }

  const textarea = document.getElementById('postTextarea');
  const text = textarea.value.trim();
  if (!text) return;
  
  const today = new Date();
  const dateStr = today.toLocaleDateString('fr-FR', {day: '2-digit', month: 'short', year: 'numeric'});
  
  // DÉTECTION DE LA CIBLE
  let targetProfileId = null; // Par défaut : public (le grand tableau)
  
  // Est-on sur la page "Nos membres" ET sur le profil de quelqu'un ?
  if (document.getElementById('page-members').classList.contains('active') && currentViewedUserId !== null) {
    targetProfileId = currentViewedUserId;
  } 
  // Est-on sur l'onglet "Mon profil" ?
  else if (document.getElementById('page-profile').classList.contains('active')) {
    targetProfileId = CURRENT_USER.id;
  }

  // AJOUT DU POST
  posts.unshift({ 
    id: Date.now(),
    text: text, 
    authorId: CURRENT_USER.id, 
    targetId: targetProfileId, // On attache le post à la cible (null = public)
    likes: 0, 
    date: dateStr, 
    timestamp: Date.now(), 
    colorIdx: selectedColor 
  });
  
  CURRENT_USER.postLimit--;
  
  // Auto-progress mission "Colle 3 post-it"
  autoProgressMission('postit');
  
  textarea.value = '';
  document.getElementById('charCount').textContent = '0';
  
  boardSortBy = 'recent'; 
  const selectElem = document.getElementById('boardSortSelect');
  if (selectElem) selectElem.value = 'recent';
  
  closeModal();

  // MISE À JOUR DES VUES
  renderBoard(); // Met à jour le tableau public (sans les posts privés)
  renderHero();  // Met à jour le top 3 (sans les posts privés)
  renderProfile(); // Met à jour la sidebar de gauche

  // RAFRAÎCHISSEMENT CIBLÉ DE L'ONGLET ACTIF
  if (targetProfileId !== null) {
      if (document.getElementById('page-members').classList.contains('active')) {
        // Rafraîchir le profil du membre qu'on était en train de regarder
        viewUserProfile(targetProfileId);
      } else if (document.getElementById('page-profile').classList.contains('active')) {
        // Rafraîchir son propre profil
        renderProfilePage();
      }
  }

  // Message de confirmation adapté à la cible
  if (targetProfileId !== null && targetProfileId !== CURRENT_USER.id) {
    const targetUser = getUser(targetProfileId);
    alert(`Post-it collé sur le profil de ${targetUser.name} ! Il t'en reste ${CURRENT_USER.postLimit} cette semaine.`);
  } else if (targetProfileId === CURRENT_USER.id) {
    alert(`Post-it collé sur ton profil ! Il t'en reste ${CURRENT_USER.postLimit} cette semaine.`);
  } else {
    alert(`Post-it collé sur Le Tableau ! Il t'en reste ${CURRENT_USER.postLimit} cette semaine.`);
  }
}

function likePost(id){
  if(likedPosts.has(id))return;
  likedPosts.add(id);
  // Auto-progress mission "Like 10 post-it"
  autoProgressMission('like');
  const p=posts.find(x=>x.id===id);
  if(p){
    p.likes++;
    renderBoard();
    if (document.getElementById('page-members').classList.contains('active') && currentViewedUserId === p.authorId) {
      viewUserProfile(currentViewedUserId);
    }
  }
}

function confirmDeletePost(postId, btn) {
  // Trouve l'overlay dans le même postit que le bouton cliqué
  const postit = btn.closest('.postit');
  const overlay = postit.querySelector('.postit-delete-confirm');
  if (overlay) overlay.style.display = 'flex';
}

function cancelDeletePost(btn) {
  const overlay = btn.closest('.postit-delete-confirm');
  if (overlay) overlay.style.display = 'none';
}

function deletePost(event, postId) {
  // Empêche le clic d'activer d'autres éléments (comme le profil de l'auteur)
  event.stopPropagation(); 
  
  if (confirm("Es-tu sûr de vouloir supprimer cette idée ?")) {
    // 1. Trouver l'index du post
    const idx = posts.findIndex(p => p.id === postId);
    if (idx === -1) return; // Sécurité : si le post n'est pas trouvé
    
    // 2. Vérifier que c'est bien NOTRE post
    if (posts[idx].authorId !== CURRENT_USER.id) {
        alert("Tu ne peux supprimer que tes propres post-it !");
        return;
    }
    
    // 3. Supprimer le post du tableau principal
    posts.splice(idx, 1);
    
    // 5. Mise à jour "silencieuse" des vues d'arrière-plan
    renderBoard();
    renderHero();
    
    // 6. Mise à jour de la vue ACTIVE (sans recharger la page entière)
    if (document.getElementById('page-members').classList.contains('active') && currentViewedUserId !== null) {
      // Si on est sur le profil de quelqu'un, on rafraîchit UNIQUEMENT sa vue
      viewUserProfile(currentViewedUserId);
    } else if (document.getElementById('page-profile').classList.contains('active')) {
      // Si on est sur notre propre profil, on rafraîchit notre vue
      renderProfilePage();
      renderProfile(); // Met aussi à jour la mini-carte de gauche
    } else {
        // Sinon (page communauté par défaut), on met juste à jour la mini-carte de gauche
        renderProfile(); 
    }
  }
}

function renderLeaderboard(){
  const sorted=[...USERS].sort((a,b)=>b.monthPts-a.monthPts);
  const start=(lbPage-1)*10;const end=start+10;const visible=sorted.slice(start,end);
  let html=visible.map((u,i)=>{const rank=start+i+1;const medal=rank===1?'🥇':rank===2?'🥈':rank===3?'🥉':`#${rank}`;const div=getDivision(u.monthPts);const cls=(rank===1?' top':'')+(u.id===CURRENT_USER.id?' me':'');const meTag=u.id===CURRENT_USER.id?' <span class="me-tag">(toi)</span>':'';return`<div class="lb-item${cls}" onclick="animateLeaderboardAndGoToProfile(event, this, ${u.id})"><div class="lb-rank">${medal}</div><div class="lb-avatar" style="background:transparent;">${avatarImg(u.id, u.color, 28)}</div><div class="lb-name">${u.name}${meTag}</div><div class="lb-pts">${u.monthPts}</div><div class="lb-badge">${rank===1?div.emoji:""}</div></div>`;}).join('');
  const myIndex=sorted.findIndex(u=>u.id===CURRENT_USER.id);const isVisible=myIndex>=start&&myIndex<end;
  if(!isVisible&&myIndex!==-1){const myRank=myIndex+1;const myUser=sorted[myIndex];const myMedal=myRank===1?'🥇':myRank===2?'🥈':myRank===3?'🥉':`#${myRank}`;const myDiv=getDivision(myUser.monthPts);html+=`<div class="lb-separator" style="margin:12px 0;height:2px;background:var(--border);"></div><div class="lb-item me" onclick="animateLeaderboardAndGoToProfile(event, this, ${myUser.id})"><div class="lb-rank">${myMedal}</div><div class="lb-avatar" style="background:transparent;">${avatarImg(myUser.id, myUser.color, 28)}</div><div class="lb-name">${myUser.name} <span class="me-tag">(toi)</span></div><div class="lb-pts">${myUser.monthPts}</div><div class="lb-badge">${myRank===1?myDiv.emoji:""}</div></div>`;}
  document.getElementById('leaderboard').innerHTML=html;
  document.getElementById('lbCount').textContent=`Affichage ${start+1} à ${Math.min(end,sorted.length)} / ${sorted.length}`;
  let btns='';if(lbPage>1)btns+='<button class="btn-voir-plus" onclick="showLess()">↑ Voir les précédents</button>';if(end<sorted.length)btns+='<button class="btn-voir-plus" onclick="showMore()">Voir les suivants ↓</button>';document.getElementById('lbButtons').innerHTML=btns;
}

function renderMissions() {
  checkWeeklyReset();
  document.getElementById('missions').innerHTML = MISSIONS.map(m => {
    const done = m.current >= m.target;
    const pct = Math.min((m.current / m.target) * 100, 100);
    const fill = done ? '#1DB5A1' : '#52EFDA';
    
    let actionHtml = '';
    if (m.claimed) {
      // Mission terminée et récompense récupérée
      actionHtml = '<span style="font-size:11px;font-weight:700;color:var(--blue-duck);">✓ Réclamé</span>';
    } else if (done) {
      // Mission terminée mais pas encore réclamée
      actionHtml = `<button class="mission-claim-btn" onclick="claimMission('${m.id}')">Réclamer +${m.pts} pts</button>`;
    }
    // FINI : Le bouton "+1" a été complètement retiré d'ici !

    const prog = done 
      ? (m.claimed ? '<span class="mission-done">Terminée ✓</span>' : '<span class="mission-done" style="color:var(--green-lime);">Prête à réclamer !</span>') 
      : `${m.current}/${m.target}`;
      
    return `
      <div class="mission-item">
        <div class="mission-top">
          <span class="mission-icon">${m.icon}</span>
          <span class="mission-title">${m.title}</span>
          ${actionHtml}
          <span class="mission-pts">+${m.pts} pts</span>
        </div>
        <div class="mission-bar">
          <div class="mission-bar-fill" style="width:${pct}%;background:${fill};"></div>
        </div>
        <div class="mission-progress">${prog}</div>
      </div>`;
  }).join('');
}

function claimMission(id){
  const m=MISSIONS.find(x=>x.id===id);
  if(!m||m.claimed||m.current<m.target)return;
  m.claimed=true;
  CURRENT_USER.monthPts+=m.pts;
  CURRENT_USER.xp+=m.pts;
  // Update user in USERS array too
  const userInList=USERS.find(u=>u.id===CURRENT_USER.id);
  if(userInList){userInList.monthPts=CURRENT_USER.monthPts;userInList.xp=CURRENT_USER.xp;}
  renderMissions();
  renderLeaderboard();
  renderHero();
  renderProfile();
  showMissionToast(`🎉 +${m.pts} pts réclamés ! Bravo !`);
}

function autoProgressMission(id){
  const m=MISSIONS.find(x=>x.id===id);
  if(!m||m.current>=m.target||m.claimed)return;
  m.current++;
  renderMissions();
  if(m.current>=m.target){
    showMissionToast(`🎯 Mission "${m.title}" terminée ! Réclame tes points`);
  }
}

function showMissionToast(text){
  const toast=document.getElementById('missionToast');
  toast.textContent=text;
  toast.classList.add('show');
  clearTimeout(toast._timeout);
  toast._timeout=setTimeout(()=>{toast.classList.remove('show');},2500);
}
function renderStreak(){document.getElementById('streakRow').innerHTML=[1,2,3,4,5,6,7].map(d=>`<div class="streak-day${d<=5?' done':''}">${d<=5?'✓':d}</div>`).join('');}

function updateBodyBackground() {
  // On cherche si un item de catégorie couleur est équipé
  const colorItem = CURRENT_USER.equippedItems.find(id => id.startsWith('color-gradient'));
  
  if (colorItem) {
    document.body.setAttribute('data-bg', colorItem); // Applique le CSS
  } else {
    document.body.removeAttribute('data-bg'); // Remet le fond par défaut
  }
}
function getEquippedVisuals() {
  let frameStyle = '';
  let frameSvgKey = '';
  let accessory = '';
  let badges = '';
  let cardBg = '';

  CURRENT_USER.equippedItems.forEach(id => {
    const item = SHOP_ITEMS.find(s => s.id === id);
    if (!item) return;

    // 1. Les Cadres (SVG)
    if (item.category === 'frames' && item.preview && FRAME_SVGS[item.preview]) {
      frameSvgKey = item.preview;
    }

    // 2. Les Accessoires
    if (item.category === 'accessories') {
      accessory = svgIcon(item.id, 26);
    }
    
    // 3. Les Badges
    if (item.category === 'badges') {
      badges += `<span title="${item.name}" style="margin-left:8px; display:inline-flex; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.2));">${svgIcon(item.id, 22)}</span>`;
    }
    
    // 4. Les Couleurs (Ajout d'une base solide var(--white) sous le dégradé)
    if (item.category === 'colors') {
      if (id === 'color-gradient1') cardBg = 'linear-gradient(135deg, rgba(252,147,250,0.15) 0%, rgba(255,255,255,0) 100%), var(--white)';
      if (id === 'color-gradient2') cardBg = 'linear-gradient(135deg, rgba(82,239,218,0.15) 0%, rgba(255,255,255,0) 100%), var(--white)';
      if (id === 'color-gradient3') cardBg = 'linear-gradient(135deg, rgba(231,255,108,0.15) 0%, rgba(29,181,161,0.1) 100%), var(--white)';
    }
  });

  return { frameStyle, frameSvgKey, accessory, badges, cardBg };
}

function renderProfile() {
  const u = CURRENT_USER;
  const lvl = getLevel(u.xp);
  const div = getDivision(u.monthPts);
  const xpLvl = Math.floor(u.xp / 100) + 1;
  const xpPct = u.xp % 100;
  
  const visuals = getEquippedVisuals();
  
  const finalBorder = visuals.frameStyle ? visuals.frameStyle : (visuals.frameSvgKey ? 'border:none;' : `border:3px solid ${div.emoji === '💎' ? '#52EFDA' : div.emoji === '🥇' ? '#FFD93D' : '#DDE5E3'};`);
  const accHtml = visuals.accessory ? `<span class="equipped-accessory" style="position:absolute; top:-10px; right:-10px; font-size:26px; filter:drop-shadow(0 2px 4px rgba(0,0,0,0.3)); z-index:2;">${visuals.accessory}</span>` : '';
  const frameSvgHtml = visuals.frameSvgKey && FRAME_SVGS[visuals.frameSvgKey] ? `<img src="${FRAME_SVGS[visuals.frameSvgKey]}" style="position:absolute;top:-12px;left:-12px;width:calc(100% + 24px);height:calc(100% + 24px);pointer-events:none;z-index:3;object-fit:contain;">` : '';

  const myPosts = posts.filter(p => p.authorId === u.id || p.targetId === u.id).slice(0, 8); 
  const miniItems = myPosts.map((p, idx) => {
    const c = POST_COLORS[p.colorIdx % 5];
    const rot = ROTATIONS[idx % ROTATIONS.length] * 0.5;
    const isMine = p.authorId === CURRENT_USER.id;
    const deleteBtn = isMine ? `<button class="postit-delete" style="top:4px;right:4px;width:20px;height:20px;font-size:10px;" onclick="deletePost(event, ${p.id})" title="Supprimer">✕</button>` : '';
    
    return `<div class="mini-postit" style="background:${c.bg};color:${c.text};transform:rotate(${rot}deg);box-shadow:0 3px 10px rgba(0,0,0,0.2);">${deleteBtn}${p.text.slice(0, 80)}${p.text.length > 80 ? '…' : ''}<div style="display:flex; justify-content:space-between; align-items:flex-end; margin-top:12px;"><span style="font-size:9.5px; opacity:0.65; font-weight:700;">📅 ${p.date}</span><div class="mini-likes" style="margin-top:0;">❤️ ${p.likes}</div></div></div>`;
  }).join('');
  
  // Remplacement du Carrousel par une vraie liste Flex !
  const isInfinite = myPosts.length > 3;
  const trackHtml = isInfinite 
    ? `<div class="profile-posts-group">${miniItems}</div><div class="profile-posts-group">${miniItems}</div>`
    : `<div class="profile-posts-group" style="padding-right:0;">${miniItems}</div>`;
    
  const miniHtml = myPosts.length > 0 
    ? `<div class="profile-posts-track" data-infinite="${isInfinite}">${trackHtml}</div>`
    : '<p style="color:var(--text-muted);font-size:13px;padding:12px 0;">Aucun post-it pour le moment.</p>';
  
  const points = [['Créer un compte Neear', '+10 pts'], ['Donner un feedback produit', '+20 pts'], ['Laisser un avis', '+30 pts'], ['Abonnement Pionnier', '+40 pts'], ['Parrainer un ami', '+50 pts'], ['Like reçu', '+2 pts']];
  
  // FIX IMAGE : L'image prend 100% du conteneur, laissant la bordure visible
  const avatarHtml = `<img src="${getAvatarDataURI(u.id, u.color)}" style="width:100%;height:100%;border-radius:50%;object-fit:cover;">`;
  
  document.getElementById('profileSection').innerHTML = `<div class="profile-card" style="${visuals.cardBg ? `background: ${visuals.cardBg};` : ''}">
    <div class="profile-top">
      <div class="profile-avatar" style="background:transparent; ${finalBorder}">${avatarHtml}${accHtml}${frameSvgHtml}</div>
      <div class="profile-details">
        <h3 style="display:flex; align-items:center;">${u.name}${visuals.badges}</h3>
        <div class="level-badge">${lvl.emoji} Niv. ${xpLvl} "${lvl.name}" · ${div.emoji} ${div.name} · 🪙 ${u.coins}</div>
      </div>
    </div>
    <div class="xp-bar-container"><div class="xp-label">${u.xp} / ${xpLvl * 100} XP — Niveau ${xpLvl}</div><div class="xp-bar"><div class="xp-bar-fill" style="width:${xpPct}%;"></div></div></div>
    <div class="profile-stats"><div class="stat-item"><span>${myPosts.length} post-it</span></div><div class="stat-item"><span>❤️ ${u.likesReceived} likes reçus</span></div><div class="stat-item"><span>#${u.rank} ce mois</span></div><div class="stat-item">${div.emoji} <span>${div.name} — ${u.monthPts} pts</span></div></div>
    <div class="profile-posts">${miniHtml}</div>
    <div class="points-table"><h4>Barème de points</h4>${points.map(([a, v]) => `<div class="pt-row"><span class="pt-action">${a}</span><span class="pt-value">${v}</span></div>`).join('')}</div>
  </div>`;

  if (xpLvl === 67 && !eggTriggered) {
    eggTriggered = true;
    
    // On cible le milieu-bas de l'écran visible actuel
    const pivotY = window.scrollY + window.innerHeight;
    
    // On injecte ce point de pivot dans le CSS
    document.body.style.setProperty('--pivot-y', `${pivotY}px`);
    
    // On lance l'effet balancier
    document.body.classList.add('do-the-67-wiggle');
    
    // On nettoie tout après 1.5 seconde
    setTimeout(() => { 
      document.body.classList.remove('do-the-67-wiggle'); 
      document.body.style.removeProperty('--pivot-y'); 
    }, 1500);
  }

  // Init marquee animation on profile post-its
  setTimeout(() => initProfileCarousels(), 50);
}

function renderColorPicker(){document.getElementById('colorPicker').innerHTML=POST_COLORS.map((c,i)=>`<div class="color-dot${i===selectedColor?' active':''}" style="background:${c.bg};" onclick="selectColor(${i})"></div>`).join('');}

/* ═══ PROFILE POSTS CAROUSEL (même animation que Le Tableau) ═══ */
let profileCarousels = [];

function initProfileCarousels() {
  // Clean up old ones
  profileCarousels.forEach(pc => { if(pc.animFrame) cancelAnimationFrame(pc.animFrame); });
  profileCarousels = [];
  
  document.querySelectorAll('.profile-posts').forEach(wrapper => {
    const track = wrapper.querySelector('.profile-posts-track');
    if (!track) return;
    
    const pc = { wrapper, track, speed: 0.5, isDragging: false, startX: 0, startScrollLeft: 0, velocity: 0, prevX: 0, animFrame: null };
    profileCarousels.push(pc);
    
    wrapper.style.overflowX = 'auto';
    wrapper.style.scrollbarWidth = 'none';
    wrapper.style.cursor = 'grab';
    wrapper.style.msOverflowStyle = 'none';
    
    wrapper.addEventListener('mousedown', (e) => {
      pc.isDragging = true;
      wrapper.style.cursor = 'grabbing';
      pc.startX = e.pageX - wrapper.offsetLeft;
      pc.startScrollLeft = wrapper.scrollLeft;
      pc.prevX = pc.startX;
      pc.velocity = 0;
    });
    
    window.addEventListener('mouseup', () => {
      pc.isDragging = false;
      wrapper.style.cursor = 'grab';
    });
    
    wrapper.addEventListener('mousemove', (e) => {
      if (!pc.isDragging) return;
      e.preventDefault();
      const x = e.pageX - wrapper.offsetLeft;
      pc.velocity = pc.prevX - x;
      pc.prevX = x;
      const walk = (x - pc.startX) * 2;
      wrapper.scrollLeft = pc.startScrollLeft - walk;
    });
    
    wrapper.addEventListener('scroll', () => {
      if (!track) return;
      const halfWidth = track.scrollWidth / 2;
      if (wrapper.scrollLeft >= halfWidth) {
        wrapper.scrollLeft -= halfWidth;
        if (pc.isDragging) pc.startScrollLeft -= halfWidth;
      } else if (wrapper.scrollLeft <= 0) {
        wrapper.scrollLeft += halfWidth - 1;
        if (pc.isDragging) pc.startScrollLeft += halfWidth;
      }
    });
    
    function play() {
      if (!pc.isDragging) {
        if (Math.abs(pc.velocity) > 0.3) {
          wrapper.scrollLeft += pc.velocity;
          pc.velocity *= 0.95;
        } else {
          pc.velocity = 0;
          wrapper.scrollLeft += pc.speed;
        }
      }
      pc.animFrame = requestAnimationFrame(play);
    }
    play();
  });
}

/* ═══ MEMBER PROFILE CAROUSEL (same as Le Tableau) ═══ */
let memberCarouselAnim = null;

function initMemberCarousel(userId) {
  if (memberCarouselAnim) cancelAnimationFrame(memberCarouselAnim);
  
  const track = document.querySelector(`[data-member-carousel="${userId}"]`);
  if (!track) return;
  const wrapper = track.closest('.board-carousel-wrapper');
  if (!wrapper) return;
  
  let mcSpeed = 0.7;
  let mcDragging = false;
  let mcStartX = 0, mcStartScroll = 0, mcVelocity = 0, mcPrevX = 0;
  
  wrapper.addEventListener('mousedown', (e) => {
    mcDragging = true;
    mcStartX = e.pageX - wrapper.offsetLeft;
    mcStartScroll = wrapper.scrollLeft;
    mcPrevX = mcStartX;
    mcVelocity = 0;
  });
  window.addEventListener('mouseup', () => { mcDragging = false; });
  wrapper.addEventListener('mousemove', (e) => {
    if (!mcDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    mcVelocity = mcPrevX - x;
    mcPrevX = x;
    wrapper.scrollLeft = mcStartScroll - (x - mcStartX) * 2;
  });
  wrapper.addEventListener('scroll', () => {
    const halfWidth = track.scrollWidth / 2;
    if (wrapper.scrollLeft >= halfWidth) {
      wrapper.scrollLeft -= halfWidth;
      if (mcDragging) mcStartScroll -= halfWidth;
    } else if (wrapper.scrollLeft <= 0) {
      wrapper.scrollLeft += halfWidth - 1;
      if (mcDragging) mcStartScroll += halfWidth;
    }
  });
  
  function play() {
    if (!mcDragging) {
      if (Math.abs(mcVelocity) > 0.5) {
        wrapper.scrollLeft += mcVelocity;
        mcVelocity *= 0.95;
      } else {
        mcVelocity = 0;
        wrapper.scrollLeft += mcSpeed;
      }
    }
    memberCarouselAnim = requestAnimationFrame(play);
  }
  play();
}

/* ═══ SHOP ═══ */
function renderShop() {
  document.getElementById('shopBalance').textContent = `🪙 ${CURRENT_USER.coins} pièces`;
  document.getElementById('headerCoins').textContent = `🪙 ${CURRENT_USER.coins}`;
  document.getElementById('shopCategories').innerHTML = SHOP_CATEGORIES.map(c => `<div class="shop-cat${shopCategory === c.id ? ' active' : ''}" onclick="filterShop('${c.id}')">${c.emoji} ${c.name}</div>`).join('');
  
  // --- 1. RENDU DE LA BOUTIQUE (Haut) ---
  const items = shopCategory === 'all' ? SHOP_ITEMS : SHOP_ITEMS.filter(i => i.category === shopCategory);
  
  document.getElementById('shopGrid').innerHTML = items.map(item => {
    const owned = CURRENT_USER.ownedItems.includes(item.id);
    const equipped = CURRENT_USER.equippedItems.includes(item.id);
    const canAfford = CURRENT_USER.coins >= item.price;
    
    let btnHtml = ''; let statusHtml = ''; let cls = '';
    
    if (equipped) { 
      cls = 'equipped'; statusHtml = '<div class="shop-item-status equipped-status">Équipé</div>'; 
      btnHtml = `<button class="shop-btn equipped-btn">Équipé</button>`; 
    } else if (owned) { 
      cls = 'owned'; statusHtml = '<div class="shop-item-status owned-status">Possédé</div>'; 
      btnHtml = `<button class="shop-btn equip" onclick="equipItem('${item.id}')">Équiper</button>`; 
    } else { 
      btnHtml = `<button class="shop-btn buy${canAfford ? '' : ' disabled'}" onclick="buyItem('${item.id}')" ${canAfford ? '' : 'disabled'}>🪙 ${item.price}</button>`; 
    }

    let previewStyle = '';
    let previewHtml = '';
    if (item.category === 'colors') {
      if (item.id === 'color-gradient1') previewStyle = 'background: linear-gradient(135deg, #FC93FA, #FFD93D); border-radius: 16px; width: 64px; height: 64px; margin: 0 auto 12px; font-size: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);';
      if (item.id === 'color-gradient2') previewStyle = 'background: linear-gradient(135deg, #52EFDA, #3498DB); border-radius: 16px; width: 64px; height: 64px; margin: 0 auto 12px; font-size: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);';
      if (item.id === 'color-gradient3') previewStyle = 'background: linear-gradient(135deg, #E7FF6C, #1DB5A1); border-radius: 16px; width: 64px; height: 64px; margin: 0 auto 12px; font-size: 32px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);';
    } else if (item.category === 'frames' && item.preview && FRAME_SVGS[item.preview]) {
      previewHtml = `<div style="width:80px;height:80px;margin:0 auto 12px;position:relative;"><img src="${FRAME_SVGS[item.preview]}" style="width:100%;height:100%;object-fit:contain;"></div>`;
    }

    const previewContent = typeof previewHtml !== 'undefined' && previewHtml ? previewHtml : `<div class="shop-item-preview" style="${previewStyle}">${getItemPreview(item)}</div>`;
    return `<div class="shop-item ${cls}">
      ${previewContent}
      <div class="shop-item-name">${item.name}</div>
      ${statusHtml}${btnHtml}
    </div>`;
  }).join('');

  // --- 2. RENDU DE L'INVENTAIRE (Bas) ---
  const inventoryContainer = document.getElementById('inventoryList');
  if (inventoryContainer) {
    
    // Colonne de GAUCHE : Filtres (Bloqués à 140px de large pour ne pas être écrasés)
    const invFilterHtml = `<div style="display:flex; flex-direction:column; gap:8px; min-width:140px; flex-shrink:0;">` + 
      SHOP_CATEGORIES.map(c => `<div class="shop-cat${inventoryCategory === c.id ? ' active' : ''}" style="padding:10px 14px; font-size:13px; text-align:left; width:100%;" onclick="filterInventory('${c.id}')">${c.emoji} ${c.name}</div>`).join('') + 
      `</div>`;

    const filteredOwned = CURRENT_USER.ownedItems.filter(id => {
      if (inventoryCategory === 'all') return true;
      const item = SHOP_ITEMS.find(s => s.id === id);
      return item && item.category === inventoryCategory;
    });

    let contentHtml = '';
    
    if (filteredOwned.length === 0) {
      contentHtml = '<div style="flex:1; text-align:center; padding:32px 20px; color:var(--text-muted); font-size:13px; background:var(--surface); border-radius:12px; border:1px dashed var(--border);">Aucun objet trouvé dans cette catégorie.</div>';
    } else {
      const gridContent = filteredOwned.map(id => {
        const item = SHOP_ITEMS.find(s => s.id === id);
        if (!item) return '';
        const equipped = CURRENT_USER.equippedItems.includes(id);
        
        let actionBtn = equipped 
          ? `<button class="shop-btn equipped-btn" style="margin:0; padding:6px 14px; font-size:11px; flex-shrink:0;" onclick="unequipItem('${id}')">Retirer</button>`
          : `<button class="shop-btn equip" style="margin:0; padding:6px 14px; font-size:11px; flex-shrink:0;" onclick="equipItem('${id}')">Équiper</button>`;

        const activeStyle = equipped ? 'border-color: var(--dark-duck); background: rgba(29,181,161,0.06);' : '';

        return `
          <div class="inventory-item" style="${activeStyle}">
            <div class="inventory-item-info">
              <div class="inventory-item-icon">${getItemPreviewSmall(item, 24)}</div>
              <div style="min-width:0;">
                <div class="inventory-item-name">${item.name}</div>
                <div class="inventory-item-cat">${item.category}</div>
              </div>
            </div>
            ${actionBtn}
          </div>
        `;
      }).join('');
      
      // Colonne de DROITE : Grille des objets (Prend l'espace restant avec flex:1)
      contentHtml = `<div style="flex:1; display:grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 200px), 1fr)); gap:12px; align-content:start;">${gridContent}</div>`;
    }
    
    // ASSEMBLAGE : On met les deux colonnes côte à côte avec un bel espace de 24px
    inventoryContainer.innerHTML = `<div style="display:flex; flex-direction:row; gap:24px; align-items:flex-start; width:100%;">${invFilterHtml}${contentHtml}</div>`;
  }
}
function filterShop(cat){shopCategory=cat;renderShop();}
function buyItem(id){
  const item=SHOP_ITEMS.find(s=>s.id===id);if(!item||CURRENT_USER.coins<item.price)return;
  CURRENT_USER.coins-=item.price;CURRENT_USER.ownedItems.push(id);
  renderShop();renderProfile();renderProfilePage();
}
function equipItem(id){
  const item=SHOP_ITEMS.find(s=>s.id===id);if(!item)return;
  CURRENT_USER.equippedItems=CURRENT_USER.equippedItems.filter(eid=>{const ei=SHOP_ITEMS.find(s=>s.id===eid);return ei&&ei.category!==item.category;});
  CURRENT_USER.equippedItems.push(id);
  updateBodyBackground();
  renderShop();renderProfile();renderProfilePage();
}
function unequipItem(id){
  CURRENT_USER.equippedItems=CURRENT_USER.equippedItems.filter(eid=>eid!==id);
  updateBodyBackground();
  renderShop();renderProfile();renderProfilePage();
}

/* ═══ PROFILE PAGE ═══ */
function renderProfilePage() {
  const u = CURRENT_USER;
  const lvl = getLevel(u.xp);
  const div = getDivision(u.monthPts);
  const xpLvl = Math.floor(u.xp / 100) + 1;
  
  // -- Récupération de la personnalisation visuelle --
  const visuals = getEquippedVisuals();
  
  const finalBorder = visuals.frameStyle ? visuals.frameStyle : (visuals.frameSvgKey ? 'border:none;' : `border:4px solid ${div.emoji === '💎' ? '#52EFDA' : div.emoji === '🥇' ? '#FFD93D' : '#DDE5E3'};`);
  const lbFrameSvg = visuals.frameSvgKey && FRAME_SVGS[visuals.frameSvgKey] ? `<img src="${FRAME_SVGS[visuals.frameSvgKey]}" style="position:absolute;top:-8px;left:-8px;width:calc(100% + 16px);height:calc(100% + 16px);pointer-events:none;z-index:3;object-fit:contain;">` : '';
  const accHtml = visuals.accessory ? `<span class="equipped-accessory" style="position:absolute; top:-12px; right:-12px; font-size:36px; filter:drop-shadow(0 4px 6px rgba(0,0,0,0.3)); z-index:2;">${visuals.accessory}</span>` : '';

  const equippedHtml = CURRENT_USER.equippedItems.map(eid => {
    const item = SHOP_ITEMS.find(s => s.id === eid);
    if (!item) return '';
    return `<div class="equipped-tag">${getItemPreviewSmall(item, 18)} ${item.name}<button class="remove-equip" onclick="unequipItem('${item.id}')">✕</button></div>`;
  }).join('') || '<span style="color:var(--text-muted);font-size:13px;">Aucun accessoire équipé. Visite la boutique !</span>';
  
  const colorOptions = UCOLORS.map(c => `<div class="color-option${c === u.color ? ' active' : ''}" style="background:${c};" onclick="changeProfileColor('${c}')"></div>`).join('');
  
  const photoContent = CURRENT_USER.profilePhoto 
    ? `<img src="${CURRENT_USER.profilePhoto}" class="profile-photo" alt="Photo de profil">`
    : `<img src="${getAvatarDataURI(u.id, u.color)}" class="profile-photo" alt="Photo de profil">`;

  // --- 1. RENDU DE LA CARTE PROFIL (Haut) ---
  const cardElement = document.getElementById('profilePageCard');
  
  if (visuals.cardBg) {
    cardElement.style.background = visuals.cardBg;
  } else {
    cardElement.style.background = ''; 
  }

  cardElement.innerHTML = `
    <div class="profile-page-avatar" style="background:transparent; ${finalBorder}">${photoContent}${accHtml}${lbFrameSvg}
      <label class="photo-upload-btn" for="profilePhotoInput" title="Ajouter une photo de profil"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"/><circle cx="12" cy="13" r="4"/></svg></label>
      <input type="file" id="profilePhotoInput" accept="image/*" onchange="handleProfilePhoto(this)">
    </div>
    <h2 style="display:flex; align-items:center; justify-content:center; gap:8px;">Personnalise ton profil ${visuals.badges}</h2>
    <div class="profile-field"><label>Ton nom</label>
      <div style="display:flex; gap:8px; align-items:center;">
        <input type="text" id="profileNameInput" value="${u.name}" maxlength="20" style="flex:1; padding:10px 14px; border-radius:12px; border:1px solid var(--border); font-size:15px; font-weight:600; font-family:'Outfit',sans-serif; background:var(--surface); color:var(--text-primary); outline:none; transition:border-color 0.3s;" onfocus="this.style.borderColor='var(--blue-duck)'" onblur="this.style.borderColor='var(--border)'">
        <button class="shop-btn buy" style="margin:0; padding:10px 18px; font-size:13px; white-space:nowrap;" onclick="changeProfileName()">Valider</button>
      </div>
    </div>
    <div class="profile-field"><label>Tes pièces</label><div class="shop-balance">🪙 ${u.coins} pièces</div></div>
    <div class="profile-field"><label>Couleur de l'avatar</label><div class="color-options">${colorOptions}</div></div>
    <div class="profile-field"><label>Accessoires équipés</label><div class="equipped-items">${equippedHtml}</div></div>
    <div class="profile-field"><label>Tes stats</label>
      <div class="profile-stats"><div class="stat-item">${lvl.emoji} <span>Niv. ${xpLvl} "${lvl.name}"</span></div><div class="stat-item">${div.emoji} <span>${div.name}</span></div><div class="stat-item"><span>#${u.rank}</span></div><div class="stat-item"><span>❤️ ${u.likesReceived} likes</span></div></div>
    </div>
    <div class="profile-field"><label>Récompenses de quinzaine</label>
      <div style="font-size:13px;color:var(--text-secondary);line-height:1.8;">
        1er → 50 pièces<br>2e → 40 pièces<br>3e → 30 pièces<br>Reste du classement → 20 pièces<br><br>
        <span style="color:var(--text-muted);font-size:12px;">Les points se remettent à zéro toutes les 2 semaines. Les pièces gagnées sont permanentes.</span>
      </div>
    </div>
    <button class="btn-voir-plus-board" style="width:100%;margin-top:12px;" onclick="switchPage('shop')">Aller à la boutique</button>`;

  // --- 2. RENDU DE L'INVENTAIRE PROFIL (Bas) ---
  const profileInventoryContainer = document.getElementById('profileInventoryList');
  if (profileInventoryContainer) {
    
    // Génération des boutons de filtre (Ajout de la classe inventory-filters)
    const invFilterHtml = `<div class="shop-categories inventory-filters" style="margin-bottom:16px;">` + 
      SHOP_CATEGORIES.map(c => `<div class="shop-cat${inventoryCategory === c.id ? ' active' : ''}" style="padding:6px 14px; font-size:12px;" onclick="filterInventory('${c.id}')">${c.emoji} ${c.name}</div>`).join('') + 
      `</div>`;

    // Filtrage des objets possédés
    const filteredOwned = CURRENT_USER.ownedItems.filter(id => {
      if (inventoryCategory === 'all') return true;
      const item = SHOP_ITEMS.find(s => s.id === id);
      return item && item.category === inventoryCategory;
    });

    let contentHtml = '';

    if (filteredOwned.length === 0) {
      contentHtml = '<div style="text-align:center; padding:32px 20px; color:var(--text-muted); font-size:13px; background:var(--surface); border-radius:12px; border:1px dashed var(--border);">Aucun objet trouvé dans cette catégorie.</div>';
    } else {
      const gridContent = filteredOwned.map(id => {
        const item = SHOP_ITEMS.find(s => s.id === id);
        if (!item) return '';
        const equipped = CURRENT_USER.equippedItems.includes(id);
        
        let actionBtn = equipped 
          ? `<button class="shop-btn equipped-btn" style="margin:0; padding:6px 14px; font-size:11px; flex-shrink:0;" onclick="unequipItem('${id}')">Retirer</button>`
          : `<button class="shop-btn equip" style="margin:0; padding:6px 14px; font-size:11px; flex-shrink:0;" onclick="equipItem('${id}')">Équiper</button>`;

        const activeStyle = equipped ? 'border-color: var(--dark-duck); background: rgba(29,181,161,0.06);' : '';

        return `
          <div class="inventory-item" style="${activeStyle}">
            <div class="inventory-item-info">
              <div class="inventory-item-icon">${getItemPreviewSmall(item, 24)}</div>
              <div style="min-width:0;">
                <div class="inventory-item-name">${item.name}</div>
                <div class="inventory-item-cat">${item.category}</div>
              </div>
            </div>
            ${actionBtn}
          </div>
        `;
      }).join('');
      
      contentHtml = `<div style="display:grid; grid-template-columns: repeat(auto-fill, minmax(min(100%, 250px), 1fr)); gap:12px;">${gridContent}</div>`;
    }
    
    // Assemblage final
    profileInventoryContainer.innerHTML = invFilterHtml + contentHtml;
  }
}

function changeProfileColor(c){CURRENT_USER.color=c;renderProfile();renderProfilePage();}
function changeProfileName(){
  const input=document.getElementById('profileNameInput');
  const newName=input.value.trim();
  if(!newName||newName.length<2){alert('Le nom doit contenir au moins 2 caractères.');return;}
  CURRENT_USER.name=newName;
  CURRENT_USER.avatar=newName.split(' ').map(w=>w[0]).join('').toUpperCase().slice(0,2);
  const userInList=USERS.find(u=>u.id===CURRENT_USER.id);
  if(userInList){userInList.name=newName;userInList.avatar=CURRENT_USER.avatar;}
  renderProfile();renderProfilePage();renderLeaderboard();
  alert('Nom mis à jour !');
}
function handleProfilePhoto(input){
  if(!input.files||!input.files[0])return;
  const file=input.files[0];
  if(!file.type.startsWith('image/')){alert('Merci de choisir une image.');return;}
  const reader=new FileReader();
  reader.onload=function(e){
    CURRENT_USER.profilePhoto=e.target.result;
    renderProfile();renderProfilePage();
  };
  reader.readAsDataURL(file);
}

/* ═══ MEMBERS PAGE (NOS MEMBRES) ═══ */
function renderMembersList(query = '') {
  currentViewedUserId = null; 
  // Reset du label du FAB
  const fabPostit = document.getElementById('fabPostit');
  if (fabPostit) fabPostit.textContent = 'Coller un post-it';
  
  const content = document.getElementById('membersContent');
  const searchStr = query.toLowerCase();
  
  const filteredUsers = USERS.filter(u => u.name.toLowerCase().includes(searchStr));

  if (filteredUsers.length === 0) {
    content.innerHTML = `<div style="text-align:center; padding:40px; color:var(--text-muted);">Aucun membre trouvé pour "${query}"</div>`;
    return;
  }

  const displayUsers = query ? filteredUsers : filteredUsers.slice(0, 30);

  const html = `<div class="member-grid">` + displayUsers.map(u => {
    const lvl = getLevel(u.xp);
    const div = getDivision(u.monthPts);
    
    // --- NOUVEAU : Variables aléatoires pour le chaos ---
    const randomDelay = Math.random() * 0.6; // Les briques tombent entre 0 et 0.6 seconde
    const randomRot = (Math.random() - 0.5) * 20; // Rotation initiale de biais (entre -10° et +10°)

    return `<div class="member-card brick-drop" style="--start-rot: ${randomRot}deg; animation-delay: ${randomDelay}s;" onclick="animateAndviewUserProfile(this, ${u.id})">
      <div class="member-card-avatar">${avatarImg(u.id, u.color, 64)}</div>
      <div class="member-card-name">${u.name}</div>
      <div class="member-card-level">${lvl.emoji} ${lvl.name}</div>
      <div class="member-card-pts">${div.emoji} ${u.monthPts} pts</div>
    </div>`;
  }).join('') + `</div>`;

  content.innerHTML = html;
}

function animateAndviewUserProfile(clickedCard, userId) {
  // Sélectionne toutes les cartes membres ET les cartes de l'arbre de parrainage
  const allCards = document.querySelectorAll('.member-card, .tree-node-card');
  
  allCards.forEach(card => {
    // --- CORRECTION : On nettoie l'animation d'entrée (briques) ---
    card.classList.remove('brick-drop');
    
    if (card !== clickedCard) {
      const randomX = (Math.random() - 0.5) * 400;     
      const randomRot = (Math.random() - 0.5) * 180;   
      const randomDelay = Math.random() * 0.25;        
      const randomDur = 0.5 + Math.random() * 0.4;     

      card.style.setProperty('--fall-x', `${randomX}px`);
      card.style.setProperty('--fall-rot', `${randomRot}deg`);
      card.style.setProperty('--fall-dur', `${randomDur}s`);
      
      // --- CORRECTION : On écrase le délai inline de l'apparition ---
      card.style.animationDelay = `${randomDelay}s`; 
      
      card.classList.add('falling-card');
    } else {
      card.style.transform = 'scale(1.1)';
      card.style.zIndex = '10';
      card.style.transition = 'transform 0.4s ease';
    }
  });

  setTimeout(() => {
    viewUserProfile(userId);
  }, 800);
}

function searchMembers() {
  const query = document.getElementById('memberSearchInput').value;
  renderMembersList(query);
}

function animatePostitsAndGoToProfile(event, authorElement, userId) {
  // On empêche le clic de se propager au reste du carrousel
  event.stopPropagation(); 
  
  // On remonte l'arbre DOM pour trouver le post-it parent du nom cliqué
  const clickedPostit = authorElement.closest('.postit');
  
  // On cible uniquement les post-it du tableau principal (pour ne pas casser le profil)
  const allPostits = document.querySelectorAll('.board-carousel-track .postit');
  
  allPostits.forEach(postit => {
    if (postit !== clickedPostit) {
      // Générer des valeurs aléatoires pour l'effet de chute
      const randomX = (Math.random() - 0.5) * 400;     
      const randomRot = (Math.random() - 0.5) * 180;   
      const randomDelay = Math.random() * 0.25;        
      const randomDur = 0.5 + Math.random() * 0.4;     

      // Injecter les variables CSS
      postit.style.setProperty('--fall-x', `${randomX}px`);
      postit.style.setProperty('--fall-rot', `${randomRot}deg`);
      postit.style.setProperty('--fall-delay', `${randomDelay}s`);
      postit.style.setProperty('--fall-dur', `${randomDur}s`);
      
      // Déclencher l'animation
      postit.classList.add('falling-card');
    } else {
      // Le post-it cliqué fait un léger zoom
      postit.style.transform = 'scale(1.1)';
      postit.style.zIndex = '10';
      postit.style.transition = 'transform 0.4s ease';
    }
  });

  // On attend que le chaos se dissipe (800ms) avant d'afficher le profil
  setTimeout(() => {
    viewUserProfile(userId);
    
    // On force un re-rendu du tableau en arrière-plan pour que 
    // les post-it soient de nouveau normaux si l'utilisateur revient sur la page
    renderBoard();
  }, 800);
}

function animateLeaderboardAndGoToProfile(event, clickedItem, userId) {
  event.stopPropagation();
  
  // On cible toutes les lignes du leaderboard
  const allLbItems = document.querySelectorAll('.lb-item');
  
  allLbItems.forEach(item => {
    if (item !== clickedItem) {
      // Un peu moins d'éparpillement horizontal car on est dans une sidebar étroite
      const randomX = (Math.random() - 0.5) * 200;     
      const randomRot = (Math.random() - 0.5) * 90;   
      const randomDelay = Math.random() * 0.2;        
      const randomDur = 0.5 + Math.random() * 0.4;     

      item.style.setProperty('--fall-x', `${randomX}px`);
      item.style.setProperty('--fall-rot', `${randomRot}deg`);
      item.style.setProperty('--fall-delay', `${randomDelay}s`);
      item.style.setProperty('--fall-dur', `${randomDur}s`);
      
      item.classList.add('falling-card');
    } else {
      // L'élément cliqué ressort légèrement
      item.style.transform = 'scale(1.05)';
      item.style.zIndex = '10';
      item.style.position = 'relative'; // Important pour que le z-index fonctionne
      item.style.transition = 'transform 0.4s ease';
    }
  });

  // On attend 800ms avant de changer de page
  setTimeout(() => {
    viewUserProfile(userId);
    
    // On réinitialise le leaderboard en fond
    renderLeaderboard();
  }, 800);
}

function animateActivityAndGoToProfile(event, clickedItem, userId) {
  event.stopPropagation();
  
  // On cible toutes les lignes d'activité récentes
  const allActivityItems = document.querySelectorAll('.activity-item');
  
  allActivityItems.forEach(item => {
    if (item !== clickedItem) {
      // Effet de chute adapté à des éléments en liste
      const randomX = (Math.random() - 0.5) * 200;     
      const randomRot = (Math.random() - 0.5) * 45;   // Rotation plus légère pour des blocs longs
      const randomDelay = Math.random() * 0.2;        
      const randomDur = 0.5 + Math.random() * 0.4;     

      item.style.setProperty('--fall-x', `${randomX}px`);
      item.style.setProperty('--fall-rot', `${randomRot}deg`);
      item.style.setProperty('--fall-delay', `${randomDelay}s`);
      item.style.setProperty('--fall-dur', `${randomDur}s`);
      
      item.classList.add('falling-card');
    } else {
      // L'élément cliqué est mis en évidence
      item.style.transform = 'scale(1.02)';
      item.style.zIndex = '10';
      item.style.position = 'relative';
      item.style.background = 'var(--surface)';
      item.style.transition = 'all 0.4s ease';
    }
  });

  // On attend 800ms avant de rediriger vers le profil
  setTimeout(() => {
    viewUserProfile(userId);
    
    // On réinitialise la page de réseau en arrière-plan
    renderReferralPage();
  }, 800);
}

function viewUserProfile(userId) {
  const u = getUser(userId);
  const alreadyOnMembers = document.getElementById('page-members').classList.contains('active');
  if (!alreadyOnMembers) switchPage('members');
  currentViewedUserId = userId; 
  
  const fabPostit = document.getElementById('fabPostit');
  if (fabPostit) fabPostit.textContent = `📌 Post-it à ${u.name}`;
  
  document.getElementById('memberSearchContainer').style.display = 'none';
  document.getElementById('backToMembersBtn').style.display = 'inline-flex';

  const lvl = getLevel(u.xp);
  const div = getDivision(u.monthPts);
  const xpLvl = Math.floor(u.xp/100)+1;
  const xpPct = u.xp % 100;
  const borderColor = div.emoji==='💎'?'#52EFDA':div.emoji==='🥇'?'#FFD93D':'#DDE5E3';
  
  const sortedUsers = [...USERS].sort((a,b) => b.monthPts - a.monthPts);
  const userRank = sortedUsers.findIndex(x => x.id === u.id) + 1;
  
  const userPosts = posts.filter(p => (p.authorId === u.id && !p.targetId) || p.targetId === u.id);
  const totalLikes = userPosts.reduce((sum, p) => sum + p.likes, 0);

  const actionBtns = `
    <div style="display:flex; gap:12px; margin-top:24px; flex-wrap:wrap; justify-content:center;">
      <button class="btn-voir-plus-board" onclick="openQrModal(${u.id})" style="margin:0; flex:1; min-width:140px;">📱 Voir QR Code</button>
      <button class="btn-voir-plus-board" onclick="openMessageModal(${u.id})" style="margin:0; flex:1; min-width:140px;">✉️ Message</button>
      <button class="btn-voir-plus-board" onclick="alert('Demande d\\'ami envoyée à ${u.name} !')" style="margin:0; flex:1; min-width:140px;">🤝 Ajouter en ami</button>
    </div>
  `;

  let postsHtml = '';
  if (userPosts.length === 0) {
    postsHtml = '<p style="color:var(--text-muted); font-size:14px; margin-top:20px;">Aucun post-it pour le moment.</p>';
  } else {
    const gridItems = userPosts.map((p, idx) => {
      const c = POST_COLORS[p.colorIdx % 5];
      const rot = ROTATIONS[idx % ROTATIONS.length];
      const glow = p.likes > 20 ? `0 0 16px ${c.bg}55` : 'none';
      const pin = p.likes > 50 ? '<div class="pin-icon" style="font-size:14px;font-weight:900;color:rgba(0,0,0,0.4);">●</div>' : '';
      const liked = likedPosts.has(p.id) ? 'liked' : '';
      
      const author = getUser(p.authorId);
      const isMine = p.authorId === CURRENT_USER.id;
      const isReceived = p.targetId === u.id && p.authorId !== u.id;
      const receivedTag = isReceived ? `<div style="font-size:9px;font-weight:800;opacity:0.55;margin-bottom:4px;text-transform:uppercase;letter-spacing:0.05em;">💌 De ${author.name}</div>` : '';
      const deleteBtn = isMine ? `<button class="postit-delete" onclick="deletePost(event, ${p.id})" title="Supprimer">✕</button>` : '';
      
      return `<div class="postit" style="background:${c.bg};color:${c.text};transform:rotate(${rot}deg);box-shadow:0 4px 12px rgba(0,0,0,0.25),${glow}; cursor:default;">
        ${deleteBtn}
        ${pin}${receivedTag}
        <div>${p.text}</div>
        <div class="postit-footer">
          <div class="postit-author" style="cursor:default;">
            <div class="mini-avatar">${avatarImg(author.id, author.color, 20)}</div>
            <div style="display:flex; flex-direction:column; gap:2px;">
              <span>${author.name}</span>
              <span style="font-size:9.5px; opacity:0.65; font-weight:700;">📅 ${p.date}</span>
            </div>
          </div>
          <button class="postit-like ${liked}" onclick="likePost(${p.id})">❤️ ${p.likes}</button>
        </div>
      </div>`;
    }).join('');
    
    // CARROUSEL : Gère les doublons intelligemment !
    const isInfinite = userPosts.length > 3;
    const trackHtml = isInfinite 
      ? `<div class="marquee-group">${gridItems}</div><div class="marquee-group">${gridItems}</div>`
      : `<div class="marquee-group" style="padding-right:0;">${gridItems}</div>`;
      
    postsHtml = `
      <div class="board-carousel-wrapper" id="profileCarouselWrapper" style="margin-top:16px;">
        <div class="board-carousel-track" id="profileCarouselTrack" data-infinite="${isInfinite}" data-member-carousel="${userId}">
          ${trackHtml}
        </div>
      </div>`;
  }

  const content = document.getElementById('membersContent');
  content.innerHTML = `
    <div class="profile-card" style="max-width:800px; margin: 0 auto;">
      <div class="profile-top">
        <div class="profile-avatar" style="background:transparent;border:4px solid ${borderColor};">${avatarImg(u.id, u.color, 96)}</div>
        <div class="profile-details">
          <h3>${u.name} ${u.isPioneer ? '<span class="pioneer-badge" style="font-size:12px;vertical-align:middle;margin-left:8px;display:inline-flex;align-items:center;gap:4px;">' + svgIcon('hat-crown', 14) + ' Pionnier</span>' : ''}</h3>
          <div class="level-badge">${lvl.emoji} Niv. ${xpLvl} "${lvl.name}" · ${div.emoji} ${div.name}</div>
        </div>
      </div>
      <div class="xp-bar-container"><div class="xp-label">${u.xp} / ${xpLvl*100} XP — Niveau ${xpLvl}</div><div class="xp-bar"><div class="xp-bar-fill" style="width:${xpPct}%;"></div></div></div>
      <div class="profile-stats"><div class="stat-item"><span>${userPosts.length} post-it</span></div><div class="stat-item"><span>❤️ ${totalLikes} likes reçus</span></div><div class="stat-item"><span>#${userRank} ce mois</span></div><div class="stat-item">${div.emoji} <span>${div.name} — ${u.monthPts} pts</span></div></div>
      ${actionBtns}
    </div>
    <div style="max-width:800px; margin: 40px auto 0;">
      <h3 style="font-size:20px; font-weight:800; margin-bottom:8px;">📌 Les idées de ${u.name}</h3>
      ${postsHtml}
    </div>
  `;
  
  // Lance l'animation du carrousel de profil
  setTimeout(() => {
    if (document.getElementById('profileCarouselWrapper')) initProfileCarousel();
  }, 50);
}

let profileCarouselAnim = null;

function initProfileCarousel() {
  if (profileCarouselAnim) cancelAnimationFrame(profileCarouselAnim);
  
  const wrapper = document.getElementById('profileCarouselWrapper');
  const track = document.getElementById('profileCarouselTrack');
  if (!wrapper || !track) return;
  
  const isInfinite = track.getAttribute('data-infinite') === 'true';
  
  let pSpeed = 0.8;
  let pDragging = false;
  let pStartX = 0, pStartScroll = 0, pVelocity = 0, pPrevX = 0;
  
  wrapper.addEventListener('mousedown', (e) => {
    pDragging = true;
    pStartX = e.pageX - wrapper.offsetLeft;
    pStartScroll = wrapper.scrollLeft;
    pPrevX = pStartX;
    pVelocity = 0;
    wrapper.style.cursor = 'grabbing';
  });
  window.addEventListener('mouseup', () => { 
    pDragging = false; 
    wrapper.style.cursor = 'grab';
  });
  wrapper.addEventListener('mousemove', (e) => {
    if (!pDragging) return;
    e.preventDefault();
    const x = e.pageX - wrapper.offsetLeft;
    pVelocity = pPrevX - x;
    pPrevX = x;
    wrapper.scrollLeft = pStartScroll - (x - pStartX) * 2;
  });
  
  if (isInfinite) {
    wrapper.addEventListener('scroll', () => {
      const halfWidth = track.scrollWidth / 2;
      if (wrapper.scrollLeft >= halfWidth) {
        wrapper.scrollLeft -= halfWidth;
        if (pDragging) pStartScroll -= halfWidth;
      } else if (wrapper.scrollLeft <= 0) {
        wrapper.scrollLeft += halfWidth - 1;
        if (pDragging) pStartScroll += halfWidth;
      }
    });
  }
  
  function play() {
    if (!pDragging) {
      if (Math.abs(pVelocity) > 0.5) {
        wrapper.scrollLeft += pVelocity;
        pVelocity *= 0.95;
      } else if (isInfinite) {
        pVelocity = 0;
        wrapper.scrollLeft += pSpeed;
      }
    }
    profileCarouselAnim = requestAnimationFrame(play);
  }
  play();
}

/* ═══ REFERRAL / PARRAINAGE SYSTEM ═══ */
const REFERRAL_TREE = {
  userId: 7, // Noa T. (CURRENT_USER)
  children: [
    {
      userId: 3, // Théo P.
      date: '28 Mar 2026',
      children: [
        { userId: 11, date: '02 Avr 2026', children: [
          { userId: 22, date: '05 Avr 2026', children: [] },
        ]},
        { userId: 14, date: '04 Avr 2026', children: [] },
      ]
    },
    {
      userId: 8, // Jade M.
      date: '01 Avr 2026',
      children: [
        { userId: 19, date: '03 Avr 2026', children: [
          { userId: 31, date: '06 Avr 2026', children: [] },
          { userId: 42, date: '06 Avr 2026', children: [] },
        ]},
      ]
    },
    {
      userId: 5, // Hugo R.
      date: '03 Avr 2026',
      children: []
    },
    {
      userId: 15, 
      date: '05 Avr 2026',
      children: [
        { userId: 27, date: '06 Avr 2026', children: [] },
      ]
    },
  ]
};

const REFERRAL_ACTIVITY = [
  { userId: 27, action: 'join', date: 'Il y a 1 jour', via: 15, pts: 20 },
  { userId: 31, action: 'join', date: 'Il y a 1 jour', via: 19, pts: 5 },
  { userId: 42, action: 'join', date: 'Il y a 1 jour', via: 19, pts: 5 },
  { userId: 15, action: 'join', date: 'Il y a 2 jours', via: 7, pts: 50 },
  { userId: 19, action: 'join', date: 'Il y a 4 jours', via: 8, pts: 20 },
  { userId: 14, action: 'join', date: 'Il y a 3 jours', via: 3, pts: 20 },
  { userId: 5, action: 'join', date: 'Il y a 4 jours', via: 7, pts: 50 },
  { userId: 8, action: 'join', date: 'Il y a 6 jours', via: 7, pts: 50 },
  { userId: 11, action: 'join', date: 'Il y a 5 jours', via: 3, pts: 20 },
  { userId: 22, action: 'join', date: 'Il y a 2 jours', via: 11, pts: 5 },
];

function countTreeNodes(node) {
  let count = 0;
  for (const c of node.children) { count += 1 + countTreeNodes(c); }
  return count;
}
function countAtLevel(node, targetLvl, currentLvl) {
  if (currentLvl === targetLvl) return node.children.length;
  let count = 0;
  for (const c of node.children) count += countAtLevel(c, targetLvl, currentLvl + 1);
  return count;
}
function calcTotalBonus(node, lvl) {
  const bonuses = [0, 50, 20, 5];
  let total = 0;
  for (const c of node.children) {
    total += (bonuses[lvl] || 0) + calcTotalBonus(c, lvl + 1);
  }
  return total;
}

function renderReferralPage() {
  const totalFilleuls = countTreeNodes(REFERRAL_TREE);
  const lvl1Count = REFERRAL_TREE.children.length;
  const totalBonus = calcTotalBonus(REFERRAL_TREE, 1);

  // Hero stats
  document.getElementById('referralHeroStats').innerHTML = `
    <div class="referral-stat"><div class="referral-stat-value">${totalFilleuls}</div><div class="referral-stat-label">Filleuls</div></div>
    <div class="referral-stat"><div class="referral-stat-value">${lvl1Count}</div><div class="referral-stat-label">Directs</div></div>
    <div class="referral-stat"><div class="referral-stat-value">+${totalBonus}</div><div class="referral-stat-label">Pts gagnés</div></div>
  `;

  // Bonus cards
  document.getElementById('referralBonuses').innerHTML = `
    <div class="referral-bonus-card level-1">
      <div class="referral-bonus-emoji"><svg viewBox="0 0 64 64" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 26h10l8 6 12-6h2l8-2h10" stroke="#52EFDA" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M18 32l6 12 10-4 8 8" stroke="#1DB5A1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M46 26l-4 14-8-8" stroke="#1DB5A1" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="12" cy="26" r="4" fill="#52EFDA"/><circle cx="52" cy="26" r="4" fill="#52EFDA"/></svg></div>
      <div class="referral-bonus-title">Niveau 1 — Direct</div>
      <div class="referral-bonus-pts">+50 pts</div>
      <div class="referral-bonus-desc">Tu parraines quelqu'un directement</div>
    </div>
    <div class="referral-bonus-card level-2">
      <div class="referral-bonus-emoji"><svg viewBox="0 0 64 64" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M26 38l12-12" stroke="#52EFDA" stroke-width="3" stroke-linecap="round"/><path d="M34 42l6-6a10 10 0 000-14l-2-2a10 10 0 00-14 0l-6 6a10 10 0 000 14l2 2" stroke="#1DB5A1" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M30 22l-6 6a10 10 0 000 14l2 2a10 10 0 0014 0l6-6a10 10 0 000-14l-2-2" stroke="#52EFDA" stroke-width="3" stroke-linecap="round" fill="none"/></svg></div>
      <div class="referral-bonus-title">Niveau 2 — Cascade</div>
      <div class="referral-bonus-pts">+20 pts</div>
      <div class="referral-bonus-desc">Ton filleul parraine à son tour</div>
    </div>
    <div class="referral-bonus-card level-3">
      <div class="referral-bonus-emoji"><svg viewBox="0 0 64 64" width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 36c8-12 16 8 24-4s16 8 24-4" stroke="#52EFDA" stroke-width="3" stroke-linecap="round" fill="none"/><path d="M4 28c8-12 16 8 24-4s16 8 24-4" stroke="#1DB5A1" stroke-width="2.5" stroke-linecap="round" fill="none" opacity="0.5"/><path d="M4 44c8-12 16 8 24-4s16 8 24-4" stroke="#1DB5A1" stroke-width="2" stroke-linecap="round" fill="none" opacity="0.3"/></svg></div>
      <div class="referral-bonus-title">Niveau 3 — Onde</div>
      <div class="referral-bonus-pts">+5 pts</div>
      <div class="referral-bonus-desc">Le réseau continue de grandir</div>
    </div>
  `;

  // Tree
  renderReferralTree();

  // Activity feed
  const activityHtml = REFERRAL_ACTIVITY.slice(0, 8).map(a => {
    const u = getUser(a.userId);
    const via = getUser(a.via);
    const lvlLabel = a.via === 7 ? 'direct' : a.pts === 20 ? 'niv. 2' : 'niv. 3';
    
    return `<div class="activity-item">
      <!-- L'avatar redirige vers le nouveau membre -->
      <div class="activity-avatar" style="cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.1)'" onmouseout="this.style.transform='scale(1)'" onclick="animateActivityAndGoToProfile(event, this.closest('.activity-item'), ${u.id})">
        ${avatarImg(u.id, u.color, 36)}
      </div>
      <div class="activity-text">
        <!-- Clic sur le nom du nouveau membre -->
        <strong style="cursor: pointer; transition: color 0.2s;" onmouseover="this.style.color='var(--blue-duck)'" onmouseout="this.style.color=''" onclick="animateActivityAndGoToProfile(event, this.closest('.activity-item'), ${u.id})">
          ${u.name}
        </strong> 
        a rejoint via 
        <!-- Clic sur le nom du parrain -->
        <strong style="cursor: pointer; transition: color 0.2s;" onmouseover="this.style.color='var(--blue-duck)'" onmouseout="this.style.color=''" onclick="animateActivityAndGoToProfile(event, this.closest('.activity-item'), ${via.id})">
          ${via.name}
        </strong> 
        <span class="activity-pts">(+${a.pts} pts, ${lvlLabel})</span>
      </div>
      <div class="activity-time">${a.date}</div>
    </div>`;
  }).join('');
  document.getElementById('referralActivity').innerHTML = activityHtml;
}

function renderReferralTree() {
  const container = document.getElementById('referralTreeContainer');
  
  function renderNode(node, lvl) {
    const u = getUser(node.userId);
    const isRoot = lvl === 0;
    const cls = lvl === 0 ? 'root' : lvl === 1 ? 'lvl1' : lvl === 2 ? 'lvl2' : 'lvl3';
    const badge = !isRoot && u.isPioneer ? '<div class="tree-node-badge">👑</div>' : '';
    const youTag = isRoot ? '<div class="tree-node-you">Toi</div>' : '';
    const lvlPts = [null, '+50', '+20', '+5'];
    const ptsTag = lvlPts[lvl] ? `<div class="tree-node-pts">${lvlPts[lvl]} pts</div>` : '';
    const dateTag = node.date ? `<div class="tree-node-date">📅 ${node.date}</div>` : '';
    const avatarSize = isRoot ? 52 : lvl === 1 ? 40 : 34;

    let childrenHtml = '';
    if (node.children && node.children.length > 0) {
      childrenHtml = `<div class="rtree-children">${node.children.map(c => renderNode(c, lvl + 1)).join('')}</div>`;
    }

    return `<div class="rtree-node">
      <!-- ⬇️ C'est ici que l'on appelle l'animation (animateAndviewUserProfile) ⬇️ -->
      <div class="tree-node-card ${cls}" onclick="animateAndviewUserProfile(this, ${u.id})">
        ${badge}${youTag}
        <div class="tree-node-avatar">${avatarImg(u.id, u.color, avatarSize)}</div>
        <div class="tree-node-name">${u.name}</div>
        ${ptsTag}${dateTag}
      </div>
      ${childrenHtml}
    </div>`;
  }

  container.innerHTML = `<div class="rtree-root">${renderNode(REFERRAL_TREE, 0)}</div>`;

  // Position horizontal connector bars
  requestAnimationFrame(() => {
    container.querySelectorAll('.rtree-children').forEach(childrenEl => {
      const nodes = childrenEl.querySelectorAll(':scope > .rtree-node');
      if (nodes.length <= 1) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      const parentRect = childrenEl.getBoundingClientRect();
      const firstCard = first.querySelector('.tree-node-card');
      const lastCard = last.querySelector('.tree-node-card');
      const left = firstCard.getBoundingClientRect().left + firstCard.offsetWidth / 2 - parentRect.left;
      const right = parentRect.right - (lastCard.getBoundingClientRect().left + lastCard.offsetWidth / 2);
      childrenEl.style.setProperty('--bar-left', left + 'px');
      childrenEl.style.setProperty('--bar-right', right + 'px');
    });
  });
}

function copyReferralLink() {
  const text = document.getElementById('referralLinkText').textContent;
  navigator.clipboard.writeText('https://' + text).then(() => {
    const btn = document.getElementById('referralCopyBtn');
    btn.textContent = 'Copié ✓';
    btn.classList.add('copied');
    setTimeout(() => { btn.textContent = 'Copier'; btn.classList.remove('copied'); }, 2000);
  }).catch(() => {
    alert('Lien copié : https://' + text);
  });
}

/* ═══ MODALES QR CODE ET MESSAGE ═══ */
function openQrModal(userId) {
  const u = getUser(userId);
  document.getElementById('qrModalTitle').textContent = `QR Code de ${u.name}`;
  document.getElementById('qrModalImg').src = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=neear://profile/${u.id}`;
  document.getElementById('qrModal').classList.remove('hidden');
}
function closeQrModal() {
  document.getElementById('qrModal').classList.add('hidden');
}

function openMessageModal(userId) {
  const u = getUser(userId);
  document.getElementById('messageModalTitle').textContent = `Message à ${u.name}`;
  document.getElementById('messageTextarea').value = '';
  document.getElementById('messageSuccess').style.display = 'none';
  document.getElementById('messageModal').classList.remove('hidden');
}
function closeMessageModal() {
  document.getElementById('messageModal').classList.add('hidden');
}
function sendMessage() {
  const text = document.getElementById('messageTextarea').value.trim();
  if(!text) return;
  document.getElementById('messageSuccess').style.display = 'block';
  setTimeout(() => {
    closeMessageModal();
  }, 1500);
}

/* ═══ AUTRES ACTIONS ═══ */
function showMore(){lbPage++;renderLeaderboard();}
function showLess(){lbPage--;renderLeaderboard();}
function openModal() {
checkWeeklyReset();
  
  document.getElementById('postLimitDisplay').textContent = `🎟️ Crédits : ${CURRENT_USER.postLimit} / 5 post-it`;

  // Adapter le titre et le placeholder selon la cible
  const modalTitle = document.querySelector('#modal .modal-card h3');
  const textarea = document.getElementById('postTextarea');
  const targetIndicator = document.getElementById('postTargetIndicator');

  if (document.getElementById('page-members').classList.contains('active') && currentViewedUserId !== null) {
    const targetUser = getUser(currentViewedUserId);
    modalTitle.textContent = `Coller un post-it à ${targetUser.name}`;
    textarea.placeholder = `Ton idée pour ${targetUser.name}... (100 caractères max)`;
    // Afficher l'indicateur de cible
    if (targetIndicator) {
      targetIndicator.innerHTML = `<span style="display:inline-flex;align-items:center;gap:6px;">${avatarImg(targetUser.id, targetUser.color, 20)} Sera affiché sur le profil de <strong>${targetUser.name}</strong></span>`;
      targetIndicator.style.display = 'block';
    }
  } else if (document.getElementById('page-profile').classList.contains('active')) {
    modalTitle.textContent = 'Coller un post-it sur mon profil';
    textarea.placeholder = 'Une idée pour ton profil... (100 caractères max)';
    if (targetIndicator) {
      targetIndicator.innerHTML = `<span style="display:inline-flex;align-items:center;gap:6px;">📌 Sera affiché sur <strong>ton profil</strong></span>`;
      targetIndicator.style.display = 'block';
    }
  } else {
    modalTitle.textContent = 'Coller un post-it';
    textarea.placeholder = 'Ton idée pour Neear... (100 caractères max)';
    if (targetIndicator) {
      targetIndicator.innerHTML = `<span style="display:inline-flex;align-items:center;gap:6px;">🌍 Sera affiché sur <strong>Le Tableau</strong> public</span>`;
      targetIndicator.style.display = 'block';
    }
  }

  document.getElementById('modal').classList.remove('hidden');
}
function closeModal(){document.getElementById('modal').classList.add('hidden');}
function openSpinModal(){document.getElementById('spinModal').classList.remove('hidden');}
function closeSpinModal(){document.getElementById('spinModal').classList.add('hidden');}
function selectColor(i){selectedColor=i;renderColorPicker();}
function toggleMobile(){
  const m=document.getElementById('mobileMenu');
  const btn=document.querySelector('.hamburger');
  if(m.classList.contains('open')){
    m.classList.remove('open');
    btn.textContent='☰';
  } else {
    m.classList.add('open');
    btn.textContent='✕';
  }
}
function closeMobileMenu(){
  const m=document.getElementById('mobileMenu');
  const btn=document.querySelector('.hamburger');
  if(m) m.classList.remove('open');
  if(btn) btn.textContent='☰';
}
document.addEventListener('click',function(e){
  const m=document.getElementById('mobileMenu');
  const btn=document.querySelector('.hamburger');
  if(m && m.classList.contains('open') && !m.contains(e.target) && !btn.contains(e.target)){
    closeMobileMenu();
  }
});

/* ═══ SPIN WHEEL ═══ */
function drawWheel(){const canvas=document.getElementById('wheelCanvas');const ctx=canvas.getContext('2d');const size=200,cx=size,cy=size,r=size-4;let currentAngle=-Math.PI/2;SPIN_SEGMENTS.forEach((val,i)=>{const segAngle=SPIN_ANGLES[i];const startA=currentAngle;const endA=startA+segAngle;ctx.beginPath();ctx.moveTo(cx,cy);ctx.arc(cx,cy,r,startA,endA);ctx.closePath();ctx.fillStyle=SPIN_COLORS[i];ctx.fill();ctx.strokeStyle='rgba(0,0,0,0.1)';ctx.lineWidth=2;ctx.stroke();ctx.save();ctx.translate(cx,cy);ctx.rotate(startA+segAngle/2);ctx.textAlign='center';ctx.fillStyle='#00100E';const fontSize=segAngle>0.3?22:segAngle>0.15?16:12;ctx.font=`bold ${fontSize}px Outfit, sans-serif`;ctx.fillText(val,r*0.6,4);if(segAngle>0.2){ctx.font='600 11px Outfit, sans-serif';ctx.fillText('pts',r*0.6,18);}ctx.restore();currentAngle=endA;});ctx.beginPath();ctx.arc(cx,cy,22,0,2*Math.PI);ctx.fillStyle='#00100E';ctx.fill();ctx.beginPath();ctx.arc(cx,cy,18,0,2*Math.PI);ctx.fillStyle='#52EFDA';ctx.fill();}
function spinWheel(){if(hasSpun)return;const btn=document.getElementById('spinBtn');btn.disabled=true;btn.textContent='...';document.getElementById('spinResult').style.display='none';const randomSeg=Math.floor(Math.random()*SPIN_SEGMENTS.length);const segMiddleRad=SPIN_CUMULATIVE[randomSeg]+SPIN_ANGLES[randomSeg]/2;const segMiddleDeg=segMiddleRad*180/Math.PI;const extraTurns=1080+Math.floor(Math.random()*4)*360;const targetAngle=360-segMiddleDeg;wheelRotation+=extraTurns+targetAngle;document.getElementById('wheelCanvas').style.transform=`rotate(${wheelRotation}deg)`;setTimeout(()=>{hasSpun=true;btn.textContent='Reviens demain !';const won=SPIN_SEGMENTS[randomSeg];const mult=CURRENT_USER.isPioneer?2:1;const el=document.getElementById('spinResult');el.textContent=`+${won*mult} pts ${CURRENT_USER.isPioneer?'(×2 Pionnier)':''}`;el.style.display='block';},3600);}

/* ═══ VALIDATION ═══ */
let uploadedFile=null;
function handleFile(input){const file=input.files[0];if(!file)return;if(file.size>5*1024*1024){alert('Fichier trop lourd (5 Mo max)');return;}if(!file.type.startsWith('image/')){alert('Seules les images sont acceptées');return;}uploadedFile=file;const reader=new FileReader();reader.onload=function(e){document.getElementById('previewImage').src=e.target.result;document.getElementById('previewContainer').style.display='block';document.getElementById('dropzone').style.display='none';};reader.readAsDataURL(file);}
function removeFile(){uploadedFile=null;document.getElementById('fileInput').value='';document.getElementById('previewContainer').style.display='none';document.getElementById('dropzone').style.display='block';}
function submitValidation() {
  const userId = document.getElementById('validationUserId').value.trim();
  const mission = document.getElementById('missionSelect').value;
  
  if(!userId){ alert('Indique ton identifiant pour recevoir tes points !'); return; }
  if(!mission){ alert('Choisis une mission à valider !'); return; }
  if(!uploadedFile){ alert('Dépose un screenshot comme preuve !'); return; }
  
  document.getElementById('validationForm').style.display='none';
  document.getElementById('validationSuccess').style.display='block';
}

function resetValidation() {
  document.getElementById('validationForm').style.display='block';
  document.getElementById('validationSuccess').style.display='none';
  
  document.getElementById('validationUserId').value=''; // On vide l'ID
  document.getElementById('missionSelect').value='';
  document.getElementById('validationComment').value='';
  document.getElementById('validCharCount').textContent='0';
  removeFile();
}
(function(){const dz=document.getElementById('dropzone');['dragenter','dragover'].forEach(evt=>{dz.addEventListener(evt,function(e){e.preventDefault();e.stopPropagation();dz.classList.add('dragover');});});['dragleave','drop'].forEach(evt=>{dz.addEventListener(evt,function(e){e.preventDefault();e.stopPropagation();dz.classList.remove('dragover');});});dz.addEventListener('drop',function(e){const file=e.dataTransfer.files[0];if(file){const input=document.getElementById('fileInput');const dt=new DataTransfer();dt.items.add(file);input.files=dt.files;handleFile(input);}});})();

/* ═══ INIT ═══ */
document.getElementById('postTextarea').addEventListener('input',function(){document.getElementById('charCount').textContent=this.value.length;});
document.getElementById('validationComment').addEventListener('input',function(){document.getElementById('validCharCount').textContent=this.value.length;});

function toggleInventory(page) {
  // On ne déclenche l'accordéon QUE sur mobile (quand l'écran est < 900px)
  if (window.innerWidth > 900) return; 
  
  const cardId = page === 'shop' ? 'shopInventoryCard' : 'profileInventoryCard';
  const card = document.getElementById(cardId);
  
  if (card) {
    card.classList.toggle('open');
  }
}

try {
  updateBodyBackground();
  renderHero();
  renderBoard();
  initCarousel(); 
  renderLeaderboard();
  renderMissions();
  renderStreak();
  renderProfile(); 
  renderColorPicker();
  drawWheel();
} catch (e) {
  console.error("Oops! Un souci au chargement :", e);
}
