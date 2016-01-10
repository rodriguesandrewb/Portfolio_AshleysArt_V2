"use strict";

function main() {
    function changeOverlay(imageLi) {
        //Remove Active Class So It's Only on 1 LI
        $('.activeImage').removeClass();

        //Move from a up to the li
        var imageListItem = $(imageLi);

        //Add a class so we can easily keep track of the image li with the arrows
        imageListItem.addClass('activeImage');

        //Get values from the element
        var title = $(imageListItem).children('h1').text();
        var originalImage = $(imageListItem).children('a').attr('href');
        var caption = $(imageListItem).children('a').children('img').attr('alt');

        //Update the image source on the overlay, and the alt attr
        $('#changeImage').attr('src', originalImage);
        $('#changeImage').attr('alt', caption);

        //Update title & caption
        $('#captionContainer').children('h1').text(title);
        $('#captionContainer').children('h2').text(caption);

        //Show overlay
        $('#overlay').fadeIn('slow');
    }

    //Stop link from opening a page to the href value
    $('#gallery a').click(function(event) {
        event.preventDefault();
    });

    //When clicking on the thumbnail run the function
    $('a').on('click', function() {
        var clickedImage = $(this).parent('li');
        changeOverlay(clickedImage);
    });

    $('#leftArrow').on('click', function() {
        //If the image is the first, loop back to the last
        if ($('.activeImage').is(':first-child')) {
            var lastImage = $('#gallery').children('li').last('li');
            changeOverlay(lastImage);
        //Otherwise keep going to the next image
        } else {
            var nextImage = $('.activeImage').prev('li');
            changeOverlay(nextImage);
        }
    });

    $('#rightArrow').on('click', function() {
        //If the image is the last, loop back to the first
        if ($('.activeImage').is(':last-child')) {
            var firstImage = $('#gallery').children('li').first('li');
            changeOverlay(firstImage);
        //Otherwise keep going to the next image
        } else {
            var nextImage = $('.activeImage').next('li');
            changeOverlay(nextImage);
        }
    });

    $('#overlay').click(function() {
        $(this).fadeOut('slow');
    });


}

$(document).ready(main());