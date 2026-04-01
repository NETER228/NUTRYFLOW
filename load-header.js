// Загрузка шапки
async function loadHeader() {
    try {
        if (document.querySelector('header')) return;
        
        const response = await fetch('header.html');
        const headerHtml = await response.text();
        const headerPlaceholder = document.getElementById('header-placeholder');
        
        if (headerPlaceholder) {
            headerPlaceholder.innerHTML = headerHtml;
        } else {
            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = headerHtml;
            const headerElement = tempDiv.firstElementChild;
            if (headerElement) {
                document.body.insertBefore(headerElement, document.body.firstChild);
            }
        }
        
        setTimeout(() => {
            setupNavigation();
            setupLogout();
            setupContactsScroll();
        }, 50);
        
    } catch (error) {
        console.error('Ошибка загрузки шапки:', error);
    }
}

function setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index-auth.html';
    
    const pageMapping = {
        'index-auth.html': 'navHome',
        'profile.html': 'navProfile',
        'marathons.html': 'navMarathons',
        'supplements.html': 'navSupplements',
        'dashboard.html': 'navSupplements',
        'marathon-detail.html': 'navMarathons'
    };
    
    const currentNavId = pageMapping[currentPage];
    if (currentNavId) {
        const currentLink = document.getElementById(currentNavId);
        if (currentLink) currentLink.style.display = 'none';
    }
}

function setupLogout() {
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        const newLogoutBtn = logoutBtn.cloneNode(true);
        logoutBtn.parentNode.replaceChild(newLogoutBtn, logoutBtn);
        newLogoutBtn.addEventListener('click', () => {
            sessionStorage.removeItem('currentUser');
            window.location.href = 'index.html';
        });
    }
}

function setupContactsScroll() {
    const contactsLink = document.getElementById('contactsLink');
    if (contactsLink) {
        const newContactsLink = contactsLink.cloneNode(true);
        contactsLink.parentNode.replaceChild(newContactsLink, contactsLink);
        newContactsLink.addEventListener('click', (e) => {
            e.preventDefault();
            const footer = document.querySelector('footer');
            if (footer) footer.scrollIntoView({ behavior: 'smooth' });
        });
    }
}

function setupNavigation() {
    const currentPage = window.location.pathname.split('/').pop() || 'index-auth.html';
    
    const pageMapping = {
        'index-auth.html': 'navHome',
        'profile.html': 'navProfile',
        'marathons.html': 'navMarathons',
        'gyms.html': 'navGyms',
        'supplements.html': 'navSupplements',
        'dashboard.html': 'navSupplements',
        'marathon-detail.html': 'navMarathons'
    };
    
    const currentNavId = pageMapping[currentPage];
    if (currentNavId) {
        const currentLink = document.getElementById(currentNavId);
        if (currentLink) currentLink.style.display = 'none';
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', loadHeader);
} else {
    loadHeader();
}