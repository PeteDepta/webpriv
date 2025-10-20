document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    const currentLangImg = document.getElementById('current-lang-img');
    let currentLanguage = localStorage.getItem('language') || 'en';
    let translations = {};

    window.i18n = window.i18n || {};

    function t(key) {
        if (translations[currentLanguage] && translations[currentLanguage][key]) return translations[currentLanguage][key];
        if (translations.en && translations.en[key]) return translations.en[key];
        return key;
    }

    async function fetchTranslations() {
        const response = await fetch('translations.json');
        translations = await response.json();
        setLanguage(currentLanguage);
        if (typeof window.i18n.onReady === 'function') {
            window.i18n.onReady();
        }
    }

    function setLanguage(lang) {
        currentLanguage = lang;
        localStorage.setItem('language', lang);

        if (lang === 'en') {
            currentLangImg.src = 'images/uk-flag.png';
            currentLangImg.alt = 'UK Flag';
        } else {
            currentLangImg.src = 'images/pl-flag.png';
            currentLangImg.alt = 'PL Flag';
        }

        updateTextContent(lang);
        document.dispatchEvent(new CustomEvent('i18n:languageChanged', { detail: { lang } }));
    }

    function updateTextContent(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        if (translations[lang] && translations[lang].pageTitle) {
            document.title = translations[lang].pageTitle;
        }
    }

    window.i18n.applyTranslations = function() { updateTextContent(currentLanguage); };
    window.i18n.setLanguage = function(lang) { setLanguage(lang); };
    window.i18n.t = function(key) { return t(key); };
    Object.defineProperty(window.i18n, 'lang', { get: function() { return currentLanguage; } });

    languageSwitcher.addEventListener('click', (e) => {
        e.stopPropagation();
        const newLang = currentLanguage === 'en' ? 'pl' : 'en';
        setLanguage(newLang);
    });

    fetchTranslations();
});