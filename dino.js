import { incrementCustomProperty, getCustomProperty, setCustomProperty } from "./updateCustomProperty.js"

const dinoElem = document.querySelector("[data-dino]")
const JUMP_SPEED = .45
const GRAVITY = .011
const DINO_FRAME_COUNT = 2
const FRAME_TIME = 100

let isJumping
let dinoFrame
let currentFrameTime
let yvelocity
export function setupDino() {
    isJumping = false
    dinoFrame = 0
    currentFrameTime = 0
    yvelocity = 0
    setCustomProperty(dinoElem, "--bottom", 0)
    document.removeEventListener("keydown", onJump)
    document.addEventListener("keydown", onJump)

}

export function updateDino(delta, speedScale) {
    handleRun()
    handleJump()

}

export function getDinoRect() {
    return dinoElem.getBoundingClientRect()
}

export function setDinoLose() {
    dinoElem.src = 'imgs/dino-lose.png'
}

function handleRun(delta, speedScale) {
    if (isJumping) {
        dinoElem.src = 'imgs/dino-stationary.png'
        return
    }

    if (currentFrameTime >= FRAME_TIME) {
        dinoFrame = (dinoFrame + 1) % DINO_FRAME_COUNT
        dinoElem.src = 'imgs/dino-run-${dinoFrame}.png'
        currentFrameTime -= FRAME_TIME
    }
    currentFrameTime += delta * speedScale
}

function handleJump(delta) {
    if (!isJumping) return

    incrementCustomProperty(dinoElem, "--bottom", yvelocity * delta)

    if (getCustomProperty(dinoElem, "--bottom") <= 0) {
        setCustomProperty(dinoElem, "--bottom", 0)
        isJumping = false
    }

    yvelocity -= GRAVITY * delta
}

function onJump(e) {
    if (e.code !== "Space" || isJumping) return

    yvelocity = JUMP_SPEED
    isJumping = true
}