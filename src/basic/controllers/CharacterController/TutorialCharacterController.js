import AbstractCharacterController from "./AbstractCharacterController.js"
import animationComponent from "./components/AnimationComponent.js"
import gravityComponent from "./components/GravityController.js"
import meshComponent from "./components/MeshComponent.js"
import movementComponent from "./components/MovementComponent.js"
import moveRotateController from "./components/MoveRotateController.js"
import shadowComponent from "./components/ShadowComponent.js"
import terrainComponent from "./components/TerrainComponent.js"
import walkingSoundComponent from "./components/WalkingSoundComponent.js"

const tutorialCharacterController = new AbstractCharacterController()
tutorialCharacterController.addComponents(meshComponent)
tutorialCharacterController.addComponents(moveRotateController)
tutorialCharacterController.addComponents(movementComponent)
tutorialCharacterController.addComponents(animationComponent)
tutorialCharacterController.addComponents(walkingSoundComponent)
// tutorialCharacterController.addComponents(shadowComponent)
// tutorialCharacterController.addComponents(terrainComponent)
tutorialCharacterController.addComponents(gravityComponent)

window.t = tutorialCharacterController
export default tutorialCharacterController