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

/** Objetos **/
class Word {
    constructor(word, meaning) {
        this.word = word;
        this.meaning = meaning;
        this.correct = false;
    }
}