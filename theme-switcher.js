// ============================================
// Переключатель тем (светлая / тёмная)
// Сохранение выбора в localStorage
// ============================================

(function() {
    // Названия файлов стилей
    const LIGHT_THEME = 'style.css';
    const DARK_THEME = 'style-black.css';
    
    // Ключ для localStorage
    const THEME_KEY = 'nutriflow_theme';
    
    // Функция поиска существующего link со стилями
    function findThemeLink() {
        const links = document.querySelectorAll('link[rel="stylesheet"]');
        for (let link of links) {
            const href = link.getAttribute('href');
            if (href === LIGHT_THEME || href === DARK_THEME) {
                return link;
            }
        }
        return null;
    }
    
    // Получаем или создаём элемент link для стилей
    let themeLink = findThemeLink();
    
    if (!themeLink) {
        themeLink = document.createElement('link');
        themeLink.rel = 'stylesheet';
        document.head.appendChild(themeLink);
    }
    
    // Функция установки темы
    function setTheme(theme) {
        const isDark = theme === 'dark';
        const themeFile = isDark ? DARK_THEME : LIGHT_THEME;
        
        // Обновляем href
        themeLink.href = themeFile;
        
        // Сохраняем в localStorage
        localStorage.setItem(THEME_KEY, theme);
        
        // Обновляем иконку кнопки
        updateAllThemeButtons(isDark);
        
        // Добавляем/удаляем атрибут data-theme на body
        if (isDark) {
            document.body.setAttribute('data-theme', 'dark');
        } else {
            document.body.removeAttribute('data-theme');
        }
        
        console.log(`Тема изменена на: ${isDark ? 'тёмную' : 'светлую'}`);
    }
    
    // Функция обновления всех кнопок темы на странице
    function updateAllThemeButtons(isDark) {
        const themeBtns = document.querySelectorAll('#themeToggleBtn');
        themeBtns.forEach(btn => {
            if (isDark) {
                btn.innerHTML = '<i class="fas fa-sun"></i>';
                btn.setAttribute('title', 'Светлая тема');
            } else {
                btn.innerHTML = '<i class="fas fa-moon"></i>';
                btn.setAttribute('title', 'Тёмная тема');
            }
        });
    }
    
    // Функция переключения темы
    function toggleTheme() {
        const currentTheme = localStorage.getItem(THEME_KEY) || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    }
    
    // Функция инициализации кнопок (добавляет обработчики)
    function initThemeButtons() {
        const themeBtns = document.querySelectorAll('#themeToggleBtn');
        themeBtns.forEach(btn => {
            // Убираем старые обработчики
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            newBtn.addEventListener('click', toggleTheme);
        });
    }
    
    // Функция инициализации темы
    function initTheme() {
        let savedTheme = localStorage.getItem(THEME_KEY);
        
        if (!savedTheme) {
            const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
            savedTheme = prefersDark ? 'dark' : 'light';
        }
        
        setTheme(savedTheme);
        initThemeButtons();
    }
    
    // Запускаем инициализацию после загрузки DOM
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initTheme);
    } else {
        initTheme();
    }
    
    // Экспортируем функцию для переинициализации (для динамически загружаемого контента)
    window.refreshThemeButtons = initThemeButtons;
})();