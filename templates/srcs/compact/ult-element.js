var element = document.registerElement('<%= elementName %>', {
  prototype: Object.create(HTMLElement.prototype, {
    createdCallback: {
      value: function() {

      }
    },
    attachedCallback: {
      value: function() {

      }
    },
    detachedCallback: {
      value: function() {

      }
    },
    attributeChangedCallback: {
      value: function(attrName, oldVal, newVal) {

      }
    }
  })
})

module.exports = element
