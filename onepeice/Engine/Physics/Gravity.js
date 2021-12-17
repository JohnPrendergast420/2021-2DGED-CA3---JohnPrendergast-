const GravityType = {
    space: 0,
    water: 0.02,
    Normal: 0.04,
    differntplanet: 0.07
};
class Body {
    get gravity() {
        return this._gravity;
    }
    set gravity(gravity) {

        if(level1){this._gravity = gravity || GravityType.Normal;}
        
        else if (level2)
        {this._gravity = gravity || GravityType.space;}

        else if (level3)
        {this._gravity = gravity || GravityType.water;}

        else  (level4)
        this._gravity = gravity || GravityType.differntplanet;
    }

constructor(gravity)
{
    this.gravity = this.originalGravity = gravity; 
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

    this.gravity = this.originalGravity;
    this.friction = this.originalFriction;
}
applyGravity(gameTime) {

    this.velocityY += this.gravity * gameTime.elapsedTimeInMs;
}
equals(other) {
    return GDUtility.IsSameTypeAsTarget(this, other)

        && this.gravity === other.gravity
        
}
toString() {
    return "[" +
        this.gravity + +", " +
        this.velocityX + ", " +
        this.velocityY +
        "]";
}
clone() {
    return new Body(
       
        this.gravity,
        this.friction
    );
}
}