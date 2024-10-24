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
                    const row = document.createElement('div');
                    row.className = 'row';

                    data.collection.items.forEach(item => {
                        const itemDiv = document.createElement('div');
                        itemDiv.className = 'col-md-4 mb-4';

                        // Crear la tarjeta
                        const card = document.createElement('div');
                        card.className = 'card'; // Este es el contenedor principal de la tarjeta

                        // Crear la navbar
                        const navbar = document.createElement('div');
                        navbar.className = 'card-header'; // Aquí se añade la clase para la navbar
                        navbar.innerHTML = `
                            <nav class="navbar navbar-light bg-light">
                                <a class="navbar-brand" href="#content-${item.data[0].nasa_id}">${item.data[0].title || 'Sin título'}</a>
                            </nav>
                        `;
                        card.appendChild(navbar);

                        // Crear el carrusel
                        const carousel = document.createElement('div');
                        carousel.className = 'carousel slide';
                        carousel.setAttribute('data-ride', 'carousel');

                        const carouselInner = document.createElement('div');
                        carouselInner.className = 'carousel-inner';

                        // Crear el contenido del carrusel
                        if (item.links && item.links.length > 0) {
                            item.links.forEach((link, index) => {
                                const carouselItem = document.createElement('div');
                                carouselItem.className = index === 0 ? 'carousel-item active' : 'carousel-item';

                                const img = document.createElement('img');
                                img.src = link.href;
                                img.className = 'd-block w-100'; // Imagen ocupa todo el ancho
                                img.alt = item.data[0].title || 'Sin título';

                                carouselItem.appendChild(img);
                                carouselInner.appendChild(carouselItem);
                            });
                        }

                        carousel.appendChild(carouselInner);
                        card.appendChild(carousel);

                        // Crear el cuerpo de la tarjeta
                        const cardBody = document.createElement('div');
                        cardBody.className = 'card-body';
                        cardBody.setAttribute('id', `content-${item.data[0].nasa_id}`); // ID único para ScrollSpy

                        const title = document.createElement('h5');
                        title.className = 'card-title';
                        title.textContent = item.data[0].title || 'Sin título';
                        cardBody.appendChild(title);

                        const description = document.createElement('p');
                        description.className = 'card-text';
                        description.textContent = item.data[0].description || 'Sin descripción disponible';
                        cardBody.appendChild(description);

                        const date = document.createElement('p');
                        date.className = 'card-text';
                        date.textContent = item.data[0].date_created ? `Fecha: ${item.data[0].date_created}` : 'Fecha no disponible';
                        cardBody.appendChild(date);

                        card.appendChild(cardBody);
                        itemDiv.appendChild(card);
                        row.appendChild(itemDiv);
                    });

                    contenedor.appendChild(row);
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
