// @ts-nocheck
const screenUtil = function (elementId) {
  const self = {
    isFull: false,
    elementId: '',
    resize: () => {},
    fullScreen: () => {},
    exitFullscreen: () => {},
    toggleScreen: () => {},
    eventInit: () => {}
  }
  self.isFull = false
  self.elementId = elementId
  self.resize = () => {
    let isFull =
      document.fullscreenElement ||
      document.mozFullScreenElement ||
      document.webkitFullscreenElement ||
      document.msFullscreenElement
    if (isFull === undefined || isFull === null) isFull = false
    if (isFull) {
      self.isFull = isFull.id == self.elementId
    } else {
      self.isFull = false
    }
  }
  self.fullScreen = () => {
    let element = self.elementId ? document.getElementById(self.elementId) : document.documentElement
    if (element.requestFullscreen) {
      element.requestFullscreen()
    } else if (element.msRequestFullscreen) {
      element.msRequestFullscreen()
    } else if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen()
    } else if (element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen()
    }
  }
  self.exitFullscreen = () => {
    if (document.exitFullscreen) {
      document.exitFullscreen()
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen()
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen()
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen()
    }
  }
  self.toggleScreen = () => {
    if (self.isFull) {
      self.exitFullscreen()
    } else {
      self.fullScreen()
    }
  }
  self.eventInit = () => {
    window.addEventListener('resize', self.resize)
    window.addEventListener('keydown', event => {
      if (event.key === 'F11') {
        event.preventDefault()
        self.toggleScreen()
      }
    })
  }
  return self
}
export default screenUtil
