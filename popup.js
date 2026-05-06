"use strict";
window.addEventListener("load", (function() {
    const e = document.getElementById("handRaiseButtonContainer").childNodes[1];
    e.addEventListener("click", (function() {
        if (e.parentElement.className.split(" ").indexOf("disabled") >= 0) {
            return
        }
        chrome.runtime.sendMessage({
            action: "popup",
            popup: "handRaiseClick"
        }, se)
    }));
    const t = document.getElementById("chatButtonContainer").childNodes[1];
    t.addEventListener("click", (function() {
        if (t.parentElement.className.split(" ").indexOf("disabled") >= 0) {
            return
        }
        chrome.runtime.sendMessage({
            action: "popup",
            popup: "startChatClick"
        }, se)
    }));
    document.addEventListener("keydown", (function(e) {
        const t = e.target;
        if (t.classList.contains("tpBtn") && !t.classList.contains("disabled") && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            t.click()
        }
    }));
    chrome.runtime.sendMessage({
        action: "popup",
        popup: "hello"
    }, se)
}));

function se(e) {
    if (chrome.runtime.lastError) {
        console.log("Error while sending message=" + chrome.runtime.lastError.message)
    }
    if (!e) {
        window.close();
        return
    }
    const t = e["raiseHandEnabled"];
    const n = e["isHandRaised"];
    const a = e["canStartChat"];
    const s = e["isSharingScreen"];
    console.log("Hand Raise " + (t ? "allowed" : "not allowed") + ". Hand " + (n ? "is raised" : "isn't raised") + " Student " + (a ? "can" : "cannot") + " start a chat");
    ae(t);
    if (typeof a !== "undefined") {
        de(a)
    }
    if (t === true) {
        le(n)
    } else {
        le(false)
    }
    ce(s)
}

function ae(e) {
    const t = document.getElementById("tpRaiseHandButton");
    if (e) {
        document.getElementById("handRaiseButtonContainer").setAttribute("class", "btn-container");
        document.getElementById("handRaiseAlert").style.display = "none";
        t.removeAttribute("aria-disabled")
    } else {
        document.getElementById("handRaiseButtonContainer").setAttribute("class", "btn-container disabled");
        document.getElementById("handRaiseAlert").style.display = "block";
        t.setAttribute("aria-disabled", "true")
    }
    t.innerHTML = "Raise hand"
}

function de(e) {
    const t = document.getElementById("tpStartChatButton");
    if (e) {
        document.getElementById("chatButtonContainer").setAttribute("class", "btn-container");
        document.getElementById("startChatAlert").style.display = "none";
        t.removeAttribute("aria-disabled")
    } else {
        document.getElementById("chatButtonContainer").setAttribute("class", "btn-container disabled");
        document.getElementById("startChatAlert").style.display = "block";
        t.setAttribute("aria-disabled", "true")
    }
}

function le(e) {
    if (e) {
        document.getElementById("tpRaiseHandButton").innerHTML = "Cancel hand raise"
    } else {
        let e = "btn-container";
        if (document.getElementById("handRaiseButtonContainer").className.split(" ").indexOf("disabled") >= 0) {
            e += " disabled"
        }
        document.getElementById("handRaiseButtonContainer").setAttribute("class", e);
        document.getElementById("tpRaiseHandButton").innerHTML = "Raise hand"
    }
}

function ce(e) {
    if (e) {
        document.getElementById("screenShareStatus").style.display = "block"
    } else {
        document.getElementById("screenShareStatus").style.display = "none"
    }
}
