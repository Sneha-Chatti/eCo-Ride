! function(t) {
    "use strict";
    t("a.page-scroll").bind("click", function(e) {
            var a = t(this);
            t("html, body").stop().animate({
                scrollTop: t(a.attr("href")).offset().top - 50
            }, 1250, "easeInOutExpo"), e.preventDefault()
        }),
        t("body").scrollspy({ target: ".navbar-fixed-top", offset: 51 }),
        t(".navbar-collapse ul li a:not(.dropdown-toggle)").click(function() {
            t(".navbar-toggle:visible").click()
        }),
        t("h1").fitText(1.2, { minFontSize: "35px", maxFontSize: "40px" }),
        t("#mainNav").affix({ offset: { top: 100 } }),
        window.sr = ScrollReveal(),
        sr.reveal(".sr-icons", { duration: 600, scale: .3, distance: "0px" }, 200),
        sr.reveal(".sr-button", { duration: 1e3, delay: 200 }),
        sr.reveal(".sr-contact", { duration: 600, scale: .3, distance: "0px" }, 300)
}(jQuery);