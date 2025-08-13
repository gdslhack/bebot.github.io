import { logout, onAuthChange } from './firebase-config.js';

document.addEventListener('DOMContentLoaded', () => {
    const toggleNavbar = document.getElementById('toggle-navbar');
    const navbar = document.getElementById('navbar');
    const navbarIcon = document.getElementById('navbar-icon');
    const menuTitle = document.getElementById('menu-title');
    const menuItems = navbar.querySelectorAll('ul li a span');
    const toggleDarkMode = document.getElementById('toggle-dark-mode');
    const html = document.querySelector('html');
    const darkModeIcon = document.getElementById('dark-mode-icon');
    const logoutButton = document.getElementById('logout');

    // Check auth state
    onAuthChange((user) => {
        if (!user && window.location.pathname !== '/index.html' && window.location.pathname !== '/sistem-manajemen-pekerjaan/index.html') {
            window.location.href = 'index.html';
        }
    });

    // Toggle Navbar
    if (toggleNavbar && navbar && navbarIcon && menuTitle && menuItems) {
        toggleNavbar.addEventListener('click', () => {
            navbar.classList.toggle('w-64');
            navbar.classList.toggle('w-20');
            menuTitle.classList.toggle('hidden');
            navbarIcon.classList.toggle('fa-chevron-left');
            navbarIcon.classList.toggle('fa-chevron-right');
            menuItems.forEach(item => {
                item.classList.toggle('hidden');
            });
        });
    }

    // Toggle Dark Mode
    if (toggleDarkMode && html && darkModeIcon) {
        // Set initial theme based on localStorage
        if (localStorage.getItem('theme') === 'dark') {
            html.classList.add('dark');
            darkModeIcon.classList.remove('fa-moon');
            darkModeIcon.classList.add('fa-sun');
        }

        toggleDarkMode.addEventListener('click', () => {
            html.classList.toggle('dark');
            if (html.classList.contains('dark')) {
                localStorage.setItem('theme', 'dark');
                darkModeIcon.classList.remove('fa-moon');
                darkModeIcon.classList.add('fa-sun');
            } else {
                localStorage.setItem('theme', 'light');
                darkModeIcon.classList.remove('fa-sun');
                darkModeIcon.classList.add('fa-moon');
            }
        });
    }

    // Logout
    if (logoutButton) {
        logoutButton.addEventListener('click', async (e) => {
            e.preventDefault();
            try {
                await logout();
                window.location.href = 'index.html';
            } catch (error) {
                console.error('Sign out error', error);
            }
        });
    }
});
