/* eslint-disable */

import Controller from '@ember/controller';

import { connect, createLocalTracks } from 'twilio-video';

export default Controller.extend({
  init: function() {
    this._super();

    createLocalTracks({
      audio: true,
      video: { height: 720 }
    }).then(localTracks => {
      const localMediaContainer = document.getElementById('local-media');
      const token = document.getElementById('twilio-auth-token').innerText;
      console.log(token);
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

    })
  }
});
