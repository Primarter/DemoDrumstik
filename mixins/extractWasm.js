export default {
  methods: {
    async extractModule (module) {
      // var importObject = {
      //   imports: {}
      // };
      // var wasmInstance = null;
      // await fetch(module).then(response => {
      //   if (response.ok)
      //       return response.arrayBuffer();
      //     throw new Error(`Unable to fetch WASM.`);
      // }).then(bytes => {
      //   return WebAssembly.compile(bytes);
      // }).then(module =>
      //   WebAssembly.instantiate(module, importObject)
      // ).then(instance => {
      //   wasmInstance = instance.exports;
      // });
      // return wasmInstance;
    }
  },
}