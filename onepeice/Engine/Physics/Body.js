

const FrictionType = {
    Low: 0.09,
    Normal: 0.07,
    High: 0.05
};



class Body {

    static MAX_SPEED = 10;
    static MIN_SPEED = 0.01;

    get maximumSpeed() {
        return this._maximumSpeed;
    }

    get friction() {
        return this._friction;
    }
    get velocityX() {
        return this._velocityX;
    }
    get velocityY() {
        return this._velocityY;
    }

    set maximumSpeed(maximumSpeed) {
        this._maximumSpeed = maximumSpeed || Body.MAX_SPEED;
    }

    set friction(friction) {
        this._friction = friction || FrictionType.Normal;
    }

    set velocityX(velocityX) {

        if (velocityX <= this.maximumSpeed) {
            this._velocityX = velocityX;
        }
    }

    set velocityY(velocityY) {

        if (velocityY <= this.maximumSpeed) {
            this._velocityY = velocityY;
        }
    }

    constructor(maximumSpeed, friction) {

        this.maximumSpeed = this.originalMaximumSpeed = maximumSpeed;

        this.friction = this.originalFriction = friction;

        this.velocityX = 0;
        this.velocityY = 0;

        this.jumping = false;
        this.onGround = false;
    }

    reset() {

        this.velocityX = 0;
        this.velocityY = 0;

        this.jumping = false;
        this.onGround = false;

        this.maximumSpeed = this.originalMaximumSpeed;
        
        this.friction = this.originalFriction;
    }



    applyFriction(gameTime) {

        this.velocityX *= (this.friction / gameTime.elapsedTimeInMs);
    }

    applyFrictionY() {

        this.velocityY *= this.friction;
    }

    setVelocity(velocity) {

        this.setVelocityX(velocity.x);
        this.setVelocityY(velocity.y);
    }

    setVelocityX(velocity) {
        this.velocityX = velocity;
    }

    setVelocityY(velocity) {
        this.velocityY = velocity;
    }

    addVelocity(velocity) {

        this.addVelocityX(velocity.x);
        this.addVelocityY(velocity.y);
    }

    addVelocityX(deltaVelocityX) {

        if (Math.abs(this.velocityX + deltaVelocityX) <= this.maximumSpeed) {
            this.velocityX += deltaVelocityX;
        }
    }

    addVelocityY(deltaVelocityY) {

        if (Math.abs(this.velocityY + deltaVelocityY) <= this.maximumSpeed) {
            this.velocityY += deltaVelocityY;
        }
    }

    equals(other) {
        return GDUtility.IsSameTypeAsTarget(this, other)
            && this.maximumSpeed === other.maximumSpeed
            && this.gravity === other.gravity
            && this.friction === other.friction;
    }

    toString() {
        return "[" +
            this.maximumSpeed + ", " +
            this.gravity + +", " +
            this.friction + ", " +
            this.velocityX + ", " +
            this.velocityY +
            "]";
    }

    clone() {
        return new Body(
            this.maximumSpeed,
            this.gravity,
            this.friction
        );
    }
}