// Small script to toggle between Sign in and Sign up views
(function(){
  const card = document.querySelector('.login-card');
  if(!card) return;

  const tabBtns = Array.from(document.querySelectorAll('.tab-btn'));
  const openSignupLinks = Array.from(document.querySelectorAll('[data-action="open-signup"]'));
  const openSigninLinks = Array.from(document.querySelectorAll('[data-action="open-signin"]'));

  function setMode(mode){
    if(mode === 'signup'){
      card.classList.add('is-signup');
      tabBtns.forEach(b=>{ b.classList.toggle('tab-btn--active', b.dataset.target === 'signup'); b.setAttribute('aria-selected', b.dataset.target==='signup') });
      // mark aria-hidden for forms
      document.querySelector('.form-signin').setAttribute('aria-hidden','true');
      document.querySelector('.form-signup').setAttribute('aria-hidden','false');
      // focus first input in signup
      const first = card.querySelector('.form-signup input'); if(first) first.focus();
    } else {
      card.classList.remove('is-signup');
      tabBtns.forEach(b=>{ b.classList.toggle('tab-btn--active', b.dataset.target === 'signin'); b.setAttribute('aria-selected', b.dataset.target==='signin') });
      document.querySelector('.form-signin').setAttribute('aria-hidden','false');
      document.querySelector('.form-signup').setAttribute('aria-hidden','true');
      const first = card.querySelector('.form-signin input'); if(first) first.focus();
    }
  }

  tabBtns.forEach(btn => {
    btn.addEventListener('click', e=>{
      setMode(btn.dataset.target);
    })
  });

  openSignupLinks.forEach(a=> a.addEventListener('click', e=>{ e.preventDefault(); setMode('signup'); }));
  openSigninLinks.forEach(a=> a.addEventListener('click', e=>{ e.preventDefault(); setMode('signin'); }));

  // Start in signin view explicitly
  setMode('signin');
})();
