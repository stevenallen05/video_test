import DS from 'ember-data';
const { Model, attr } = DS;

export default Model.extend({
  id: attr('string'),
  token: attr('string'),
  context: attr('raw'),
  location: attr('string'),
  alertSecurity: attr('boolean')
});
