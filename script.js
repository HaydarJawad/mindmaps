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

    // Load the content of the selected mind map
    const mindmapLinks = document.querySelectorAll('.mindmap a');
    mindmapLinks.forEach(mindmapLink => {
        mindmapLink.addEventListener('click', (e) => {
            e.preventDefault();
            const file = mindmapLink.getAttribute('data-file');
            console.log(`Mindmap file clicked: ${file}`);
            fetch(file)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`Network response was not ok: ${response.statusText}`);
                    }
                    return response.text();
                })
                .then(data => {
                    mindmapContent.innerHTML = data;
                })
                .catch(error => {
                    console.error(`Error loading mind map: ${error}`);
                    mindmapContent.innerHTML = `<p>Error loading mind map: ${error.message}</p>`;
                });
        });
    });
});
