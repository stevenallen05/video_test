import DS from 'ember-data';
const { Model, attr, belongsTo } = DS;

export default Model.extend({
  identityToken: attr('string'),
  videoConference: belongsTo('video-conference')
});
