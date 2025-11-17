function getdate(){
    let Newdata = new Date();
    let day = Newdata.getDate();
    let month = Newdata.getMonth() + 1;
    let year = Newdata.getFullYear();
    let today = `${day}.${month}.${year}`;

    document.getElementById("Date").innerHTML = today;
    console.log("Today: "+today);
}

getdate();