<template>
  <footer class="footer">
    <div class="footer__main">
      <div class="container">
        <div class="footer__grid">
          <!-- Brand -->
          <div class="footer__brand">
            <div class="footer__logo">
              <img src="/img/logo.png" alt="ISDE Logo" class="footer__logo-img" />
              <span class="footer__logo-text">Observatorio ISDE</span>
            </div>
            <p class="footer__tagline">
              <strong>ISDE - Empresa de Ingeniería Del Reciclaje</strong><br />
              Empresa Estatal Socialista - Grupo Empresarial del Reciclaje<br /><br />
              Tu fuente de información sobre innovación, ingeniería y reciclaje sostenible
            </p>
          </div>

          <!-- Links -->
          <div class="footer__col">
            <h4 class="footer__col-title">Navegación</h4>
            <ul class="footer__links">
              <li><RouterLink to="/">Inicio</RouterLink></li>
              <li><RouterLink to="/articles">Noticias</RouterLink></li>
              <li><RouterLink to="/categories">Categorías</RouterLink></li>
              <li><RouterLink to="/contacts">Contactos</RouterLink></li>
            </ul>
          </div>

          <!-- Información -->
          <div class="footer__col">
            <h4 class="footer__col-title">Información</h4>
            <ul class="footer__links">
              <li><a href="#privacy">Privacidad</a></li>
              <li><a href="#terms">Términos de Uso</a></li>
              <li><a href="#cookies">Política de Cookies</a></li>
              <li><a href="#about">Acerca De</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h4 class="footer__col-title">Contacto</h4>
            <ul class="footer__contact-list">
              <li>
                <span>📍 La Habana, Cuba</span>
              </li>
              <li>
                <span>📧 info@isde.co.cu</span>
              </li>
              <li>
                <span>🕐 Lun–Vie: 9am – 5pm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container">
        <p>© {{ currentYear }} ISDE - Observatorio. Todos los derechos reservados.</p>
        <p>Empresa Estatal Socialista | Grupo Empresarial del Reciclaje</p>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'

const currentYear = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: #003399;
  color: rgba(255, 255, 255, 0.85);
}

.footer__main {
  padding: 5rem 2rem 3rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.footer__grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr 1fr 1fr;
  gap: 3rem;
}

.footer__logo {
  display: flex;
  align-items: center;
  gap: 0.7rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.footer__logo-img {
  height: 45px;
  width: auto;
  object-fit: contain;
}

.footer__logo-text {
  font-size: 1.2rem;
  font-weight: 800;
  color: #ffffff;
}

.footer__tagline {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
}

.footer__col-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #dc3545;
  text-transform: uppercase;
  letter-spacing: 1px;
  margin-bottom: 1.2rem;
}

.footer__links {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.7rem;
}

.footer__links a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  font-size: 0.9rem;
  transition: color 0.2s ease;
}

.footer__links a:hover {
  color: #28a745;
}

.footer__contact-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.footer__contact-list li {
  display: flex;
  align-items: flex-start;
  gap: 0.7rem;
  font-size: 0.88rem;
}

.footer__contact-list span {
  color: rgba(255, 255, 255, 0.7);
}

.footer__bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.07);
  padding: 1.5rem 2rem;
}

.footer__bottom .container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.footer__bottom p {
  font-size: 0.85rem;
  color: rgba(255, 255, 255, 0.4);
}

@media (max-width: 900px) {
  .footer__grid {
    grid-template-columns: 1fr 1fr;
    gap: 2.5rem;
  }
}

@media (max-width: 560px) {
  .footer__grid {
    grid-template-columns: 1fr;
  }

  .footer__bottom .container {
    flex-direction: column;
    text-align: center;
  }
}
</style>
