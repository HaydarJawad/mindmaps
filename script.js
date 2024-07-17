document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const mindmaps = document.querySelectorAll('.mindmaps');
    const mindmapContent = document.getElementById('mindmap-content');

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
            mindmapContent.innerHTML = '';
        });
    });

    const mindmapLinks = document.querySelectorAll('.mindmap a');
    mindmapLinks.forEach(mindmapLink => {
        mindmapLink.addEventListener('click', (e) => {
            e.preventDefault();
            const file = mindmapLink.getAttribute('data-file');
            fetch(file)
                .then(response => response.text())
                .then(data => {
                    mindmapContent.innerHTML = data;
                })
                .catch(error => {
                    mindmapContent.innerHTML = `<p>Error loading mind map: ${error}</p>`;
                });
        });
    });
});
