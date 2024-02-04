const dev = {
  baseUrl_JAVA: '/api'
}

window.appsettings = dev
localStorage.setItem('appsettingsdefault', JSON.stringify(window.appsettings))
