// Actions extension/kiosk perform based on commands received from the server

const actionLocation = async function (message) {
  getLocation()
      .then(location => {
        const response = {response: message["requestType"]};
        router.sendCommand(Object.assign(response, location));
      })
      .catch(error => {
        console.log("Failed to get location: " + error);
      })
};

async function actionAuthConfirm(message) {
  const deviceUdid = message["udid"];
  console.log("DeviceUdid set to: " + deviceUdid);
  if (!IS_KIOSK) {
    IconManager.clearBadge();
  }
  await config.saveDeviceUdid(deviceUdid)
}

async function actionDeviceNotFound(message) {
  if (typeof updateContactAdminButtonVisibility == "function") {
    updateContactAdminButtonVisibility(false);
  } else {
    IconManager.markNotAuthorized();
  }
  config.loginErrorReason = message["reason"];
  await config.saveDeviceUdid(null);
  if (IS_EXTENSION) {
    chrome.runtime.onMessage.addListener(pageMessageListener);
    console.log("MESSAGE LISTENER ADDED");
    chrome.browserAction.onClicked.addListener(loginFromButton);
  }
  await clearAllAlarms();
  throw ERROR_DEVICE_NOT_FOUND;
}

async function actionChangeName(message) {
  if (typeof updateDeviceInfo === 'function') {
    updateDeviceInfo(config.deviceUdid, message['deviceName']);
  }
  await config.saveDeviceName(message['deviceName']);
}

async function actionChangeServerUrl(message) {
  await config.saveServerUrl(message["serverUrl"]);
  router.updateUrl(message["serverUrl"]);
}

async function actionLogUpdate(message) {
  const logEnabled = message["shouldSendLogs"];
  if (typeof lg !== "undefined") {
    lg.logEnabled = logEnabled;
  }
  if (logEnabled) {
    chrome.alarms.create(ALARM_SEND_PING, {periodInMinutes: 5});
  } else {
    chrome.alarms.clear(ALARM_SEND_PING);
  }
  console.log("Logging updated to " + logEnabled + " at " + new Date());
}

async function actionLoginConfirmation(message) {
  if (IS_EXTENSION) {
    config.studentId = message["studentId"];
    config.studentName = message["studentName"];
  }
  if (IS_KIOSK) {
    const orgName = message[STORAGE_ORG_NAME];
    const deviceName = message[STORAGE_DEVICE_NAME];
    const lostModeType = message[STORAGE_BLOCKED_MODE_TYPE];
    const screenBlockMessage = message[STORAGE_SCREEN_BLOCK_MESSAGE];
    const notificationInterval = message[STORAGE_NOTIFICATION_INTERVAL];
    const allowContactAdmin = message[STORAGE_IS_CONTACT_ADMIN_ALLOWED];
    const allowScreenCapture = message[STORAGE_IS_SCREEN_CAPTURE_ALLOWED];
    await config.saveDeviceInfo(orgName, deviceName, lostModeType, screenBlockMessage, notificationInterval,
        allowContactAdmin, allowScreenCapture)
    updateOrgAndScreen();
    updateContactAdminButtonVisibility(config.isContactAdminAllowed === true);
    updateDeviceInfo(config.deviceUdid, deviceName);
  }
  config.isLoggedIn = true;
  console.log("Complete login routine. Screen " +
      (config.isScreenLocked ? "is locked with text '" + config.blockedText + "'" : " is not locked"));
}

async function actionLostModeEnable(message) {
  const lostModeOn = {
    seq: message["seq"],
    response: COMMAND_LOST_MODE_ON,
    modeType: message["modeType"]
  };
  if (IS_KIOSK) {
    console.log('Enable lost mode requested and confirmed');
    requestBlockScreen(message[STORAGE_SCREEN_BLOCK_MESSAGE], message[STORAGE_BLOCKED_MODE_TYPE],
        message[STORAGE_NOTIFICATION_INTERVAL], message[STORAGE_IS_SCREEN_CAPTURE_ALLOWED], message['allowContactAdmin']);
    updateDeviceInfo(config.deviceUdid, config.deviceName);
    updateSyncDate();
    await config.saveBlockedInfo(message[STORAGE_SCREEN_BLOCK_MESSAGE], message[STORAGE_BLOCKED_MODE_TYPE],
        message[STORAGE_NOTIFICATION_INTERVAL], message[STORAGE_IS_SCREEN_CAPTURE_ALLOWED],
        message[STORAGE_IS_CONTACT_ADMIN_ALLOWED]);
  }
  return lostModeOn;
}

async function actionScreenshot(message) {
  requestScreenshot(message);
}

async function requestScreenshot(message) {
  console.log('Screenshot requested');
  const tabs = await getChromeTabs({currentWindow: true, active: true});
  if (tabs.length > 0) {
    const currentURL = tabs[0].url;
    const currentTabTitle = tabs[0].title;
    try {
      const screenshotUrl = config.capturedScreen !== null ? config.capturedScreen : await captureVisibleTab();
      if (typeof currentURL !== "undefined") {
        message["tabUrl"] = currentURL;
      }
      if (typeof currentTabTitle !== "undefined") {
        message["tabTitle"] = currentTabTitle;
      }
      sendScreenshot(screenshotUrl, message);
    } catch (error) {
      console.log("Error capture visible tab: " + error);
    }
  } else {
    console.log("No tabs found to capture");
  }
}

actionFunctions[REQUEST_AUTH_CONFIRM] = actionAuthConfirm;
actionFunctions[REQUEST_CHANGE_NAME] = actionChangeName;
actionFunctions[REQUEST_CHANGE_SERVER_URL] = actionChangeServerUrl;
actionFunctions[REQUEST_DEVICE_NOT_FOUND] = actionDeviceNotFound;
actionFunctions[REQUEST_LOCATION] = actionLocation;
actionFunctions[REQUEST_LOG_UPDATE] = actionLogUpdate;
actionFunctions[REQUEST_LOGIN_CONFIRMATION] = actionLoginConfirmation;
actionFunctions[REQUEST_SCREENSHOT] = actionScreenshot;
