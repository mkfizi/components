'use strict';

(function () {
    const tabs = {
        open: (element) => {
            element.classList.remove('hidden', 'invisible');
            element.removeAttribute('inert');
            tabs.toggleButton(element.id, true);
            tabs.triggerTabs(element);
        },

        close: (element) => {
            element.classList.add('hidden', 'invisible');
            element.setAttribute('inert', '');
            tabs.toggleButton(element.id, false);
        },

        toggleButton: (id, isOpen) => {
            document.querySelectorAll(`[aria-controls="${id}"]`).forEach(button => {
                const activeClasses = ['text-white', 'dark:text-black', 'bg-black', 'dark:bg-neutral-100', 'hover:bg-neutral-800', 'dark:hover:bg-white'];
                const inactiveClasses = ['text-black', 'dark:text-white', 'bg-neutral-100', 'dark:bg-neutral-700', 'hover:bg-neutral-200', 'dark:hover:bg-neutral-600'];
                
                button.classList.remove(...(isOpen ? inactiveClasses : activeClasses));
                button.classList.add(...(isOpen ? activeClasses : inactiveClasses));
                button.setAttribute('aria-expanded', isOpen)
            });
        },

        toggleIcon: (id, isOpen) => {
            document.querySelector(`[aria-labelledby="${id}"]`).classList.toggle('rotate-180', isOpen);
        },

        triggerTabs: (element) => {
            const tabsId = element.getAttribute('aria-labelledby');
            if (tabsId) {
                document.querySelectorAll(`[aria-labelledby="${tabsId}"]`).forEach(otherElement => {
                    if (otherElement !== element) tabs.close(otherElement);
                });
            }
        }
    }

    document.querySelectorAll('[id^="open-tab-button"]').forEach(button => {
        button.addEventListener('click', () => {
            const id = button.getAttribute('aria-controls');
            const element = document.getElementById(id);

            if (!element) return;
            tabs.open(element)
        });
    });
})();