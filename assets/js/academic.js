(function () {
  var SCROLL_THRESHOLD = 48;

  function setCollapsed(collapsed) {
    document.body.classList.toggle("is-scrolled", collapsed);
  }

  function onScroll() {
    setCollapsed(window.scrollY > SCROLL_THRESHOLD);
  }

  // Highlight active nav section
  function updateActiveNav() {
    var sections = ["about", "news", "publications", "projects", "others"];
    var scrollPos = window.scrollY + 120;
    var current = sections[0];
    for (var i = 0; i < sections.length; i++) {
      var el = document.getElementById(sections[i]);
      if (el && el.offsetTop <= scrollPos) {
        current = sections[i];
      }
    }
    document.querySelectorAll(".academic-nav-link").forEach(function (link) {
      var href = link.getAttribute("href") || "";
      link.classList.toggle("is-active", href === "#" + current);
    });
  }

  window.addEventListener("scroll", function () {
    onScroll();
    updateActiveNav();
  }, { passive: true });

  onScroll();
  updateActiveNav();
})();
