const { getDevice,getNotifications, updateNotification, 
    getDeviceLocation,getDeviceLevels, getAllThreshold,
    insertDeviceThreshold,insertDeviceData,
    GetFactor,
    GetEmailAlerts,
    SendMails,
    GetDeviceSettings,
    GetEmailSettings,
    InsertUser,
    GetUser,
    RemoveUser,
    UpdateEmailSettings,
    GetDeviceHighestCo2,
    UpdateDeviceSettings,
    GetDeviceSettingsFreeSearch,
    GetEmailsSettingsFreeSearch,
    GetThreshold,
    deviceAgainstThreshold,
    GetDeviceNotFactor,
    GetDeviceNotEmailAlert,
    InsertFactorDeviceData,
    // InsertFactorEmailData,
    Login,
    InsertEmailAlertAndFactor} = require('../controller/devicesController')

const router=require('express').Router()

router.get('/',getDevice)
router.get('/notifications',getNotifications)
router.post('/updateNotification',updateNotification)
router.get('/deviceLevels',getDeviceLevels)
router.get('/deviceThreshold',getAllThreshold)
router.get('/deviceAgainstThreshold',deviceAgainstThreshold)
router.post('/deviceLocation',getDeviceLocation)
router.get('/insertDeviceData',insertDeviceData)
router.get('/insertDeviceThreshold',insertDeviceThreshold)
router.post('/InsertUser',InsertUser)
router.get('/GetUser',GetUser)
router.get('/GetFactor',GetFactor)
router.get('/GetThreshold',GetThreshold)
router.post('/RemoveUser',RemoveUser)
router.get('/GetEmailAlerts',GetEmailAlerts)
router.get('/sendMails',SendMails)
router.get('/GetDeviceHighestCo2',GetDeviceHighestCo2)
router.get('/GetDeviceSettings',GetDeviceSettings)
router.get('/GetDeviceNotFactor',GetDeviceNotFactor)
router.get('/GetDeviceNotEmailAlert',GetDeviceNotEmailAlert)
router.get('/GetDeviceSettingsFreeSearch',GetDeviceSettingsFreeSearch)
router.get('/GetEmailsSettingsFreeSearch',GetEmailsSettingsFreeSearch)
router.get('/GetEmailSettings',GetEmailSettings)
router.post('/UpdateEmailSettings',UpdateEmailSettings)
router.post('/UpdateDeviceSettings',UpdateDeviceSettings)
router.post('/InsertFactorDeviceData',InsertFactorDeviceData)
// router.post('/InsertFactorEmailData',InsertFactorEmailData)
router.post('/Login',Login)
router.post('/InsertEmailAlertAndFactor',InsertEmailAlertAndFactor)





module.exports=router