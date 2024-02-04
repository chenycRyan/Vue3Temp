import JsBarcode from 'jsbarcode'
import QRCode from 'qrcode'
import { ElMessage } from 'element-plus'
//生成条形码
export function createBarcode(id, text) {
  JsBarcode(id, text)
}
//生成二维码
export function mkQRCode(text) {
  return new Promise((resolve, reject) => {
    const qrCodeCanvas = document.createElement('canvas')
    qrCodeCanvas.width = 200
    qrCodeCanvas.height = 200
    QRCode.toCanvas(qrCodeCanvas, text, { width: 200, height: 200 }, function (error) {
      if (error) {
        reject(error)
        ElMessage.warning('二维码生成失败!')
      } else {
        resolve(qrCodeCanvas.toDataURL('image/png'))
      }
    })
  })
}
