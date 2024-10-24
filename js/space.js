document.getElementById('btnBuscar').addEventListener('click', function() {
    const query = document.getElementById('inputBuscar').value.trim();
    
    if (query) {
        const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;

        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(data => {
                const contenedor = document.getElementById('contenedor');
                contenedor.innerHTML = '';

                if (data.collection.items.length > 0) {
                    data.collection.items.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'mb-4';

                        const img = document.createElement('img');
                        
                        // Verificar si hay enlaces
                        if (item.links && item.links.length > 0) {
                            img.src = item.links[0].href;
                            console.log('URL de imagen:', img.src);
                        } else {
                            img.src = 'ruta/a/imagen/por/defecto.jpg'; // Imagen por defecto
                        }
                        
                        img.alt = item.data[0].title || 'Sin título';
                        img.className = 'img-fluid';
                        itemDiv.appendChild(img);

                        const title = document.createElement('h5');
                        title.textContent = item.data[0].title || 'Sin título';
                        itemDiv.appendChild(title);

                        const description = document.createElement('p');
                        description.textContent = item.data[0].description || 'Sin descripción disponible';
                        itemDiv.appendChild(description);

                        const date = document.createElement('p');
                        date.textContent = item.data[0].date_created ? `Fecha: ${item.data[0].date_created}` : 'Fecha no disponible';
                        itemDiv.appendChild(date);

                        contenedor.appendChild(itemDiv);
                    });
                } else {
                    contenedor.innerHTML = '<p>No se encontraron imágenes.</p>';
                }
            })
            .catch(error => {
                console.error('Error:', error);
                const contenedor = document.getElementById('contenedor');
                contenedor.innerHTML = '<p>Error al obtener los datos. Inténtalo de nuevo más tarde.</p>';
            });
    } else {
        alert('Por favor, ingresa un término de búsqueda.');
    }
});

