import localforage from 'localforage';

localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'noteapp-database',
    version : 3
});

export const setData = (idnote, value) => {
    let result = []
    localforage.setItem(idnote, value).then( response => {
        result.push(response)
    })

    return result
}

export const getData = async (key) => await localforage.getItem(key)

export const allKeys = await localforage.keys()




