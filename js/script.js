// toggle icon navbar
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// IntersectionObserver - catches sections even on very fast scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation when section enters view
            entry.target.classList.add('show-animate');

            // Update active nav link
            let id = entry.target.getAttribute('id');
            navLinks.forEach(link => link.classList.remove('active'));
            let activeLink = document.querySelector('header nav a[href*=' + id + ']');
            if (activeLink) activeLink.classList.add('active');

        } else if (entry.boundingClientRect.top > 0) {
            // Only remove animation for sections below viewport (not yet reached)
            entry.target.classList.remove('show-animate');
        }
    });
}, {
        threshold: 0,
        rootMargin: '0px 0px -50px 0px'  
});

sections.forEach(sec => observer.observe(sec));

// Keep your scroll for sticky header, footer, and navbar close
window.onscroll = () => {
    // sticky header
    let header = document.querySelector('header');
    header.classList.toggle('sticky', window.scrollY > 100);

    // remove toggle icon and navbar when scroll
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

    // animation footer on scroll
    let footer = document.querySelector('footer');
    footer.classList.toggle('show-animate', this.innerHeight + this.scrollY >= document.scrollingElement.scrollHeight);
}