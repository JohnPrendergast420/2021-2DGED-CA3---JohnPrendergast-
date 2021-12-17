class AudioCue {

    static MAX_PLAYBACK_RATE = 10;

    constructor(name, theme, volume = 1, playbackRate = 1, currentTime = 0, loop = false) {
        this.name = name;
        this.theme = theme;
        this.volume = volume;
        this.playbackRate = playbackRate;
        this.currentTime = currentTime;
        this.loop = loop;

        this.audioObject = null;
        this.originalVolume = volume;
    }

    get name() {
        return this._name;
    }
    get theme() {
        return this._theme;
    }
    get volume() {
        return this._volume;
    }
    get playbackRate() {
        return this._playbackRate;
    }
    get loop() {
        return this._loop;
    }
    get currentTime() {
        return this._currentTime;
    }
    get audioObject() {
        return this._audioObject;
    }
    get originalVolume() {
        return this._originalVolume;
    }

    set name(name) {
        this._name = name;
    }
    set theme(theme) {
        this._theme = (theme == undefined) ? AudioType.All : theme;
    }
    set volume(volume) {
        this._volume = volume == undefined ||
            (volume >= 0 && volume <= 1) ? volume : 1;
    }
    set playbackRate(playbackRate) {
        this._playbackRate = playbackRate == undefined ||
            (playbackRate > 0 && playbackRate <= AudioCue.MAX_PLAYBACK_RATE) ? playbackRate : 1;
    }
    set loop(loop) {
        this._loop = loop;
    }
    set currentTime(currentTime) {
        this._currentTime = currentTime == undefined ||
            currentTime >= 0 ? currentTime : 1;
    }
    set audioObject(audioObject) {
        this._audioObject = audioObject;
    }
    set originalVolume(originalVolume) {
        this._originalVolume = originalVolume;
    }

    resetVolume() {
        this.volume = this.originalVolume;
    }
}


class SoundManager {


    constructor(id, notificationCenter, cueArray) {
        this.id = id;
        this.notificationCenter = notificationCenter;
        this.cueArray = cueArray;

        this.initialize();
        this.registerForNotifications();
    }

  
    initialize() {

        for (let i = 0; i < this.cueArray.length; i++) {

            let audioCue = this.cueArray[i];

            let name = audioCue.name;

            let audioObject = document.getElementById(name);

            if (audioObject) {

                audioCue.audioObject = audioObject;
            }

            else {

                throw "Error: No audio object was found for cue [" + this.cueName + "]";
            }
        }
    }


    registerForNotifications() {

        this.notificationCenter.register(
            NotificationType.Sound,             
            this,                              
            this.handleSoundNotification        
        );
    }


    handleSoundNotification(notification) {

        switch(notification.notificationAction) {

            case NotificationAction.Play:
                this.play(notification.notificationArguments[0]);
                break;

            case NotificationAction.Pause:
                this.pause(notification.notificationArguments[0]);
                break;

            case NotificationAction.SetVolume:
                this.setVolume(
                    notification.notificationArguments[0],
                    notification.notificationArguments[1]
                );
                break;
        }
    }

    findIndex(name) {

        for (let i = 0; i < this.cueArray.length; i++) {

            if (this.cueArray[i].name === name) {

                return i;
            }
        }

        return -1;
    }


    getAudioObject(name) {

        let index = this.findIndex(name);

        if (index != -1) {

            let audioCue = this.cueArray[index];

            let audioObject = audioCue.audioObject;

            if (audioObject) {

                return audioObject;
            }
        }

        return null;
    }


    play(name) {

        let index = this.findIndex(name);

        if (index != -1) {

            let audioCue = this.cueArray[index];

            let audioObject = audioCue.audioObject;

            if (audioObject) {

                if (audioObject.paused) {
                    
                    audioObject.currentTime = audioCue.currentTime;
                    audioObject.volume = audioCue.volume;
                    audioObject.playbackRate = audioCue.playbackRate;

                    audioObject.play();
                }
            }
        }

        else {

            throw "Error: No audio object was found for cue [" + this.cueName + "]";
        }
    }


    pause(name) {

        let audioObject = getAudioObject(name);

        if (audioObject) {

            if (!audioObject.paused) {

                cue.pause();
            }
        }
    }


    setVolume(name, volume) {

        let audioCue = this.cueArray[index];

        let audioObject = getAudioObject(name);

        if (audioObject) {

            audioObject.volume = audioCue.volume = volume;
        }
    }


    setVolumeByTheme(theme, volume) {

        for (let i = 0; i < this.cueArray.length; i++) {

            if (this.cueArray[i].theme === theme) {

                let audioObject = this.cueArray[i].audioObject;

                if (audioObject) {

                    audioObject.volume = this.cueArray[i].volume = volume;
                }

                else {

                    throw "Error: No audio object was found for theme [" + theme + "]";
                }
            }
        }
    }


    setVolumeAll(volume) {

        
        for (let i = 0; i < this.cueArray.length; i++) {

            let audioObject = this.cueArray[i].audioObject;

            if (audioObject) {

                audioObject.volume = this.cueArray[i].volume = volume;
            }

            else {

                throw "Error: Cue array may be empty or contain invalid objects!";
            }
        }
    }

    resetVolumeAll() {

        for (let i = 0; i < this.cueArray.length; i++) {

            let audioObject = this.cueArray[i].audioObject;

            if (audioObject) {

                audioObject.volume = this.cueArray[i].originalVolume;

                this.cueArray[i].ResetVolume();
            }

            else {

                throw "Error: Failed to reset all volumes!";
            }
        }
    }


    clear() {

     
        this.cueArray = [];
    }

   
    size() {

        return this.cueArray.length;
    }

    toString() {

        let str = "";

        
        for (let i = 0; i < this.cueArray.length; i++) {

          
            str += this.cueArray[i] + ",";
        }

        return str;
    }
}