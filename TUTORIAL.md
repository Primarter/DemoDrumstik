This tutorial assumes you know the basics of nuxtJS, and as such VueJS and JavaScript; especially about mixins and the static directory.  

Ce tutoriel part du principe que vous connaissez les bases de nuxtJS, par extension de VueJS et de JavaScript; particulièrement à propos des mixins et du répertoire static.
# Use native C code in NuxtJS:
- install emcc ([Emscripten documentation](https://emscripten.org/docs/getting_started/downloads.html "Emscripten documentation"))
- Write the functions you wish to import in a file.c **without any main function**
- Compile your files using this command-line:
```bash
emcc -O1 fichier.c -s WASM=1 -o fichier.wasm --no-entry -s "EXPORTED_FUNCTIONS=['_fonctionExportee']"
```
- move the created file.wasm in the static directory of your nuxt app
- create a new mixin (a simple .js file) in your mixins directory (create it if necessary)
- add this in the mixin:
```javascript
export default {
  methods: {
    async extractModule (module) {                            // async function to be able to wait for the wasm to be imported
      var importObject = {                                    // can be used to precise the imports
        imports: {}                                           // see the WebAssembly.instantiate doc
      };
      var wasmInstance = null;
      await fetch(module).then(response => {                  // fetch the file.wasm in the static directory
        if (response.ok)
            return response.arrayBuffer();                    // convert in a byte array for compiling
          throw new Error(`Unable to fetch WASM.`);
      }).then(bytes => {
        return WebAssembly.compile(bytes);
      }).then(module =>
        WebAssembly.instantiate(module, importObject)
      ).then(instance => {
        wasmInstance = instance.exports;                      // getting the imported functions
      });
      return wasmInstance;
    }
  },
}
```
[WebAssembly.instantiate Documentation](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WebAssembly/instantiate "WebAssembly.instantiate")
- integrate the mixin wherever you want, you can now use it as such:
```javascript
this.yourModule = await this.extractModule('file.wasm'); // give the name of the file or its path from the static directory, search about how servers work in nuxt to learn about how those paths work
this.yourModule.yourNativeFunction();
```

# Utiliser du code natif C avec NuxtJS :
- installer emcc ([documentation Emscripten](https://emscripten.org/docs/getting_started/downloads.html "documentation Emscripten"))
- écrire les fonctions que vous souhaitez importer dans un fichier.c **sans fonction main**
- compiler vos fichiers avec cette commande :
```bash
emcc -O1 fichier.c -s WASM=1 -o fichier.wasm --no-entry -s "EXPORTED_FUNCTIONS=['_fonctionExportee']"
```
- placer le fichier.wasm créé dans le répertoire static de l'application nuxt
- dans votre dossier mixins (créez-le au besoin au root de l'app), créez une nouvelle mixin (un fichier .js)
- dans ce fichier, ajoutez :
```javascript
export default {
  methods: {
    async extractModule (module) {                            // fonction async pour pouvoir attendre que celle-ci charge bien l'instance wasm
      var importObject = {                                    // permet de spécifier les imports particuliers à faire dans l'instance,
        imports: {}                                           // voir documentation de WebAssembly.instantiate
      };
      var wasmInstance = null;
      await fetch(module).then(response => {                  // on fetch le fichier se situant dans le répertoire static
        if (response.ok)
            return response.arrayBuffer();                    // on le transforme en UintArray pour la compilation
          throw new Error(`Unable to fetch WASM.`);
      }).then(bytes => {
        return WebAssembly.compile(bytes);
      }).then(module =>
        WebAssembly.instantiate(module, importObject)         // on instancie le WebAssembly
      ).then(instance => {
        wasmInstance = instance.exports;                      // on ne récupère que les fonctions exportées du fichier
      });
      return wasmInstance;
    }
  },
}
```
[Documentation WebAssembly.instantiate](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Objets_globaux/WebAssembly/instantiate "WebAssembly.instantiate")
- intégrez la mixin où vous le souhaitez et dans la fonction mounted correspondante (à laquelle on affectera le keyword async), vous pouvez désormais faire ceci :
```javascript
this.votreModule = await this.extractModule('fichier.wasm');
this.votreModule.vos_fonctions_natives();
```

