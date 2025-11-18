/**
 * Usaid Hussain Portfolio JavaScript
 *
 * This script provides dynamic interactions for the portfolio website,
 * including a typewriter effect for the hero subtitle and a subtle
 * fade-in animation for sections when they scroll into view.
 */

document.addEventListener('DOMContentLoaded', () => {
    // ------------------------------------------------------------------
    // 1. Typewriter Effect for Hero Subtitle
    // ------------------------------------------------------------------

    const subtitleElement = document.querySelector('.hero-content p');
    if (subtitleElement) {
        const textToType = subtitleElement.textContent.trim();
        subtitleElement.textContent = ''; // Clear the text initially
        
        let charIndex = 0;
        const typingSpeed = 50; // milliseconds per character

        function typeWriter() {
            if (charIndex < textToType.length) {
                // Add the next character
                subtitleElement.textContent += textToType.charAt(charIndex);
                charIndex++;
                setTimeout(typeWriter, typingSpeed);
            }
        }

        // Start the effect after a brief delay
        setTimeout(typeWriter, 500); 
    }


    // ------------------------------------------------------------------
    // 2. Scroll-In Animation (Intersection Observer)
    // ------------------------------------------------------------------

    // Select all sections that should animate when visible
    const sectionsToAnimate = document.querySelectorAll('.portfolio-section');
    
    // Configuration options for the observer
    const observerOptions = {
        root: null, // relative to the viewport
        rootMargin: '0px',
        threshold: 0.2 // trigger when 20% of the section is visible
    };

    /**
     * Callback function for the IntersectionObserver.
     * @param {IntersectionObserverEntry[]} entries - Array of observed elements' state.
     */
    const observerCallback = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The element is now visible, add the class to trigger CSS animation
                entry.target.classList.add('is-visible');
                // Optional: Stop observing the element after it has become visible
                observer.unobserve(entry.target); 
            }
        });
    };

    // Create the IntersectionObserver instance
    const sectionObserver = new IntersectionObserver(observerCallback, observerOptions);

    // Attach the observer to each section
    sectionsToAnimate.forEach(section => {
        section.classList.add('scroll-animate'); // Add base class for hidden state
        sectionObserver.observe(section);
    });
});
