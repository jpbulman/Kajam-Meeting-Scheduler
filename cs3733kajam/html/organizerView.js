var url = window.location.href;
var setOfParams = "";
var q = "";

function updateView(json){
    console.log(json);
    document.getElementById("schName").innerHTML = json["name"];

    var startMonth = parseInt(json["startDate"]["month"]);
    var startDay = parseInt(json["startDate"]["day"]);
    var startYear = parseInt(json["startDate"]["year"]);

    var duration = parseInt(json["meetingDuration"]);

    // var startingDate = new Date(startMonth+" "+startDay+" "+startYear);

    // document.getElementById("mon").innerHTML = '<button type="button"><</button> Mon</br>'+startingDate.toDateString();

    var dayStartHour = parseInt(json["startTime"]["hour"]);
    var dayEndHour = parseInt(json["endTime"]["hour"]);

    var currHour,currMinute, i;
    for(currHour = dayStartHour, currMinute = 0, i=1;currHour<dayEndHour;i++){
        
        var row = document.getElementById("scheduleTable").insertRow(i);
        var head = row.insertCell(0);

        currMinuteStr = (currMinute==0)? "00":currMinute;

        enderHour = currHour;
        enderMinute = (currMinute+duration);

        if(enderMinute==60){
            enderMinute="00";
            enderHour++;
        }

        head.innerHTML = currHour+":"+currMinuteStr+" - "+enderHour+":"+enderMinute;

        // Populate rest of the row
        for(var a=1;a<=5;a++){
            row.insertCell(a);
        }

        if(currMinute+duration == 60){
            currMinute = 0;
            currHour++;
        }
        else{
            currMinute+=duration;
        }
    }

}

for(var i=0;i<url.length;i++){
    if(url.substring(i,i+1)==="?"){
        i++;
        for(var j=i;j<url.length;j++){
            setOfParams+=url.substring(j,j+1);
        }
    }
}

q=setOfParams;

urlParameters = {}

for(var k=0;k<setOfParams.length;k++){
    keyName = ""

    while(setOfParams.substring(k,k+1) != "="){
        keyName+=setOfParams.substring(k,k+1);
        k++;
    }
    k++;

    if(k==setOfParams.length){
        break;
    }

    value = ""

    while(setOfParams.substring(k,k+1)!="&"){
        value+=setOfParams.substring(k,k+1);
        k++;
        if(k==setOfParams.length){
            break;
        }
    }

    urlParameters[keyName]=value;
}

getBackParameters = {}

getUrl = "https://f1a5ytx922.execute-api.us-east-2.amazonaws.com/Beta/scheduleid"
xhr = new XMLHttpRequest();
xhr.open("POST",getUrl,true);

sender = {}

sender["arg1"] = urlParameters["id"];
sender["arg2"] = urlParameters["secretCode"];
sender = JSON.stringify(sender);

xhr.send(sender);

console.log(sender);

xhr.onloadend = function(){

    if(xhr.readyState == XMLHttpRequest.DONE){
        console.log(xhr.responseText);
        getBackParameters = JSON.parse(JSON.parse(xhr.responseText)["body"]);
        updateView(getBackParameters);
    }
    else{
        console.log("POST request failed, either a connectiivity issue or a problem with the server");
    }

};
console.log(getBackParameters["name"]);