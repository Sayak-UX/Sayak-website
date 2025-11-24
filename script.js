document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section');

    // Function to update active link based on scroll position
    const updateActiveLink = () => {
        let currentActive = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (pageYOffset >= sectionTop - sectionHeight / 3) {
                currentActive = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').includes(currentActive)) {
                link.classList.add('active');
            }
        });
    };

    // Set initial active link and update on scroll
    updateActiveLink();
    window.addEventListener('scroll', updateActiveLink);

    navLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });

            // Update active class immediately on click
            navLinks.forEach(link => link.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // New Theme Toggle
    const storageKey = 'theme-preference'

    const onClick = () => {
      // flip current value
      theme.value = theme.value === 'light'
        ? 'dark'
        : 'light'

      setPreference()
    }

    const getColorPreference = () => {
      if (localStorage.getItem(storageKey))
        return localStorage.getItem(storageKey)
      else
        return window.matchMedia('(prefers-color-scheme: dark)').matches
          ? 'dark'
          : 'light'
    }

    const setPreference = () => {
      localStorage.setItem(storageKey, theme.value)
      reflectPreference()
    }

    const reflectPreference = () => {
      document.firstElementChild
        .setAttribute('data-theme', theme.value)

      document
        .querySelector('#theme-toggle')
        ?.setAttribute('aria-label', theme.value)
    }

    const theme = {
      value: getColorPreference(),
    }

    // set early so no page flashes / CSS is made aware
    reflectPreference()

    window.onload = () => {
      // set on load so screen readers can see latest value on the button
      reflectPreference()

      // now this script can find and listen for clicks on the control
      document
        .querySelector('#theme-toggle')
        .addEventListener('click', onClick)
    }

    // sync with system changes
    window
      .matchMedia('(prefers-color-scheme: dark)')
      .addEventListener('change', ({matches:isDark}) => {
        theme.value = isDark ? 'dark' : 'light'
        setPreference()
      })
});

// PDF Modal Logic
document.addEventListener('DOMContentLoaded', () => {
    const pdfModal = document.getElementById('pdfModal');
    const pdfCloseButton = document.querySelector('.pdf-close-button');
    const pdfModalIframe = document.getElementById('pdfModalIframe');
    const pdfModalTitle = document.getElementById('pdfModalTitle');
    const portfolioItems = document.querySelectorAll('.portfolio-item[data-pdf-src]');

    portfolioItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent default link behavior if any

            const pdfSrc = item.getAttribute('data-pdf-src');
            const pdfTitle = item.getAttribute('data-pdf-title');

            if (pdfSrc) {
                pdfModalTitle.textContent = pdfTitle || 'PDF Document';
                pdfModalIframe.src = pdfSrc;
                pdfModal.style.display = 'flex'; // Show the modal
            }
        });
    });

    // Close the modal when the close button is clicked
    pdfCloseButton.addEventListener('click', () => {
        pdfModal.style.display = 'none';
        pdfModalIframe.src = ''; // Clear iframe src to stop PDF from loading in background
    });

    // Close the modal when clicking outside of the modal content
    window.addEventListener('click', (event) => {
        if (event.target == pdfModal) {
            pdfModal.style.display = 'none';
            pdfModalIframe.src = ''; // Clear iframe src
        }
    });
});

let innerCursor = document.querySelector(".inner-cursor");
let outerCursor = document.querySelector(".outer-cursor");

document.addEventListener("mousemove", moveCursor);

function moveCursor(e) {
    let x = e.clientX;
    let y = e.clientY;

    innerCursor.style.left = `${x}px`;
    innerCursor.style.top = `${y}px`;

    outerCursor.style.left = `${x}px`;
    outerCursor.style.top = `${y}px`;
}
