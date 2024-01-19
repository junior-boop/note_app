import localforage from 'localforage';

localforage.config({
    driver: localforage.INDEXEDDB,
    name: 'noteapp-database',
    version : 3
});

export const getData = async (idnote) => {
    let result = []
    await localforage.getItem(idnote, (err, value) => {
        if(err) console.log(err)
        console.log(value)
        result.push(value)
    })
} 

export const setData = (idnote, value) => {
    let result = []
    localforage.setItem(idnote, value).then( response => {
        result.push(response)
    })

    return result
}

export const getAllData = () => {
    localforage.iterate(function(value, key, iterationNumber) {
        // Resulting key/value pair -- this callback
        // will be executed for every item in the
        // database.
        console.log([key, value]);
    }).then(function() {
        console.log('Iteration has completed');
    }).catch(function(err) {
        // This code runs if there were any errors
        console.log(err);
    });
}