import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | video_conferences', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:video-conferences');
    assert.ok(route);
  });
});
