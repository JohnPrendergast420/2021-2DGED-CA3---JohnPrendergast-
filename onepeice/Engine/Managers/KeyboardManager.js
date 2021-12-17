
 
 class KeyboardManager {
 
    get id() {
        return this._id;
    }

    set id(id) {
        this._id = id;
    }

    constructor(id) {
        this.id = id;

        this.keyState = {};
 
        window.addEventListener("keydown", (event) => {
            this.keyState[event.code] = true;
        });
 
        window.addEventListener("keyup", (event) => {
            delete this.keyState[event.code];
        });
    }
 

    isKeyDown(code) {
        
        if (this.keyState[code]) {
            return true;
        }
        else {
            return false;
        }
    }
 

    isKeyUp(code) {
        return !this.isKeyDown(code);
    }
 

    isAnyKeyPressed() {
        return Object.entries(this.keyState).length != 0;
    }

    areKeysDown(codeArray) {
 
        if (codeArray) {
           
            let result = true;
            for (let i = 0; i < codeArray.length; i++) {
                result = result & this.isKeyDown(codeArray[i]);
            }
 
            return result;
        } else {
            
            throw "Error: keyCodesArray does not contain a valid array!";
        }
    }
}
