const createTables = require('./create_table');
const createDefaultUser = require('./createDefaultUser');

console.log("Creating tables");
createTables().then(() => {
    console.log("Creating default user");
    createDefaultUser().then(() => {
        console.log("Finished the setup");
    });
});

