import {
    createRxDatabase,
    addRxPlugin,
    RxDocument,
    RxCollection,
    RxDatabase,
    RxJsonSchema
} from 'rxdb';
import pouchdbAdapter from 'pouchdb-adapter-idb';
addRxPlugin(pouchdbAdapter);

debugger;
const createDb = () => new Promise<MyDatabase>(async function (resolve) {
    debugger;

    const heroSchema: RxJsonSchema<Hero> = {
        title: 'hero schema',
        description: 'describes a simple hero',
        version: 0,
        type: 'object',
        properties: {
            passportId: {
                type: 'string',
                primary: true
            },
            firstName: {
                type: 'string'
            },
            lastName: {
                type: 'string'
            },
            age: {
                type: 'integer'
            }
        },
        required: ['firstName', 'lastName']
    };

    const db = await createRxDatabase<MyDatabaseCollections>({
        name: 'heroesdb',
        adapter: 'idb',
    });

    db.addCollections({
        humans: {
            schema: heroSchema,
            methods: heroDocMethods,
            statics: heroCollectionMethods
        }
    }).then(_ => resolve(db));
});


interface IRepo {
    create(): unknown
}

type Hero = {
    passportId: string;
    firstName: string;
    lastName: string;
    age?: number; // optional
};

type HeroDocMethods = {
    scream: (v: string) => string;
};

type HeroDocument = RxDocument<Hero, HeroDocMethods>;


// we declare one static ORM-method for the collection
type HeroCollectionMethods = {
    countAllDocuments: () => Promise<number>;
}

// and then merge all our types
type HeroCollection = RxCollection<Hero, HeroDocMethods, HeroCollectionMethods>;

type MyDatabaseCollections = {
    heroes: HeroCollection
}

type MyDatabase = RxDatabase<MyDatabaseCollections>;

const heroDocMethods: HeroDocMethods = {
    scream: function (this: HeroDocument, what: string) {
        return this.firstName + ' screams: ' + what.toUpperCase();
    }
};

const heroCollectionMethods: HeroCollectionMethods = {
    countAllDocuments: async function (this: HeroCollection) {
        const allDocs = await this.find().exec();
        return allDocs.length;
    }
};

// @ts-ignore
class Repo<T> implements IRepo {
    // @ts-ignore
    constructor(private repo: string) { }

    public create(): unknown {
        return 'hey there';
    }
}

createDb().then(x => {
    (window as any).db = {
        rxdb: x,
        repos: {
            heros: new Repo<Hero>('hero')
        }
    }
    // @ts-ignore
    console.log(window.db);
})