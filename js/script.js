/*
    Andrew Rodrigues
    Developer & Designer
    Art Gallery Page
    Last Updated: 1/16/2016
*/

"use strict";

function main() {
    function changeOverlay(imageLi) {
        //Remove active class from any elements with it
        $('.activeImage').removeClass();

        if ($('#overlay').hasClass('newOpen')) {
            $('.overlayContainer').css('opacity', 0);
            $('#overlay').removeClass('newOpen');
            console.log('newOpen')
        } else {

        }

        //Get new list item and add class to it
        var imageListItem = $(imageLi);
        imageListItem.addClass('activeImage');

        $('#overlay').fadeIn('slow');
        $('.overlayContainer').animate(
            {
                opacity: 0,
            },
            500,
            function() {
                overlayInfoUpdate(imageListItem);
                $('.overlayContainer').animate(
                {
                    opacity: 1,
                },
                1000
                );
            }
        );
    } // end changeOverlay()

    // close out overlay
    $('#overlay').click(function(event) {
        $(this).fadeOut('slow');
        $(this).removeClass('newOpen');
    });

    function overlayInfoUpdate(imageListItem) {
        var title = $(imageListItem).children('h1').text();
        var originalImage = $(imageListItem).children('a').attr('href');
        var caption = $(imageListItem).children('a').children('img').attr('alt');
        $('#changeImage').attr('src', originalImage);
        $('#changeImage').attr('alt', caption);
        $('#captionContainer').children('h1').text(title);
        $('#captionContainer').children('h2').text(caption);
    }

    function nextImage() {
        //If the image is the last, loop back to the first
        if ($('.activeImage').is(':last-child')) {
            var firstImage = $('#gallery').children('li').first('li');
            changeOverlay(firstImage);
        //Otherwise keep going to the next image
        } else {
            var nextImage = $('.activeImage').next('li');
            changeOverlay(nextImage);
        }
    }

    function prevImage() {
        //If the image is the first, loop back to the last
        if ($('.activeImage').is(':first-child')) {
            var lastImage = $('#gallery').children('li').last('li');
            changeOverlay(lastImage);
        //Otherwise keep going to the next image
        } else {
            var nextImage = $('.activeImage').prev('li');
            changeOverlay(nextImage);
        }
    }

    //Stop link from opening a page to the href value
    $('#gallery a').click(function(event) {
        event.preventDefault();
    });

    //When clicking on the thumbnail run the function
    $('a').on('click', function() {
        var clickedImage = $(this).parent('li');
        $('#overlay').addClass('newOpen');
        changeOverlay(clickedImage);
    });

    $('#leftArrow').on('click', function(event) {
        event.stopPropagation();
        prevImage();
    });

    $('#rightArrow').on('click', function(event) {
        event.stopPropagation()
        nextImage();
    });

    $(document).keydown(function(e) {
        if ($('li').is('.activeImage')) {
        } else {
            $('#gallery').children('li').addClass('activeImage');
        }
        switch(e.which) {
            case 37:
                //If the image is the first, loop back to the last
                prevImage();
            break;

            case 39:
                nextImage();
                console.log('next image');
            break;
        }
    });
    
    $('#search').on('keyup', function() {
        $('#gallery img').css('opacity', '1.0');
        var search = $(this).val();
        $('#gallery img:not([' + search + '])').css('opacity', '0.2');
        $('#gallery img[alt*="' + search + '"]').css('opacity', '1.0');
    });



    $(document).scroll(function() {
        var scrollVal = $(window).scrollTop();
        console.log(scrollVal);
        if (scrollVal > 0) {
            $('#topFixed').addClass('sticky');
            $('#topFixed').removeClass('notSticky');
        } else {
            $('#topFixed').removeClass('sticky');
            $('#topFixed').addClass('notSticky');
        }
    });
}

$(document).ready(main());
