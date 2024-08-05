export async function getData({idiomaBase, idiomaObjetivo, key}) {
    try {
        const response = await fetch("../data/escribir.json");
        const data = await response.json();

        let words = [];
        let dataBase = data[idiomaBase][key];
        let dataObjetivo = data[idiomaObjetivo][key];

        for (let i = 0; i < dataBase.length; i++) {
            words.push(new Word(dataBase[i], dataObjetivo[i]));
        }

        return words;
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

export async function getCategories({idiomaBase}) {
    try {
        const response = await fetch("../data/data/" + idiomaBase + ".json");
        const data = await response.json();
        const imgResponse = await fetch("../data/categories_images.json");
        const images = await imgResponse.json();
        let categories = [];

        Object.keys(data).forEach(element => {
            categories.push(new Category(element, data[element].categoryName, images[element]));
        });

        return categories;
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

export async function getConfig(){
    let config = { idiomaBase: "es", idiomaObjetivo: "fr" }
    let configRecuperado = JSON.parse(localStorage.getItem("config"));
    
    if (configRecuperado === null) {
        return config;
    } else {
        return configRecuperado;
    }
}

export async function getAudios({idiomaObjetivo, key}) {
    let dropboxBaseUrl = "https://www.dropbox.com/scl/fi/";

    try {
        const response = await fetch("../data/audio-links.json");
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();

        let audios = [];
        let listAudios = data[idiomaObjetivo][key];
        for (const audioKey in listAudios) {
            if (listAudios.hasOwnProperty(audioKey)) {
                let link = dropboxBaseUrl + listAudios[audioKey];
                audios.push(new Audio(audioKey, link));
            }
        }

        return audios;
    } catch (error) {
        console.error('Error al leer el archivo JSON:', error);
        throw error;
    }
}

export function getElement(element){
    return document.getElementById(element);
}

export function log(element){
    console.log(element);
}

/** Objetos **/
class Word {
    constructor(word, meaning) {
        this.word = word;
        this.meaning = meaning;
        this.correct = false;
    }
}

class Audio{
    constructor(name, link){
        this.name = name;
        this.link = link;
    }
}

class Category{
    constructor(id, name, img){
        this.id = id,
        this.name = name;
        this.img = img;
    }
}