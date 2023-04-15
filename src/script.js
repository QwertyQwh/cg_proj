import './style.css'


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 800,
    height: 600
}

const cursor = {
    x :0,
    y:0
}

window.addEventListener("mousemove",(event)=>{
    cursor.x = event.clientX/sizes.width-.5;
    cursor.y = event.clientY/sizes.height-.5;
})




const tick = () =>
{
    console.log('tick')


    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()