import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Controller | conference-participant', function(hooks) {
  setupTest(hooks);

  // Replace this with your real tests.
  test('it exists', function(assert) {
    let controller = this.owner.lookup('controller:conference-participant');
    assert.ok(controller);
  });
});
