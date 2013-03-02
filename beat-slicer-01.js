var BeatSlicer01 = function(tempo){
	 //random junglification.
	 var audiolet = new Audiolet();
	 var amenBuffer = new AudioletBuffer(1,0);
	 var lengthInSeconds = 6.986; //i knew this in advance, couldn't figure out how to calculate this from amenBuffer.length.
	 amenBuffer.load('samples/breaks/amen.wav', false); //thanks to freesound.org
	 var rately = ((tempo/60)/lengthInSeconds) * 4;
	 var amenPlayer = new BufferPlayer(audiolet, amenBuffer, rately, 0, 0);
	 var trig = new TriggerControl(audiolet, 0);
	 
	var fourBeatPositions = new PChoose([0, 0.25, 0.5, 0.75], Infinity);
    var eightBeatPositions = new PChoose([0, 0.125, 0.25, 0.375, 0.5, 0.625, 0.75, 0.875], Infinity);
	var sixteenBeatPositions = new PChoose([0, 0.0625, 0.125, 0.125 + 0.0625, 
	0.25, 0.25 + 0.0625, 0.375, 0.375 + 0.0625,
	 0.5, 0.5 + 0.0625, 0.625, 0.625 + 0.0625, 
	 0.75, 0.75 +0.0625, 0.875, 0.875 + 0.0625], Infinity);
	 var ratePattern = new PChoose([rately, rately,rately,rately,rately,rately,rately,rately,rately,rately,rately,rately, rately /2, rately *2, rately/4, rately * 1.5], Infinity);
	 var durationFourBeat = new PChoose([1,2,4,8], Infinity);
	 var durationEightBeat = new PChoose([2/3, 1.5], Infinity);
	 var durationSixteenBeat = new PChoose([3,6,9,1.5], Infinity);
	 audiolet.scheduler.setTempo(tempo);
	 audiolet.scheduler.play([fourBeatPositions, ratePattern], durationFourBeat, function(position, rate){
	 	amenPlayer.disconnect(audiolet.output);
	 	trig.connect(amenPlayer, 0, 1);
	 	amenPlayer.startPosition.setValue(amenBuffer.length * position);
	 	amenPlayer.playing = true;
	 	
		if (!isNaN(rate)) {
			amenPlayer.playbackRate.setValue(rate);
		} else {
			amenPlayer.playbackRate.setValue(rately);
		}

	    trig.trigger.setValue(1);
	    amenPlayer.connect(audiolet.output);
	 });
	 audiolet.scheduler.play([eightBeatPositions, ratePattern], durationEightBeat, function(position,rate){
	 	amenPlayer.disconnect(audiolet.output);
	 	trig.connect(amenPlayer, 0, 1);
	 	amenPlayer.startPosition.setValue(amenBuffer.length * position);
	 	amenPlayer.playing = true;
	 	
	 	
		if (!isNaN(rate)) {
			amenPlayer.playbackRate.setValue(rate);
		} else {
			amenPlayer.playbackRate.setValue(rately);
		}

	    trig.trigger.setValue(1);
	    amenPlayer.connect(audiolet.output);
	 });
     audiolet.scheduler.play([sixteenBeatPositions, ratePattern], durationSixteenBeat, function(position,rate){
     	amenPlayer.disconnect(audiolet.output);
     	trig.connect(amenPlayer, 0, 1);
	 	amenPlayer.startPosition.setValue(amenBuffer.length * position);
	 	amenPlayer.playing = true;
	 	
		if (!isNaN(rate)) {
			amenPlayer.playbackRate.setValue(rate);
		} else {
			amenPlayer.playbackRate.setValue(rately);
		}

	    trig.trigger.setValue(1);
	    amenPlayer.connect(audiolet.output);
	 });
}
