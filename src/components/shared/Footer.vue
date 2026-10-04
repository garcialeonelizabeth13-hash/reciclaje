<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-section">
        <h3>Observatorio ISDE</h3>
        <p>
          Centro integral de monitoreo y análisis de contenidos sobre reciclaje e impacto ambiental.
        </p>
      </div>

      <div class="footer-section">
        <h4>Enlaces</h4>
        <ul>
          <li><RouterLink to="/">Inicio</RouterLink></li>
          <li><RouterLink to="/observatorio">Observatorio</RouterLink></li>
          <li><RouterLink to="/articulos">Artículos</RouterLink></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Recursos</h4>
        <ul>
          <li><a href="#">API Documentation</a></li>
          <li><a href="#">Reportes</a></li>
          <li><a href="#">Estadísticas</a></li>
          <li><a href="#">Contacto</a></li>
        </ul>
      </div>

      <div class="footer-section">
        <h4>Redes Sociales</h4>
        <div class="social-links">
          <a href="#" class="social-link">Facebook</a>
          <a href="#" class="social-link">Twitter</a>
          <a href="#" class="social-link">LinkedIn</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; 2024 ISDE - Empresa de Ingeniería Del Reciclaje. Todos los derechos reservados.</p>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<style scoped>
.footer {
  background: linear-gradient(135deg, #003399 0%, #002266 100%);
  color: rgba(255, 255, 255, 0.9);
  padding: 3rem 0 1rem;
  margin-top: 4rem;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.footer-section h3 {
  font-size: 1.25rem;
  color: #fff;
  margin-bottom: 1rem;
}

.footer-section h4 {
  font-size: 1rem;
  color: #fff;
  margin-bottom: 1rem;
}

.footer-section p {
  font-size: 0.95rem;
  line-height: 1.6;
}

.footer-section ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-section li {
  margin-bottom: 0.75rem;
}

.footer-section a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.2s ease;
}

.footer-section a:hover {
  color: #fff;
}

.social-links {
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
}

.social-link {
  display: inline-block;
  padding: 0.5rem 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.social-link:hover {
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
}

.footer-bottom {
  text-align: center;
  padding-top: 2rem;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  font-size: 0.9rem;
  color: rgba(255, 255, 255, 0.7);
}

@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: 1fr;
    gap: 1.5rem;
  }

  .footer {
    padding: 2rem 0 1rem;
    margin-top: 2rem;
  }
}
</style>
