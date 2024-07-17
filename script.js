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

    // Load the content of the selected mind map and update the URL
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
                    console.log(`Fetched data: ${data}`);
                    mindmapContent.innerHTML = data;
                    executeScripts(mindmapContent);
                    console.log(`Content loaded into mindmap-content div`);
                    history.pushState(null, '', file);
                })
                .catch(error => {
                    console.error(`Error loading mind map: ${error}`);
                    mindmapContent.innerHTML = `<p>Error loading mind map: ${error.message}</p>`;
                });
        });
    });

    function executeScripts(element) {
        const scripts = element.querySelectorAll('script');
        scripts.forEach(script => {
            const newScript = document.createElement('script');
            newScript.textContent = script.textContent;
            document.head.appendChild(newScript).parentNode.removeChild(newScript);
        });
    }
});
