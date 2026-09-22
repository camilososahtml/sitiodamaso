/* Liceo N.º 3 "Dámaso Antonio Larrañaga" — comportamiento del sitio */
(function () {
  "use strict";

  /* ---------- Menú en pantallas chicas ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");

  function cerrarMenu() {
    if (!nav) return;
    nav.classList.remove("open");
    if (toggle) {
      toggle.setAttribute("aria-expanded", "false");
      toggle.textContent = "Menú";
    }
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var abierto = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", abierto ? "true" : "false");
      toggle.textContent = abierto ? "Cerrar" : "Menú";
    });

    document.addEventListener("click", function (e) {
      if (!nav.classList.contains("open")) return;
      if (nav.contains(e.target) || toggle.contains(e.target)) return;
      cerrarMenu();
    });

    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && nav.classList.contains("open")) {
        cerrarMenu();
        toggle.focus();
      }
    });
  }

  /* ---------- Botón "volver arriba" ---------- */
  var toTop = document.querySelector(".to-top");
  if (toTop) {
    var onScroll = function () {
      toTop.classList.toggle("show", window.scrollY > 500);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- Aparición suave de bloques ---------- */
  var items = document.querySelectorAll(".reveal");
  if (items.length) {
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            io.unobserve(entry.target);
          }
        });
      }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
      items.forEach(function (el) { io.observe(el); });
    } else {
      items.forEach(function (el) { el.classList.add("in"); });
    }
  }

  /* ---------- Año en el pie ---------- */
  var anio = document.getElementById("anio");
  if (anio) anio.textContent = new Date().getFullYear();
})();
