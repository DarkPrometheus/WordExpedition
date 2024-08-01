export async function getData({idiomaBase, idiomaObjetivo, key}) {
    return new Promise((resolve, reject) => {
        fetch("../data/write.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let words = [];

                let dataBase = data[idiomaBase][key];
                let dataObjetivo = data[idiomaObjetivo][key];

                for (let i = 0; i < dataBase.length; i++) {
                    words.push(new Word(dataBase[i], dataObjetivo[i]));
                }

                resolve(words);
            })
            .catch(error => {
                console.error('Error al leer el archivo JSON:', error);
                reject(error);
            });
    });
}

export async function getCategories({idiomaBase}) {
    return new Promise((resolve, reject) => {
        fetch("../data/categories.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let categories = [];
                data.es.forEach(element =>{
                    categories.push({id: element.toLowerCase(), nombre: ""})
                })
                for (let i = 0; i < categories.length; i++) {
                    const element = categories[i];
                    element.nombre = data[idiomaBase][i]
                }
                
                resolve(categories);
            })
            .catch(error => {
                console.error('Error al leer el archivo JSON:', error);
                reject(error);
            });
    });
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

export function getAudios({idiomaObjetivo, key}){
    console.log(key)
    let dropboxBaseUrl = "https://www.dropbox.com/scl/fi/"

    return new Promise((resolve, reject) => {
        fetch("../data/audio-links.json")
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                let audios = [];
                let listAudios = data[idiomaObjetivo][key];
                for (const key in listAudios) {
                    if (listAudios.hasOwnProperty(key)) {
                        let link = dropboxBaseUrl + listAudios[key];
                        //let link = listAudios[key];
                        audios.push(new Audio(key, link))
                    }
                }

                resolve(audios);
            })
            .catch(error => {
                console.error('Error al leer el archivo JSON:', error);
                reject(error);
            });
    });
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