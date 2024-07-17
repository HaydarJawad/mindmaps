document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const mindmaps = document.querySelectorAll('.mindmaps');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            mindmaps.forEach(map => {
                if (map.id === category) {
                    map.style.display = 'flex';
                } else {
                    map.style.display = 'none';
                }
            });
        });
    });

    const mindmapImages = document.querySelectorAll('.mindmap img');
    mindmapImages.forEach(img => {
        img.addEventListener('click', () => {
            img.classList.toggle('full-size');
        });
    });
});
