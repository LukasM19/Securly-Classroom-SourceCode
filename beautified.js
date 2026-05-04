const e = "https://deviceconsole.securly.com";
const t = ["kidsa-z.com/main/Login", "richmondlp.com"];
const n = chrome.runtime.getManifest().version;
const s = chrome.runtime.getManifest().manifest_version;
const o = typeof chrome.offscreen === "undefined";
const i = "/chrome/handle";
const r = "/chrome/fire";
const a = 412;
const c = "authenticate";
const l = "get_org_url";
const u = "chrome_hand_raised";
const d = "chrome_idle_status_change";
const h = "chrome_login";
const m = "chrome_lost_mode_on";
const f = "chrome_send_message";
const g = "chrome_call";
const w = "chrome_auth_confirm";
const p = "chrome_change_device_name";
const y = "chrome_change_server_url";
const b = "chrome_device_not_found";
const v = "chrome_get_location";
const k = "chrome_login_confirmation";
const I = "chrome_update_logging";
const C = "chrome_enable_lost_mode";
const S = "chrome_blocking_plan";
const T = "chrome_chat_message";
const E = "chrome_session";
const U = "chrome_session_update";
const A = "chrome_clear_raised_hand";
const L = "chrome_close_tab";
const _ = "chrome_focus_tab";
const R = "chrome_get_tabs";
const N = "chrome_lock_screen";
const O = "chrome_open_site";
const P = "chrome_get_screenshot";
const x = "chrome_screen_share";
const M = "chrome_site_lock";
const W = "chrome_teacher_message";
const D = "chrome_teacher_screen_share";
const B = "chrome_unlock";
const H = "device not found";
const q = "chrome_upgrade";
const F = "blocklist";
const J = "lostModeType";
const z = "isChromeBook";
const G = "blockingPlanUrls";
const V = "blockingPlanName";
const j = "blockingPlanId";
const Q = "blockType";
const Y = "deviceName";
const K = "allowContactAdmin";
const $ = "allowCaptureScreen";
const X = "notificationInterval";
const Z = "orgName";
const ee = "screenBlockMessage";
const te = "serverUrl";
const ne = "udid";
const se = "updateCheckDate";
const oe = "visitedUrls";
const ie = "whitelist";
const re = "block";
const ae = "none";
const ce = "Allow_only";
const le = "Block_only";
const ue = "repeatLogin";
const de = "restartPolling";
const he = "restartForUpgrade";
const me = "sendUrls";
const fe = "ping";
const ge = "showWarning";
const we = "X-TabPilot-RegCode";
const pe = 80 * 1e3;
const ye = -1;
const be = "session_start";
const ve = "screen_sharing";
const ke = ["accounts.google.com", "accounts.youtube.com", "canvaslms.com"];
const Ie = ["classroom.google.com", "docs.google.com", "assignments.google.com"];
const Ce = [{
    id: 1,
    priority: 1,
    action: {
        type: "redirect",
        redirect: {
            url: ""
        }
    },
    condition: {
        urlFilter: "*",
        excludedInitiatorDomains: [chrome.runtime.id, e.replace("https://", ""), "deviceconsole.securly.com", "techpilotlabs.com"],
        excludedRequestDomains: [e.replace("https://", ""), "deviceconsole.securly.com", "techpilotlabs.com"],
        resourceTypes: ["main_frame"]
    }
}];
const Se = {
    action: {
        type: "allow"
    },
    id: 0,
    priority: 2,
    condition: {
        resourceTypes: ["main_frame"],
        urlFilter: "||instructure.com/login"
    }
};
const Te = {
    action: {
        type: "allow"
    },
    id: 0,
    priority: 2,
    condition: {
        resourceTypes: ["main_frame"]
    }
};
const Ee = {
    action: {
        type: "allow"
    },
    id: 0,
    priority: 2,
    condition: {
        requestDomains: ["docs.google.com"],
        initiatorDomains: ["classroom.google.com"],
        resourceTypes: ["main_frame"]
    }
};
const Ue = {
    id: 0,
    priority: 1,
    action: {
        type: "redirect",
        redirect: {
            url: ""
        }
    },
    condition: {
        regexFilter: "",
        resourceTypes: ["main_frame"]
    }
};
const Ae = "Class session is active";
const Le = "update_available";
const _e = "throttled";
const Re = Object.freeze({
    SMALL: "SMALL",
    BIG: "BIG",
    FULL: "FULL"
});
const Ne = {};
var Oe = null;
var Pe = null;
var xe = null;
const Me = false;
const We = true;
const De = "com.securly.classroom_native_host";
const Be = "handshake";
const He = "win_not_allowed";
const qe = "device_not_supported";

function Fe(e) {
    return new Promise(((t, n) => {
        chrome.tabs.query(e, (function(e) {
            if (chrome.runtime.lastError) {
                console.log("Cannot get chrome tabs: " + chrome.runtime.lastError.message)
            }
            t(e)
        }))
    }))
}

function Je() {
    return new Promise((e => {
        chrome.windows.getAll({
            populate: true
        }, (t => {
            e(t)
        }))
    }))
}
async function ze(e) {
    return new Promise(((t, n) => {
        chrome.windows.get(e, (e => {
            if (chrome.runtime.lastError) {
                n(chrome.runtime.lastError.message)
            } else {
                t(e)
            }
        }))
    }))
}

function Ge() {
    return new Promise((e => {
        chrome.windows.getLastFocused(null, (function(t) {
            e(t)
        }))
    }))
}

function Ve(e) {
    return new Promise((t => {
        const n = {
            focused: true,
            state: "normal",
            type: "normal"
        };
        if (e) {
            n["url"] = e;
            if (Oe.maxOpenTabs > 0 && e.length > Oe.maxOpenTabs) {
                Oe.additionalOpenTabs = e.length - Oe.maxOpenTabs
            }
        }
        chrome.windows.create(n, (e => {
            t(e)
        }))
    }))
}
async function je(e) {
    const t = {
        focused: true,
        state: "fullscreen"
    };
    try {
        await Qe(e, t)
    } catch (e) {
        console.log("Error while update to fullscreen: " + chrome.runtime.lastError.message)
    }
}
async function Qe(e, t) {
    return new Promise(((n, s) => {
        chrome.windows.update(e, t, (function(e) {
            if (chrome.runtime.lastError) {
                s(chrome.runtime.lastError.message)
            } else {
                n()
            }
        }))
    }))
}
async function Ye(e) {
    return new Promise(((t, n) => {
        chrome.tabs.get(e, (function(e) {
            if (chrome.runtime.lastError) {
                n(chrome.runtime.lastError.message)
            }
            t(e)
        }))
    }))
}

function Ke(e) {
    return new Promise(((t, n) => {
        chrome.tabs.create(e, (function(e) {
            if (chrome.runtime.lastError) {
                n(chrome.runtime.lastError.message)
            } else {
                t(e)
            }
        }))
    }))
}
async function $e(e) {
    try {
        await chrome.tabs.remove(e)
    } catch (e) {
        console.log("Error closing tab: " + e)
    }
}
async function Xe(e) {
    const t = await Ye(e);
    if (t) {
        try {
            const n = await ze(t.windowId);
            await Qe(n.id, {
                focused: true
            });
            await ut(e, {
                active: true
            })
        } catch (e) {
            console.log("Error focusing tab: " + e)
        }
    } else {
        console.log("Not found tab with id=" + e)
    }
}

function Ze() {
    return new Promise(((e, t) => {
        chrome.tabs.captureVisibleTab((function(n) {
            if (chrome.runtime.lastError) {
                t(chrome.runtime.lastError.message)
            }
            if (typeof n === "undefined") {
                t("No screenshot captured")
            }
            e(n)
        }))
    }))
}
async function et() {
    return new Promise((e => {
        chrome.storage.local.get(null, (function(t) {
            if (chrome.runtime.lastError) {
                console.log("Error loading config from storage: " + chrome.runtime.lastError.message);
                e(new wt({}))
            }
            e(new wt(t))
        }))
    }))
}
async function tt() {
    return new Promise((e => {
        chrome.storage.local.get(oe, (t => {
            if (chrome.runtime.lastError) {
                console.log("Failed to load urls from local storage");
                e()
            } else {
                e(t[oe])
            }
        }))
    }))
}
async function nt() {
    if (typeof getSubstitutedEmail === "function") {
        return Promise.resolve(getSubstitutedEmail())
    }
    if (We && chrome.identity) {
        return new Promise((e => {
            const t = function(e) {
                return e && e.trim().length > 0 ? e : null
            };
            if (chrome.declarativeNetRequest) {
                chrome.identity.getProfileUserInfo({
                    accountStatus: "ANY"
                }, (function(n) {
                    e(t(n["email"]))
                }))
            } else {
                chrome.identity.getProfileUserInfo((function(n) {
                    e(t(n["email"]))
                }))
            }
        }))
    } else {
        return Promise.resolve(null)
    }
}
async function ot() {
    return new Promise(((e, t) => {
        if (chrome.enterprise && chrome.enterprise.deviceAttributes) {
            chrome.enterprise.deviceAttributes.getDirectoryDeviceId((function(t) {
                console.log("Start with requested directory device ID=" + t);
                e(t)
            }))
        } else {
            e(null)
        }
    }))
}
async function it() {
    return new Promise(((e, t) => {
        if (chrome.enterprise && chrome.enterprise.deviceAttributes) {
            chrome.enterprise.deviceAttributes.getDeviceSerialNumber((function(t) {
                e(t)
            }))
        } else {
            e(null)
        }
    }))
}

function rt() {
    return new Promise((e => {
        chrome.alarms.clearAll((t => {
            if (!t) {
                console.log("Alarms not cleared");
                if (chrome.runtime.lastError) {
                    console.log("Alarms clear error: " + chrome.runtime.lastError.message)
                }
            } else {
                console.log("All alarms cleared")
            }
            e()
        }))
    }))
}
async function at(e, t) {
    try {
        await ct(e, t)
    } catch (n) {
        const s = "Could not establish connection. Receiving end does not exist";
        if (n.indexOf(s) !== -1) {
            await lt(e);
            await ct(e, t)
        } else {
            throw n
        }
    }
}

function ct(e, t) {
    return new Promise(((n, s) => {
        chrome.tabs.sendMessage(e, t, (async function(e) {
            if (chrome.runtime.lastError) {
                s(chrome.runtime.lastError.message)
            } else {
                n()
            }
        }))
    }))
}

