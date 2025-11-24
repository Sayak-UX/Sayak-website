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
