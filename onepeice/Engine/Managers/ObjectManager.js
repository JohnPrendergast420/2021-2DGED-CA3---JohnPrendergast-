/**
 * This class is responsible for storing and updating all the sprites within the game.
 * @author Niall McGuinness
 * @version 1.0
 * @class ObjectManager
 */
class ObjectManager {

    get sprites() {
        return this._sprites;
    }

    constructor(id, notificationCenter, context, statusType, cameraManager) {
        this.id = id;

        this.notificationCenter = notificationCenter;
        this.context = context;

        this.statusType = statusType;
        this.cameraManager = cameraManager;

        this._sprites = [];

        this.registerForNotifications();
    }



    registerForNotifications() {

        
        this.notificationCenter.register(
            NotificationType.Sprite,
            this,
            this.handleSpriteNotification
        );

        this.notificationCenter.register(
            NotificationType.Menu,
            this,
            this.handleMenuNotification
        );
    }

    handleSpriteNotification(notification) {

        switch (notification.notificationAction) {

            case NotificationAction.Add:

                this.add(notification.notificationArguments[0]);
                break;

            case NotificationAction.Remove:

                this.remove(notification.notificationArguments[0]);
                break;

            case NotificationAction.RemoveFirst:

                this.removeFirst(notification.notificationArguments[0]);
                break;

            case NotificationAction.RemoveFirstBy:

                this.removeFirstBy(
                    notification.notificationArguments[0],
                    notification.notificationArguments[1]
                );

                break;

            case NotificationAction.RemoveAllBy:

                this.removeAllBy(
                    notification.notificationArguments[0],
                    notification.notificationArguments[1]
                );

                break;

            case NotificationAction.RemoveAllByType:

                this.removeAllByType(notification.notificationArguments[0]);
                break;
        }
    }

    handleMenuNotification(notification) {

        switch (notification.notificationAction) {

            case NotificationAction.ShowMenuChanged:

                this.statusType = notification.notificationArguments[0];
                break;
        }
    }


    add(sprite) {

        if (!this.sprites[sprite.actorType]) {

            this.sprites[sprite.actorType] = [];
        }

        this.sprites[sprite.actorType].push(sprite);
    }

    
    remove(sprite) {

        
        if (this.sprites[sprite.actorType]) {

            
            let index = this.sprites[sprite.actorType].indexOf(sprite);

           
            if (index != -1) {

                
                this.sprites[sprite.actorType].splice(index, 1);

               
                return true;
            }

            
            return false;
        }
        else {

           
            return false;
        }
    }

    find(actorType, predicate) {

        
        const index = this.sprites[actorType].findIndex(predicate);

        
        if (index != -1) {

           
            return this.sprites[actorType][index];
        }

        
        return -1;
    }

    findIndex(actorType, predicate) {

        if (this.sprites[actorType]) {

            return this.sprites[actorType].findIndex(predicate);
        }

        return -1;
    }

    findIndices(actorType, predicate) {

        if (this.sprites[actorType]) {

            let index = 0;
            let foundIndices = [];

            for (let i = 0; i < this.sprites[actorType].length; i++) {

                if (predicate(this.sprites[actorType][i])) {

                    foundIndices[index] = i;
                    index++;
                }
            }

            return (foundIndices.length != 0) ? foundIndices : null;
        }

        return null;
    }

    removeFirst(sprite) {

        if (this.sprites[sprite.actorType]) {

            let index = this.sprites[sprite.actorType].indexOf(sprite);

            if (index != -1) {

                this.sprites[sprite.actorType].splice(index, 1);
            }
        }
    }

    removeFirstBy(actorType, predicate) {

        if (this.sprites[actorType]) {

            this.sprites[actorType].splice(this.findIndex(actorType, predicate), 1);
        }
    }

    removeAllBy(actorType, predicate) {

        const indices = this.findIndices(actorType, predicate);

        for (let i = indices.length - 1; i >= 0; i--) {

            this.sprites[actorType].splice(this.sprites[actorType][i], 1);
        }
    }

    removeAllByType(actorType) {

        if (this.sprites[actorType]) {

            this.sprites[actorType].splice(0, this.sprites[actorType].length);
        }
    }

    get(actorType) {

        if (this.sprites[actorType]) {

            return this.sprites[actorType];
        }
    }

    sort(actorType, compareFunction) {

        if (this.sprites[actorType]) {

            this.sprites[actorType].sort(compareFunction);
        }
    }

    clear() {

        
        for (let i = 0; i < this.sprites.length; i++) {

           
            if (this.sprites[i] != undefined) {

                
                this.sprites[i].splice(0, this.sprites[i].length);
            }
        }

        
        this.sprites.splice(0, this.sprites.length);
    }

    update(gameTime) {

       
        if ((this.statusType & StatusType.Drawn) != 0) {

            for (let key in this.sprites) {

                for (let sprite of this.sprites[key]) {

                    sprite.update(gameTime, this.cameraManager.activeCamera);
                }
            }
        }
    }

    draw(gameTime) {

        if ((this.statusType & StatusType.Drawn) != 0) {

            for (let key in this.sprites) {

                for (let sprite of this.sprites[key]) {

                    if (
                        sprite.actorType == ActorType.Background ||
                        sprite.actorType == ActorType.HUD ||
                        sprite.transform.boundingBox.intersects(
                            this.cameraManager.activeCamera.transform.boundingBox
                        )
                    ) {
                        sprite.draw(gameTime, this.cameraManager.activeCamera);
                    }
                }
            }
        }
    }
}