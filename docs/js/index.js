$(document).ready(function() {
    var pre_pop = true;
    var header_init_pos = true;
    if (pre_pop) { $(".popover-wrapper").addClass("show"); pre_pop = false; }


    /*--------------------Rotating_Tag--------------------*/

    $("#js-rotating").Morphext({
        // The [in] animation type. Refer to Animate.css for a list of available animations.
        animation: "flipInX",
        // An array of phrases to rotate are created based on this separator. Change it if you wish to separate the phrases differently (e.g. So Simple | Very Doge | Much Wow | Such Cool).
        separator: ",",
        // The delay between the changing of each phrase in milliseconds.
        speed: 5000,
        complete: function () {
            // Called after the entrance animation is executed.
        }
    });

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
