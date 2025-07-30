$(document).ready(function(){
    $.featherlightGallery.prototype.afterContent = function() {
        this.$instance.find('.featherlight-description').remove();

        var location = this.$currentTarget.data('location');
        var rooms = this.$currentTarget.data('rooms');
        var bathrooms = this.$currentTarget.data('bathrooms');
        var size = this.$currentTarget.data('size');
        var price = this.$currentTarget.data('price');

        var descriptionHtml =
            '<div class="featherlight-description">' +
            '<ul>' +
            '<li><i class="fa fa-map-marker"></i> Location: ' + location + '</li>' +
            '<li><i class="fa fa-bed"></i> Rooms: ' + rooms + '</li>' +
            '<li><i class="fa fa-bath"></i> Bathrooms: ' + bathrooms + '</li>' +
            '<li><i class="fa fa-arrows-alt"></i> m2: ' + size + '</li>' +
            '</ul>' +
            '<div class="price">Price from: ' + price + '</div>' +
            '</div>';

        this.$instance.find('.featherlight-content').prepend(descriptionHtml);
    };

    $('#gallery').featherlightGallery({
        previousIcon: '<span></span>',
        nextIcon: '<span></span>'
    });
});