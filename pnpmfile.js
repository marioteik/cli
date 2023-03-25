module.exports = {
    hooks: {
        readPackage: (pkg) => {
            pkg.bin = './dist/index.js';
            return pkg;
        }
    }
};
