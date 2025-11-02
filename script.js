let muenze = null;
let hoehe = 0;
let fallSpeed = 0;
let animationId = null;
let istAmFallen = true;

document.addEventListener('DOMContentLoaded', function() {
    muenze = document.getElementById('muenze');
    muenze.textContent = Math.random() < 0.5 ? '👑' : '2';
    
    muenze.addEventListener('click', schubsHoch);
    
    startePhysik();
});

function schubsHoch() {
    hoehe += 50;
    fallSpeed = 0;
    istAmFallen = false;
    
    setTimeout(() => {
        istAmFallen = true;
    }, 200);
}

function startePhysik() {
    function physikLoop() {
        if (istAmFallen) {
            fallSpeed += 1.5;
            hoehe -= fallSpeed;
        }
        
        if (hoehe <= 0) {
            hoehe = 0;
            fallSpeed = 0;
            muenze.style.transform = `translateY(0px)`;
            if (Math.random() < 0.02) {
                muenze.textContent = Math.random() < 0.5 ? '👑' : '2';
            }
        } else {
            const rotation = hoehe * 3;
            muenze.style.transform = `translateY(-${hoehe}px) rotateY(${rotation}deg)`;
        }
        
        animationId = requestAnimationFrame(physikLoop);
    }
    physikLoop();
}