(function () {
  var COLLAPSE_AT = 72;
  var EXPAND_AT = 12;
  var collapsed = false;
  var ticking = false;

  function setCollapsed(next) {
    if (collapsed === next) {
      return;
    }
    collapsed = next;
    document.body.classList.toggle("is-scrolled", next);
  }

  function onScroll() {
    var y = window.scrollY;
    if (!collapsed && y > COLLAPSE_AT) {
      setCollapsed(true);
    } else if (collapsed && y < EXPAND_AT) {
      setCollapsed(false);
    }
  }

  function onScrollFrame() {
    ticking = false;
    onScroll();
    updateActiveNav();
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
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });

  onScroll();
  updateActiveNav();
})();
