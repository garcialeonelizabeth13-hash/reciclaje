<template>
  <section class="contact" id="contacto">
    <div class="container">
      <div class="contact__grid">
        <div class="contact__info">
          <span class="section-badge">Contacto</span>
          <h2 class="contact__title">¿Listo para reciclar juntos?</h2>
          <p class="contact__subtitle">
            Contáctanos hoy y un asesor te ayudará a diseñar el plan de
            reciclaje perfecto para tu empresa o hogar.
          </p>
          <div class="contact__items">
            <div class="contact__item">
              <span class="contact__item-icon">📍</span>
              <div>
                <strong>Dirección</strong>
                <span>Av. Verde 123, Col. Ecológica, Ciudad</span>
              </div>
            </div>
            <div class="contact__item">
              <span class="contact__item-icon">📞</span>
              <div>
                <strong>Teléfono</strong>
                <span>+52 (55) 1234-5678</span>
              </div>
            </div>
            <div class="contact__item">
              <span class="contact__item-icon">✉️</span>
              <div>
                <strong>Email</strong>
                <span>contacto@reciclaje.com</span>
              </div>
            </div>
            <div class="contact__item">
              <span class="contact__item-icon">🕐</span>
              <div>
                <strong>Horario</strong>
                <span>Lunes a Viernes: 8am - 6pm</span>
              </div>
            </div>
          </div>
        </div>

        <form class="contact__form" @submit.prevent="handleSubmit">
          <div class="form-group">
            <label for="name">Nombre completo</label>
            <input id="name" v-model="form.name" type="text" placeholder="Tu nombre" required />
          </div>
          <div class="form-group">
            <label for="email">Correo electrónico</label>
            <input id="email" v-model="form.email" type="email" placeholder="tu@email.com" required />
          </div>
          <div class="form-group">
            <label for="phone">Teléfono</label>
            <input id="phone" v-model="form.phone" type="tel" placeholder="+52 55 0000 0000" />
          </div>
          <div class="form-group">
            <label for="service">Servicio de interés</label>
            <select id="service" v-model="form.service">
              <option value="">Selecciona un servicio</option>
              <option value="recoleccion">Recolección de Residuos</option>
              <option value="clasificacion">Clasificación y Separación</option>
              <option value="industrial">Procesamiento Industrial</option>
              <option value="organico">Reciclaje Orgánico</option>
              <option value="electronico">Residuos Electrónicos</option>
              <option value="consultoria">Consultoría Ambiental</option>
            </select>
          </div>
          <div class="form-group">
            <label for="message">Mensaje</label>
            <textarea id="message" v-model="form.message" rows="4" placeholder="Cuéntanos sobre tu proyecto..."></textarea>
          </div>
          <button type="submit" class="btn btn--primary">
            Enviar mensaje ✉️
          </button>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const form = reactive({
  name: '',
  email: '',
  phone: '',
  service: '',
  message: '',
})

function handleSubmit() {
  alert(`¡Gracias ${form.name}! Tu mensaje fue enviado. Te contactaremos pronto.`)
  Object.assign(form, { name: '', email: '', phone: '', service: '', message: '' })
}
</script>

<style scoped>
.contact {
  padding: 6rem 2rem;
  background: linear-gradient(135deg, #0a2e1a, #1a5c32);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

.contact__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: start;
}

.section-badge {
  display: inline-block;
  background: rgba(46, 213, 115, 0.2);
  border: 1px solid rgba(46, 213, 115, 0.4);
  color: #2ed573;
  padding: 6px 16px;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 1.5rem;
}

.contact__title {
  font-size: clamp(1.8rem, 3vw, 2.4rem);
  font-weight: 800;
  color: #ffffff;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.contact__subtitle {
  font-size: 1rem;
  color: rgba(255, 255, 255, 0.75);
  line-height: 1.7;
  margin-bottom: 2rem;
}

.contact__items {
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.contact__item {
  display: flex;
  align-items: flex-start;
  gap: 1rem;
}

.contact__item-icon {
  font-size: 1.4rem;
  flex-shrink: 0;
  margin-top: 2px;
}

.contact__item strong {
  display: block;
  color: #2ed573;
  font-size: 0.85rem;
  font-weight: 600;
  margin-bottom: 2px;
}

.contact__item span {
  color: rgba(255, 255, 255, 0.75);
  font-size: 0.9rem;
}

.contact__form {
  background: #ffffff;
  border-radius: 20px;
  padding: 2.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.form-group label {
  font-size: 0.85rem;
  font-weight: 600;
  color: #0a2e1a;
}

.form-group input,
.form-group select,
.form-group textarea {
  padding: 12px 16px;
  border: 1.5px solid #e0e0e0;
  border-radius: 10px;
  font-size: 0.95rem;
  color: #333;
  outline: none;
  transition: border-color 0.2s;
  font-family: inherit;
  resize: vertical;
}

.form-group input:focus,
.form-group select:focus,
.form-group textarea:focus {
  border-color: #2ed573;
}

.btn--primary {
  padding: 14px 32px;
  background: linear-gradient(135deg, #2ed573, #1a7a3c);
  color: #ffffff;
  border: none;
  border-radius: 50px;
  font-size: 1rem;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-align: center;
}

.btn--primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(46, 213, 115, 0.4);
}

@media (max-width: 900px) {
  .contact__grid {
    grid-template-columns: 1fr;
    gap: 3rem;
  }
}
</style>