function lt(e) {
    return new Promise(((t, n) => {
        chrome.scripting.executeScript({
            target: {
                tabId: e,
                allFrames: false
            },
            files: ["teacherTools.js"]
        }, (function() {
            if (chrome.runtime.lastError) {
                console.log("Failed to inject scripts");
                n(chrome.runtime.lastError.message)
            } else {
                t()
            }
        }))
    }))
}

function ut(e, t) {
    if (!(typeof e === "number")) {
        return Promise.resolve()
    }
    return new Promise(((n, s) => {
        chrome.tabs.update(e, t, (function() {
            if (chrome.runtime.lastError) {
                s(chrome.runtime.lastError.message)
            } else {
                n()
            }
        }))
    }))
}

function dt() {
    return new Promise(((e, t) => {
        const n = {
            state: "fullscreen",
            type: "popup",
            focused: true,
            url: "blocking/block.html"
        };
        chrome.windows.create(n, (function(n) {
            if (chrome.runtime.lastError) {
                t(chrome.runtime.lastError.message)
            } else {
                e(n.id)
            }
        }))
    }))
}

function ht(e) {
    return new Promise(((t, n) => {
        chrome.windows.remove(e, (function() {
            if (chrome.runtime.lastError) {
                n(chrome.runtime.lastError.message)
            } else {
                t()
            }
        }))
    }))
}
async function mt() {
    return new Promise((e => {
        navigator.geolocation.getCurrentPosition((t => {
            const n = t.coords;
            const s = {
                latitude: n.latitude,
                longitude: n.longitude,
                accuracy: n.accuracy
            };
            console.log("Lat: " + n.latitude.toFixed(4) + " Lon: " + n.longitude.toFixed(4));
            e(s)
        }), (t => {
            console.log("Error: " + t.code + " " + t.message);
            const n = {
                error: t.message
            };
            e(n)
        }), {
            maximumAge: 6e5,
            timeout: 2e4
        })
    }))
}
async function ft(e) {
    return new Promise((t => {
        chrome.alarms.get(e, (e => {
            t(e)
        }))
    }))
}
async function gt(e) {
    return new Promise((t => {
        chrome.alarms.clear(e, (n => {
            console.log("Alarm '" + e + (n ? "' was cleared" : "' was not cleared"));
            t()
        }))
    }))
}
"use strict";
class wt {
    constructor(t) {
        this.items = t;
        this.items[Q] = "Allow_all";
        delete this.items[G];
        delete this.items[V];
        delete this.items[j];
        delete this.items[ie];
        this._defaultBlockMessage = "Your device is blocked";
        this.directoryDeviceId = null;
        this._pingCount = 0;
        this.isLoggedIn = false;
        this.announce = null;
        this.sessionId = null;
        this.activeClassNames = [];
        this.studentId = null;
        this.studentName = null;
        this.canRaiseHand = false;
        this.isHandRaised = false;
        this.tabListenersAdded = false;
        this.chatMessages = [];
        this.hasUnreadChatMessages = false;
        this.canStartChat = false;
        this.playChatAlert = false;
        this.closeTabsTimeout = null;
        this.lockedToCourseWorkResources = false;
        this.canvasAssignmentIds = [];
        this.maxOpenTabs = 0;
        this.additionalOpenTabs = 0;
        this.smallScreenshotWidth = 0;
        this.smallScreenshotHeight = 0;
        this.bigScreenshotWidth = 0;
        this.bigScreenshotHeight = 0;
        this.activeTabId = null;
        this.userEmail = null;
        this.teacherId = null;
        this.teacherName = null;
        this.conferenceUrl = null;
        this.blockWindowId = 0;
        this.loginErrorReason = null;
        this.shareScreenHandler = null;
        this.capturedScreen = null;
        this.rulesCount = 0;
        if (!t[te]) {
            this.items[te] = e
        }
        if (!t[ee]) {
            this.items[ee] = this._defaultBlockMessage
        }
        if (!t[J]) {
            this.items[J] = Me ? re : ae
        }
        if (!t[X]) {
            this.items[X] = 0
        }
        if (!t[$]) {
            this.items[$] = false
        }
        if (!t[K]) {
            this.items[K] = false
        }
        if (!t[z]) {
            this.items[z] = false
        }
        if (!t[se]) {
            this.items[se] = new Date("01 Jan 1970 00:00:00 GMT").getTime()
        }
    }
    updateClassSessionState(e) {
        this.sessionId = e["sessionId"] ? e["sessionId"] : null;
        this.canRaiseHand = !!e["allowHandRaise"];
        this.announce = null;
        this.hasUnreadChatMessages = false;
        this.chatMessages = e["chatMessages"] ? e["chatMessages"] : [];
        this.canStartChat = !!e["canStartChat"];
        this.playChatAlert = !!e["playChatAlertToStudent"];
        this.maximizeFocusedWindow = !!e["maximizeFocused"];
        this.maxOpenTabs = typeof parseInt(e["maxOpenTabs"]) === "number" ? parseInt(e["maxOpenTabs"]) : 0;
        this.additionalOpenTabs = 0;
        this.activeClassNames = e["activeClassNames"] ? e["activeClassNames"] : [];
        this.smallScreenshotWidth = e["smallScreenshotWidth"] ? e["smallScreenshotWidth"] : 0;
        this.smallScreenshotHeight = e["smallScreenshotHeight"] ? e["smallScreenshotHeight"] : 0;
        this.bigScreenshotWidth = e["bigScreenshotWidth"] ? e["bigScreenshotWidth"] : 0;
        this.bigScreenshotHeight = e["bigScreenshotHeight"] ? e["bigScreenshotHeight"] : 0
    }
    get serverUrl() {
        return this.items[te]
    }
    saveServerUrl(e) {
        return this.store(te, e)
    }
    get orgBlocklist() {
        return this.items[F]
    }
    async saveOrgBlocklist(e) {
        await this.store(F, e)
    }
    get blockingPlanUrls() {
        return this.items[G]
    }
    get blockingPlanName() {
        return this.items[V]
    }
    get blockingPlanId() {
        return this.items[j]
    }
    get blockingPlanType() {
        return this.items[Q]
    }
    async saveBlockingPlan(e, t, n, s) {
        await this.store(G, e);
        await this.store(V, t);
        await this.store(j, n);
        await this.store(Q, s)
    }
    get blockedModeType() {
        return this.items[J]
    }
    saveBlockedModeType(e) {
        return this.store(J, e)
    }
    get blockedText() {
        return this.items[ee] ? this.items[ee] : this._defaultBlockMessage
    }
    get deviceName() {
        return this.items[Y]
    }
    saveDeviceName(e) {
        return this.store(Y, e)
    }
    get deviceUdid() {
        return this.items[ne]
    }
    saveDeviceUdid(e) {
        return this.store(ne, e)
    }
    get isChromeBook() {
        return this.items[z]
    }
    saveIsChromeBook(e) {
        return this.store(z, e)
    }
    get isChatActive() {
        return this.chatMessages.length > 0
    }
    get isClassSessionActive() {
        return this.sessionId != null
    }
    get isObservationActive() {
        return this.sessionId != null || this.activeClassNames.length > 0
    }
    get isContactAdminAllowed() {
        return this.items[K]
    }
    get isScreenLocked() {
        return this.items[J] === re
    }
    get isScreenCaptureAllowed() {
        return this.items[$]
    }
    get isSiteLocked() {
        return !!this.items[ie]
    }
    get notificationInterval() {
        return this.items[X]
    }
    get orgName() {
        return this.items[Z]
    }
    get pingCount() {
        return this._pingCount++
    }
    clearPingCount() {
        this._pingCount = 0
    }
    get updateCheckDate() {
        return new Date(parseInt(this.items[se]))
    }
    async saveUpdateCheckDate(e) {
        return this.store(se, e.getTime())
    }
    get whitelist() {
        if (this.items[ie]) {
            return this.items[ie]
        }
        return this.items[Q] === ce ? this.items[G] : null
    }
    async saveWhitelist(e) {
        await this.store(ie, e)
    }
    async clearWhitelist() {
        this.lockedToCourseWorkResources = false;
        await this.store(ie, null)
    }
    async saveBlockedInfo(e, t, n, s, o) {
        let i = {};
        if (e) {
            i[ee] = e;
            this.items[ee] = e
        } else {
            i[ee] = this._defaultBlockMessage;
            this.items[ee] = this._defaultBlockMessage
        }
        if (t) {
            i[J] = t;
            this.items[J] = t
        }
        let r = "Stored screen block modeType: " + t + ", message: " + e;
        if (typeof s !== "undefined") {
            i[$] = s;
            this.items[$] = s;
            r += ", capture screen: " + s
        }
        if (typeof o !== "undefined") {
            i[K] = o;
            this.items[K] = o;
            r += ", allow contact admin: " + o
        }
        r += ", notification interval: ";
        if (typeof s !== "undefined" && n !== ye) {
            i[X] = n;
            this.items[X] = n;
            r += n
        }
        console.log(r);
        return this.bulkStore(i)
    }
    async saveDeviceInfo(e, t, n, s, o, i, r) {
        let a = {};
        a[Z] = e;
        this.items[Z] = e;
        a[Y] = t;
        this.items[Y] = t;
        a[J] = n;
        this.items[J] = n;
        a[ee] = s;
        this.items[ee] = s;
        a[X] = o;
        this.items[X] = o;
        a[K] = i;
        this.items[K] = i;
        a[$] = r;
        this.items[$] = r;
        return this.bulkStore(a)
    }
    store(e, t) {
        if (t) {
            this.items[e] = t;
            return new Promise((n => {
                chrome.storage.local.set({
                    [e]: t
                }, (function() {
                    if (chrome.runtime.lastError) {
                        console.log("Failed to save object " + JSON.stringify(t) + " for key '" + e + "'. Error is: " + chrome.runtime.lastError.message)
                    } else {
                        console.log("Stored " + JSON.stringify(t) + " for key: " + e)
                    }
                    n()
                }))
            }))
        } else {
            delete this.items[e];
            return new Promise((t => {
                chrome.storage.local.remove([e], (function() {
                    if (chrome.runtime.lastError) {
                        console.log("Failed to remove key '" + e + "'. Error is: " + chrome.runtime.lastError.message)
                    } else {
                        console.log("Key '" + e + "' removed")
                    }
                    t()
                }))
            }))
        }
    }
    bulkStore(e) {
        return new Promise((t => {
            chrome.storage.local.set(e, (function() {
                if (chrome.runtime.lastError) {
                    console.log("Failed to bulk save '" + JSON.stringify(e) + "'. Error is: " + chrome.runtime.lastError.message)
                } else {
                    console.log("Items " + JSON.stringify(e) + " saved")
                }
                t()
            }))
        }))
    }
    bulkDelete(e) {
        return new Promise((t => {
            chrome.storage.local.remove(e, (function() {
                if (chrome.runtime.lastError) {
                    console.log("Failed to remove keys " + e + " Error is: " + chrome.runtime.lastError.message)
                } else {
                    console.log("Keys " + e + " removed")
                }
                t()
            }))
        }))
    }
}
async function st() {
    await rt();
    if (We) {
        pn();
        Pe = new Gt;
        await Pe.noActiveClassIcon();
        Oe = await et()
    } else {
        Oe = new wt({})
    }
    xe = new vt(Oe.serverUrl);
    Oe.userEmail = await nt();
    if (Me) {
        requestBlockScreen(Oe.blockedText, Oe.blockedModeType, Oe.notificationInterval, Oe.isScreenCaptureAllowed, Oe.isContactAdminAllowed);
        updateVersion()
    }
    if (We) {
        const e = await tt();
        console.log("INIT URL STORAGE WITH URLS=" + JSON.stringify(e));
        Vn = new zt(e)
    }
    await pt();
    await _t()
}
async function pt() {
    const directoryDeviceId = await ot();
    if (directoryDeviceId) {
        Oe.directoryDeviceId = directoryDeviceId;
        await Oe.saveIsChromeBook(true)
    } else if (typeof substituteDeviceId === "function") {
        substituteDeviceId()
    }
}
async function yt() {
    try {
        if (yt.creating) {
            await yt.creating
        } else {
            yt.creating = chrome.offscreen.createDocument({
                url: "o.html",
                reasons: ["WORKERS"],
                justification: "keep connection to server"
            });
            await yt.creating
        }
        console.log("Offscreen document created");
        yt.creating = null
    } catch (e) {
        console.log("Failed to create offscreen document: " + e)
    }
}
yt.creating = null;
const stp = function() {
    console.log("Stopping the app");
    chrome.alarms.clearAll()
};
async function bt() {
    if (o) {
        return
    }
    if (bt.starting) {
        await bt.starting
    } else {
        bt.starting = yt().then(st);
        await bt.starting
    }
    bt.starting = null
}
bt.starting = null;
chrome.runtime.onSuspend.addListener((function() {
    console.log("App suspended")
}));
self.onmessage = e => {
    if (!Oe) {
        console.log("restarting app");
        st()
    }
};
"use strict";
class vt {
    constructor(e) {
        this.url = e;
        console.log("Router initialized for " + this.url);
        this.queue = [];
        this.isSending = false
    }
    static getAck(e) {
        if (e) {
            if (e["requestType"] === b) {
                throw new Error(H)
            }
            return {
                seq: e["seq"],
                response: e["requestType"]
            }
        } else {
            return {}
        }
    }
    updateUrl(e) {
        this.url = e;
        console.log("Router url updated=" + this.url)
    }
    async sendCommand(e) {
        Object.assign(e, {
            version: n,
            udid: Oe.deviceUdid,
            command: "ack"
        });
        this.queue.push(e);
        return await this.processQueue()
    }
    cleanSent() {
        this.queue = this.queue.filter((e => !e["sent"]))
    }
    cleanQueue() {
        this.queue.splice(0, this.queue.length)
    }
    async processQueue() {
        let e = false;
        if (this.isSending) {
            return true
        }
        this.cleanSent();
        this.isSending = true;
        try {
            for (const e of this.queue) {
                console.log("Sending command=" + JSON.stringify(e));
                await this.send(e, r);
                console.info("Command " + JSON.stringify(e) + " sent successfully");
                e["sent"] = true
            }
            e = true
        } catch (t) {
            console.log("Failed to send command. Error=" + t);
            e = false
        } finally {
            this.isSending = false;
            this.cleanSent()
        }
        return e
    }
    async readCommands(e) {
        Object.assign(e, {
            version: n,
            udid: Oe.deviceUdid,
            command: "ack"
        });
        if (this.queue.length > 0) {
            await this.processQueue()
        }
        console.log("Sending ack=" + JSON.stringify(e));
        return await this.send(e, i)
    }
    async send(e, t) {
        const n = await fetch(this.url + t, {
            method: "POST",
            headers: {
                [we]: e["udid"],
                "Content-Type": "application/json; charset=UTF-8"
            },
            signal: AbortSignal.timeout(pe),
            body: JSON.stringify(e)
        });
        if (n) {
            if (n.status === 200) {
                let e = await n.text();
                if (e) {
                    try {
                        return JSON.parse(e)
                    } catch (t) {
                        if (e.length > 200) {
                            e = e.substring(0, 200) + "..."
                        }
                        throw new Error("FETCH: Incorrect response=" + e + ". Error=" + t)
                    }
                }
            } else if (n.status === a) {
                throw new Error(q)
            } else {
                throw new Error("FETCH: Server responded with http status=" + n.status)
            }
        }
    }
}
async function kt(e) {
    const t = Ne[e["requestType"]];
    if (typeof t !== "undefined") {
        return t(e)
    } else {
        console.log("Got unknown message: " + e["requestType"])
    }
}
async function It(e) {
    if (!e) {
        return Promise.resolve()
    }
    console.log("Process server commands: " + JSON.stringify(e));
    let t = e["commands"];
    if (t && t.length > 0) {
        return t.reduce(((e, t) => e.then(kt(t))), Promise.resolve())
    } else {
        return kt(e)
    }
}
async function Ct(e) {
    let t = e["commands"];
    if (t && t.length > 0) {
        return {
            responses: t.map((e => vt.getAck(e)))
        }
    } else if (e["requestType"]) {
        return {
            responses: [vt.getAck(e)]
        }
    }
    return {
        responses: []
    }
}
async function St() {
    console.log("Long polling started");
    if (We) {
        chrome.alarms.create(me, {
            periodInMinutes: 1
        })
    }
    const e = 3;
    let t = 0;
    let n = null;
    let s = true;
    while (s) {
        try {
            if (!n) {
                n = vt.getAck()
            }
            const e = await xe.readCommands(n);
            if (e) {
                n = await Ct(e).catch((() => {
                    s = false
                }));
                It(e).catch((t => {
                    if (Ft(t, H)) {
                        s = false
                    } else {
                        console.log("Failed to process action for one of responses:" + e + " error: " + t)
                    }
                }))
            } else {
                n = null
            }
        } catch (n) {
            if (!Oe.isLoggedIn) {
                chrome.alarms.create(ue, {
                    delayInMinutes: 1
                });
                console.log("Not logged in. Repeat login in 1 minute. Error: " + n);
                s = false
            } else if (Ft(n, q)) {
                s = false;
                await fs()
            } else {
                t += 1;
                if (t >= e) {
                    chrome.alarms.create(de, {
                        delayInMinutes: 1
                    });
                    console.log("Schedule server polling restart due to error=" + n);
                    s = false
                }
                console.log("Error #" + t + " while polling=" + n)
            }
        }
    }
    console.log("Long polling stopped");
    chrome.alarms.clear(me)
}
chrome.alarms.onAlarm.addListener(Tt);

