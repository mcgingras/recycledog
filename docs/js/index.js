$(document).ready(function() {
    var pre_pop = true;
    var header_init_pos = true;

    /*--------------------Rotating_Tag--------------------*/

    $("#js-rotating").Morphext({
        animation: "flipInX",
        separator: ",",
        speed: 5000,
        complete: function () {
        }
    });

    /*--------------------Event_Handlers--------------------*/

    $("#close").on("click", function() {
        $(".popover-wrapper").removeClass("show");
    });

    $("#cheer-up").on("click", function() {
        $(".popover-wrapper").removeClass("show");
        $(".team").css("display", "flex");
    });

    $(".scroll-back").click(function() {
      $("html, body").animate({ scrollTop: 0 }, "ease-in");
      return false;
    });

    $(window).on("scroll", function() {
        var scroll_target = 160;
        var scroll_pos = document.body.scrollTop;
        if (header_init_pos && scroll_pos > scroll_target) {
            $(".header").addClass("min");
            header_init_pos = false;
        }
        else if (!header_init_pos && scroll_pos <= scroll_target) {
            $(".header").removeClass("min");
            header_init_pos = true;
        }

    });
});
