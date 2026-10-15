// CADASTRO DA FAMÍLIA IMPERIAL — edite este arquivo para adicionar ou remover membros.
// IMPORTANTE: cada membro deve ter id único; duplicar o id faz perfis apontarem para a mesma pessoa.
// O site funciona mesmo aberto localmente, sem depender de fetch ou servidor.
const MEMBERS = [
  {id:'abigor',name:'Abigor Shadowolvez',role:'Conselheiro Real ·  General Supremo',royal:false,featured:true,bio:'A biografia é um texto que conta a história da vida de alguém, escrita na terceira pessoa e organizada em ordem cronológica. Ela deve ser baseada em fontes verificáveis e deve incluir informações como datas, lugares, nomes e acontecimentos. Para criar uma biografia profissional, é importante seguir uma estrutura que inclua informações sobre a educação, experiência profissional, realizações e interesses. O gerador de biografia pessoal online pode ajudar a criar uma biografia personalizada e atraente, perfeita para perfis de redes sociais, currículos e portfólios profissionais.'},
  {id:'kim',name:'Elenarin Shadowolvez',role:'Imperador',royal:true,order:1,bio:'A biografia é um texto que conta a história da vida de alguém, escrita na terceira pessoa e organizada em ordem cronológica. Ela deve ser baseada em fontes verificáveis e deve incluir informações como datas, lugares, nomes e acontecimentos. Para criar uma biografia profissional, é importante seguir uma estrutura que inclua informações sobre a educação, experiência profissional, realizações e interesses. O gerador de biografia pessoal online pode ajudar a criar uma biografia personalizada e atraente, perfeita para perfis de redes sociais, currículos e portfólios profissionais.'},
  {id:'violetta',name:'Violetta Shadowolvez',role:'Imperatriz',royal:true,order:3,bio:'A biografia é um texto que conta a história da vida de alguém, escrita na terceira pessoa e organizada em ordem cronológica. Ela deve ser baseada em fontes verificáveis e deve incluir informações como datas, lugares, nomes e acontecimentos. Para criar uma biografia profissional, é importante seguir uma estrutura que inclua informações sobre a educação, experiência profissional, realizações e interesses. O gerador de biografia pessoal online pode ajudar a criar uma biografia personalizada e atraente, perfeita para perfis de redes sociais, currículos e portfólios profissionais.'},
  {id:'nicholy',name:'Nicholy Shadowolvez',role:'Imperatriz',royal:true,order:2,bio:'A biografia é um texto que conta a história da vida de alguém, escrita na terceira pessoa e organizada em ordem cronológica. Ela deve ser baseada em fontes verificáveis e deve incluir informações como datas, lugares, nomes e acontecimentos. Para criar uma biografia profissional, é importante seguir uma estrutura que inclua informações sobre a educação, experiência profissional, realizações e interesses. O gerador de biografia pessoal online pode ajudar a criar uma biografia personalizada e atraente, perfeita para perfis de redes sociais, currículos e portfólios profissionais.'},
  {id:'damien',name:'Damien Shadowolvez',role:'Principe Imperial',royal:false,featured:true,bio:'A biografia é um texto que conta a história da vida de alguém, escrita na terceira pessoa e organizada em ordem cronológica. Ela deve ser baseada em fontes verificáveis e deve incluir informações como datas, lugares, nomes e acontecimentos. Para criar uma biografia profissional, é importante seguir uma estrutura que inclua informações sobre a educação, experiência profissional, realizações e interesses. O gerador de biografia pessoal online pode ajudar a criar uma biografia personalizada e atraente, perfeita para perfis de redes sociais, currículos e portfólios profissionais.'},
  {id:'zephir',name:'Zephir Shadowolvez',role:'Principe Imperial',royal:false,featured:true,bio:'A biografia é um texto que conta a história da vida de alguém, escrita na terceira pessoa e organizada em ordem cronológica. Ela deve ser baseada em fontes verificáveis e deve incluir informações como datas, lugares, nomes e acontecimentos. Para criar uma biografia profissional, é importante seguir uma estrutura que inclua informações sobre a educação, experiência profissional, realizações e interesses. O gerador de biografia pessoal online pode ajudar a criar uma biografia personalizada e atraente, perfeita para perfis de redes sociais, currículos e portfólios profissionais.'},
  {id:'alexsa',name:'Alexsa Shadowolvez',role:'Princesa Imperial',royal:false,featured:true,bio:'A biografia é um texto que conta a história da vida de alguém, escrita na terceira pessoa e organizada em ordem cronológica. Ela deve ser baseada em fontes verificáveis e deve incluir informações como datas, lugares, nomes e acontecimentos. Para criar uma biografia profissional, é importante seguir uma estrutura que inclua informações sobre a educação, experiência profissional, realizações e interesses. O gerador de biografia pessoal online pode ajudar a criar uma biografia personalizada e atraente, perfeita para perfis de redes sociais, currículos e portfólios profissionais.'}
];
function esc(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
function nl2arr(text){
  return String(text??'')
    .replace(/\r/g,'')
    .split(/\n{2,}/)
    .map(x=>x.trim())
    .filter(Boolean);
}
function roleLines(role){
  return String(role??'')
    .replace(/\s*[|/]\s*/g,'\n')
    .replace(/\s*·\s*/g,'\n')
    .split(/\n+/)
    .map(x=>x.trim())
    .filter(Boolean);
}
function portrait(m){return `<div class="portrait ${m.royal?'royal':''}"><div class="portrait-inner"><img src="assets/${encodeURIComponent(m.image||m.id+'.png')}" alt="Retrato de ${esc(m.name)}" onerror="this.replaceWith(Object.assign(document.createElement('span'),{className:'empty',textContent:'Retrato em breve'}))"></div></div>`;}
function memberCard(m){return `<a class="member" data-id="${esc(m.id)}" href="perfil.html?membro=${encodeURIComponent(m.id)}" aria-label="Ver perfil de ${esc(m.name)}">${portrait(m)}<div class="member-role">${esc(m.role)}</div><div class="member-name">${esc(m.name)}</div></a>`;}

const gallery=document.querySelector('#gallery');
if(gallery){
  const monarchs=MEMBERS.filter(m=>m.royal).sort((a,b)=>(a.order??99)-(b.order??99));
  const others=MEMBERS.filter(m=>!m.royal);
  const left=[],right=[];
  const featured=others.filter(m=>m.featured);
  const regular=others.filter(m=>!m.featured);
  featured.forEach((m,i)=>(i%2===0?left:right).push(m));
  regular.forEach(m=>(left.length<=right.length?left:right).push(m));
  gallery.classList.add('dynamic-gallery');
  gallery.innerHTML=`<div class="side-members side-left" aria-label="Membros à esquerda">${left.map(memberCard).join('')}</div><div class="royal-members" aria-label="Monarcas">${monarchs.map(memberCard).join('')}</div><div class="side-members side-right" aria-label="Membros à direita">${right.map(memberCard).join('')}</div>`;
}

const profile=document.querySelector('#profile');
if(profile){
  const id=new URLSearchParams(location.search).get('membro');
  const m=MEMBERS.find(x=>x.id===id);
  if(m){
    document.title=`${m.name} | Império Velaryon`;
    const roleHtml = roleLines(m.role).map(line=>`<span>${esc(line)}</span>`).join('');
    const paras = nl2arr(m.bio);
    const bioHtml = paras.length
      ? paras.map(p=>`<p>${esc(p).replace(/\n/g,'<br>')}</p>`).join('')
      : '<p>Biografia a ser adicionada.</p>';
    profile.innerHTML=`
      <section class="profile-bio-panel">
        <h1 class="profile-biography-title">Biografia</h1>
        <div class="profile-bio-copy">${bioHtml}</div>
      </section>
      <aside class="profile-sidebar">
        ${portrait(m)}
        <div class="profile-role-display">${roleHtml}</div>
        <div class="profile-name-display">${esc(m.name)}</div>
      </aside>
      <img class="profile-roses profile-roses-left" src="assets/rosas-esquerda.png" alt="" aria-hidden="true">
      <img class="profile-roses profile-roses-right" src="assets/rosas-direita.png" alt="" aria-hidden="true">`;
  }else{
    profile.innerHTML='<section class="profile-bio-panel"><h1 class="profile-biography-title">Perfil não encontrado</h1><div class="profile-bio-copy"><p>O membro solicitado não foi encontrado.</p><p><a href="familia-imperial.html">Voltar à Família Imperial</a></p></div></section>';
  }
}


// V2.7: reserva espaço físico entre o cartão fixo e as rosas fixas.
// O cálculo usa as medidas reais renderizadas, incluindo títulos mais longos.
// Não depende da altura da biografia nem da posição de rolagem.
if (document.querySelector('.profile-sidebar')) {
  const sidebar = document.querySelector('.profile-sidebar');
  const roses = document.querySelector('.profile-roses-right');
  function fitImperialProfile() {
    if (!sidebar || !roses) return;
    if (window.innerWidth <= 980) {
      sidebar.style.removeProperty('--profile-fit-scale');
      return;
    }
    sidebar.style.setProperty('--profile-fit-scale', '1');
    const cardTop = sidebar.getBoundingClientRect().top;
    const roseTop = roses.getBoundingClientRect().top;
    // 22 px de distância visual entre a borda inferior do cartão e a rosa.
    const freeHeight = Math.max(1, roseTop - cardTop - 22);
    const actualHeight = sidebar.scrollHeight;
    const factor = Math.min(1, freeHeight / Math.max(1, actualHeight));
    sidebar.style.setProperty('--profile-fit-scale', String(Math.max(0.01, factor)));
  }
  window.addEventListener('resize', fitImperialProfile, {passive: true});
  // Fontes customizadas podem alterar altura dos nomes; recalcula após carregá-las.
  requestAnimationFrame(fitImperialProfile);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(fitImperialProfile);
  // Garante recálculo caso retratos modifiquem o layout depois de carregar.
  sidebar.querySelectorAll('img').forEach(img => img.addEventListener('load', fitImperialProfile));
  roses.addEventListener('load', fitImperialProfile);
}