function Tt(e) {
    console.log("Fired alarm " + e.name);
    switch (e.name) {
        case ge:
            if (!Oe.isScreenLocked) {
                requestBlockScreen(Oe.blockedText, Oe.blockedModeType, ye, Oe.isScreenCaptureAllowed, Oe.isContactAdminAllowed)
            }
            break;
        case ue:
            _t();
            break;
        case fe:
            if (typeof Es !== "undefined") {
                At()
            }
            break;
        case me:
            Lt();
            break;
        case he:
            chrome.runtime.reload();
            break;
        case de:
            chrome.alarms.clear(de);
            St();
            break;
        default:
            console.log("Cannot process alarm")
    }
}
async function Et(e, t) {
    if (Oe) {
        return fetch(Ut(Oe.serverUrl + e, JSON.stringify(t)))
    } else {
        throw new Error("No config")
    }
}

function Ut(e, t) {
    const n = t instanceof Blob && t.type ? t.type : "application/json; charset=UTF-8";
    const s = new Request(e, {
        method: "POST",
        headers: {
            [we]: Oe.deviceUdid,
            "Content-Type": n
        },
        signal: AbortSignal.timeout(pe),
        body: t
    });
    s.priority = "high";
    return s
}
async function At() {
    try {
        await Et("/agent/chrome/debug", {
            udid: Oe.deviceUdid,
            logString: "Ping " + Oe.pingCount,
            logNum: Es.logCount,
            logSource: "extension"
        });
        Es.logCount += 1
    } catch (e) {
        console.log("Cannot send ping: " + e)
    }
}
async function Lt() {
    if (!Vn || !Vn.hasUrls()) {
        return
    }
    if (Lt.isSending) {
        return
    }
    Lt.isSending = true;
    if (Oe.isClassSessionActive) {
        await es()
    }
    try {
        await Et("/agent/chrome/url", {
            udid: Oe.deviceUdid,
            urls: Vn.getUrls(),
            timestamp: Date.now()
        });
        console.log("Urls sent successfully");
        Vn.purge()
    } catch (e) {
        console.log("Error while sending urls: " + e)
    } finally {
        Lt.isSending = false
    }
}
async function _t(e) {
    console.log("Initiate login at " + new Date);
    await rt();
    xe.cleanQueue();
    try {
        await It(await Ot());
        await It(await Pt());
        if (!Oe.isChromeBook) {
            const e = await _n();
            if (e) {
                console.log("Windows agent is present. Terminating login");
                return
            }
        }
        const e = await xt();
        if (!e) {
            console.log("Failed to login. Repeat in 1 minute");
            chrome.alarms.create(ue, {
                periodInMinutes: 1
            });
            return
        }
        if (We) {
            chrome.action.onClicked.removeListener(_t);
            chrome.runtime.onMessage.removeListener(Cn)
        }
        if (typeof Es !== "undefined") {
            Es.logCount = 0
        }
        Oe.clearPingCount();
        Oe.loginErrorReason = null;
        St()
    } catch (t) {
        if (Ft(t, H)) {
            console.log("Failed to authenticate: " + t);
            console.log("Logout and login again to connect");
            if (e && Oe.loginErrorReason) {
                await Nt()
            }
        } else if (Ft(t, q)) {
            console.log("Extension upgrade required");
            await fs()
        } else {
            console.log("Failed to login: " + t);
            chrome.alarms.create(ue, {
                periodInMinutes: 1
            })
        }
    }
}

