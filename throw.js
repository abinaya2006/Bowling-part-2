AFRAME.registerComponent("balls",{

    init:function(){
        this.throw()
    },

    throw:function(){
        window.addEventListener("keydown",e=>{
            if(e.key==="z"){
                var ball=document.createElement("a-entity")
                ball.setAttribute("gltf-model","models/ball/scene.gltf")
                ball.setAttribute("scale",{
                    x:2 ,y:2 , z:2
                })
                var cam=document.querySelector("#camera")
                pos=cam.getAttribute("position")
                ball.setAttribute("position",{
                    x:pos.x,
                    y:pos.y-1,
                    z:pos.z
                })

                var camera=document.querySelector("#camera").object3D
                var direction=new THREE.Vector3()
                camera.getWorldDirection(direction)

                ball.setAttribute("velocity",
                    direction.multiplyScalar(-10)    
                )
                var scene=document.querySelector("#scene")
                ball.setAttribute("dynamic-body",{
                    shape:"sphere",
                    mass:"0"
                })
                scene.appendChild(ball)

                ball.addEventListener("collide",this.removeBall)
            }
        })
    },

    removeBall:function(e){
        console.log(e.detail.target.el)
        console.log(e.detail.body.el)

        var element=e.detail.target.el
        var elementHit=e.detail.body.el

        if(elementHit.id.includes("pin")){

            elementHit.setAttribute("material",{
                
                mass:"1"
            })
            
            var impulse=new CANNON.Vec3(0,1,-15)
            var worldPoint=new CANNON.Vec3().copy(
                elementHit.getAttribute("position")
            )
            elementHit.body.applyForce(impulse,worldPoint)
            element.removeEventListener("collide",this.removeBall)
            
            var scene=document.querySelector("#scene")
            scene.removeChild(element)
            
        }

    }
})