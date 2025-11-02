let muenze = null;
let zeitSlider = null;
let zeitAnzeige = null;
let istAmWerfen = false;

document.addEventListener('DOMContentLoaded', function() {
    muenze = document.getElementById('muenze');
    zeitSlider = document.getElementById('drehzeit');
    zeitAnzeige = document.getElementById('zeit-anzeige');
    
    muenze.textContent = Math.random() < 0.5 ? '👑' : '2';
    
    muenze.addEventListener('click', werfeMuenze);
    
    zeitSlider.addEventListener('input', function() {
        zeitAnzeige.textContent = zeitSlider.value;
    });
});

function werfeMuenze() {
    if (istAmWerfen) return;
    
    istAmWerfen = true;
    const dauer = parseFloat(zeitSlider.value);
    
    muenze.style.animation = `wurf ${dauer}s ease-in-out`;
    
    setTimeout(function() {
        muenze.textContent = Math.random() < 0.5 ? '👑' : '2';
        muenze.style.animation = '';
        istAmWerfen = false;
    }, dauer * 1000);
}