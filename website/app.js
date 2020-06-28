/* Global Variables */
const submitBtn = document.getElementById('generate');
const baseURL = 'http://api.openweathermap.org/data/2.5/weather',
      apiKEY = 'e9c1dddbf80e99c5a119761cb9576e86&units=imperial';
// Create a new date instance dynamically with JS
let d = new Date();
let newDate = (d.getMonth() + 1 ) +'.'+ d.getDate()+'.'+ d.getFullYear();

submitBtn.addEventListener('click', GetTemSendTem);

function GetTemSendTem() {
    let feelings = document.getElementById('feelings').value,
        zipCode = document.getElementById('zip').value;

    

    // Async GET
    const GetTemp = async (baseUrl,zipCode, apiKey) => {
        const request = await fetch(baseUrl + '?zip=' + zipCode + ',us&appid=' + apiKey);
        try {
            // Transform into JSON
            const whatherData = await request.json();
            console.log(whatherData);
            
            return whatherData.main.temp ;
        }
        catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
    };

    const sendTemp = async (url = '', data = {}) => {

        const response = await fetch(url, {
            method: 'POST',
            credentials: 'same-origin',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data), // body data type must match "Content-Type" header
        });

        try {
            console.log('response', response.body);
            return;
        } catch (error) {
            console.log("error", error);
        }
    };

    // Async GET
    const GetDataUpdataUI = async (url) => {
        const request = await fetch(url);
        try {
            // Transform into JSON
            const allData = await request.json();
            console.log('allData', allData);
            
            document.getElementById('temp').innerHTML = 'Temperature: ' + allData.temperature;
            document.getElementById('date').innerHTML = 'Date: ' + allData.date;
            document.getElementById('content').innerHTML = 'Fleelings: ' + allData.user_response;
        }
        catch (error) {
            console.log("error", error);
            // appropriately handle the error
        }
    };


    // TODO-Chain your async functions to Get Temp. then Post it To servers then Get all DAta
    function getSendTempAndUpdateUI() {
        GetTemp(baseURL, zipCode, apiKEY )
            .then(function (temp) {
                let newEntryObj = {
                    "temperature": temp,
                    "date": newDate,
                    "user_response": feelings
                };
                sendTemp('/add', newEntryObj )
                    .then(function (data) {
                        GetDataUpdataUI('/allData');
                    })
            })
    };

    getSendTempAndUpdateUI();
}