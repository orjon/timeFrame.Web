$(() => {

  const fadeOut= 1000
  const fadeIn= 500
  const animSpeed = 3000

  $('.explain > div:gt(0)').hide()


  function explain() {
    $('.explain > div:first')
      .fadeOut(fadeOut)
      .next()
      .fadeIn(fadeIn)
      .end()
      .appendTo('.explain')
  }

  setInterval(explain, animSpeed)

})
