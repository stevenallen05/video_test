import DS from 'ember-data';
const { Model, attr, hasMany } = DS;

export default Model.extend({
  context: attr('raw'),
  location: attr('string'),
  conferenceParticipants: hasMany('conference-participant'),
});
