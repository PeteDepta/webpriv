document.addEventListener('DOMContentLoaded', () => {
    const languageSwitcher = document.getElementById('language-switcher');
    const currentLangImg = document.getElementById('current-lang-img');
    let currentLanguage = localStorage.getItem('language') || 'en';
    let translations = {};

    async function fetchTranslations() {
        const response = await fetch('translations.json');
        translations = await response.json();
        setLanguage(currentLanguage);
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
    }

    function updateTextContent(lang) {
        document.querySelectorAll('[data-translate]').forEach(element => {
            const key = element.getAttribute('data-translate');
            if (translations[lang] && translations[lang][key]) {
                element.innerHTML = translations[lang][key];
            }
        });
        document.title = translations[lang].pageTitle;
    }

    languageSwitcher.addEventListener('click', (e) => {
        e.stopPropagation();
        const newLang = currentLanguage === 'en' ? 'pl' : 'en';
        setLanguage(newLang);
    });

    fetchTranslations();
});