function Rt() {
    _t(true)
}
async function Nt() {
    chrome.runtime.onMessage.addListener(Cn);
    const e = chrome.runtime.getURL("disconnected.html");
    try {
        await Ke({
            url: e
        })
    } catch (e) {
        console.log("Cannot open not found page due to error: " + e)
    }
}
async function Ot() {
    const t = Oe.serverUrl === e;
    const s = Oe.directoryDeviceId;
    console.log("Request server url=" + t + " config.serverUrl=" + Oe.serverUrl + " udid=" + s);
    if (!t) {
        return Promise.resolve()
    }
    const o = {
        command: l,
        udid: s,
        kiosk: Me,
        userEmail: !Me ? Oe.userEmail : "kiosk",
        version: n,
        userAgent: navigator.userAgent
    };
    console.log("Get org url message=" + JSON.stringify(o));
    return xe.send(o, i)
}
async function Pt() {
    if (Oe.deviceUdid) {
        return Promise.resolve()
    }
    const e = {
        command: c,
        userEmail: Oe.userEmail,
        kiosk: Me,
        version: n,
        userAgent: navigator.userAgent
    };
    if (Oe.directoryDeviceId) {
        e["udid"] = Oe.directoryDeviceId
    } else {
        e["byod"] = true
    }
    console.log("Send AUTHENTICATE=" + JSON.stringify(e));
    return xe.send(e, i)
}
async function xt() {
    await xe.send({
        response: h,
        kiosk: Me,
        userEmail: !Me ? Oe.userEmail : "kiosk",
        userAgent: navigator.userAgent,
        version: n,
        manifest: s,
        id: chrome.runtime.id,
        udid: Oe.deviceUdid,
        command: "ack"
    }, r);
    return true
}

function sm(e) {
    const t = {
        response: f,
        text: e
    };
    xe.sendCommand(t)
}
async function Mt(e, t, n, s, o) {
    let i;
    switch (n) {
        case Re.SMALL:
            i = await Bt(e, Oe.smallScreenshotWidth, Oe.smallScreenshotHeight);
            break;
        case Re.BIG:
            i = await Bt(e, Oe.bigScreenshotWidth, Oe.bigScreenshotHeight);
            break;
        default:
            i = await Bt(e, 0, 0)
    }
    let r = Dt(t, n !== Re.SMALL);
    if (typeof s !== "undefined") {
        r += "&tabUrl=" + encodeURIComponent(s)
    }
    if (typeof o !== "undefined") {
        r += "&tabTitle=" + encodeURIComponent(o)
    }
    await Wt(r, i)
}
async function Wt(e, t) {
    try {
        console.log("Screenshot send complete to url=" + e);
        const n = await fetch(Ut(e, t));
        return n.status !== 204
    } catch (t) {
        console.log("Failed to upload screenshot to url=" + e);
        return true
    }
}

function Dt(e, t) {
    let n = Oe.serverUrl + e;
    if (n.indexOf("uid=") !== -1) {
        n += "&udid=" + Oe.deviceUdid
    } else {
        n += "?udid=" + Oe.deviceUdid
    }
    if (Oe.userEmail) {
        n += "&userEmail=" + encodeURIComponent(Oe.userEmail)
    }
    n += t ? "&big=true" : "";
    return n
}
async function Bt(e, t, n) {
    let s = await fetch(e);
    let o = await s.blob();
    const i = await createImageBitmap(o);
    try {
        const e = i.width;
        const s = i.height;
        let o = 1;
        if (t !== 0 || n !== 0) {
            const i = Math.min(t / e, 1);
            const r = Math.min(n / s, 1);
            if (i !== 0 && r !== 0) {
                o = i < r ? i : r
            } else {
                o = i !== 0 ? i : r
            }
        }
        if (o !== 1) {
            return await qt(i, o)
        }
        console.log("Image will not be resized");
        return await Ht(i)
    } finally {
        i.close()
    }
}
async function Ht(e, t = {}) {
    const {
        width: n = e.width,
        height: s = e.height,
        sourceWidth: o = e.width,
        sourceHeight: i = e.height
    } = t;
    const r = new OffscreenCanvas(n, s);
    const a = r.getContext("2d");
    a.imageSmoothingEnabled = true;
    a.imageSmoothingQuality = "high";
    a.drawImage(e, 0, 0, o, i, 0, 0, n, s);
    return r.convertToBlob({
        type: "image/webp",
        quality: .7
    })
}
async function qt(e, t) {
    const n = Math.ceil(Math.log(1 / t) / Math.log(2));
    let s = new OffscreenCanvas(e.width, e.height);
    let o = s.getContext("2d");
    o.imageSmoothingEnabled = true;
    o.imageSmoothingQuality = "high";
    let i = e.width;
    let r = e.height;
    for (let a = 1; a <= n; a++) {
        const n = t + (1 - t) / (a * 2);
        const c = Math.floor(e.width * n);
        const l = Math.floor(e.height * n);
        if (a === 1) {
            s.width = c;
            s.height = l;
            o.drawImage(e, 0, 0, c, l)
        } else {
            o.drawImage(s, 0, 0, i, r, 0, 0, c, l)
        }
        i = c;
        r = l
    }
    return Ht(s, {
        width: Math.floor(e.width * t),
        height: Math.floor(e.height * t),
        sourceWidth: i,
        sourceHeight: r
    })
}

function Ft(e, t) {
    const n = e instanceof Error ? e.message : e;
    return typeof n === "string" && n.toLowerCase().includes(t)
}
class Jt {
    constructor(e, t, n = false) {
        const s = new URL(e);
        this.domain = s.hostname;
        this.path = s.pathname.slice(0, 1e3);
        this.tabTitle = typeof t === "string" ? t.trim().slice(0, 1e3) : null;
        this.isBlocked = n;
        this.timestamp = Date.now()
    }
}
class zt {
    constructor(e) {
        this.urls = Array.isArray(e) ? e : [];
        this.lastVisitedUrl = null
    }
    saveUrl(e) {
        if (!this.isLast(e)) {
            this.lastVisitedUrl = e;
            this.urls.push(e)
        }
        chrome.storage.local.set({
            [oe]: this.urls
        }, (() => {
            if (chrome.runtime.lastError) {
                console.log("Failed to save urls to local storage" + ". Error is: " + chrome.runtime.lastError.message)
            }
        }))
    }
    isLast(e) {
        return this.lastVisitedUrl instanceof Jt && this.lastVisitedUrl.domain === e.domain && this.lastVisitedUrl.path === e.path
    }
    hasUrls() {
        return this.urls.length > 0
    }
    getUrls() {
        return this.urls
    }
    purge() {
        this.urls = [];
        this.lastVisitedUrl = null;
        chrome.storage.local.remove(oe, (() => {
            if (chrome.runtime.lastError) {
                console.log("Failed to clear urls from local storage: " + chrome.runtime.lastError.message)
            } else {
                tt().then((e => {
                    if (typeof e != "undefined") {
                        console.log("Failed to clear urls from local storage")
                    } else {
                        console.log("Urls cleared from local storage")
                    }
                }))
            }
        }))
    }
}
chrome.runtime.onUpdateAvailable.addListener((function(e) {
    if (We) {
        console.log("Extension update available, will reload. Current version=" + n);
        chrome.runtime.reload()
    }
}));
"use strict";
class Gt {
    constructor() {
        this.active = false;
        this.sharesScreen = false;
        this.raisedHand = false
    }
    static get sessionIcon() {
        return "logo16.png"
    }
    static get noSessionIcon() {
        return "logo16mono.png"
    }
    static get handIcon() {
        return "hand.png"
    }
    static get dottedIcon() {
        return "logo16share.png"
    }
    async activeClassIcon() {
        this.active = true;
        await this.setIcon(this.selectIcon())
    }
    async noActiveClassIcon() {
        this.active = false;
        await this.setIcon(Gt.noSessionIcon)
    }
    async raiseHandIcon() {
        this.raisedHand = true;
        await this.setIcon(Gt.handIcon)
    }
    async shareScreenIcon() {
        this.sharesScreen = true;
        await this.setIcon(Gt.dottedIcon)
    }
    async noShareScreenIcon() {
        this.sharesScreen = false;
        await this.setIcon(this.selectIcon())
    }
    async clearRaiseHandIcon() {
        this.raisedHand = false;
        await this.setIcon(this.selectIcon())
    }
    selectIcon() {
        if (this.active) {
            if (this.raisedHand) {
                return Gt.handIcon
            } else if (this.sharesScreen) {
                return Gt.dottedIcon
            }
            return Gt.sessionIcon
        }
        return Gt.noSessionIcon
    }
    async setIcon(e) {
        return new Promise((t => {
            chrome.action.setIcon({
                path: e
            }, (() => {
                t()
            }))
        }))
    }
    static markNotAuthorized() {
        chrome.action.setBadgeText({
            text: "!"
        });
        chrome.action.setBadgeBackgroundColor({
            color: "#F00"
        })
    }
    static clearBadge() {
        chrome.action.setBadgeText({
            text: ""
        })
    }
}

function Vt() {
    const e = Oe.isClassSessionActive;
    if (!Oe.tabListenersAdded && e) {
        chrome.tabs.onCreated.addListener(sn);
        chrome.tabs.onUpdated.addListener(on);
        chrome.tabs.onRemoved.addListener(rn);
        Oe.tabListenersAdded = true
    } else if (Oe.tabListenersAdded && !e) {
        chrome.tabs.onCreated.removeListener(sn);
        chrome.tabs.onUpdated.removeListener(on);
        chrome.tabs.onRemoved.removeListener(rn);
        Oe.tabListenersAdded = false
    }
}

function jt(e) {
    if (e > 0) {
        chrome.idle.setDetectionInterval(e * 60);
        chrome.idle.onStateChanged.addListener(Qt)
    } else {
        chrome.idle.onStateChanged.removeListener(Qt)
    }
}

function Qt(e) {
    const t = {
        response: d,
        isIdle: e !== "active"
    };
    xe.sendCommand(t)
}
async function Yt(e) {
    const t = await Fe({});
    for (const n of t) {
        try {
            await an(n, "onApply", e);
            await ut(n.id, {
                muted: Oe.isScreenLocked
            })
        } catch (e) {
            console.log("Error updating lock status: " + e)
        }
    }
}

