var algorithmSelect = document.getElementById("algorithmSelect");
var keyInputBox = document.getElementById("keyInputBox");
var keyInput = document.getElementById("keyInput");
var isProcessTypeEncryption = document.getElementById("processEncyption");
var input = document.getElementById("input");

var outputBox = document.getElementById("outputBox");
var outputDetails = document.getElementById("outputDetails");
var outputOfProcess = document.getElementById("outputOfProcess");

const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];

function process() {
    var choice = "";
    if (algorithmSelect.selectedOptions[0].value == "none"){
        alert("Please choose the algorithm");
        return;
    } else if (input.value == "" ){
        alert("Please fill the input first");
        return;
    }
    if (algorithmSelect.selectedOptions[0].value == "rf") {
        if (isProcessTypeEncryption.checked) {
            choice = "Rail Fence Encryption Output (key:" + keyInput.value + "):"
            railFenceEnc(eval(keyInput.value));
        } else {
            choice = "Rail Fence Decryption Output (key:" + keyInput.value + "):"
            railFenceDec(eval(keyInput.value));
        }
    } else if (algorithmSelect.selectedOptions[0].value == "c") {
        if (isProcessTypeEncryption.checked) {
            choice = "Caesar Cipher Encryption Output (key:" + keyInput.value + "):"
            CeaspherEnc(eval(keyInput.value));
        } else {
            choice = "Caesar Cipher Decryption Output (key:" + keyInput.value + "):"
            CeaspherDec(eval(keyInput.value));
        }
    }
    outputBox.classList.remove("d-none");
    outputDetails.innerText = choice;
}

function CeaspherEnc(key) {
    var encryptedMessage = "";
    var message = input.value.toUpperCase().replace(/ /g, "");

    for (var i = 0; i < message.length; i++) {
        var encryptedIndex = eval(alphabet.indexOf(message[i])) + eval(key);
        encryptedMessage += alphabet[encryptedIndex % alphabet.length];
    }

    outputOfProcess.innerText = encryptedMessage;
}

function CeaspherDec(key) {
    var decryptedMessage = "";
    var message = input.value.toUpperCase().replace(/ /g, "");

    for (var i = 0; i < message.length; i++) {
        var decryptedIndex = Math.abs(alphabet.indexOf(message[i]) - key);
        decryptedMessage += alphabet[decryptedIndex];
    }

    outputOfProcess.innerText = decryptedMessage;
}

function getTerm(iteration, row, size) {
    if ((size == 0) || (size == 1)) {
        return 1;
    }
    if ((row == 0) || (row == size - 1)) { // Max. distance is achieved at the ends and equally (size-1)*2
        return (size - 1) * 2;
    }

    if (iteration % 2 == 0) { // In the description of the method above this identity is demonstrated
        return (size - 1 - row) * 2;
    }
    return 2 * row;
}

function railFenceEnc(key) {
    var encryptedMsg = "";

    for (var row = 0; row < key; row++) {
        var iter = 0;
        for (var i = row; i < input.value.length; i += getTerm(iter++, row, key)) {
            encryptedMsg += input.value.charAt(i);
        }
    }

    outputOfProcess.innerText = encryptedMsg;
}

function railFenceDec(key) {
    var decryptedMsg = input.value.split("");

    var pos = 0;
    for (var row = 0; row < key; row++) {
        var iter = 0;
        for (var i = row; i < input.value.length; i += getTerm(iter++, row, key)) {
            decryptedMsg[i] = input.value.charAt(pos++)
        }
    }
    decryptedMsg = decryptedMsg.join("");

    outputOfProcess.innerText = decryptedMsg;
}