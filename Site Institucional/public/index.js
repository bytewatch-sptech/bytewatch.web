// quando o evento for 'scrollar' faça isso
window.addEventListener('scroll', function() {
    // pega o elemento pelo id
  const navbar = document.getElementById('navbar');
  const logo = this.document.getElementById('logo');
  
  // Se rolar mais de 50px, adiciona a classe 'scrolled' e muda a versão logo, senão remove ou muda
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
});
