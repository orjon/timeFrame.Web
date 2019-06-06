/* eslint-disable no-unused-vars */
/* eslint-disable prefer-const */
$(() => {

  const currentPage = document.querySelector('.navText').innerHTML
  const navIcons = document.querySelectorAll('.navIcon')
  const navText = document.querySelector('.navText')

  navIcons.forEach(icon => {
    icon.addEventListener('mouseover', (e) => {
      resetNavIcons()
      if ($(e.target).hasClass('code')) {
        $('.navText').css('text-align', 'left')
        navText.innerHTML='code'
        $(e.target).attr('src', './images/nav/navCodeColor3.png')
      } else if ($(e.target).hasClass('design')) {
        $('.navText').css('text-align', 'left')
        navText.innerHTML='design & visualisation'
        $(e.target).attr('src', './images/nav/navDesignColor2.png')
      } else if ($(e.target).hasClass('electronics')) {
        $('.navText').css('text-align', 'left')
        navText.innerHTML='electronics'
        $(e.target).attr('src', './images/nav/navElectronicsColor5.png')
      } else if ($(e.target).hasClass('face')) {
        $('.navText').css('text-align', 'right')
        navText.innerHTML='about me'
        $(e.target).attr('src', './images/nav/navFaceColor.png')
      }
    })

    icon.addEventListener('mouseout', () => {
      navText.innerHTML= currentPage
      resetNavIcons()
      $('.code.current').attr('src', './images/nav/navCodeColor3.png')
      $('.design.current').attr('src', './images/nav/navDesignColor2.png')
      $('.electronics.current').attr('src', './images/nav/navElectronicsColor5.png')
      $('.face.current').attr('src', './images/nav/navFaceColor.png')
      $('.navText.aboutMe').css('text-align', 'right')

    })
  })
  // //
  function resetNavIcons() {
    $('.navText').css('text-align', 'left')
    $('.code').attr('src', './images/nav/navCode.png')
    $('.design').attr('src', './images/nav/navDesign.png')
    $('.electronics').attr('src', './images/nav/navElectronicsColor0.png')
    $('.face').attr('src', './images/nav/navFace.png')
  }


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
