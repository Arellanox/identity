// Inicialización de iconos y animaciones
document.addEventListener("DOMContentLoaded", () => {
  if (window.lucide) lucide.createIcons();

  if (window.AOS) {
    AOS.init({ duration: 650, easing: "ease-out-cubic", once: true, offset: 70 });
  }

  document.getElementById("year").textContent = new Date().getFullYear();

  // Tema claro / oscuro con preferencia local
  const themeToggle = document.getElementById("themeToggle");
  const savedTheme = localStorage.getItem("cv-theme");
  if (savedTheme === "dark") document.documentElement.setAttribute("data-theme", "dark");
  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    const isDark = document.documentElement.getAttribute("data-theme") === "dark";
    if (isDark) {
      document.documentElement.removeAttribute("data-theme");
      localStorage.setItem("cv-theme", "light");
    } else {
      document.documentElement.setAttribute("data-theme", "dark");
      localStorage.setItem("cv-theme", "dark");
    }
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const dark = document.documentElement.getAttribute("data-theme") === "dark";
    themeToggle.innerHTML = dark ? '<i data-lucide="sun"></i>' : '<i data-lucide="moon"></i>';
    if (window.lucide) lucide.createIcons();
  }

  // Barra de progreso de lectura
  const progress = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    const percent = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    progress.style.width = `${percent}%`;
  }, { passive: true });

  // Animación de barras de habilidades cuando aparecen
  const skillObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const skill = entry.target;
        const level = skill.dataset.level || 0;
        skill.querySelector(".skill-track span").style.width = `${level}%`;
        observer.unobserve(skill);
      }
    });
  }, { threshold: 0.25 });
  document.querySelectorAll(".skill").forEach(skill => skillObserver.observe(skill));

  // Navegación activa según sección visible
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = [...document.querySelectorAll("main section[id]")];
  const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navLinks.forEach(link => {
          link.classList.toggle("active", link.getAttribute("href") === `#${entry.target.id}`);
        });
      }
    });
  }, { rootMargin: "-35% 0px -55% 0px" });
  sections.forEach(section => sectionObserver.observe(section));

  // Cerrar menú móvil al seleccionar una sección
  document.querySelectorAll(".navbar-nav .nav-link").forEach(link => {
    link.addEventListener("click", () => {
      const nav = document.getElementById("mainNav");
      if (nav.classList.contains("show")) bootstrap.Collapse.getOrCreateInstance(nav).hide();
    });
  });

  // Copiar correo
  const copyButton = document.getElementById("copyEmail");
  copyButton.addEventListener("click", async () => {
    const email = "hannzoe27@gmail.com";
    try {
      await navigator.clipboard.writeText(email);
    } catch {
      const temp = document.createElement("textarea");
      temp.value = email;
      document.body.appendChild(temp);
      temp.select();
      document.execCommand("copy");
      temp.remove();
    }
    bootstrap.Toast.getOrCreateInstance(document.getElementById("copyToast")).show();
  });

  // Exportar la sección del CV a PDF; si la librería no carga, abrir impresión
  ["downloadPdfTop", "downloadPdfHero"].forEach(id => {
    document.getElementById(id).addEventListener("click", exportPDF);
  });

  async function exportPDF() {
    const element = document.getElementById("cvContent");
    const oldTheme = document.documentElement.getAttribute("data-theme");
    element.classList.add("pdf-export");
    const options = {
      margin: [8, 8, 8, 8],
      filename: "CV_Josue_de_la_Cruz_Arellano.pdf",
      image: { type: "jpeg", quality: 0.96 },
      html2canvas: { scale: 1.6, useCORS: true, backgroundColor: "#ffffff", scrollY: 0 },
      jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
      pagebreak: { mode: ["css", "legacy"], avoid: [".timeline-card", ".education-card", ".teaching-card"] }
    };
    try {
      if (!window.html2pdf) throw new Error("No se pudo cargar html2pdf");
      await html2pdf().set(options).from(element).save();
    } catch (error) {
      console.warn("La exportación PDF no estuvo disponible; se abrirá el diálogo de impresión.", error);
      window.print();
    } finally {
      element.classList.remove("pdf-export");
      if (oldTheme === "dark") document.documentElement.setAttribute("data-theme", "dark");
      else document.documentElement.removeAttribute("data-theme");
    }
  }
});
