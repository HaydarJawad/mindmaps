document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('nav ul li a');
    const mindmaps = document.querySelectorAll('.mindmaps');
    const mindmapContent = document.getElementById('mindmap-content');

    // Show the correct mind maps based on the category selected
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            console.log(`Category clicked: ${category}`);
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

    // Open the selected mind map in a new browser window/tab
    const mindmapLinks = document.querySelectorAll('.mindmap a');
    mindmapLinks.forEach(mindmapLink => {
        mindmapLink.addEventListener('click', (e) => {
            e.preventDefault();
            const file = mindmapLink.getAttribute('data-file');
            console.log(`Mindmap file clicked: ${file}`);
            const newWindow = window.open(file, '_blank');
            if (newWindow) {
                newWindow.focus();
            } else {
                alert('Please allow popups for this website');
            }
        });
    });
});
