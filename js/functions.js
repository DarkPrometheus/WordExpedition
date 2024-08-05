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

function fillCategories(categories, config, loadData){
    const categoriesDiv = document.getElementById('categories');

    categories.forEach(categorie =>{
        const elementDiv = document.createElement('div');
        elementDiv.classList.add('element');
        elementDiv.id = categorie.id;

        const img = document.createElement('img');
        img.src = "../img/categories/" + categorie.img;
        img.id = categorie.id;

        const p = document.createElement('p');
        p.textContent = categorie.name;
        p.id = categorie.id;

        elementDiv.addEventListener('click', async function (event) {
            let key = event.srcElement.id;

            const responseObjetivo = await fetch("../data/data/" + config.idiomaObjetivo + ".json");
            const dataObjetivo = await responseObjetivo.json();

            const responseBase = await fetch("../data/data/" + config.idiomaBase + ".json");
            const dataBase = await responseBase.json();

            let words = [];
            for (let i = 0; i < dataBase[key].data.length; i++) {
                words.push(new Word(dataBase[key].data[i], dataObjetivo[key].data[i]));
            }

            categoriesDiv.remove()
            loadData(words)
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

async function getPageText(config, idPage) {
    let lg = config.idiomaBase;

    try {
        const response = await fetch("../data/translations.json");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        let text = data[lg][idPage];
        return text;
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
    }
}

class Word {
    constructor(word, meaning) {
        this.word = word;
        this.meaning = meaning;
        this.correct = false;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}