import DS from 'ember-data';
import { underscore } from '@ember/string';
import { pluralize } from 'ember-inflector';

export default DS.JSONAPIAdapter.extend({
  host: "https://ec0e0849.ngrok.io",
  pathForType(type) {
    return pluralize(underscore(type));
  }
});