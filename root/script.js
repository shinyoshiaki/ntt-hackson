$(function(){

    let localStream = null;
    let peer = null;
    let existingCall = null;
    let constraints = {
        video: {},
        audio: true
    };
    constraints.video.width = {
        min: 320,
        max: 320
    };
    constraints.video.height = {
        min: 240,
        max: 240
    };

    navigator.mediaDevices.getUserMedia(constraints)
        .then(function (stream) {
            $('#myStream').get(0).srcObject = stream;
            localStream = stream;
        }).catch(function (error) {
            console.error('mediaDevice.getUserMedia() error:', error);
            return;
        });

    peer = new Peer({
        key: '520c6324-4998-4d7c-8f92-2b29da721416',
        debug: 3
    });

    peer.on('open', function(){
        $('#my-id').text(peer.id);
    });

    peer.on('error', function(err){
        alert(err.message);
    });

    $('#make-call').submit(function(e){
        e.preventDefault();
        let roomName = $('#join-room').val();
        if (!roomName) {
            return;
        }
        const call = peer.joinRoom(roomName, {mode: 'sfu', stream: localStream});
        setupCallEventHandlers(call);

        // チャットを送信
        $('#send').click(function(){
            //var msg = $('#voice-text').innerHTML;
            var msg = document.getElementById("voice-text").innerHTML;
            call.send(msg);
            chatlog('自分> ' + msg);
        });

    });

    $('#end-call').click(function(){
        existingCall.close();
    });

    function setupCallEventHandlers(call){
        if (existingCall) {
            existingCall.close();
        };

        existingCall = call;
        setupEndCallUI();
        $('#room-id').text(call.name);

        call.on('stream', function(stream){ //人が入るたびに呼ばれる
            addVideo(stream);
        });

        call.on('peerLeave', function(peerId){
            removeVideo(peerId);
        });

        call.on('close', function(){
            removeAllRemoteVideos();
            setupMakeCallUI();
        });
    }

    function addVideo(stream){ //videoの追加
        const videoDom = $('<video autoplay>');
        videoDom.attr('id',stream.peerId);
        videoDom.get(0).srcObject = stream;
        $('.videosContainer').append(videoDom);
    }

    function removeVideo(peerId){
        $('#'+peerId).remove();
    }

    function removeAllRemoteVideos(){
        $('.videosContainer').empty();
    }

    function setupMakeCallUI(){
        $('#make-call').show();
        $('#end-call').hide();
    }

    function setupEndCallUI() {
        $('#make-call').hide();
        $('#end-call').show();
    }
    // チャットログに記録するための関数
    function chatlog(msg){
        $('#chatLog').append('<p>' + msg + '</p>');
    }

});
