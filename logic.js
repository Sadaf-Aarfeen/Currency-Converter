const base_URL = "https://api.frankfurter.app/latest?from=";

const fromTo = document.querySelectorAll(".from-to select");
const btn = document.querySelector(".btn");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".mess");

for(let select of fromTo) {
    for(currencyCode in countryList) {
        let newOpt = document.createElement("option");
        newOpt.innerText = currencyCode;
        newOpt.value = currencyCode;
        if(select.name === "from" && currencyCode === "USD") {
            newOpt.selected = "selected";
        } else if(select.name === "to" && currencyCode === "INR") {
            newOpt.selected = "selected";
        } 
        select.append(newOpt);
    }
    select.addEventListener("change", (evt)=> {
        updateFlag(evt.target)
    })
}
const updateFlag = (element)=> {
    let currencyCode = element.value;
    let countryCode = countryList[currencyCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
}
btn.addEventListener("click", (evt)=> {
    evt.preventDefault();
    exchangeRate();
});
const exchangeRate = async()=> {
    let amount = document.querySelector(".inp input");
    let amtVal = amount.value;
    let URL = `${base_URL}${fromCurr.value}&to=${toCurr.value}`;  //USD&to=EUR
    let data = await fetch(URL);
    let rate = await data.json();
    let exchangeRate = rate.rates[toCurr.value];
    let finalRate = exchangeRate*amtVal;
    console.log(finalRate);
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalRate} ${toCurr.value}`;
}