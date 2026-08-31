(function () {
  var MOBILE_BP = 900;
  var DESKTOP_COLLAPSE_AT = 72;
  var ticking = false;
  var mobileFullHeader = document.getElementById("mobile-header-full");
  var mobileCompactHeader = document.getElementById("mobile-header-compact");

  function isMobile() {
    return window.innerWidth < MOBILE_BP;
  }

  function updateMobileCompactNav() {
    if (!mobileFullHeader || !mobileCompactHeader) {
      return;
    }

    var showCompact = window.scrollY >= mobileFullHeader.offsetHeight;
    document.body.classList.toggle("mobile-compact-nav", showCompact);
    mobileCompactHeader.setAttribute("aria-hidden", showCompact ? "false" : "true");
  }

  function updateDesktopSidebarCollapse() {
    document.body.classList.toggle("is-scrolled", window.scrollY > DESKTOP_COLLAPSE_AT);
  }

  function onScroll() {
    if (isMobile()) {
      updateMobileCompactNav();
    } else {
      document.body.classList.remove("mobile-compact-nav");
      updateDesktopSidebarCollapse();
    }
    updateActiveNav();
  }

  function onScrollFrame() {
    ticking = false;
    onScroll();
  }

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

  function onResize() {
    document.body.classList.remove("mobile-compact-nav");
    onScroll();
  }

  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(onScrollFrame);
    }
  }, { passive: true });

  window.addEventListener("resize", onResize, { passive: true });

  onScroll();
})();