function Kt() {
    if (Oe.isClassSessionActive) {
        const e = (Oe.isScreenLocked || Oe.maximizeFocusedWindow) && !chrome.windows.onFocusChanged.hasListener($t);
        const t = Oe.maximizeFocusedWindow && !chrome.windows.onBoundsChanged.hasListener(Zt);
        const n = Oe.isScreenLocked && !chrome.windows.onRemoved.hasListener(Xt);
        if (e) {
            chrome.windows.onFocusChanged.addListener($t)
        }
        if (t) {
            chrome.windows.onBoundsChanged.addListener(Zt);
            chrome.windows.onCreated.addListener(Zt)
        }
        if (n) {
            chrome.windows.onRemoved.addListener(Xt)
        }
    } else {
        chrome.windows.onFocusChanged.removeListener($t);
        chrome.windows.onRemoved.removeListener(Xt);
        chrome.windows.onBoundsChanged.removeListener(Zt);
        chrome.windows.onCreated.removeListener(Zt)
    }
}
async function $t(e) {
    if (Oe.maximizeFocusedWindow && !Oe.isScreenLocked && typeof e == "number" && e !== chrome.windows.WINDOW_ID_NONE && e !== Oe.blockWindowId) {
        await Qe(e, {
            state: "maximized"
        });
        return
    }
    if (!Oe.isScreenLocked || !Oe.isChromeBook) {
        return
    }
    if (!Oe.blockWindowId) {
        const e = await Ge();
        if (!e) {
            return
        }
        Oe.blockWindowId = e.id
    }
    if (typeof e == "undefined" || typeof e == "number" && (e === chrome.windows.WINDOW_ID_NONE || e !== Oe.blockWindowId)) {
        await je(Oe.blockWindowId)
    }
}
async function Xt(e) {
    if (!Oe.isScreenLocked) {
        return
    }
    if (Oe.blockWindowId === e) {
        setTimeout((async () => {
            try {
                Oe.blockWindowId = await dt();
                await je(Oe.blockWindowId)
            } catch (e) {
                console.log("Cannot make window fullscreen: " + e)
            }
        }), 1e3)
    }
}
async function Zt(e) {
    if (e.type !== "normal" || e.id === Oe.blockWindowId || e.state === "fullscreen") {
        return
    }
    try {
        await Qe(e.id, {
            state: "maximized"
        })
    } catch (e) {
        console.log("Cannot maximize window: " + e)
    }
}
async function en(e) {
    const t = await Fe({});
    for (const n of t) {
        try {
            await cn(n, "onApply", e)
        } catch (e) {
            console.log("Catched update chat state error for tab=" + n.id + " '" + n.url + "': " + e)
        }
    }
}
async function tn(e) {
    if (Oe.maxOpenTabs > 0) {
        let t = await Fe({});
        if (Oe.blockWindowId === e.windowId) {
            return true
        }
        if (t.length > Oe.maxOpenTabs + Oe.additionalOpenTabs) {
            if (typeof e.id != "undefined") {
                $e(e.id)
            } else {
                console.log("Cannot close tab, no tab.id");
                return false
            }
        }
    }
    return true
}

function nn(e) {
    if (!Oe) {
        bt()
    } else if (Oe.isClassSessionActive) {
        const t = e["tabId"];
        if (Oe.activeTabId == null) {
            Oe.activeTabId = t;
            return
        }
        if (Oe.activeTabId !== t && Oe.isChatActive) {
            const e = {
                command: "chatStatus",
                chat: true,
                forceCloseChat: true
            };
            at(Oe.activeTabId, e).then((() => {
                console.log("Command to close chat in tabId=" + Oe.activeTabId + " sent. New active tabId=" + t);
                Oe.activeTabId = t
            })).catch((e => {
                console.log("Error=" + e + ". Command to close chat in tabId=" + Oe.activeTabId + " NOT sent. New active tabId=" + t)
            }));
            if (Oe.hasUnreadChatMessages) {
                const e = {
                    command: "chatStatus",
                    chat: true,
                    forceOpenChat: true
                };
                at(t, e).then((() => {
                    console.log("Command to open chat in tabId=" + t + " sent.")
                })).catch((e => {
                    console.log("Error= " + e + ". Command to open chat in tabId=" + t + " NOT sent.")
                }))
            }
        }
    }
}
async function sn(e) {
    const t = "onCreate";
    if (e.url && Oe.conferenceUrl === e.url) {
        return
    }
    const n = await tn(e);
    if (!n) {
        console.log("Catched on tab create listener error: Tabs limit exceeded")
    } else if (Oe.isChatActive) {
        return cn(e, t)
    }
}
async function on(e, t, n) {
    const s = "onUpdate";
    if (t.status === "complete") {
        const e = await tn(n);
        try {
            if (e && Oe.isChatActive) {
                await cn(n, s)
            }
            if (e && Oe.isScreenLocked) {
                await an(n, s)
            }
        } catch (e) {
            console.log("Catched on tab update listener error: " + JSON.stringify(e))
        }
    }
    if (n.url && !n.url.includes(Oe.serverUrl.replace("https://", ""))) {
        let t = null;
        const s = zn(n.url);
        if (Oe.whitelist && !Wn(n.url, Oe.whitelist, true)) {
            if (n.url.indexOf("docs.google.com") !== -1 && Oe.lockedToCourseWorkResources && n.openerTabId) {
                const e = await Ye(n.openerTabId);
                if (Wn(e.url, Oe.whitelist, true)) {
                    return
                }
            }
            t = Oe.serverUrl + "/agent/block?udid=" + Oe.deviceUdid + (s ? "&domain=" + s : "");
            if (Oe.isSiteLocked) {
                t += "&siteLocked=true"
            } else {
                t += "&blockingPlanId=" + Oe.blockingPlanId
            }
        } else if (!Oe.whitelist && Oe.blockingPlanType === le && Oe.blockingPlanUrls && !Wn(n.url, Oe.blockingPlanUrls, false)) {
            t = Oe.serverUrl + "/agent/block?udid=" + Oe.deviceUdid + (s ? "&domain=" + s : "") + "&blockingPlanId=" + Oe.blockingPlanId
        }
        if (t) {
            try {
                await ut(e, {
                    url: t
                })
            } catch (t) {
                console.log("Error updating tab url: " + t);
                $e(e)
            }
        }
    }
}
async function rn() {
    if (Oe.additionalOpenTabs > 0) {
        Oe.additionalOpenTabs -= 1
    }
}
async function an(e, t, n) {
    if (typeof e.status === "undefined" || typeof e.url === "undefined") {
        return
    }
    if (typeof e.id === "number") {
        if (!Wn(e.url, ["https?:\\/\\/chrome\\.google\\.com\\/webstore\\/?.*?"], false) && (Oe.isScreenLocked || Oe.whitelist || Oe.announce !== null)) {
            $e(e.id);
            return
        }
        let s = null;
        if (Oe.isScreenLocked) {
            s = Oe.blockedText
        } else if (Oe.whitelist && !Wn(e.url, Oe.whitelist, true)) {
            s = Oe.isSiteLocked ? "This site is not available during site lock" : "This site is currently unavailable due to an active blocking plan"
        } else if (Oe.blockingPlanType === le && Oe.blockingPlanUrls && !Wn(e.url, Oe.blockingPlanUrls, false)) {
            s = "This site is currently unavailable due to an active blocking plan"
        }
        const o = Oe.closeTabsTimeout !== null && !n ? true : null;
        const i = {
            command: "lockStatus",
            announce: Oe.announce,
            announceTitle: "Announcement from" + (Oe.teacherName ? ": " + Oe.teacherName : " your teacher"),
            lock: s,
            tabsCloseWarning: o,
            messageType: t
        };
        try {
            await at(e.id, i)
        } catch (t) {
            if (t.indexOf("chrome://") !== -1) {
                $e(e.id)
            } else {
                console.log("Lock not sent to tab '" + e.id + " {status:" + e.status + ", discarded:" + e.discarded + "} " + e.title + "'. Error: " + t)
            }
        }
    }
}
async function cn(e, t, n) {
    if (typeof e.status === "undefined" || typeof e.url === "undefined") {
        return Promise.resolve()
    }
    return new Promise((async (s, o) => {
        if (typeof e.id === "number") {
            const i = {
                command: "chatStatus",
                messageType: t
            };
            if (Oe.isChatActive) {
                i["chat"] = true;
                if (n) {
                    i["chatMessage"] = n
                } else if (Oe.hasUnreadChatMessages) {
                    i["chatMessage"] = Oe.chatMessages[Oe.chatMessages.length - 1]
                }
                if (i["chatMessage"] && e.highlighted) {
                    i["forceOpenChat"] = true
                }
            } else {
                i["chat"] = false
            }
            console.log("Send chat status message=" + JSON.stringify(i) + " tabId=" + e.id + " '" + e.url + "'");
            try {
                await at(e.id, i);
                s()
            } catch (e) {
                o("Failed to send chat status:" + e)
            }
        }
    }))
}
async function ln(e, t) {
    if (!t) {
        t = await Fe({})
    }
    if (Oe.maxOpenTabs > 0 && t && t.length + e.length >= Oe.maxOpenTabs) {
        Oe.additionalOpenTabs = t.length + e.length - Oe.maxOpenTabs
    }
    for (const t of e) {
        try {
            await Ke({
                url: t,
                active: true
            })
        } catch (e) {
            console.log("Error while open sites: " + error)
        }
    }
}
async function un(e, t) {
    if (!e || e.length === 0) {
        return Promise.resolve()
    }
    const n = e.map((e => e.id));
    if (t) {
        Oe.additionalOpenTabs = 1;
        await Ke({})
    }
    $e(n)
}
async function dn(e) {
    let t = await Fe({});
    const n = {
        command: "tabCloseWarning",
        delaySeconds: e
    };
    for (const e of t) {
        if (typeof e.status === "undefined" || typeof e.url === "undefined") {
            return
        }
        if (typeof e.id === "number") {
            try {
                await at(e.id, n)
            } catch (e) {
                console.log("Error while apply tabs close warning: " + e)
            }
        }
    }
}
async function hn(e, t, n = false) {
    try {
        await Yt();
        let s;
        if (t) {
            s = await Fe({})
        }
        if (!n) {
            const t = await Je();
            if (!t || t.length === 0) {
                await Ve(e)
            } else {
                await ln(e, s)
            }
        }
        if (t) {
            await un(s, n)
        }
    } catch (e) {
        console.log("Error while site lock: " + JSON.stringify(e))
    }
}

