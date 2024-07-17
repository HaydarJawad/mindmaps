document.addEventListener('DOMContentLoaded', () => {
    const categories = {
        iot: 'IoT'
    };

    const mainContent = document.getElementById('main-content');
    const mindmapContent = document.getElementById('mindmap-content');
    const links = document.querySelectorAll('nav ul li a');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = link.getAttribute('data-category');
            generateMindMaps(category);
        });
    });

    const generateMindMaps = (category) => {
        mainContent.innerHTML = '';
        const mindmapContainer = document.createElement('div');
        mindmapContainer.classList.add('mindmaps');

        for (let i = 1; i <= 10; i++) {
            const file = `${category}-mindmap${i}.html`;
            fetch(file, { method: 'HEAD' })
                .then(response => {
                    if (response.ok) {
                        const mindmapDiv = document.createElement('div');
                        mindmapDiv.classList.add('mindmap');
                        const mindmapLink = document.createElement('a');
                        mindmapLink.href = '#';
                        mindmapLink.setAttribute('data-file', file);
                        mindmapLink.textContent = file.replace('.html', '').replace('-', ' ');
                        mindmapDiv.appendChild(mindmapLink);
                        mindmapContainer.appendChild(mindmapDiv);

                        mindmapLink.addEventListener('click', (e) => {
                            e.preventDefault();
                            loadMindMap(file);
                        });
                    }
                });
        }

        mainContent.appendChild(mindmapContainer);
    };

    const loadMindMap = (file) => {
        fetch(file)
            .then(response => response.text())
            .then(data => {
                mindmapContent.innerHTML = data;
            })
            .catch(error => {
                mindmapContent.innerHTML = `<p>Error loading mind map: ${error}</p>`;
            });
    };
});
