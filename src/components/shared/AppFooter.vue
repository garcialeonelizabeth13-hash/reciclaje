<template>
  <footer class="footer">
    <div class="footer__main">
      <div class="container">
        <div class="footer__grid">
          <!-- Brand -->
          <div class="footer__brand">
            <div class="footer__logo">
              <i class="mdi mdi-recycle"></i>
              <span class="footer__logo-text">EcoRecicla</span>
            </div>
            <p class="footer__tagline">
              Transformamos residuos en recursos valiosos para construir un planeta más limpio y
              sostenible.
            </p>
            <div class="footer__socials">
              <a href="#" class="footer__social" aria-label="Facebook">
                <i class="mdi mdi-facebook"></i>
              </a>
              <a href="#" class="footer__social" aria-label="Instagram">
                <i class="mdi mdi-instagram"></i>
              </a>
              <a href="#" class="footer__social" aria-label="LinkedIn">
                <i class="mdi mdi-linkedin"></i>
              </a>
              <a href="#" class="footer__social" aria-label="WhatsApp">
                <i class="mdi mdi-whatsapp"></i>
              </a>
            </div>
          </div>

          <!-- Links -->
          <div class="footer__col">
            <h4 class="footer__col-title">Servicios</h4>
            <ul class="footer__links">
              <li><a href="/#servicios">Recolección de Residuos</a></li>
              <li><a href="/#servicios">Clasificación</a></li>
              <li><a href="/#servicios">Procesamiento Industrial</a></li>
              <li><a href="/#servicios">Reciclaje Orgánico</a></li>
              <li><a href="/#servicios">Residuos Electrónicos</a></li>
              <li><a href="/#servicios">Consultoría Ambiental</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h4 class="footer__col-title">Empresa</h4>
            <ul class="footer__links">
              <li><RouterLink to="/about">Quiénes Somos</RouterLink></li>
              <li><RouterLink to="/about">Misión y Visión</RouterLink></li>
              <li><RouterLink to="/about">Nuestro Equipo</RouterLink></li>
              <li><RouterLink to="/about">Valores</RouterLink></li>
              <li><a href="/#proceso">Nuestro Proceso</a></li>
              <li><a href="/#contacto">Trabaja con Nosotros</a></li>
            </ul>
          </div>

          <div class="footer__col">
            <h4 class="footer__col-title">Contacto</h4>
            <ul class="footer__contact-list">
              <li>
                <i class="mdi mdi-map-marker"></i>
                <span>Av. Verde 123, Col. Ecológica</span>
              </li>
              <li>
                <i class="mdi mdi-phone"></i>
                <a href="tel:+525512345678">+52 (55) 1234-5678</a>
              </li>
              <li>
                <i class="mdi mdi-email"></i>
                <a href="mailto:contacto@reciclaje.com">contacto@reciclaje.com</a>
              </li>
              <li>
                <i class="mdi mdi-clock-outline"></i>
                <span>Lun–Vie: 8am – 6pm</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="container">
        <p>© {{ currentYear }} EcoRecicla. Todos los derechos reservados.</p>
        <p>Hecho con <i class="mdi mdi-heart" style="color: #2ed573"></i> por el planeta</p>
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
  background: #060f09;
  color: rgba(255, 255, 255, 0.75);
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
  gap: 0.5rem;
  margin-bottom: 1rem;
  font-size: 1.4rem;
}

.footer__logo i {
  color: #2ed573;
  font-size: 1.8rem;
}

.footer__logo-text {
  font-size: 1.3rem;
  font-weight: 800;
  color: #ffffff;
}

.footer__tagline {
  font-size: 0.9rem;
  line-height: 1.7;
  color: rgba(255, 255, 255, 0.6);
  margin-bottom: 1.5rem;
}

.footer__socials {
  display: flex;
  gap: 0.8rem;
}

.footer__social {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.07);
  border: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.1rem;
  text-decoration: none;
  transition: all 0.2s ease;
}

.footer__social i {
  color: rgba(255, 255, 255, 0.7);
  font-size: 1.2rem;
}

.footer__social:hover {
  background: rgba(46, 213, 115, 0.2);
  border-color: rgba(46, 213, 115, 0.4);
  transform: translateY(-2px);
}

.footer__social:hover i {
  color: #2ed573;
}

.footer__col-title {
  font-size: 0.9rem;
  font-weight: 700;
  color: #2ed573;
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
  color: #2ed573;
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

.footer__contact-list span:first-child {
  flex-shrink: 0;
  font-size: 1rem;
  margin-top: 1px;
}

.footer__contact-list i {
  flex-shrink: 0;
  font-size: 1.1rem;
  color: #2ed573;
  margin-top: 2px;
}

.footer__contact-list a {
  color: rgba(255, 255, 255, 0.6);
  text-decoration: none;
  transition: color 0.2s;
}

.footer__contact-list a:hover {
  color: #2ed573;
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
