function createDoordata() { 
    let daysStatus = [];

    for (let i = 1; i <= 24; i++) {
        daysStatus.push({ date: i, opened: 0, disabled: 0 });
    }
    return JSON.stringify(daysStatus);
}

function setCookie(name, value, days) {
    const d = new Date();
    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "expires=" + d.toUTCString();

    document.cookie = `${name}=${encodeURIComponent(value)};${expires};path=/`;

    // ALWAYS ensure doordata exists
    if (getCookie("doordata") === "") {
        document.cookie = `doordata=${encodeURIComponent(createDoordata())};${expires};path=/`;
    }
}

function getCookie(name) {
    const decoded = decodeURIComponent(document.cookie);
    const parts = decoded.split(';');
    name = name + "=";

    for (let c of parts) {
        c = c.trim();
        if (c.indexOf(name) === 0) {
            return c.substring(name.length);
        }
    }
    return "";
}

function updateCookie(data) {
    const expires = "expires=Fri, 31 Dec 9999 23:59:59 GMT";
    const json = encodeURIComponent(JSON.stringify(data));
    document.cookie = `doordata=${json};${expires};path=/`;
}

function JSONTodoordata(json){
    if (!json || typeof json !== "string") return null;
    if (json.trim() === "") return null;

    try { return JSON.parse(json); }
    catch { console.warn("Invalid JSON", json); return null; }
}

function checkCookie() {
    

    let userId = getCookie("userId");
    let status = getCookie("doordata");



    if (userId === "") {
        userId = crypto.randomUUID();
        setCookie("userId", userId, 365);
        //console.log("Uusi eväste luotu:", userId);
    } else {
        console.log("Eväste löytyi:", userId);
    }

    console.log("ALL COOKIES RAW:", document.cookie);
    console.log("userId cookie:", userId);
    console.log("doordata (raw):", status);
    console.log("doordata (parsed):", JSONTodoordata(status));
    
    //console.log("data löytyi:", JSONTodoordata(status));
}

window.addEventListener('load', checkCookie);
