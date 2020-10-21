
let zxcvbn = null;
let locale = "en";

function Startup() {
    zxcvbn = new Zxcvbn(locale);
    document.getElementById("password")
        .addEventListener("input", () => {doit();}, false);
}

window.Startup = Startup;

async function doit() {
    const password = document.getElementById("password").value;
    if (!password) {
        document.getElementById("score").textContent = "";
        document.getElementById("rv").textContent = "";
        document.getElementById("json").textContent = "";
        document.getElementById("bars").className = "";
        return;
    }

    const result = await zxcvbn.evaluate(password);
    //document.getElementById("rv").textContent = JSON.stringify(result, null, 2);
    switch (result.score) {
        case -1:
            document.getElementById("score").textContent = "DANGEROUS";
            document.getElementById("bars").className = "DANGEROUS";
            break;
        case 0:
        case 1:
        case 2:
            document.getElementById("score").textContent = "WEAK";
            document.getElementById("bars").className = "WEAK";
            break;
        case 3:
            document.getElementById("score").textContent = "GOOD";
            document.getElementById("bars").className = "GOOD";
            break;
        case 4:
            document.getElementById("score").textContent = "STRONG";
            document.getElementById("bars").className = "STRONG";
            break;
    }

    document.getElementById("rv").textContent = result.feedback.warning + "\n" + result.feedback.suggestions.join("\n");
    document.getElementById("json").textContent = JSON.stringify(result, null, 2);
}

function ChangeLocale(aLocale) {
    locale = aLocale;
    zxcvbn = new Zxcvbn(locale);
    doit();
}

window.ChangeLocale = ChangeLocale;
