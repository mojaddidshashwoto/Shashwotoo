/**
 * GBP Audit Checklist - Interactive Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // Select elements
    const checkboxes = document.querySelectorAll('.audit-checkbox');
    const progressFill = document.getElementById('progress-fill');
    const progressCounter = document.getElementById('progress-counter');
    const resetBtn = document.getElementById('reset-progress');
    const helpToggles = document.querySelectorAll('.help-toggle');
    
    const STORAGE_KEY = 'gbp_audit_checklist_state';
    
    // Initialize checklist state
    let state = {};

    // 1. Load saved state from localStorage
    function loadSavedState() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                state = JSON.parse(raw);
                checkboxes.forEach(cb => {
                    const name = cb.getAttribute('name');
                    if (name && state[name] === true) {
                        cb.checked = true;
                    }
                });
            }
        } catch (e) {
            console.error('Failed to load saved checklist progress:', e);
        }
        updateProgress();
    }

    // 2. Save current checkbox state to localStorage
    function saveCurrentState() {
        try {
            state = {};
            checkboxes.forEach(cb => {
                const name = cb.getAttribute('name');
                if (name) {
                    state[name] = cb.checked;
                }
            });
            localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
        } catch (e) {
            console.error('Failed to save checklist progress:', e);
        }
    }

    // 3. Update Progress Bar & Counter
    function updateProgress() {
        const total = checkboxes.length;
        let checkedCount = 0;
        
        checkboxes.forEach(cb => {
            if (cb.checked) checkedCount++;
        });

        // Calculate percentage
        const percentage = total > 0 ? Math.round((checkedCount / total) * 100) : 0;
        
        // Update progress bar width
        if (progressFill) {
            progressFill.style.width = `${percentage}%`;
        }

        // Update progress counter text
        if (progressCounter) {
            progressCounter.textContent = `${checkedCount} of ${total} tasks completed (${percentage}%)`;
        }
    }

    // 4. Bind Checkbox listeners
    checkboxes.forEach(cb => {
        cb.addEventListener('change', () => {
            updateProgress();
            saveCurrentState();
        });
    });

    // 5. Bind Reset Button listener
    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            if (confirm('Are you sure you want to reset all checklist progress?')) {
                checkboxes.forEach(cb => {
                    cb.checked = false;
                });
                state = {};
                try {
                    localStorage.removeItem(STORAGE_KEY);
                } catch (e) {
                    console.error('Failed to clear checklist storage:', e);
                }
                updateProgress();
            }
        });
    }

    // 6. Bind Help Description toggles
    helpToggles.forEach(toggle => {
        toggle.addEventListener('click', (e) => {
            const listItem = toggle.closest('.checklist-item');
            if (listItem) {
                const details = listItem.querySelector('.item-details');
                if (details) {
                    // Check if already open
                    const isOpen = details.classList.contains('visible');
                    
                    // Close others in same category (optional, but nice for clean UX)
                    const categoryList = listItem.closest('.checklist');
                    if (categoryList) {
                        categoryList.querySelectorAll('.item-details').forEach(el => {
                            el.classList.remove('visible');
                            el.style.maxHeight = null;
                        });
                        categoryList.querySelectorAll('.help-toggle').forEach(el => {
                            el.classList.remove('active');
                        });
                    }

                    // Open target if was closed
                    if (!isOpen) {
                        details.classList.add('visible');
                        details.style.maxHeight = details.scrollHeight + 'px';
                        toggle.classList.add('active');
                    }
                }
            }
            e.stopPropagation();
        });
    });

    // Close help details if user clicks anywhere else
    document.addEventListener('click', () => {
        document.querySelectorAll('.item-details').forEach(details => {
            details.classList.remove('visible');
            details.style.maxHeight = null;
        });
        document.querySelectorAll('.help-toggle').forEach(toggle => {
            toggle.classList.remove('active');
        });
    });

    // Load initial state
    loadSavedState();
});
