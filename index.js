/* eslint-disable */

console.log("stuff");
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RiNTk0MzEwZjUyODQyOTI2NDUzYTIzZGNiNjJkODIwLTE1NzQwMzk4ODEiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJndWVzdCIsInZpZGVvIjp7InJvb20iOiJiZTEyMzg3Yy02NTJhLTQ4ZDUtYmZhNi01NTZkZGNiMDkzMWQifX0sImlzcyI6IlNLZGI1OTQzMTBmNTI4NDI5MjY0NTNhMjNkY2I2MmQ4MjAiLCJuYmYiOjE1NzQwMzk4ODEsImV4cCI6MTU3NDA0MzQ4MSwic3ViIjoiQUNhYjNjMTY1ZDBhZjM2NTM0Mjc2ZmM4NDQwNDQwN2YwNCJ9.WmmHegR85CFhKpTbxCiGkQEDCpK9zV54vH0GKrNwxDs";
const { connect, createLocalTracks } = require('twilio-video');

M.AutoInit();

createLocalTracks({
  audio: true,
  video: { height: 720 }
}).then(localTracks => {
  const localMediaContainer = document.getElementById('local-media');
  localMediaContainer.appendChild(localTracks[1].attach());

  return connect(token, {
    tracks: localTracks
  });
}).then(room => {
  console.log(`Connected to Room: ${room.name}`);

  room.on('participantConnected', participant => {
    console.log(`A remote Participant connected: ${participant}`);
  });

  room.on('disconnected', room => {
    // Detach the local media elements
    room.localParticipant.tracks.forEach(publication => {
      const attachedElements = publication.detach();
      attachedElements.forEach(element => element.remove());
      publication.disable();
    });
  });

  document.getElementById('btnDisconnect').onclick = function(){
    room.disconnect();
    return false;
  };
});
