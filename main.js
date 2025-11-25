function getdate(){
    let Newdata = new Date();
    let day = Newdata.getDate();
    let month = Newdata.getMonth() + 1;
    let year = Newdata.getFullYear();

    return `${day}.${month}.${year}`;
}

function getDaysStatus(){
    let raw = getCookie("doordata");
    return JSONTodoordata(raw);
}

function checkDate(UserDate){ // To Check if current date matches with the wanted date (as in clicked item) 
    let daysStatus = getDaysStatus();

    // if doordata is null → create it
    if (!daysStatus) {
        daysStatus = JSON.parse(createDoordata());
        updateCookie(daysStatus);
    }

    const [day,month,year] = UserDate.split('.').map(Number);


    // Update allowed days based on provided date
    document.querySelectorAll('.days li').forEach(li => {
        const liDay = parseInt(li.dataset.day);

        // Päivitä disabled-arvo luukun perusteella
        if (month === 12 && liDay <= day) {
            daysStatus[liDay - 1].disabled = 0;
        } else {
            daysStatus[liDay - 1].disabled = 1;
            daysStatus[liDay - 1].opened = 0;
        }

        // Päivitä luokat aluksi
        li.classList.toggle("opened", daysStatus[liDay - 1].opened === 1);
        li.classList.toggle("locked", !(month === 12 && liDay <= day));
      
         // Poistetaan mahdollinen aiempi handler ja rekisteröidään uusi, säilyttäen viite elementissä
        if (li._handleClick) {
            li.removeEventListener('click', li._handleClick);
        }

        li._handleClick = function HandleClick(){
            if(daysStatus[liDay - 1].disabled === 1){
                cantOpenDoor();
                console.log("Luukku ei voitu avata: ", daysStatus);
                return;
            } else {
                // Mark as opened
                daysStatus[liDay - 1].opened = 1;
                li.classList.add("opened");
                updateCookie(daysStatus);
                console.log("Luukku avattiin ", getDaysStatus());
            }
        };

        li.addEventListener('click', li._handleClick);
        
    });
    updateCookie(daysStatus);
    
    
}



function daysUntil(date){
    
    const [day,month,year] = date.split('.');
    let target = new Date(`${year}-12-01`);
    let today = new Date(`${year}-${month}-${day}`);

    let diffMill = target - today;

    let diffDays = Math.ceil(diffMill / (1000 * 60 * 60 * 24));
    console.log(diffDays + "päivää");
    if(diffDays > 0){
        document.getElementById("Date").innerHTML = `${diffDays} päivää joulukuuhun`;
    }else{
        document.getElementById("Date").innerHTML = date;
    }
}

function cantOpenDoor(){
    const imgSrc = "Media_Files/stop.png"; // vaihda polku haluamaksesi

    let overlay = document.getElementById("door-overlay");

    if (!overlay) {
        overlay = document.createElement("div");
        overlay.id = "door-overlay";
        overlay.style.cssText = [
            "position:fixed",
            "inset:0",
            "display:flex",
            "align-items:center",
            "justify-content:center",
            "background:rgba(0,0,0,0.4)",
            "pointer-events:none",
            "z-index:9999"
        ].join(";");

        // Sisältökontaineri, jotta kuva ja teksti fadoavat yhdessä
        const inner = document.createElement("div");
        inner.style.cssText = [
            "display:flex",
            "flex-direction:column",
            "align-items:center",
            "justify-content:center",
            "pointer-events:none"
        ].join(";");

        const img = document.createElement("img");
        img.src = imgSrc;
        img.alt = "Locked";
        img.style.cssText = [
            "max-width:80%",
            "max-height:80%",
            "opacity:0",
            "transition:opacity 200ms ease"
        ].join(";");

        const caption = document.createElement("div");
        caption.className = "door-caption";
        caption.textContent = "luukkua ei voi avata vielä";
        caption.style.cssText = [
            "color:#fff",
            "font-size:1.1rem",
            "margin-top:12px",
            "opacity:0",
            "transition:opacity 200ms ease",
            "text-align:center",
            "text-shadow:0 1px 3px rgba(0,0,0,0.6)"
        ].join(";");

        inner.appendChild(img);
        inner.appendChild(caption);
        overlay.appendChild(inner);
        document.body.appendChild(overlay);

        // trigger fade-in molemmille
        requestAnimationFrame(() => {
            img.style.opacity = "1";
            caption.style.opacity = "1";
        });
    } else {
        const img = overlay.querySelector("img");
        const caption = overlay.querySelector(".door-caption");
        if (img) img.style.opacity = "1";
        if (caption) caption.style.opacity = "1";
        if (overlay._timer) {
            clearTimeout(overlay._timer);
        }
    }

    // Poista overlay hiljaisesti: fade-out sitten DOM:sta
    overlay._timer = setTimeout(() => {
        const img = overlay.querySelector("img");
        const caption = overlay.querySelector(".door-caption");
        if (img) img.style.opacity = "0";
        if (caption) caption.style.opacity = "0";

        // odota fade-out animaatio ennen poistamista
        setTimeout(() => {
            if (overlay.parentNode) overlay.parentNode.removeChild(overlay);
            overlay._timer = null;
        }, 250);
    }, 1200);
}

function playAudio(){


    window.addEventListener("DOMContentLoaded", () => {

        const audio = document.getElementById("myAudio");
        const volumeSlider = document.getElementById("volume");

        function playSound() {
            audio.play();
        }

        // Make playSound available globally (button needs it)
        window.playSound = playSound;

        // Volume slider
        volumeSlider.addEventListener("input", function () {
            audio.volume = this.value;
        });

    });
}




function main(date){
    daysUntil(date);
    checkDate(date);
    playAudio();
    
    let tempdayStatus = getDaysStatus();
    console.log("kaiken koodin jälkeen ",tempdayStatus);
}

function TestSet(day,month,year){
    main(`${day}.${month}.${year}`);
    
}


main(getdate());