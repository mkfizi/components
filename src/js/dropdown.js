'use strict';

(function () {
    const dropdown = {
        toggle: (button) => {
            const id = button.getAttribute('aria-controls');
            const element = document.getElementById(id);
            const isOpen = button.getAttribute('aria-expanded') === 'true';

            if (!element) return;
            isOpen ? dropdown.close(element) : dropdown.open(element);
        },

        open: (element) => {
            element.classList.remove('hidden', 'invisible');
            element.removeAttribute('inert');
            dropdown.toggleButton(element.id, true);
            
            if (dropdown[element.id]) return;
            dropdown[element.id] = {
                clickOutside: (event) => dropdown.clickOutsideHandler(element.id, event),
                escapeKey: (event) => dropdown.escapeKeyHandler(element.id, event)
            };
            document.addEventListener('click', dropdown[element.id].clickOutside);
            window.addEventListener('keydown', dropdown[element.id].escapeKey);
        },

        close: (element) => {
            element.classList.add('hidden', 'invisible');
            element.setAttribute('inert', '');
            dropdown.toggleButton(element.id, false);

            if (!dropdown[element.id]) return;
            document.removeEventListener('click', dropdown[element.id].clickOutside);
            window.removeEventListener('keydown', dropdown[element.id].escapeKey);
            delete dropdown[element.id];
        },

        toggleButton: (id, isOpen) => {
            document.querySelectorAll(`[aria-controls="${id}"]`).forEach(button => {
                button.setAttribute('aria-expanded', isOpen)
            });
        },

        clickOutsideHandler: (id, event) => {
            const element = document.getElementById(id);
            
            if (!element) return;
            if (!event.target.closest(`[aria-labelledby="${id}"]`) && !event.target.closest(`[aria-controls="${id}"]`)) {
                dropdown.close(element);
            }
        },

        escapeKeyHandler: (id, event) => {
            const element = document.getElementById(id);

            if (!element) return;
            if (event.key === 'Escape') {
                dropdown.close(element);
            }
        },
    }

    document.querySelectorAll('[id^="toggle-dropdown-button"]').forEach(button => {
        button.addEventListener('click', () => {
            dropdown.toggle(button);
        });
    });
})();