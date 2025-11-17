function getdate(){
    let Newdata = new Date();
    let day = Newdata.getDate();
    let month = Newdata.getMonth() + 1;
    let year = Newdata.getFullYear();

    return `${day}.${month}.${year}`;
}

function checkDate(UserDate){ // To Check if current date matches with the wanted date (as in clicked item) 
    const [day,month,year] = UserDate.split('.').map(Number);

    //Salli vain jos on joulukuu eli month = 12
    if(month !== 12){
        console.log("Ei ole jolukuu, kalenteri suljettu");
    }

    //luodaan lista mihin tallennetaan avatut kalenterit
    let daysStatus = [];
    for(let i = 1; i <= 24; i++){
        daysStatus.push({date: i, opened: 0,disabled: 0}); //status = 0: Ei avattu
    }

    // Update allowed days based on provided date
    document.querySelectorAll('.days li').forEach(li => {
        const liDay = parseInt(li.dataset.day);
        
        if(liDay > day){
            daysStatus[liDay -1].disabled = 1;
            
        }
        
        li.addEventListener('click', () => {
            if(daysStatus[liDay-1].disabled === 1){
                alert("You can't open this day yet!");
                return;
            }
            // Mark as opened
            
            daysStatus[liDay - 1].opened = 1;
            console.log(daysStatus);
        });
    });

    console.log(daysStatus);
    console.log("Given date: " + UserDate);
}

document.getElementById("Date").innerHTML = getdate();

checkDate("12.12.2025");