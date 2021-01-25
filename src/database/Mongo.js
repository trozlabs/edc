const mongodb = require('mongodb');
const { EventEmitter } = require('events');

class Mongo extends EventEmitter {
    static defaults = {
        url: 'mongodb://localhost:27017',
        database: 'test',
        options: {
            useNewUrlParser: true, 
            useUnifiedTopology: true 
        }
    }

    logging = true;
    database;
    url;
    
    #self;
    #cache = {
        // client: null,
        // db: null,
        // db.collection.name: null,
        // results: null,
    };

    constructor(database, url, options) {
        super();
        
        // check for dependencies
        try {
            if (!mongodb) mongodb = require('mongodb');
        } catch (e){
            console.error('mongodb required. `npm i --save mongodb`', e);
            throw e;
        }

        this.#self = this.constructor;
        this.#cache = new Map();

        this.url       = url      || this.#self.defaults.url;
        this.database  = database || this.#self.defaults.database;
        this.options   = options  || this.#self.defaults.options;
        
        this.client();
    }

    #log = function() {
        const args = Array.from(arguments)
        if (this.logging) console.log('MONGO:', this.database, ...args);
        return args;
    }

    cache(key, val) {
        if (!val) {
            this.#log(`getting '${key}' from cache.`);
            return this.#cache.get(key);
        }
        this.#log(this.#cache.has(key) ? 'updating' : 'saving ', key, 'to cache.');
        return this.#cache.set(key, val);
    }

    clearCache() {
        this.#log(`${this.constructor.name}.clearCache()`);
        
        return this.#cache.clear();
    }

    error(error) {
        this.emit('error', this, this.#log(error));
        return error;
    }

    close() {
        const db = this.cache('db');
        if (!db) return;
        db.close();
        this.emit('close', this);
    }

    async client() {
        this.#log(`${this.constructor.name}.db()`);
        try {
            const client = this.cache('client') || await mongodb.MongoClient.connect(this.url, this.options);
            this.emit('connection', this, client);
            this.cache('client', client);
            return client;
        } catch (e) {
            throw this.error(e);
        }
    }

    async db() {
        this.#log(`${this.constructor.name}.db()`);
        
        try {
            const client =  await this.client();
            const db = this.cache('db') || await client.db(this.database);
            this.emit('ready', this, client);
            this.cache('db', db);
            return db;
        } catch (e) {
            throw this.error(e);
        }
    }

    async collection(collectionName) {
        this.#log(`${this.constructor.name}.collection('${collectionName}')`);
        
        try {
            const namespace = this.database + '.' + collectionName;
            const db = await this.db();
            const collection = this.cache(namespace) || await db.collection(collectionName);
            this.cache(namespace, collection);
            return collection;
        } catch (e) {
            throw this.error(e);
        }
    }
    
    async search(collectionName, query) {
        this.#log(`${this.constructor.name}.search('${collectionName}', ${JSON.stringify(query)})`);
        
        const collection = await this.collection(collectionName);
        const results = await collection.find((query || {}));
        const records = await results.toArray();
        this.emit('search', this, records);
        return records;
    }

    async save(collectionName, record) {
        this.#log(`${this.constructor.name}.save('${collectionName}', ${JSON.stringify(record)})`);

        const query = { _id: (record.id || record._id || require('mongodb').ObjectID()) };
        const collection = await this.collection(collectionName);
        const results = await collection.updateOne(query, { $set: record }, { upsert: true });
        this.emit('save', this, results);
        if (results.result) return results.result;
        return results;
    }
}

module.exports = Mongo;

// (async function mongoExample () {
//     console.clear();

//     var records, results;
//     var db = new MongoDatabase('stax');

//     db.on('connection', (mongo, client) => console.log(' - on connection'));
//     db.on('ready', (mongo, db) => console.log(' - on ready'));
//     db.on('search', (mongo, results) => console.log(' - on search'));
//     db.on('save', (mongo, results) => console.log(' - on save'));
//     db.on('error', (mongo, error) => console.log(' - on error'));


//     records = await db.search('auth.sessions', { _id: 'qwNXZMEQ9VUXyGcubAAcg3A4K3pzUg9E' });
//     console.log('SEARCH:', records.length, records);

//     records = await db.search('auth.sessions');
//     console.log('SEARCH (empty query):', records.length, records);

//     // db.clearCache(); // optionally clear cache
//     const [ session ] = await db.search('auth.sessions', { _id: 'YpM_e-qIF5S9NbVah5l08h88uU6cG4o5' });
//     session.token = require('crypto').createHash('sha256').digest('hex');
//     results = await db.save('auth.sessions', session);
//     console.log('SAVE EXISTING:', results);

    // results = await db.save('auth.sessions', {
    //     token: require('crypto').createHash('sha256').digest('hex'),
    //     expires: new Date(Date.now() + 360000),
    //     authorized: true,
    //     data: {
    //         userId: require('mongodb').ObjectID(),
    //         email: 'shayne@trozdol.com',
    //     }
    // });
//     console.log('SAVE NEW:', results);
// })();

