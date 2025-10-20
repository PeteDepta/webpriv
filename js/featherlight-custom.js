$(document).ready(function(){
    $.featherlightGallery.prototype.afterContent = function() {
        this.$instance.find('.featherlight-description').remove();

        const location = this.$currentTarget.data('location');
        const rooms = this.$currentTarget.data('rooms');
        const bathrooms = this.$currentTarget.data('bathrooms');
        const size = this.$currentTarget.data('size');
        const price = this.$currentTarget.data('price');

        const infoEn = this.$currentTarget.data('info');
        const infoPl = this.$currentTarget.data('infoPl') || this.$currentTarget.data('info-pl');
        const currentLang = (window.i18n && window.i18n.lang) ? window.i18n.lang : (localStorage.getItem('language') || 'en');
        const info = (currentLang === 'pl' && infoPl) ? infoPl : infoEn;

        function renderInfoHtml(raw) {
            if (!raw) return '';
            const lines = String(raw).split(/\n+/);
            const parts = [];
            for (let i = 0; i < lines.length; i++) {
                const line = lines[i].trim();
                if (!line) continue;
                if (line.indexOf('|') !== -1) {
                    const chips = line.split('|').map(function (s) {
                        return s.trim();
                    }).filter(Boolean)
                        .map(function (s) {
                            return '<span class="info-chip">' + s + '</span>';
                        }).join('');
                    parts.push('<div class="info-chips">' + chips + '</div>');
                } else {
                    parts.push('<p class="info-paragraph">' + line + '</p>');
                }
            }
            return parts.join('');
        }

        const descriptionHtml =
            '<div class="featherlight-description">' +
              '<ul class="details-list">' +
                '<li><i class="fa fa-map-marker"></i><div class="detail-text"><span class="label"' +
            ' data-translate="flLocationLabel">Location</span><span class="value">: ' + location + '</span></div></li>' +
                '<li><i class="fa fa-bed"></i><div class="detail-text"><span class="label"' +
            ' data-translate="flRoomsLabel">Rooms</span><span class="value">: ' + rooms + '</span></div></li>' +
                '<li><i class="fa fa-bath"></i><div class="detail-text"><span class="label"' +
            ' data-translate="flBathroomsLabel">Bathrooms</span><span class="value">: ' + bathrooms + '</span></div></li>' +
                '<li><i class="fa fa-arrows-alt"></i><div class="detail-text"><span class="label"' +
            ' data-translate="flAreaLabel">Area (m²)</span><span class="value">: ' + size + '</span></div></li>' +
              '</ul>' +
              '<div class="info-block">' +
                '<div class="info-title"><i class="fa fa-info-circle"></i> <span data-translate="flInformationLabel">Information</span></div>' +
                '<div class="info-content">' + renderInfoHtml(info) + '</div>' +
              '</div>' +
              '<div class="price"><span class="price-label" data-translate="flPriceFrom">Price from</span>: <span class="price-value">' + price + '</span></div>' +
            '</div>';

        this.$instance.find('.featherlight-content').prepend(descriptionHtml);

        if (window.i18n && typeof window.i18n.applyTranslations === 'function') {
            window.i18n.applyTranslations();
        }
    };

    $('#gallery').featherlightGallery({
        previousIcon: '<span></span>',
        nextIcon: '<span></span>'
    });
});