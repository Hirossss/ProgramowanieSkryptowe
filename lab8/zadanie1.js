function funkcja_zwrotna() {
    const poleTekstoweValue = document.forms[0].elements[0].value;
    const poleLiczboweValue = document.forms[0].elements[1].value;

    console.log(`${poleTekstoweValue}:${typeof poleTekstoweValue}`);
    console.log(`${poleLiczboweValue}:${typeof poleLiczboweValue}`);
}

function wprompt(){
    for (let i = 0; i<4; i++){
        const userInput = window.prompt("","Wprowadz cos")
        console.log(`${userInput}:${typeof userInput}`)
    }
}