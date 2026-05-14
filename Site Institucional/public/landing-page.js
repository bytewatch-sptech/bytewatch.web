window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  const logo = document.getElementById('logo');
  
  if (navbar && logo) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
        navbar.classList.remove('navbar-dark');
        navbar.classList.add('navbar-light');

        logo.src = "assets/logo-versao1.png";
      } else {
        navbar.classList.remove('scrolled');
        navbar.classList.remove('navbar-light');
        navbar.classList.add('navbar-dark');

        logo.src = "assets/logo-versao2.png";
      }
  }
});