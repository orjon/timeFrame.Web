/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
$(() => {

  let theTime = undefined
  // let timeString = undefined
  const hrs = 0
  const min = 1
  const sec = 2

  let hours =  0
  let minutes = 0
  let seconds = 0
  let minutesDec = 0
  let minutesUni = 0

  let hoursSet = false
  let minDecSet = false
  let minUniSet = false

  let cycleCounter = 0

  const frames = document.querySelectorAll('.timeFrames')

  onload()

  function onload() {
    updateTime()
    clockCycle()
    setInterval(clockCycle, 500)
  }

  function clockCycle() {
    cycleCounter++
    if (cycleCounter > 20) {
      cycleCounter = 0
    }
    if (cycleCounter < 10 ) {
      if (!hoursSet) {
        selectSegments(hours)
        hoursSet = true
        minUniSet = false
      }
    } else if (cycleCounter < 15) {
      if (!minDecSet) {
        selectSegments(minutesDec)
        minDecSet = true
        hoursSet = false
      }
    } else {
      if (!minUniSet) {
        selectSegments(minutesUni)
        updateTime()
        minUniSet = true
        minDecSet = false
      }
    }
  }

  function updateTime() {
    const time = new Date()
    theTime = [time.getHours(),time.getMinutes(),time.getSeconds()]
    hours =   theTime[hrs]
    minutes = theTime[min]
    seconds = theTime[sec]
    minutesDec = Math.trunc(minutes/10)
    minutesUni = minutes%10

    if (hours > 12) {
      hours = hours - 12
    }
    const timeString = hours + ':' + minutes
    console.log('Time: '+ timeString)
    console.log('Time: '+ hours + '/' + minutesDec + '/' + minutesUni + ':' + seconds)
  }


  function selectSegments(number) {
    if (number === 0) {
      turnOffSegments()
      return
    }
    const segments = [0,0,0,0,0,0,0,0,0,0,0,0]
    let counter = number
    do {
      let tempRandom = Math.floor(Math.random()*12)
      if (segments[tempRandom] === 0) {
        segments[tempRandom]= 1
        counter--
      }
    }
    while (counter > 0)

    turnOffSegments()

    for (let x=0; x < segments.length; x++) {
      if (segments[x] === 1){
        turnOnSegment(x)
      }
    }

  }


  function turnOnSegment(segment){
    $(frames[segment]).removeClass('turnOff')
  }

  function turnOffSegments() {
    for (let x = 0; x < frames.length; x++){
      $(frames[x]).addClass('turnOff')
    }
  }


})
