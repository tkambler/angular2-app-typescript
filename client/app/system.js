System.config({
    'transpiler': 'typescript',
    'typescriptOptions': {
        'emitDecoratorMetadata': true
    },
    'packages': {
        'app': {
            'defaultExtension': 'ts'
        }
    }
});

System.import('app/boot')
    .then(null)
    .catch(console.error.bind(console));
