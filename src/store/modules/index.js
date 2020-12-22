const requireModule = require.context('.', true,  /^\.\/\w+\/index.js$/)
const modules = {}

requireModule.keys().forEach(filename => {
    modules[filename.split('/')[1]] = requireModule(filename).default || requireModule(filename)
})


export default modules
