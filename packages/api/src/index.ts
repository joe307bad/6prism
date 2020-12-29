import { appSchema, tableSchema } from '@nozbe/watermelondb'
import { Database, Model } from '@nozbe/watermelondb'
import LokiJSAdapter from '@nozbe/watermelondb/adapters/lokijs'
import { BelongsToAssociation, HasManyAssociation } from '@nozbe/watermelondb/Model'

class Post extends Model {
    static table = 'posts'
    static associations = {
        comments: { type: 'has_many', foreignKey: 'post_id' } as HasManyAssociation,
    }
}

class Comment extends Model {
    static table = 'comments'
    static associations = {
        posts: { type: 'belongs_to', key: 'post_id' } as BelongsToAssociation,
    }
}

const schema = appSchema({
    version: 1,
    tables: [
        tableSchema({
            name: 'posts',
            columns: [
                { name: 'title', type: 'string' },
                { name: 'subtitle', type: 'string', isOptional: true },
                { name: 'body', type: 'string' },
                { name: 'is_pinned', type: 'boolean' },
            ]
        }),
        tableSchema({
            name: 'comments',
            columns: [
                { name: 'body', type: 'string' },
                { name: 'post_id', type: 'string', isIndexed: true },
            ]
        }),
    ]
})

// import Post from './model/Post' // ⬅️ You'll import your Models here

// First, create the adapter to the underlying database:
const adapter = new LokiJSAdapter({
    dbName: 'WatermelonDemo',
    schema: schema,
    useIncrementalIndexedDB: true,
    useWebWorker: false
})

// Then, make a Watermelon database from it!
const database = new Database({
    adapter,
    modelClasses: [Post, Comment],
    actionsEnabled: true,
})

debugger;
console.log(database);