function mn(e) {
    const t = /\/courses\/\d+\/assignments\/(\d+)/;
    const n = [];
    for (const s of e) {
        const e = s.match(t);
        if (e && e.length > 1) {
            n.push(e[1])
        }
    }
    return n
}
async function fn() {
    const e = Oe.serverUrl + "/screenshare*";
    const t = await Fe({
        url: e
    });
    for (const e of t) {
        if (e.id) {
            await $e(e.id)
        }
    }
}
async function gn(e) {
    if (!Pe) {
        Pe = new Gt
    }
    if (e && e.length > 0) {
        await Pe.activeClassIcon();
        pn(wn(e))
    } else {
        await Pe.noActiveClassIcon();
        pn()
    }
}

function wn(e) {
    return Ae + "\n" + e.join(", ") + " class" + (e.length > 1 ? "es" : "")
}

function pn(e) {
    const t = {};
    if (typeof e !== "undefined") {
        t["title"] = e + "\n" + n
    } else {
        t["title"] = n
    }
    chrome.action.setTitle(t)
}

function yn(e) {
    if (!e) {
        e = 5
    }
    chrome.alarms.create(he, {
        delayInMinutes: e
    });
    console.log("Schedule app restart in " + e + " minutes")
}

function bn(e) {
    const t = e ? "popup.html" : "";
    chrome.action.setPopup({
        popup: t
    }, (() => {
        console.log("Popup set to " + (e ? t : "none"))
    }))
}

function vn() {
    const e = kn(true);
    Oe.announce = null;
    Oe.teacherId = null;
    Vt();
    Yt().then(xe.sendCommand(e))
}

function kn(e) {
    return {
        response: W,
        isConfirmed: e,
        teacherId: Oe.teacherId
    }
}

function In(e) {
    if (e) {
        chrome.runtime.onMessage.addListener(Cn);
        console.log("MESSAGE LISTENER ADDED")
    } else {
        chrome.runtime.onMessage.removeListener(Cn);
        console.log("MESSAGE LISTENER REMOVED")
    }
}

function Cn(e, n, s) {
    console.log("Got message from tab=" + JSON.stringify(n.tab) + " Message=" + JSON.stringify(e));
    const o = e["action"];
    switch (o) {
        case "popup":
            return En(e, n, s);
        case "disconnected":
            Un(e, n, s);
            return true;
        case "teacherMessage":
            vn();
            break;
        case "clearTabsCloseWarning":
            Vt();
            Yt(true);
            console.log("Tabs close warning cleared by student");
            s();
            break;
        case "respondToShareScreen":
            Sn(e);
            break;
        case "chat":
            return An(e, n, s);
        case "resizeLocked":
            $t();
            break;
        case "getLockText":
            if (Oe.isScreenLocked) {
                s(Oe.blockedText)
            } else {
                s(null)
            }
            break;
        case "call":
            s({
                token: Oe.conferenceToken,
                studentName: Oe.studentName
            });
            break;
        case "suspicious":
            s(null);
            if (n.tab.url && n.tab.url.startsWith("about:")) {
                Ye(n.tab.openerTabId).then((e => {
                    if (e.url) {
                        for (const n of t) {
                            if (e.url.indexOf(n) !== -1) {
                                console.log("Tab is in ignored urls");
                                return
                            }
                        }
                    }
                    console.log("Closing suspicious tab: " + n.tab.id);
                    $e(n.tab.id)
                }))
            }
            break;
        default:
            console.log("Received incorrect message in pageMessageListener=" + JSON.stringify(e))
    }
}

function Sn(e) {
    Yt();
    const t = 1024;
    const n = e["isConfirmed"];
    const s = {
        response: x,
        userId: e["userId"],
        lock: e["lock"],
        isConfirmed: n
    };
    xe.sendCommand(s);
    if (n) {
        const n = e["deviceId"];
        const s = Oe.serverUrl + "/agent/sharescreen/upload?did=" + n;
        Oe.shareScreenHandler = setInterval(Tn, 4e3, s, t);
        Pe.shareScreenIcon()
    }
}
async function Tn(e, t) {
    let n = false;
    if (!n) {
        try {
            Oe.capturedScreen = await Ze()
        } catch (e) {
            console.log("Cannot capture visible tab: " + e);
            return
        }
        const n = await Bt(Oe.capturedScreen, t, t);
        const s = await Wt(e, n);
        if (!s) {
            await Zn()
        }
    } else {
        console.log("Screenshot requested from native agent")
    }
}

function En(e, t, n) {
    let s = false;
    const o = e["popup"];
    switch (o) {
        case "hello":
            Fe({
                currentWindow: true,
                active: true
            }).then((e => {
                if (e && e.length > 0) {
                    const t = e[0].url;
                    if (t && !t.toLowerCase().includes("newtab")) {
                        s = Oe.canStartChat || Oe.isChatActive
                    }
                }
            })).catch((e => {
                console.log("Error responding to popup=" + e)
            })).finally((() => {
                n({
                    raiseHandEnabled: Oe.canRaiseHand,
                    isHandRaised: Oe.isHandRaised,
                    isSharingScreen: Oe.shareScreenHandler !== null,
                    canStartChat: s
                })
            }));
            return true;
        case "handRaiseClick":
            Oe.isHandRaised = !Oe.isHandRaised;
            n({
                raiseHandEnabled: Oe.canRaiseHand,
                isHandRaised: Oe.isHandRaised
            });
            if (Oe.isHandRaised) {
                Pe.raiseHandIcon()
            } else {
                Pe.clearRaiseHandIcon()
            }
            xe.sendCommand({
                response: u,
                isHandRaised: Oe.isHandRaised
            });
            break;
        case "startChatClick":
            n();
            Fe({
                currentWindow: true,
                active: true
            }).then((e => {
                if (e && e.length > 0) {
                    const t = {
                        command: "chatStatus",
                        chat: true,
                        forceOpenChat: true
                    };
                    at(e[0].id, t);
                    console.log("Sent message to tabId=" + e[0].id)
                } else {
                    console.log("Cannot open chat from popup - no active tab")
                }
            }))
    }
}
async function Un(e, t, n) {
    Gt.markNotAuthorized();
    const s = {
        reason: o ? qe : Oe.loginErrorReason
    };
    const directoryDeviceId = await ot();
    if (directoryDeviceId) {
        s["directoryDeviceId"] = directoryDeviceId
    }
    const i = await it();
    if (i) {
        s["serialNumber"] = i
    }
    n(s)
}

function An(e, t, n) {
    const s = e["command"];
    switch (s) {
        case "getChatMessages":
            Oe.hasUnreadChatMessages = false;
            n({
                chatMessages: Oe.chatMessages
            });
            break;
        case "sendMessage":
            n();
            const t = {
                sessionId: Oe.sessionId,
                text: e["text"],
                response: T
            };
            const s = {
                date: (new Date).toUTCString(),
                isFromTeacher: false,
                text: e["text"]
            };
            Oe.chatMessages.push(s);
            xe.sendCommand(t).catch((e => {
                console.log("Chat message send failed: " + JSON.stringify(e))
            }));
            break;
        default:
            n({
                chat: Oe.isChatActive,
                unread: Oe.hasUnreadChatMessages
            })
    }
}

function Ln(e, t, n) {
    chrome.notifications.clear(e, (function(s) {
        chrome.notifications.create(e, {
            title: t,
            iconUrl: "logo48.png",
            type: "basic",
            message: n
        })
    }))
}
async function _n() {
    return new Promise((e => {
        chrome.runtime.sendNativeMessage(De, {
            action: Be
        }, (t => {
            if (chrome.runtime.lastError) {
                console.log("Error sending handshake to Windows agent V2: " + chrome.runtime.lastError.message);
                e(false)
            }
            e(t && typeof t["version"] === "string")
        }))
    }))
}
async function Rn(e) {
    if (!Oe || !Oe.lockedToCourseWorkResources) {
        return
    }
    if (e.statusCode === 302) {
        const t = e.responseHeaders.find((e => e.name.toLowerCase() === "location"));
        if (t && Wn(e.url, Oe.whitelist, true) && !Oe.whitelist.some((e => t["value"] === e))) {
            let n = t["value"];
            if (!n.includes("youtube.com")) {
                n = n.split("?")[0]
            }
            const s = structuredClone(Te);
            s.id = Oe.rulesCount + 1;
            s.condition.urlFilter = n;
            const o = e.tabId;
            await chrome.declarativeNetRequest.updateDynamicRules({
                addRules: [s]
            });
            Oe.rulesCount += 1;
            Oe.whitelist.push(n);
            await Oe.saveWhitelist(Oe.whitelist);
            await ut(o, {
                url: n
            })
        }
    }
}

function Nn(e) {
    if (!Oe || !Oe.isObservationActive) {
        return
    }
    if (e.url && e.url.indexOf("chrome-extension") === -1) {
        if (e.tabId !== -1) {
            Mn(e.tabId).then((t => {
                Vn.saveUrl(new Jt(e.url, t))
            }))
        } else {
            Vn.saveUrl(new Jt(e.url, null))
        }
    }
}

function On(e) {
    if (!Oe) {
        return
    }
    if (e.documentLifecycle === "active" && e.redirectUrl.includes(Oe.serverUrl) && !e.redirectUrl.includes("domain=")) {
        Vn.saveUrl(new Jt(e.url, null, true))
    }
}
const Pn = new Map;

function xn(e) {
    if (!Oe || !Oe.isObservationActive) {
        return
    }
    if (e.url.includes(chrome.runtime.id) && e.url.includes("/blocking/redirect.html")) {
        const t = Pn.get(e.requestId);
        if (t && Vn) {
            console.log("Blocked URL detected: " + t);
            Vn.saveUrl(new Jt(t, null, true))
        }
        Pn.delete(e.requestId)
    } else {
        Pn.set(e.requestId, e.url)
    }
}
async function Mn(e, t = true) {
    try {
        const n = await Ye(e);
        if (n.title) {
            return n.title
        } else if (t) {
            await new Promise((e => setTimeout(e, 1e3)));
            return Mn(e, false)
        }
    } catch (e) {}
    return null
}

