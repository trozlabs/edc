const { readdirSync, statSync } = require('fs');
const { resolve, parse } = require('path');

module.exports = tree;

/**
 * Read a file system and gather info about each file in a Map or Array of Objects 
 * containing data about each file.
 * 
 * @example
 *  tree('../').then(map => {
 *      console.log(map);
 *  });
 * 
 * @example
 *  tree('.', {
 *      ignore: ['node_modules'],
 *      toArray: true,
 *      maxDepth: 3
 *  }).then(array => {
 *     console.log(array);
 *  });
 * 
 * @param {string} path - the path root to start reading.
 * @param {Object} opts - optional: { toArray: false, maxDepth: 5, ignore: [] }] opts - toArray and maxDepth settings
 * @returns {Promise} Map by default or Array if toArray is true
 */
async function tree(path = '.', opts = {}) {
    path = resolve(path);
    opts = Object.assign({ toArray: false, depth: 1, maxDepth: 5, ignore: [] }, opts);

    const list = opts.toArray ? [] : new Map();
    const currentDepth = opts.depth;
    const maxDepthReached = (opts.depth >= opts.maxDepth);

    opts.depth++;

    try {
        var index = 0;
        const files = await readdirSync(path);
        
        for (const file of files) {
            if (opts.ignore.includes(file)) continue;

            const full  = resolve(path, file);
            const stats = await statSync(full);
            const isDir = stats.isDirectory();
            const children = isDir && !maxDepthReached ? await tree(full, opts) : null;
            const meta = Object.assign({}, stats, parse(full), {
                index: index++,
                depth: currentDepth,
                type: isDir ? 'directory' : 'file',
                pathname: full,
            }, (isDir ? {
                total: children ? (children.size || children.length) : 0,
                files: children
            } : {}));
            
            if (opts.toArray) {
                list.push(meta);
            } else {
                list.set(file, meta);
            }
        }
    } catch(e) {
        console.error('Error:', e.message);
    }
    
    return list;
}
