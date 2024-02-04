declare namespace User {
  interface UserInfo {
    access_token: string
    userId: number
    userName: string
    realName: string
    phone: string
  }
}

declare namespace App {
  interface AppState {
    systemInfo: UniApp.GetSystemInfoResult
    statusBar: number
    customBar: number
  }
}
