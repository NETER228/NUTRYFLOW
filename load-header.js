// Загрузка шапки
async function loadHeader() {
    try {
        // Проверяем, не загружена ли уже шапка
        if (document.querySelector('header')) {
            return;
        }
        
        const response = await fetch('header.html');
        const headerHtml = await response.text();
        const headerPlaceholder = document.getElementById('header-placeholder');
        
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHtml;
        } else {
            // Если нет placeholder, создаем в начале body
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = headerHtml;
            const headerElement = tempDiv.firstElementChild;
            if (headerElement) {
                document.body.insertBefore(headerElement, document.body.firstChild);
            }
        }
        
        // Настраиваем навигацию и кнопки после загрузки
        setTimeout(() => {
            setupNavigation();
            setupLogout();
            setupContactsScroll();
        }, 50);
        
    } catch (error) {
        console.error('Ошибка загрузки шапки:', error);
    }
}

// Скрытие ссылки на текущую страницу в навигации
function setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index-auth.html';
    
    // Маппинг страниц
    const pageMapping = {
        'index-auth.html': 'navHome',
        'profile.html': 'navProfile',
        'marathons.html': 'navMarathons',
        'gyms.html': 'navGyms',
        'supplements.html': 'navSupplements',
        'dashboard.html': 'navSupplements',
        'marathon-detail.html': 'navMarathons'
    };
    
    // Скрываем ссылку на текущую страницу
    const currentNavId = pageMapping[currentPage];
    if (currentNavId) {
        const currentLink = document.getElementById(currentNavId);
        if (currentLink) {
            currentLink.style.display = 'none';
        }
    }
}

// Настройка кнопки выхода
function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        // Удаляем старые обработчики, чтобы не дублировать
        const newLogoutBtn = logoutBtn.cloneNode(true);
        logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
        
        newLogoutBtn.addEventListener('click', function() {
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}

// Настройка прокрутки к контактам
function setupContactsScroll() {
    const contactsLink = document.getElementById('contactsLink');
    if (contactsLink) {
        // Удаляем старые обработчики
        const newContactsLink = contactsLink.cloneNode(true);
        contactsLink.parentNode.replaceChild(newContactsLink, contactsLink);
        
        newContactsLink.addEventListener('click', function(e) {
            e.preventDefault();
            const footer = document.querySelector('footer');
            if (footer) {
                footer.scrollIntoView({ behavior: 'smooth' });
            }
        });
    }
}

// Загрузка шапки при загрузке страницы
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}
