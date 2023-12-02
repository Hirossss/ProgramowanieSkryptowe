function sum_strings(a) {
    let sum = 0;
    let x = 0;
    for (const key of a) {
      x = parseInt(key);
      if (!isNaN(x)){
        sum += x;
      }
    }
    return sum
}

function funkcja_zwrotna() {
    const poleTekstoweValue = document.forms[0].elements[0].value;
    const poleLiczboweValue = document.forms[0].elements[1].value;

    console.log(`${poleTekstoweValue}:${typeof poleTekstoweValue}`);
    console.log(`${poleLiczboweValue}:${typeof poleLiczboweValue}`);
    
    let poleWynikowe = document.forms[0].elements[2];
    poleWynikowe.value = sum_strings([poleTekstoweValue,poleLiczboweValue]);
    console.log(`${poleWynikowe}:${typeof poleWynikowe}`);
}

function wprompt(){
    for (let i = 0; i<4; i++){
        const userInput = window.prompt("","Wprowadz cos")
        console.log(`${userInput}:${typeof userInput}`)
    }
}