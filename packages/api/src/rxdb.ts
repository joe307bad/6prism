import {
    createRxDatabase,
    addRxPlugin
} from 'rxdb';
import pouchdbAdapter from 'pouchdb-adapter-idb';
addRxPlugin(pouchdbAdapter);

debugger;
const createDb = () => new Promise(async (resolve: any) => {

    const heroSchema = {
        title: 'hero schema',
        description: 'describes a simple hero',
        version: 0,
        type: 'object',
        properties: {
            name: {
                type: 'string',
                primary: true
            },
            color: {
                type: 'string'
            }
        },
        required: ['color']
    };

    const db = await createRxDatabase({
        name: 'heroesdb',
        adapter: 'idb',
    });

    db.addCollections({
        humans: {
            schema: heroSchema,
        }
    }).then(resolve)
});

interface IRepo {
    create(): unknown
}

interface Hero {
    name: string;
    color: string;
}

// @ts-ignore
class Repo<T> implements IRepo {
    // @ts-ignore
    constructor(private repo: string) { }

    public create(): unknown {
        return 'hey there';
    }
}

const repos = () => createDb().then(_ => ({
    heros: new Repo<Hero>('hero')
}))

repos().then(x => {
    (window as any).db = x;
    console.log(x)
})