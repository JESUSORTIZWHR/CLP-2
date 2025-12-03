document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initAlmacenControls();
  
  console.log("Sistema CLP iniciado - Modo AWS Amplify");
});

// Función para cerrar la alerta del almacén (necesaria en global window)
window.cerrarAlarmAlmacen = () => {
  document.getElementById('almacenAlert').classList.remove('show');
  document.getElementById('almacenOverlay').classList.remove('show');
};

function initNavigation() {
  const menuToggle = document.getElementById('menuToggle');
  const sidebar = document.getElementById('sidebar');
  const sidebarOverlay = document.getElementById('sidebarOverlay');
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  // Toggle Menú Hamburguesa
  if(menuToggle) {
    menuToggle.addEventListener('click', () => {
      sidebar.classList.toggle('active');
      sidebarOverlay.classList.toggle('active');
    });
  }

  if(sidebarOverlay) {
    sidebarOverlay.addEventListener('click', () => {
      sidebar.classList.remove('active');
      sidebarOverlay.classList.remove('active');
    });
  }

  // Lógica de Pestañas (Tabs)
  tabButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Desactivar todos los botones
      tabButtons.forEach(b => b.classList.remove('active'));
      // 2. Ocultar todos los contenidos
      tabContents.forEach(c => c.classList.add('hidden'));
      
      // 3. Activar el botón clickeado
      btn.classList.add('active');
      
      // 4. Mostrar el contenido correspondiente
      const tabId = btn.getAttribute('data-tab');
      const content = document.getElementById(tabId);
      if(content) {
        content.classList.remove('hidden');
      }

      // Cerrar menú en móvil automáticamente
      if (window.innerWidth < 768) {
        sidebar.classList.remove('active');
        sidebarOverlay.classList.remove('active');
      }
    });
  });
}

function initAlmacenControls() {
  const controles = document.querySelectorAll('.control-btn');
  const header = document.getElementById('almacenHeader');
  const alertBox = document.getElementById('almacenAlert');
  const overlay = document.getElementById('almacenOverlay');
  
  if(!alertBox) return;

  controles.forEach(btn => {
    btn.addEventListener('click', () => {
      // Reset visual de botones
      controles.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      
      // Mostrar alerta
      alertBox.classList.add('show');
      overlay.classList.add('show');
      
      // Cambiar colores del header según selección
      header.className = 'almacen-header'; // reset clases
      if(btn.classList.contains('vacio')) header.classList.add('vacio');
      if(btn.classList.contains('medio')) header.classList.add('medio');
      if(btn.classList.contains('lleno')) header.classList.add('lleno');
    });
  });
}