document.addEventListener('DOMContentLoaded', function() {
    // Hide preloader quickly once page ready
    const preloader = document.querySelector('.preloader');
    if (preloader) {
        setTimeout(()=> preloader.style.display = 'none', 500);
    }

    // Mobile menu toggle
    const menuButton = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    if (menuButton && mainNav) {
        menuButton.addEventListener('click', () => {
            mainNav.classList.toggle('active');
            // show/hide mobile menu simply by toggling display
            if (mainNav.classList.contains('active')) {
                mainNav.style.display = 'block';
            } else {
                mainNav.style.display = 'none';
            }
        });
    }

    // Back to top visibility
    const backToTop = document.getElementById('back-to-top');
    window.addEventListener('scroll', () => {
        if (!backToTop) return;
        if (window.scrollY > 300) backToTop.style.display = 'block';
        else backToTop.style.display = 'none';
    });
    if (backToTop) backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

    // Simple modal handling for privacy & disclaimer
    function openModal(id) {
        const m = document.getElementById(id);
        if (!m) return;
        m.style.display = 'flex';
        m.setAttribute('aria-hidden', 'false');
    }
    function closeModal(modal) {
        if (!modal) return;
        modal.style.display = 'none';
        modal.setAttribute('aria-hidden', 'true');
    }

    document.getElementById('view-privacy')?.addEventListener('click', (e) => { e.preventDefault(); openModal('modal-privacy'); });
    document.getElementById('view-disclaimer')?.addEventListener('click', (e) => { e.preventDefault(); openModal('modal-disclaimer'); });

    document.querySelectorAll('.modal .modal-close').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const modal = e.target.closest('.modal');
            closeModal(modal);
        });
    });

    // Close modals by clicking backdrop
    document.querySelectorAll('.modal').forEach(modal => {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal(modal);
        });
    });

    // ENQUIRY POPUP FUNCTIONALITY (REPLACED OLD SCROLL BEHAVIOR)
    const enquireButton = document.getElementById('inquire-now');
    const enquiryPopup = document.getElementById('enquiry-popup');
    const enquiryCloseBtn = document.getElementById('enquiry-popup-close');
    const enquiryCloseButton = document.getElementById('enquiry-close-btn');

    // Open popup when "Enquire" button is clicked
    if (enquireButton && enquiryPopup) {
        enquireButton.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior
            enquiryPopup.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        });
    }

    // Close popup function
    function closeEnquiryPopup() {
        if (enquiryPopup) {
            enquiryPopup.classList.remove('active');
            document.body.style.overflow = ''; // Restore scroll
        }
    }

    // Close popup when X button is clicked
    if (enquiryCloseBtn) {
        enquiryCloseBtn.addEventListener('click', closeEnquiryPopup);
    }

    // Close popup when "Got It" button is clicked
    if (enquiryCloseButton) {
        enquiryCloseButton.addEventListener('click', closeEnquiryPopup);
    }

    // Close popup when clicking outside the content
    if (enquiryPopup) {
        enquiryPopup.addEventListener('click', (e) => {
            if (e.target === enquiryPopup) {
                closeEnquiryPopup();
            }
        });
    }

    // Close popup with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && enquiryPopup && enquiryPopup.classList.contains('active')) {
            closeEnquiryPopup();
        }
    });

    // Header hide/show on scroll
    let lastScroll = 0;
    const header = document.querySelector('.nav-container');
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        if (currentScroll <= 0) {
            header.classList.remove('hidden');
            return;
        }
        
        if (currentScroll > lastScroll && currentScroll > 80) {
            // Scrolling down & past header
            header.classList.add('hidden');
        } else {
            // Scrolling up
            header.classList.remove('hidden');
        }
        lastScroll = currentScroll;
    });
});