document.getElementById('btnBuscar').addEventListener('click', function() {
    // Obtener el valor de búsqueda
    const query = document.getElementById('inputBuscar').value.trim();
    
    // Validar que haya texto para buscar
    if (query) {
        // Construir la URL de búsqueda
        const url = `https://images-api.nasa.gov/search?q=${encodeURIComponent(query)}`;

        // Hacer la solicitud al API de NASA
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(data => {
                // Limpiar el contenedor
                const contenedor = document.getElementById('contenedor');
                contenedor.innerHTML = '';

                // Mostrar los resultados
                if (data.collection.items.length > 0) {
                    data.collection.items.forEach(item => {
                        // Crear un contenedor para cada imagen
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'mb-4';

                        // Crear y agregar la imagen
                        const img = document.createElement('img');
                        img.src = item.links[0].href; // Asegúrate de que hay al menos un enlace
                        img.alt = item.data[0].title; // Título de la imagen
                        img.className = 'img-fluid'; // Clase de Bootstrap para la imagen
                        itemDiv.appendChild(img);

                        // Crear y agregar el título
                        const title = document.createElement('h5');
                        title.textContent = item.data[0].title || 'Sin título';
                        itemDiv.appendChild(title);

                        // Crear y agregar la descripción
                        const description = document.createElement('p');
                        description.textContent = item.data[0].description || 'Sin descripción disponible';
                        itemDiv.appendChild(description);

                        // Crear y agregar la fecha
                        const date = document.createElement('p');
                        date.textContent = item.data[0].date_created ? `Fecha: ${item.data[0].date_created}` : 'Fecha no disponible';
                        itemDiv.appendChild(date);

                        // Agregar el itemDiv al contenedor
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
