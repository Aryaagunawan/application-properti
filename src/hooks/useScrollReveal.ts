import { useEffect } from 'react';

export const useScrollReveal = (dependencies: any[] = []) => {
    useEffect(() => {
        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -100px 0px', // Trigger slightly before it hits the bottom
            threshold: 0.1, // Trigger when 10% is visible
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    // Optional: Stop observing once revealed so it doesn't animate out when scrolling up
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Re-query elements whenever dependencies change
        const elements = document.querySelectorAll('.reveal');
        elements.forEach((el) => observer.observe(el));

        return () => observer.disconnect();
    }, dependencies);
};