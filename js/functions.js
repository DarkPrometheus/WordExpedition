function redirectPage(id) {
    switch (id) {
        case "escribir":
            window.location.href = "./html/escribir.html";
            break;
        case "repaso":
            window.location.href = "./html/repaso.html";
            break;
        default:
            console.log("ID no reconocido");
    }
}

function fillCategories(categories, getData, config, loadData){
    const categoriesDiv = document.getElementById('categories');

    categories.forEach(categorie =>{
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('element');
        elementDiv.id = categorie.id

        const img = document.createElement('img');
        img.id = categorie.id;
        img.src = "../img/categories/" + categorie.id + ".svg"
        console.log(categorie.id)

        const p = document.createElement('p');
        p.id = categorie.id;
        p.textContent = categorie.nombre

        elementDiv.addEventListener('click', async function (event) {
            config.key = event.srcElement.id
            console.log(event.srcElement)

            let dataToFiil = await getData(config);
            categoriesDiv.remove()
            loadData(dataToFiil)
        });

        elementDiv.appendChild(img);
        elementDiv.appendChild(p);
        categoriesDiv.appendChild(elementDiv);
    });
}

function setFlag(idiomaObjetivo) {
    switch (idiomaObjetivo) {
        case "es":
            imgConfig.src = "../img/flags/es.png"
            break;
        case "en":
            imgConfig.src = "../img/flags/uk.png"
            break;
        case "fr":
            imgConfig.src = "../img/flags/fr.png"
            break;
        case "ru":
            imgConfig.src = "../img/flags/ru.png"
            break;
        default:
            break;
    }
}

function setFlagHome(idiomaObjetivo) {
    switch (idiomaObjetivo) {
        case "es":
            imgConfig.src = "./img/flags/es.png"
            break;
        case "en":
            imgConfig.src = "./img/flags/uk.png"
            break;
        case "fr":
            imgConfig.src = "./img/flags/fr.png"
            break;
        case "ru":
            imgConfig.src = "./img/flags/ru.png"
            break;
        default:
            break;
    }
}