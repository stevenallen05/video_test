/* eslint-disable */

console.log("stuff");
var token = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIn0.eyJqdGkiOiJTS2RiNTk0MzEwZjUyODQyOTI2NDUzYTIzZGNiNjJkODIwLTE1NzQwNDM2MTYiLCJncmFudHMiOnsiaWRlbnRpdHkiOiJndWVzdCIsInZpZGVvIjp7InJvb20iOiJlNjJkZWIzMC05OWNiLTQ0YzMtODlkMi05M2I4ZDgyZDc5YjkifX0sImlzcyI6IlNLZGI1OTQzMTBmNTI4NDI5MjY0NTNhMjNkY2I2MmQ4MjAiLCJuYmYiOjE1NzQwNDM2MTYsImV4cCI6MTU3NDA0NzIxNiwic3ViIjoiQUNhYjNjMTY1ZDBhZjM2NTM0Mjc2ZmM4NDQwNDQwN2YwNCJ9.DS7weE4noOeyXXKGLlt25FStWLm7fgaalwULKUOjT9Q";
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

  room.participants.forEach(participant => {
    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        const track = publication.track;
        document.getElementById('remote-media').appendChild(track.attach());
      }
    });
  
    participant.on('trackSubscribed', track => {
      document.getElementById('remote-media').appendChild(track.attach());
    });
  });

  room.on('disconnected', room => {
    // Detach the local media elements
    room.localParticipant.tracks.forEach(publication => {
      const attachedElements = publication.detach();
      attachedElements.forEach(element => element.remove());
      publication.disable();
    });

    room.participants.forEach(participant => {
      participant.localTracks.forEach(publication => {
        const attachedElements = publication.detach();
        attachedElements.forEach(element => element.remove());
        publication.disable();
      })
    });
  });

  room.on('participantConnected', participant => {
    console.log(`Participant "${participant.identity}" connected`);
  
    participant.tracks.forEach(publication => {
      if (publication.isSubscribed) {
        const track = publication.track;
        document.getElementById('remote-media').appendChild(track.attach());
      }
    });
  
    participant.on('trackSubscribed', track => {
      document.getElementById('remote-media').appendChild(track.attach());
    });
  });
  

  document.getElementById('btnDisconnect').onclick = function(){
    room.disconnect();
    return false;
  };
});