function Wn(e, t, n) {
    if (Oe.lockedToCourseWorkResources) {
        for (const t of Oe.canvasAssignmentIds) {
            if (e.includes("assignment_id=" + t)) {
                return n
            }
        }
    }
    if (!e.includes("youtube.com") && !Dn(e)) {
        e = e.split("?")[0]
    }
    for (const s of t) {
        if (e.match(s)) {
            return n
        }
    }
    return !n
}

function Dn(e) {
    const t = /^(https?:\/\/)?(www\.)?google\.com\/url\?q=(.*)/;
    return t.test(e)
}
async function Bn() {
    if (Oe.blockingPlanType === ce) {
        await Fn(Oe.blockingPlanUrls, Oe.blockingPlanId, false)
    } else {
        await Hn()
    }
}
async function Hn() {
    const e = await qn(Oe.orgBlocklist, null, 0);
    const t = await qn(Oe.blockingPlanUrls, Oe.blockingPlanId, e.length);
    await Jn(e.concat(t))
}
async function qn(e, t, n) {
    if (!e) {
        return []
    }
    const s = [];
    for (let o = 0; o < e.length; o++) {
        const i = e[o];
        const r = zn(i);
        let a = Oe.serverUrl + "/agent/block?udid=" + Oe.deviceUdid + "&domain=" + r;
        if (t) {
            a += "&blockingPlanId=" + t
        }
        const c = await chrome.declarativeNetRequest.isRegexSupported({
            regex: i
        });
        if (!c["isSupported"]) {
            console.log("Regex not supported: " + i + ". Reason: " + c["reason"]);
            continue
        }
        const l = structuredClone(Ue);
        l.id = o + n + 1;
        l.action.redirect.url = a;
        l.condition.regexFilter = i;
        s.push(l)
    }
    return s
}
async function Fn(e, t, n) {
    const s = structuredClone(Ce);
    let o = chrome.runtime.getURL("blocking/redirect.html") + "?serverUrl=" + encodeURIComponent(Oe.serverUrl) + "&udid=" + Oe.deviceUdid;
    if (t) {
        o += "&blockingPlanId=" + t
    } else {
        o += "&siteLocked=true"
    }
    s[0].action.redirect.url = o;
    if (!e) {
        return s
    }
    if (n) {
        s[0].condition.excludedInitiatorDomains.push(...Ie)
    }
    for (let t = 0; t < e.length; t++) {
        const n = e[t];
        const o = await chrome.declarativeNetRequest.isRegexSupported({
            regex: n
        });
        if (!o["isSupported"]) {
            console.log("Regex not supported: " + n + ". Reason: " + o["reason"]);
            continue
        }
        const i = structuredClone(Te);
        i.id = s.length + 1;
        i.condition.regexFilter = n;
        s.push(i)
    }
    if (n) {
        const e = structuredClone(Te);
        e.id = s.length + 1;
        e.priority = 3;
        e.condition.requestDomains = ke;
        s.push(e);
        const t = structuredClone(Se);
        t.id = s.length + 1;
        t.priority = 4;
        s.push(t);
        const n = structuredClone(Ee);
        n.id = s.length + 1;
        n.priority = 5;
        s.push(n);
        if (Oe.canvasAssignmentIds) {
            for (const e of Oe.canvasAssignmentIds) {
                const t = structuredClone(Te);
                t.id = s.length + 1;
                t.priority = 5;
                t.condition.urlFilter = e;
                s.push(t)
            }
        }
    }
    return Jn(s)
}
async function Jn(e) {
    try {
        const t = await chrome.declarativeNetRequest.getDynamicRules();
        const n = t.map((e => e.id));
        await chrome.declarativeNetRequest.updateDynamicRules({
            removeRuleIds: n,
            addRules: e
        });
        Oe.rulesCount = e.length;
        console.log("Rules set: " + JSON.stringify(e))
    } catch (e) {
        console.log("Error updating rules: " + e)
    }
}

function zn(e) {
    const t = "^.*(\\?\\.\\*|\\.\\)\\?)(.*?)(\\/|\\.\\*).*";
    const n = e.match(t);
    return n ? e.match(t)[2].replace(/\\/g, "") : null
}
async function Gn() {
    if (navigator.onLine) {
        if (!Gn.connecting) {
            Gn.connecting = true;
            console.log("Connection restored");
            const e = await ft(de);
            if (e) {
                console.log("Restarting polling after connection restored");
                await gt(de);
                St()
            }
        }
    } else {
        Gn.connecting = false;
        console.log("Connection lost")
    }
}
var Vn = null;
chrome.webRequest.onHeadersReceived.addListener(Rn, {
    urls: ["<all_urls>"],
    types: ["main_frame"]
}, ["responseHeaders"]);
chrome.webRequest.onCompleted.addListener(Nn, {
    urls: ["<all_urls>"],
    types: ["main_frame"]
});
chrome.webRequest.onBeforeRedirect.addListener(On, {
    urls: ["<all_urls>"],
    types: ["main_frame"]
});
chrome.webRequest.onBeforeRequest.addListener(xn, {
    urls: ["<all_urls>"],
    types: ["main_frame"]
});
navigator.connection.addEventListener("change", Gn);
chrome.tabs.onActivated.addListener(nn);
if (o) {
    console.log("Unsupported chrome version");
    Nt()
} else if (!Oe) {
    console.log("Starting service worker");
    bt()
} else {
    console.log("Service worker active")
}
async function jn(e) {
    const t = e["tabId"];
    const n = e["userId"];
    $e(t).then((() => Qn(e["url"], n)))
}
async function Qn(e, t, n = true) {
    const s = await is();
    if (n) {
        xe.sendCommand({
            response: R,
            tabs: s,
            userId: t
        })
    }
    if (s.length > 0) {
        await Ss(e, null, s[0].url, s[0].title)
    }
}
async function Yn(e) {
    const t = e["tabId"];
    try {
        await Xe(t);
        xe.sendCommand({
            response: e["requestType"],
            tabId: t,
            userId: e["userId"]
        });
        setTimeout((() => Qn(e["url"], e["userId"])), 1e3)
    } catch (e) {
        console.log("Cannot focus tab: " + e)
    }
}
async function Kn(e) {
    Oe.chatMessages.push(e["chatMessage"]);
    Oe.hasUnreadChatMessages = true;
    Vt();
    try {
        await en(e["chatMessage"]);
        if (Oe.playChatAlert) {
            chrome.runtime.sendMessage({
                action: "playSound"
            })
        }
        Qn(e["url"], e["userId"], false)
    } catch (e) {
        console.log("Failed to update chat status on incoming message")
    }
}
async function $n(e) {
    const t = Oe.sessionId === (e.sessionId ?? null);
    const n = Oe.isObservationActive;
    Oe.updateClassSessionState(e);
    await gn(Oe.activeClassNames);
    if (e["showNotifications"] && n !== Oe.isObservationActive) {
        if (Oe.isObservationActive) {
            Ln(be, "Class session is active", "Your device could be monitored and remotely managed by a teacher")
        } else {
            Ln(be, "No active class session", "Your device is not monitored and cannot be remotely managed by a teacher")
        }
    }
    if (t) {
        return
    }
    Pn.clear();
    if (Oe.isObservationActive) {
        await es()
    } else {
        await Lt()
    }
    if (Oe.shareScreenHandler) {
        await Zn()
    }
    fn();
    if (Oe.closeTabsTimeout != null) {
        clearTimeout(Oe.closeTabsTimeout);
        Oe.closeTabsTimeout = null
    }
    Oe.isHandRaised = false;
    await Pe.clearRaiseHandIcon();
    bn(Oe.isClassSessionActive);
    Vt();
    In(Oe.isClassSessionActive);
    jt(e["idleTimeout"]);
    await en();
    await Yt();
    if (e["closeTabs"]) {
        const t = parseInt(e["closeTabsWaitSeconds"]);
        if (typeof t === "number" && t > 0) {
            await dn(t);
            Oe.closeTabsTimeout = setTimeout((async function() {
                console.log("Close tabs on session start after timeout");
                await un(await Fe({}), !Oe.isChromeBook);
                Oe.closeTabsTimeout = null
            }), t * 1e3)
        } else {
            console.log("Close tabs on session start");
            await un(await Fe({}), !Oe.isChromeBook)
        }
    } else if (Oe.maxOpenTabs > 0) {
        const e = await Fe({});
        if (e.length > Oe.maxOpenTabs) {
            await un(e.slice(Oe.maxOpenTabs), !Oe.isChromeBook)
        }
    }
    Oe.conferenceUrl = null;
    if (Oe.maximizeFocusedWindow) {
        const e = await Ge();
        if (e) {
            try {
                await Qe(e.id, {
                    state: "maximized"
                })
            } catch (e) {
                console.log("Cannot maximize window: " + e)
            }
        }
    }
    Kt()
}
async function Xn(e) {
    Oe.canRaiseHand = !!e["allowHandRaise"];
    Oe.isHandRaised = false;
    Oe.canStartChat = !!e["canStartChat"];
    Oe.playChatAlert = !!e["playChatAlertToStudent"];
    gn(Oe.activeClassNames)
}
async function Zn() {
    clearInterval(Oe.shareScreenHandler);
    Oe.capturedScreen = null;
    Oe.shareScreenHandler = null;
    await Pe.noShareScreenIcon();
    Ln(ve, "Screen sharing ended", "Your teacher has stopped sharing your screen")
}
async function es() {
    let e = await Fe({
        lastFocusedWindow: true,
        active: true
    });
    if (!e || !e.length > 0) {
        e = await Fe({
            active: true
        });
        if (!e || !e[0] || !e[0].url) {
            return
        }
    }
    const t = e[0];
    if (!t.url || t.url.indexOf("chrome-extension") !== -1) {
        return
    }
    Vn.saveUrl(new Jt(t.url, t.title))
}
async function ts() {
    Oe.isHandRaised = false;
    Pe.clearRaiseHandIcon()
}
async function ns(e) {
    const t = e["url"];
    const n = e["lockToSession"];
    if (!t && Oe.conferenceUrl !== null) {
        await Oe.clearWhitelist();
        Vt();
        await Yt();
        Oe.conferenceUrl = null;
        return
    }
    if (Oe.conferenceUrl !== t) {
        Oe.conferenceUrl = t
    }
    try {
        if (Oe.maxOpenTabs > 0) {
            const e = await Fe({});
            if (e && e.length >= Oe.maxOpenTabs) {
                Oe.additionalOpenTabs = e.length - Oe.maxOpenTabs + 1
            }
        }
        await Ke({
            url: t
        });
        if (n) {
            const e = [ss(t)];
            await Oe.saveBlockedInfo(null, ae);
            await Oe.saveWhitelist(e);
            Vt();
            await Yt()
        }
    } catch (e) {
        console.log("Cannot open tab for conference. Error=" + e)
    }
}

