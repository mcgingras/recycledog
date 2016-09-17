$(document).ready(function() {
    $("#close").on("click", function() {
        $(".popover-wrapper").removeClass("show");
        $(".popover-wrapper").addClass("hide");
    });
});
