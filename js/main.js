$(document).ready(function(){
    
    $('.burger-menu').on('click', function() {
        $(this).toggleClass('toggle');
        $('.nav').toggleClass('nav_active');
    });

});