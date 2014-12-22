define([
  'intern!bdd',
  'intern/chai!expect',
  'platform/ultralight-platform.min',
  'customelement/<%= elementName %>.min'
], function(bdd, expect, platform, element) {
  var describe = bdd.describe.bind(bdd)
  var it = bdd.it.bind(bdd)

  describe('<%= elementName %>', function() {
    it('should exist', function() {
      expect(element).to.exist
    })
  })

})
