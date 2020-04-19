/* Global Variables */
let debug = true;

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();
if (debug) {
    console.log(newDate);
}

//constants 
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&appid=dd98cc709575188c291eba4ecdc98541';


document.getElementById('generate').addEventListener('click', performAction);

/***********************************************************************************************************
 * NAME :     performAction(e)
 *
 * DESCRIPTION : This is a callback function that runs when user clicks "Generate" button
 *               - It uses chain promises to run in oreder
 *               - fetch the weather based on ZIP using external API
 *               - POST upadted data to server
 *               - update the UI element
 *
 * INPUTS :
 *       e: element the event was triggered for   
 *           
 * OUTPUTS 
 * 
 * USAGE: 
 *     document.getElementById('generate').addEventListener('click', performAction);
 * 
 ************************************************************************************************************/
function performAction(e) {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    if (debug) {
        console.log("zip: ", zipCode);
        console.log("feelings: ", feelings);
    }


    getWeather(baseURL, zipCode, apiKey)
        // New Syntax!
        .then(function(data) {
            // Add data
            if (debug) {
                console.log(data);
            }
            // for a worng zip code, rety=urn message city not found
            if (data.message === 'city not found') {
                postData('/addWeather', { date: newDate, temp: 'city not found', content: '' });

            } else {
                postData('/addWeather', { date: newDate, temp: `${data.name} Temp Today: ${data.main.temp} °F`, content: feelings });
            }


        })
        .then(function() {
            // call updateUI to update browser content
            updateUI()
        })
}

/***********************************************************************************************************
 * NAME :     getWeather(baseURL, zip, key)
 *
 * DESCRIPTION : This is an async function that fetches data from EXternal API
 *
 * INPUTS :
 *       baseURL: the URL to make a POST   
 *       zip: user input ZIP
 *       key: api key allocated 
 *           
 * OUTPUTS 
 *       data: data  returned from the external API.
 * USAGE: 
 *     getWeather(baseURL, zipCode, apiKey)
 * 
 ************************************************************************************************************/
const getWeather = async(baseURL, zip, key) => {

    const res = await fetch(baseURL + zip + ',us' + key + '&units=imperial')
    try {
        const data = await res.json();
        if (debug) {
            console.log("getWeather: no error: ", data);
        }
        return data;
    } catch (error) {
        console.log("getWeather: error", error);
        // appropriately handle the error
    }
}

/***********************************************************************************************************
 * NAME :     postData(url, data)
 *
 * DESCRIPTION : Sends a POST request to server, and returns the POST response
 *
 * INPUTS :
 *       url: the URL to make a POST   
 *       data: an object holding the data to POST
 *           
 * OUTPUTS 
 *       newData: response from the POST request
 * USAGE: 
 *     postData('/addDate', { date: newDate });
 * 
 ************************************************************************************************************/
const postData = async(url = '', data = {}) => {
    // console.log(data)
    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();
        if (debug) {
            console.log(newData);
        }
        return newData
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
}





/***********************************************************************************************************
 * NAME :     updateUI()
 *
 * DESCRIPTION : This is an async function that fetches GET data '/all' from server
 *               Update the UI accordigly
 *
 * INPUTS :
 *           
 * OUTPUTS 
 *      
 * USAGE: 
 *      updateUI()
 * 
 ************************************************************************************************************/
const updateUI = async() => {
    const request = await fetch('/all');
    try {
        const allData = await request.json();

        if (debug) {
            console.log("all Data", allData);
        }

        document.getElementById('date').innerHTML = `Date: ${allData.date}`;
        document.getElementById('temp').innerHTML = allData.temp;
        document.getElementById('content').innerHTML = allData.content;

    } catch (error) {
        console.log("error", error);
    }
}