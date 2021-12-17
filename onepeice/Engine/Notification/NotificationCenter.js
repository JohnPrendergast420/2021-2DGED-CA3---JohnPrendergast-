
const NotificationType = {

    Player: "Player",
    Enemy: "Enemy",
    Pickup: "Pickup",
    Sprite: "Sprite",

    GameState: "GameState",
    Menu: "Menu",
    UI: "UI",
    Sound: "Sound"

};


const NotificationAction = {

    Fire: "Fire",
    Win: "Win",
    Lose: "Lose",

    Add: "Add",
    Remove: "Remove",
    RemoveFirst: "RemoveFirst",
    RemoveFirstBy: "RemoveFirstBy",
    RemoveAllBy: "RemoveAllBy",
    RemoveAllByType: "RemoveAllByType",

    Pickup: "Pickup",

    Play: "Play",
    Pause: "Pause",
    ShowMenuChanged: "ShowMenuChanged",
    SetVolume: "SetVolume",
    SetVolumeByTheme: "SetVolumeByTheme",
    SetVolumeAll: "SetVolumeAll",
    ResetVolumeAll: "ResetVolumeAll",

    UpdateHealthBar: "UpdateHealthBar",
    
   
};



class Notification {

    get notificationType() {
        return this._notificationType;
    }
    get notificationAction() {
        return this._notificationAction;
    }
    get notificationArguments() {
        return this._notificationArguments;
    }

    set notificationType(notificationType) {
        this._notificationType = notificationType;
    }
    set notificationAction(notificationAction) {
        this._notificationAction = notificationAction;
    }
    set notificationArguments(notificationArguments) {
        this._notificationArguments = notificationArguments;
    }

    constructor(notificationType, notificationAction, notificationArguments = []) {
        this.notificationType = notificationType;
        this.notificationAction = notificationAction;
        this.notificationArguments = notificationArguments;
    }


    equals(other) {

        return GDUtility.IsSameTypeAsTarget(this, other) && (
            this.notificationType === other.notificationType &&
            this.notificationAction === other.notificationAction &&
            this.notificationArguments === other.notificationArguments
        );
    }
}

class NotificationCenter {

    constructor() {

        this.notificationTypeToObserversMap = new Array();
    }


    register(notificationType, observer, handler) {

        let success = true;

        if (this.notificationTypeToObserversMap[notificationType]) {

           
            if (this.indexOf(notificationType, observer) == -1) {

       
                this.notificationTypeToObserversMap[notificationType].push(
                    { observer: observer, handler: handler }
                );
            }

            else {

                success = false;
            }
        }

        else {

            
            this.notificationTypeToObserversMap[notificationType] = new Array();

            
            this.notificationTypeToObserversMap[notificationType].push(
                { observer: observer, handler: handler }
            );
        }


        return success;
    }


    deregister(notificationType, observer, handler) {

       
        let index = this.indexOf(notificationType, observer);

        if (index != -1) {

            this.notificationTypeToObserversMap[notificationType].splice(index, 1);

            return true;

        }

        else {

            console.log(
                "An observer has already been added for this notification type!"
            );

            return false;
        }
    }

    indexOf(notificationType, observer) {

        if (this.notificationTypeToObserversMap[notificationType]) {

            let observers = this.notificationTypeToObserversMap[notificationType]
            for (let i = observers.length - 1; i >= 0; i--) {

                if (observers[i].observer === observer) {

                    return i;
                }
            }
        }

        return -1;
    }

    notify(notification) {
        if (this.notificationTypeToObserversMap[notification.notificationType]) {
            let observers =
                this.notificationTypeToObserversMap[notification.notificationType];

            for (let i = observers.length - 1; i >= 0; i--) {

                Reflect.apply(
                    observers[i].handler,      
                    observers[i].observer,      
                    [notification]             
                );

                
            }
        }
    }
}
