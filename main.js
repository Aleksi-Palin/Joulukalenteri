
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
                alert("You can't open this day yet!");
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
    let target = new Date("2025-12-01");
    const [day,month,year] = date.split('.');
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

 let file = document.getElementById("myAudio");
  const sound = new Audio("musiik.mp3");

  function playSound() {
    sound.play();
  }
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


//document.getElementById("Date").innerHTML = getdate();



function main(date){
    daysUntil(date);
    checkDate(date);
    
    let tempdayStatus = getDaysStatus();
    console.log("kaiken koodin jälkeen ",tempdayStatus);
}

function TestSet(day,month,year){
    main(`${day}.${month}.${year}`);
    
}

//korjataan jossain kohtaa
//const audio = document.getElementById("myAudio");
//audio.play();   // plays the audio
main(getdate());