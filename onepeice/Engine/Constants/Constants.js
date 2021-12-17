
const ActorType = {


    Background: 0,
    Platform: 1,
    Decorator: 2,
    Pickup: 3,
    Interactable: 4,
    Projectile: 5,
    Enemy: 6,
    NPC: 7,
    Player: 8,
    Camera: 9,
    HUD: 11


};

const StatusType = {
    Off: 0,     // 0000
    Drawn: 1,   // 0001
    Updated: 2, // 0010


};

const AudioType = {
    Background: 0,
    Menu: 1,
    Explosion: 2,
    WinLose: 3,
    Weapon: 4,
    All: 5,
    Move: 6,
};

const CollisionType = {
    Collidable: true,
    NotCollidable: false
};


const LineCapType = {
    Butt: "butt",
    Round: "round",
    Square: "square"
};

const LineJoinType = {
    Bevel: "bevel",
    Round: "round",
    Miter: "miter"
};

const TextAlignType = {
    Start: "start",
    End: "end",
    Left: "left",
    Right: "right",
    Center: "center"
};


const TextBaselineType = {
    Top: "top",
    Bottom: "bottom",
    Middle: "middle",
    Alphabetic: "alphabetic",
    Hanging: "hanging"
};


const Color = {
    Black: "#000000",
    White: "#FFFFFF",
    Grey: "#8B8680",
    CornFlowerBlue: "#6495ED",
    LightGreen: "#CACB63",
    DarkGreen: "#688318",


};


const Keys = {
    A: "KeyA",
    B: "KeyB",
    C: "KeyC",
    D: "KeyD",
    E: "KeyE",
    F: "KeyF",
    G: "KeyG",
    H: "KeyH",
    I: "KeyI",
    J: "KeyJ",
    K: "KeyK",
    L: "KeyL",
    M: "KeyM",
    N: "KeyN",
    O: "KeyO",
    P: "KeyP",
    Q: "KeyQ",
    R: "KeyR",
    S: "KeyS",
    T: "KeyT",
    U: "KeyU",
    V: "KeyV",
    W: "KeyW",
    X: "KeyX",
    Y: "KeyY",
    Z: "KeyZ",
    Enter: "Enter",
    Space: "Space",
    Numpad0: "Numpad0",
    Numpad1: "Numpad1",
    Numpad2: "Numpad2",
    Numpad3: "Numpad3",
    Numpad4: "Numpad4",
    Numpad5: "Numpad5",
    Numpad6: "Numpad6",
    Numpad7: "Numpad7",
    Numpad8: "Numpad8",
    Numpad9: "Numpad9",
    ArrowUp: "ArrowUp",
    ArrowDown: "ArrowDown",
    ArrowLeft: "ArrowLeft",
    ArrowRight: "ArrowRight",
};
