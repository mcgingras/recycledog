$(document).ready(function() {
    var pre_pop = true;
    var header_init_pos = true;

    var imgs = ["assets/mike.jpg", "assets/brandon.jpg", "assets/matt.jpg", "assets/andrew.jpg"];
    var names = ["mike", "brandon", "matt", "drew"];
    var grid_row = document.createElement('div');
    var target = document.getElementById("js-body--grid");
    grid_row.setAttribute("class", "grid--row team");
    for (i = 0; i < names.length; i++) {
        var inner_div = document.createElement("div");
        inner_div.setAttribute("class", "grid--info-h4");
        inner_div.innerHTML = names[i];

        var mid_div = document.createElement("div");
        mid_div.setAttribute("class", "grid--info");
        mid_div.appendChild(inner_div);

        var img_div = document.createElement("div");
        img_div.setAttribute("class", "grid--img");
        var url_str = "url(" + imgs[i] + ")";
        img_div.style.backgroundImage = url_str;

        var outer_div = document.createElement("div");
        outer_div.setAttribute("class", "grid");
        outer_div.appendChild(img_div);
        outer_div.appendChild(mid_div);

        grid_row.appendChild(outer_div);
    }
    target.appendChild(grid_row);

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
