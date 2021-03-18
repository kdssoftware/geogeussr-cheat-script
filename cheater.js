let api = "YOUR API KEY FROM OPENCAGEDATE HERE"; //opencagedata.com
let foundUrl=false;
let script = "";
let i = 0
while(!foundUrl){
    for(let s of document.getElementsByTagName("script")){
        const regex = /GeoPhotoService/g;
        const found = s.src.match(regex);
        if(found && found.length!==0){
            foundUrl = true;
            let raw = await fetch(s.src).then(r=>r.text())
            //console.log(raw);
            const regexRaw = /\[null,null,-?\d{1,}\.\d{1,},-?\d{1,}\.\d{1,}\]/g
            const rawCoords = raw.match(regexRaw);
            //console.log(rawCoords);
            const rawCoord = rawCoords[0].replace("[null,null,","").replace("]","").split(",")
            //console.log(rawCoords);
            const lat = Number(rawCoord[0]);
            const lng = Number(rawCoord[1]);
            let rawInfo= await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${api}`).then(r=>r.json())
            //console.log(lat,lng,rawInfo);
            console.log(rawInfo.results[0].components.country);
        }
    }
    i++;
    if(i===100000){
        throw "timeout"
    }
}