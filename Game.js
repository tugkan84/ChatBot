const GameState = require("./GameState");

var founded = [];

module.exports = class Game {
    constructor() {
        this.stateCur = GameState.WELCOMING;
    }

    makeAMove(sInput) {
        let sReply = "";
        switch (this.stateCur) {
            case GameState.WELCOMING:
                sReply = "It is a dark and rainy night. Bang! You have a flat tire. Too bad you don't have a spare. Do you WAIT or GO to the spooky mansion for help?";
                this.stateCur = GameState.FLAT;
                break;
            case GameState.FLAT:
                if (sInput.toLowerCase().match("wait")) {
                    sReply = "The road is deserted. After 1 hour there is still no help. Do you keep Waiting or do you go to the house?";
                } else {
                    sReply = "On the door is a large knocker. Do you knock or run back to your car to wait?";
                    this.stateCur = GameState.MANSION;
                }
                break;
            case GameState.MANSION:
                if (sInput.toLowerCase().match("knock")) {
                    sReply = "The door opens and you are greeted by a hunch-back butler. He asks you to come in. Do you go in or run back to the car?"
                    this.stateCur = GameState.BUTLER;
                } else {
                    sReply = "The road is deserted. After 1 hour there is still no help. Do you keep Waiting or do you go to the house?";
                    this.stateCur = GameState.FLAT;
                }
                break;
            case GameState.BUTLER:
                if (sInput.toLowerCase().match("run")) {
                    sReply = "The road is deserted. After 1 hour there is still no help. Do you keep Waiting or do you go to the house?";
                    this.stateCur = GameState.FLAT;
                } else {
                    sReply = "You seem to have walked in to a party. The host offers you some toast. Do you take the toast or ask to call a tow truck?";
                    this.stateCur = GameState.TOAST;
                }
                break;
            case GameState.TOAST:
                if (sInput.toLowerCase().match("toast")) {
                    sReply = "They served drinks while eating toast, Will you get the Red or the White drink?";
                    this.stateCur = GameState.DRINKS;
                } else {
                    sReply = "the phone lines are down ... Would you like some toast perhaps?";
                }
                break;
            case GameState.DRINKS:
                if (sInput.toLowerCase().match("white")) {
                    sReply = "People started running, as if something is happening. Enter the room with the red door or go up the stairs?";
                    this.stateCur = GameState.ROOM
                } else if (sInput.toLowerCase().match("red")) { //Red
                    sReply = "You chose red, your head started to freeze, and suddenly everyone turned to zombies. All the zombies are coming along. Escape the Red room or go Upstairs.";
                    this.stateCur = GameState.ROOM
                } else {
                    sReply = "You don't want to choose but they insist.Will you get the Red or the White drink?";
                }
                break;

            case GameState.ROOM:
                if (sInput.toLowerCase().match("red")) {
                    sReply = "There are two cabinets in the room, one Red and the other White. Choose someone to hide?";
                    this.stateCur = GameState.WAKE;
                } else if (sInput.toLowerCase().match("upstairs")) {
                    sReply = "There are two rooms upstairs and the zombies go up the stairs. Should you choose a room, the Left room or the Right room?";
                    this.stateCur = GameState.UP
                } else {
                    sReply = "You choose to stay and they attacked you. You wake up suddenly from the dream and you are in your car, a tow truck is coming towards you. It was all a dream. or was it not?";
                    this.stateCur = GameState.WELCOMING
                }
                break;

            case GameState.UP:
                if (sInput.toLowerCase().match("left")) {
                    sReply = "When you enter the room and close the door, the zombies start to hit the door. Should you go from the two corridors to the red or black one, which one?";
                    this.stateCur = GameState.CORRIDOR;
                } else if (sInput.toLowerCase().match("right")) { //right 
                    sReply = "There are 3 doors in front of you, you have to choose one of the doors. Which number will you choose?";
                    this.stateCur = GameState.RIGHT
                } else {
                    sReply = "You choose to stay and they broke the gate. You wake up suddenly from the dream and you are in your car, a tow truck is coming towards you. It was all a dream. or was it not?";
                    this.stateCur = GameState.WELCOMING
                }
                break;

            case GameState.CORRIDOR:
                if (sInput.toLowerCase().match("black")) {
                    sReply = "The corridor ends and zombies break the door. There are two windows, one with a red frame and one with a white frame, which one do you jump from?";
                    this.stateCur = GameState.WAKE;
                } else if (sInput.toLowerCase().match("red")) {
                    sReply = "There are 3 doors in front of you, you have to choose one of the doors. Which number will you choose?";
                    this.stateCur = GameState.RIGHT
                } else {
                    sReply = "Should you go from the two corridors to the red or black one, which one?";
                }
                break;

            case GameState.RIGHT:
                if (this.isNumber(sInput).match("1")) {
                    sReply = "You entered the room and found a sword. Suddenly a zombie awoke in the room. Will you Escape the room or will you Shoot it with your weapon?";
                    founded.push("sword");
                    this.stateCur = GameState.FIGHT;
                } else if (this.isNumber().match("2")) {
                    sReply = "You entered the room and found a handgun. Suddenly a zombie awoke in the room. Will you Escape the room or will you Shoot it with your weapon?";
                    founded.push("handgun");
                    this.stateCur = GameState.FIGHT;
                } else if (this.isNumber().match("3")) {
                    sReply = "You entered the room and found a baseball bat. Suddenly a zombie awoke in the room. Will you Escape the room or will you Shoot it with your weapon?";
                    founded.push("baseball bat");
                    this.stateCur = GameState.FIGHT;
                } else {
                    sReply = this.isNumber(sInput);
                }
                break;

            case GameState.FIGHT:
                if (sInput.toLowerCase().match("escape")) {
                    sReply = "You ran away, but the Zombie bit you, you saw the emergency box, but there are two medicine in it.Which medicine do you take, red or white?";
                    this.stateCur = GameState.WAKE;
                } else if ("Shoot") {
                    if (founded.indexOf("baseball bat") < 0) {
                        sReply = "You hit the zombie, but just enough to escape. While you escaping the Zombie bit you, you saw the emergency box, but there are two medicine in it.Which medicine do you take, red or white?";
                        this.stateCur = GameState.WAKE;
                    } else if (founded.indexOf("handgun") < 0) {
                        sReply = "You killed the zombie but the others heard the sound of your weapon. They started to push the door.There are two windows, one with a red frame and one with a white frame, which one do you jump from?";
                        this.stateCur = GameState.WAKE;
                    } else {
                        sReply = "You killed the zombie silently. You searched the room but couldn't find anything. Let's try another room. Will you Choose right or left?";
                        this.stateCur = GameState.SEARCH
                    }
                } else {
                    sReply = "Don't hesitate, do something! Escape or Shoot?";
                }
                break;

            case GameState.SEARCH:
                if (sInput.toLowerCase().match("right")) {
                    sReply = "When you opened the door, you saw a man trying to hide. Will you Help him or Leave him there?";
                    this.stateCur = GameState.CHOOSE
                } else if (sInput.toLowerCase().match("left")) {
                    sReply = "You found a staircase to downstairs, but it's dark. Will you Go down or try to Find another way?";
                    this.stateCur = GameState.EXIT
                } else {
                    sReply = "You wasting your time,let's try another room. Will you Choose right or left?";
                }
                break;

            case GameState.CHOOSE:
                if (sInput.toLowerCase().match("help")) {
                    sReply = "You helped him and he said how to get out of this nightmare. Will you Go where he told you or will you try to Find your way?";
                    this.stateCur = GameState.EXIT
                } else if (sInput.toLowerCase().match("leave")) {
                    sReply = "You chose to leave him there, but he attacked you as you left the room. To kill or to run?";
                    this.stateCur = GameState.HIM
                } else {
                    sReply = "Others are approaching you, hurry. Will you Help him or Leave him there?";
                }
                break;

            case GameState.HIM:
                if (sInput.toLowerCase().match("kill")) {
                    sReply = "He was strong than you and while fighting with him others reached to you. You woke up from sleep and you are in a dark place, that is, in the grave. ";
                    this.stateCur = GameState.WELCOMING
                } else if (sInput.toLowerCase().match("run")) {
                    sReply = "Others reached to you. You woke up from sleep and you are in a dark place, that is, in the grave.";
                    this.stateCur = GameState.WELCOMING
                } else {
                    sReply = "Others are approaching you, hurry. Will you Kill him or Run?";
                }
                break;

            case GameState.EXIT:
                if (sInput.toLowerCase().match("go")) {
                    sReply = "Yes you found the exit. You can ran away from that nightmare. While running to your car, you fell to the ground and hit your head against a rock. You wake up suddenly from the dream and you are in your car, a tow truck is coming towards you. It was all a dream. or was it not?";
                    this.stateCur = GameState.WELCOMING
                } else if (sInput.toLowerCase().match("find")) {
                    sReply = "You fall into a dark hole trying to find another exit. You woke up from sleep and you are in a dark place, that is, in the grave.";
                    this.stateCur = GameState.WELCOMING
                } else {
                    sReply = "Others are approaching you, hurry. Will you Go or try to Find?";
                }
                break;

            case GameState.WAKE:
                if (sInput.toLowerCase().match("red")) {
                    sReply = "You woke up from sleep and you are in a dark place, that is, in the grave.";
                    this.stateCur = GameState.WELCOMING
                } else {
                    sReply = "You wake up suddenly from the dream and you are in your car, a tow truck is coming towards you. It was all a dream. or was it not?";
                    this.stateCur = GameState.WELCOMING
                }
                sReply += "<<send ay word to start again>>"
                break;

        }
        return ([sReply]);
    }
    isNumber(input) {
        if (Number.isInteger(input)) {
            var selectedNumber = Number.parseInt(input);
            if (selectedNumber <= 3 && selectedNumber >= 1) {
                return selectedNumber.toString();
            } else {
                return "Select number between 1 and 3";
            }
        } else {
            return "Select number between 1 and 3";
        }
    }
}

// you enter a new world of adventure ... game over