const FW_L = 190
const FW_R = 240

const PAMI_IS_SUPERSTAR: boolean = false
const COUNTDOWN = 89000
const TEST = false;

const SWITCH_COLOR = DigitalPin.P2
const SERVO = maqueen.Servos.S1
const SERVO_MIN = 0
const SERVO_MAX = 140

enum Color {
    Yellow,
    Blue
}

const movers = {
    forward: () => {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, FW_L);
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, FW_R);
    },
    turnLeft: () => {
        maqueen.motorRun(maqueen.Motors.M2, maqueen.Dir.CW, FW_R);
        maqueen.motorStop(maqueen.Motors.M1);
    },
    turnRight: () => {
        maqueen.motorRun(maqueen.Motors.M1, maqueen.Dir.CW, FW_L);
        maqueen.motorStop(maqueen.Motors.M2);
    },
    stop: () => {
        maqueen.motorStop(maqueen.Motors.All);
    }
}

function runYellowGroupie() {
    movers.forward()
    basic.pause(1000)
    movers.turnRight()
    basic.pause(500)
    movers.forward()
    basic.pause(1000)
    movers.turnLeft()
    basic.pause(400)
    movers.forward()
    basic.pause(750)
    movers.stop()
}

function runYellowSuperstar() {
    // TODO
}

function runBlueGroupie() {
    movers.forward()
    basic.pause(1000)
    movers.turnLeft()
    basic.pause(500)
    movers.forward()
    basic.pause(750)
    movers.turnRight()
    basic.pause(460)
    movers.forward()
    basic.pause(750)
    movers.stop()
}

function runBlueSuperstar() {
    // TODO
}

function runServo() {
    for (; ;) {
        const angle = pins.map(
            Math.sin(control.millis() / 300),
            -1,
            1,
            SERVO_MIN,
            SERVO_MAX
        );
        maqueen.servoRun(SERVO, angle);
        pause(10);
    }
}

pins.setPull(SWITCH_COLOR, PinPullMode.PullUp);
maqueen.servoRun(SERVO, 90);
pause(TEST? 2000: COUNTDOWN);
if (pins.digitalReadPin(SWITCH_COLOR) == Color.Yellow) {
    if (PAMI_IS_SUPERSTAR) {
        runYellowSuperstar();
    } else {
        runYellowGroupie();
    }
} else {
    if (PAMI_IS_SUPERSTAR) {
        runBlueSuperstar();
    } else {
        runBlueGroupie();
    }
}
runServo();