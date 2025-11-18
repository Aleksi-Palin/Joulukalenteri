

function getdate(){
    let Newdata = new Date();
    let day = Newdata.getDate();
    let month = Newdata.getMonth() + 1;
    let year = Newdata.getFullYear();

    return `${day}.${month}.${year}`;
}

function checkDate(UserDate){ // To Check if current date matches with the wanted date (as in clicked item) 
    let raw = getCookie("doordata");
    let daysStatus = JSONTodoordata(raw);

    // if doordata is null → create it
    if (!daysStatus) {
        daysStatus = JSON.parse(createDoordata());
        updateCookie(daysStatus);
    }

    const [day,month,year] = UserDate.split('.').map(Number);

    //Salli vain jos on joulukuu eli month = 12
    if(month !== 12){
        console.log("Ei ole jolukuu, kalenteri suljettu");
    }


    // Update allowed days based on provided date
    document.querySelectorAll('.days li').forEach(li => {
        const liDay = parseInt(li.dataset.day);

        if (daysStatus[liDay - 1].opened === 1) {
            li.classList.add("opened");
        }
        
        if(liDay > day){
            daysStatus[liDay -1].disabled = 1;
            
        }
        if (daysStatus[liDay - 1].disabled === 1) {
            li.classList.add("locked"); // optional CSS usage
        }
        
        li.addEventListener('click', () => {
            if(daysStatus[liDay-1].disabled === 1){
                alert("You can't open this day yet!");
                return;
            }
            // Mark as opened
            
            daysStatus[liDay - 1].opened = 1;
            li.classList.add("opened");
            updateCookie(daysStatus);
        });
    });

    updateCookie(daysStatus);
    
}


document.getElementById("Date").innerHTML = getdate();

checkDate("12.12.2025");

//korjataan jossain kohtaa
//const audio = document.getElementById("myAudio");
//audio.play();   // plays the audio