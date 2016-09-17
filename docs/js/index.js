$(document).ready(function() {
    var pre_pop = true;
    var header_init_pos = true;
    if (pre_pop) { $(".popover-wrapper").addClass("show"); pre_pop = false; }

    /*--------------------Event_Handlers--------------------*/
    $("#close").on("click", function() {
        $(".popover-wrapper").removeClass("show");
    });

    $(".scroll-back").on("click", function() {
        document.body.scrollTop = 0;
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
