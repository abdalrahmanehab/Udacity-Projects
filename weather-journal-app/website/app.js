/* Global Variables */
// Personal API Key for OpenWeatherMap API
const apiKeyName = "&appid=72e152aafefca55befb98461cb2ec0e5&units=imperial";
const apiLink ="";
const zipElement =document.querySelectorAll('#zip');
const feelingsElement = document.querySelectorAll('#feelings');
const dateElementInfo = document.querySelectorAll('#date');
const tempElementInfo = document.querySelectorAll('#temp');
const contentElementInfo = document.querySelectorAll('#content');
const generateElement = document.getElementById('generate')

const catchError = function(error) {
    console.error('There are some errors',  error );
}

// Event listener to add function to existing HTML DOM element
generateElement.addEventListener('click' , generateFunc);

function generateFunc(){
    let data ={
        zipCode: zipElement.value,
        content: feelingsElement.value,
        date: new Date()
    };

    getZipInfo(data.zipCode).then(zipInfo => {
        if(zipInfo.cod != 200) 
            return alert (zipInfo.message)
    
            data.temp = zipInfo.list[0].main.temp;
            postDateToServer(data);
    
    }).catch(catchError);
}



//get zip code info 
async function getZipInfo(zipCode) {
    return await
    (await
        fetch( `http://api.openweathermap.org/data/2.5/forecast?zip=${zipCode} ${apiKeyName}`)).json()
}

/* Function to POST data */

async function postDateToServer(data) {
    let res = await fetch(`${apiLink}postAllData`, {
        method: 'POST' ,
        headers: { 'content-Type' : 'application/json'},
        body:  JSON.stringify(data),
    });
    try {
        if (!res.ok) {
            alert('Process is not sucessful');
            return;
        }

        res.json().then(data => {
            if(res.ok)
            UpdateUserInterface();
            else
            alert('Process is not sucessful');

        }).catch(catchError);

    }catch (error) {
        catchError(error);
    }
}

// update user interface
async function UpdateUserInterface() {
    let res = await fetch(`${apiLink}getAllData`);
    try {
        res.json().then(data => {
            dateElementInfo.innerHTML =`The Date Is : ${data.date}`;
            tempElementInfo.innerHTML =`The Temp Is : ${data.temp}`;
            contentElementInfo .innerHTML =`I feel : ${data.content}`;

        }).catch(catchError);
    } catch (error) {
        catchError(error);
    }
}







// Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();