Component({
  options: {
    addGlobalClass: true
  },

  properties: {
    info: {
      type: Object
    },
    show: Boolean
  },


  data: {

  },

  methods: {
    close: function () {
      this.triggerEvent('close')
    }
  }
})