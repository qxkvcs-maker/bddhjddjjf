async function init() {
    const response = await fetch('bunkers.json');
    const bunkers = await response.json();

    // Генерация больших карточек
    const list = document.getElementById('bunkers-list');
    bunkers.forEach((bunker, i) => {
        const card = document.createElement('div');
        card.className = 'bunker-card';
        card.style.animationDelay = `${i * 0.1}s`;
        card.innerHTML = `
            <h3>${bunker.name}</h3>
            <p>${bunker.description}</p>
            <button onclick="openYandexMap(${bunker.coords[0]}, ${bunker.coords[1]})">Яндекс.Карты</button>
            <button onclick="openGoogleMap(${bunker.coords[0]}, ${bunker.coords[1]})">Google Maps</button>
        `;
        list.appendChild(card);
    });

    // Генерация мини-плашек под картой
    const miniList = document.getElementById('mini-list');
    bunkers.forEach((bunker, i) => {
        const miniCard = document.createElement('div');
        miniCard.className = 'mini-card';
        miniCard.style.animationDelay = `${i * 0.05}s`;
        miniCard.innerHTML = `
            <b>${bunker.name}</b><br>
            ${bunker.description}<br>
            Координаты: ${bunker.coords[0].toFixed(6)}, ${bunker.coords[1].toFixed(6)}<br>
            <button onclick="openYandexMap(${bunker.coords[0]}, ${bunker.coords[1]})">Яндекс</button>
            <button onclick="openGoogleMap(${bunker.coords[0]}, ${bunker.coords[1]})">Google</button>
        `;
        miniList.appendChild(miniCard);
    });

    // Яндекс-Карта
    ymaps.ready(() => {
        const map = new ymaps.Map("map", {
            center: [55.987414, 37.153081],
            zoom: 17,
            controls: ['zoomControl', 'typeSelector']
        });

        bunkers.forEach(bunker => {
            const placemark = new ymaps.Placemark(bunker.coords, {
                balloonContent: `<b>${bunker.name}</b><br>${bunker.description}`
            }, {
                preset: 'islands#redIcon'
            });
            map.geoObjects.add(placemark);
        });

        window.openYandexMap = (lat, lon) => {
            window.open(`https://yandex.ru/maps/?rtext=${lat},${lon}&rtt=auto`, '_blank');
        };
        window.openGoogleMap = (lat, lon) => {
            window.open(`https://www.google.com/maps/search/?api=1&query=${lat},${lon}`, '_blank');
        };
    });
}

init();