
const CronJob = require('cron').CronJob

const SUBTRACT_HOUR = 1
const SUBTRACT_MINUTE = 15
const ADD_HOUR = 2

function scheduleDate(hour) {
    const splitedHour = hour.split(':')

    const subtractedHour = (Number(splitedHour[0]) - SUBTRACT_HOUR)
    const subtractedMinute = (Number(splitedHour[1]) - SUBTRACT_MINUTE)
    const addedHour = (Number(splitedHour[0]) + ADD_HOUR)

    scheduleCronJob(splitedHour[1], subtractedHour)

    scheduleCronJob(subtractedMinute, splitedHour[0], 'reminder')

    scheduleCronJob(splitedHour[1], addedHour, 'evaluate')
}

function scheduleCronJob(minute, hour, type = 'confirmation') {
    const job = new CronJob(`* ${minute} ${hour} * * *`, () => {
        switch (type) {
            case 'confirmation' :
                sendNotification(`Please, confirm your schedule to ${hour + 1}:${minute}`)
                break
            case 'reminder' : 
                sendNotification(`Reminder: your schedule it is ${hour + 1}:${minute}`)
                break
            case 'evaluate' : 
                sendNotification(`Please, tell us about your experience with this job`)
                break
        }
        job.stop()
    })
    
    job.start()
}

function sendNotification(message) {
    console.log(message, `cronjob at: ${new Date().getHours()}:${new Date().getMinutes()}`)
}

scheduleDate('01:52');
