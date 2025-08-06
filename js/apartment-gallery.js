$(document).ready(function(){
    const originalAfterContent = $.featherlightGallery.prototype.afterContent;
    
    $.featherlightGallery.prototype.afterContent = function() {
        originalAfterContent.call(this);
        
        const $currentTarget = this.$currentTarget;
        const mainImageSrc = $currentTarget.attr('href');
        
        let additionalImages = $currentTarget.data('additional-images');
        
        if (!additionalImages) {
            additionalImages = mainImageSrc;
        }
        
        const imageArray = additionalImages.split(',');
        
        this.$instance.find('.apartment-thumbnails').remove();
        
        if (imageArray.length > 1) {
            const $thumbnailContainer = $('<div class="apartment-thumbnails"></div>');

            $.each(imageArray, function(index, imageSrc) {
                const isActive = (imageSrc === mainImageSrc) ? 'active' : '';
                const $thumbnail = $('<div class="apartment-thumbnail ' + isActive + '" data-src="' + imageSrc + '"></div>');
                $thumbnail.css('background-image', 'url(' + imageSrc + ')');
                $thumbnailContainer.append($thumbnail);
            });
            
            this.$instance.find('.featherlight-image').after($thumbnailContainer);
            
            $thumbnailContainer.on('click', '.apartment-thumbnail', function() {
                const newSrc = $(this).data('src');

                const $mainImage = $('.featherlight-image');
                $mainImage.attr('src', newSrc);
                
                $('.apartment-thumbnail').removeClass('active');
                $(this).addClass('active');
            });
        }
    };
    
    $('#gallery').featherlightGallery({
        previousIcon: '<span></span>',
        nextIcon: '<span></span>'
    });
});