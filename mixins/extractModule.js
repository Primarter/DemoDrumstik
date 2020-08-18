export default {
  methods: {
    async extractModule (module) {
      var importObject = {
        imports: { imported_func: arg => console.log(arg) }
      };
      let wasmModule = fetch(module).then(response =>
        response.arrayBuffer()
      ).then(bytes =>
        WebAssembly.instantiate(bytes, importObject)
      )
      return wasmModule.exports
    }
  },
}