function ss(e) {
    return e.replace(/[/\-\\^$*+?.()|[\]{}]/g, "\\$&")
}
async function os(e) {
    const t = await is();
    xe.sendCommand({
        response: e["requestType"],
        tabs: t,
        userId: e["userId"]
    })
}
async function is() {
    let e = null;
    const t = await Fe({
        lastFocusedWindow: true,
        active: true
    });
    if (t.length > 0) {
        e = t[0]
    }
    const n = await Fe({});
    console.log("Got " + n.length + " tabs");
    let s = [];
    let o = -1;
    n.forEach((function(t, n) {
        const i = {
            id: t.id,
            url: t.url,
            title: t.title
        };
        if (e != null && t.id === e.id) {
            o = n
        }
        s.push(i)
    }));
    if (o !== -1) {
        s.splice(0, 0, s.splice(o, 1)[0])
    }
    return s
}
async function as(e) {
    console.log("Lock screen requested and confirmed");
    await Oe.clearWhitelist();
    await Oe.saveBlockedInfo(e["screenBlockMessage"], re);
    Vt();
    Kt();
    try {
        Oe.blockWindowId = await dt();
        await je(Oe.blockWindowId)
    } catch (e) {
        console.log("Cannot create lock window: " + e)
    }
    await Yt();
    setTimeout((() => Qn(e["url"], e["userId"], false)), 1e3)
}
async function cs(e) {
    console.log("Unlock requested and confirmed");
    await Oe.saveBlockedInfo(null, ae);
    await Oe.clearWhitelist();
    Oe.canvasAssignmentIds = [];
    await Bn();
    Vt();
    Kt();
    if (Oe.blockWindowId !== 0) {
        try {
            await ht(Oe.blockWindowId)
        } catch (e) {
            console.log("Error while closing block window: " + e)
        }
    }
    await Yt();
    Qn(e["url"], e["userId"], false)
}
async function ls(e) {
    Oe.announce = e["teacherMessage"];
    Oe.teacherName = e["teacherName"];
    Oe.teacherId = e["teacherId"];
    Vt();
    await Yt();
    xe.sendCommand(kn(false));
    Qn(e["url"], e["userId"], false)
}
async function us(e) {
    console.log("Got blocking plan");
    const t = e["orgBlocklist"];
    const n = e["blockingPlanUrls"];
    const s = e["blockingPlanName"];
    const o = e["blockingPlanId"];
    const i = e["blockType"];
    await Oe.saveOrgBlocklist(t);
    await Oe.saveBlockingPlan(n, s, o, i);
    if (!Oe.isSiteLocked) {
        await Oe.clearWhitelist();
        await Bn()
    }
    Vt();
    await Yt(false)
}
async function ds(e) {
    console.log("Got open site command");
    const t = e["urls"];
    const n = await Je();
    if (!n || n.length === 0) {
        await Ve(t)
    } else {
        await ln(t)
    }
    setTimeout((() => Qn(e["url"], e["userId"])), 1e3)
}
async function hs(e) {
    if (e["deviceId"]) {
        console.log("Got screen share request");
        Vt();
        const t = {
            command: "requestShareScreen",
            userId: e["userId"],
            deviceId: e["deviceId"],
            lock: e["lock"]
        };
        const n = await Fe({});
        for (const e of n) {
            if (typeof e.id === "number") {
                try {
                    await at(e.id, t)
                } catch (e) {
                    console.log("Error while requesting screen share: " + e)
                }
            }
        }
    } else {
        await Zn()
    }
}
async function ms(e) {
    console.log("Got site lock command");
    await Oe.saveBlockedInfo(null, ae);
    await Oe.saveWhitelist(e["whitelistPatterns"]);
    Oe.lockedToCourseWorkResources = !!e["courseWorkResources"];
    if (Oe.lockedToCourseWorkResources) {
        Oe.canvasAssignmentIds = mn(e["urls"])
    }
    await Fn(e["whitelistPatterns"], null, !!e["courseWorkResources"]);
    Vt();
    await hn(e["urls"], e["closeTabs"], e["notOpenTabs"]);
    setTimeout((() => Qn(e["url"], e["userId"])), 1e3)
}
async function fs() {
    return new Promise((async e => {
        console.log("Needs update check. Current version=" + n);
        if (Oe.updateCheckDate.getTime() < (new Date).getTime()) {
            console.log("Checking for extension update");
            const e = new Date;
            const t = 10;
            e.setTime(e.getTime() + t * 60 * 1e3);
            await Oe.saveUpdateCheckDate(e);
            chrome.runtime.requestUpdateCheck((async e => {
                console.log("Update check status: " + e);
                switch (e) {
                    case Le:
                        console.log("Extension update available, will reload");
                        chrome.runtime.reload();
                        break;
                    case _e:
                        const e = new Date;
                        e.setTime(e.getTime() + 60 * 60 * 1e3);
                        console.log("Update check is throttled. Next check time is " + e);
                        await Oe.saveUpdateCheckDate(e);
                        yn(60);
                        break;
                    default:
                        yn(t)
                }
            }))
        } else {
            console.log("Next update check time is " + Oe.updateCheckDate);
            yn()
        }
        e()
    }))
}
const gs = async function(e) {
    mt().then((t => {
        const n = {
            response: e["requestType"]
        };
        xe.sendCommand(Object.assign(n, t))
    })).catch((e => {
        console.log("Failed to get location: " + e)
    }))
};
async function ws(e) {
    const t = e["udid"];
    console.log("DeviceUdid set to: " + t);
    if (!Me) {
        Gt.clearBadge()
    }
    await Oe.saveDeviceUdid(t)
}
async function ps(e) {
    if (typeof updateContactAdminButtonVisibility == "function") {
        updateContactAdminButtonVisibility(false)
    } else {
        Gt.markNotAuthorized()
    }
    if (e["reason"] && e["reason"] !== He) {
        Oe.loginErrorReason = e["reason"]
    }
    await Oe.saveDeviceUdid(null);
    if (We) {
        chrome.runtime.onMessage.addListener(Cn);
        console.log("MESSAGE LISTENER ADDED");
        chrome.action.onClicked.addListener(Rt)
    }
    await rt();
    throw new Error(H)
}
async function ys(e) {
    if (typeof updateDeviceInfo === "function") {
        updateDeviceInfo(Oe.deviceUdid, e["deviceName"])
    }
    await Oe.saveDeviceName(e["deviceName"])
}
async function bs(e) {
    await Oe.saveServerUrl(e["serverUrl"]);
    xe.updateUrl(e["serverUrl"])
}
async function vs(e) {
    const t = e["shouldSendLogs"];
    if (typeof Es !== "undefined") {
        Es.logEnabled = t
    }
    if (t) {
        chrome.alarms.create(fe, {
            periodInMinutes: 5
        })
    } else {
        chrome.alarms.clear(fe)
    }
    console.log("Logging updated to " + t + " at " + new Date)
}
async function ks(e) {
    if (We) {
        Oe.studentId = e["studentId"];
        Oe.studentName = e["studentName"]
    }
    if (Me) {
        const t = e[Z];
        const n = e[Y];
        const s = e[J];
        const o = e[ee];
        const i = e[X];
        const r = e[K];
        const a = e[$];
        await Oe.saveDeviceInfo(t, n, s, o, i, r, a);
        updateOrgAndScreen();
        updateContactAdminButtonVisibility(Oe.isContactAdminAllowed === true);
        updateDeviceInfo(Oe.deviceUdid, n)
    }
    Oe.isLoggedIn = true;
    console.log("Complete login routine. Screen " + (Oe.isScreenLocked ? "is locked with text '" + Oe.blockedText + "'" : " is not locked"))
}
async function Is(e) {
    const t = {
        seq: e["seq"],
        response: m,
        modeType: e["modeType"]
    };
    if (Me) {
        console.log("Enable lost mode requested and confirmed");
        requestBlockScreen(e[ee], e[J], e[X], e[$], e["allowContactAdmin"]);
        updateDeviceInfo(Oe.deviceUdid, Oe.deviceName);
        updateSyncDate();
        await Oe.saveBlockedInfo(e[ee], e[J], e[X], e[$], e[K])
    }
    return t
}
async function Cs(e) {
    console.log("Screenshot requested");
    const t = await Fe({
        currentWindow: true,
        active: true
    });
    if (t.length > 0) {
        Ss(e["url"], e["size"], t[0].url, t[0].title)
    } else {
        console.log("No tabs found to capture")
    }
}
async function Ss(e, t, n, s) {
    try {
        const o = Oe.capturedScreen !== null ? Oe.capturedScreen : await Ze();
        if (!t || t === Re.BIG) {
            await Mt(o, e, Re.BIG, n, s);
            await Mt(o, e, Re.SMALL, n, s)
        } else {
            await Mt(o, e, t, n, s)
        }
    } catch (e) {
        console.log("Error capture visible tab: " + e)
    }
}
Ne[w] = ws;
Ne[p] = ys;
Ne[y] = bs;
Ne[b] = ps;
Ne[v] = gs;
Ne[I] = vs;
Ne[k] = ks;
Ne[P] = Cs;
Ne[S] = us;
Ne[T] = Kn;
Ne[E] = $n;
Ne[U] = Xn;
Ne[A] = ts;
Ne[L] = jn;
Ne[_] = Yn;
Ne[R] = os;
Ne[N] = as;
Ne[O] = ds;
Ne[x] = hs;
Ne[M] = ms;
Ne[W] = ls;
Ne[B] = cs;
Ne[D] = ns;
const Ts = console.log;

function Es(e) {
    if (typeof Ts === "function") {
        Ts.apply(this, arguments)
    }
    if (Oe && Es.logEnabled) {
        const t = "/agent/chrome/debug";
        const n = Oe.deviceUdid ? Oe.deviceUdid : Oe.directoryDeviceId;
        if (!n) {
            return
        }
        const s = {
            udid: n,
            logNum: Es.logCount,
            logString: e,
            logSource: "extension"
        };
        Es.logCount += 1;
        try {
            Et(t, s)
        } catch (e) {
            Ts.apply(this, "Error while sending logs to server: " + e)
        }
    }
}
console.log = Es;
Es.logEnabled = true;
Es.logCount = 0;