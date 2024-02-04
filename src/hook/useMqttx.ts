import * as mqtt from 'mqtt/dist/mqtt.min.js'

function useMqtt(options: any) {
  let client = ref({
    connected: false
  } as mqtt.MqttClient)
  console.log(options)
  const connection = reactive({
    protocol: options.protocol || 'ws',
    host: options.host,
    // ws -> 8083; wss -> 8084
    port: options.port || 8083,
    clientId: 'emqx' + new Date().getTime(),
    // username: options.username,
    // password: options.password,
    clean: options.clean || true,
    connectTimeout: options.connectTimeout || 3000, // ms
    reconnectPeriod: options.reconnectPeriod || 4000 // ms
  })
  const connect = () => {
    try {
      const { protocol, host, port, ...options } = connection
      console.log(options)
      const connectUrl = `${protocol}://${host}:${port}/mqtt`
      client.value = mqtt.connect(connectUrl, options)
      client.value.on('connect', () => {
        console.log('connection successful')
        doSubscribe()
      })
      client.value.on('reconnect', () => {
        handleOnReConnect()
      })
      client.value.on('error', (error: any) => {
        console.log('connection error:', error)
      })
      // client.value.on('message', (topic: string, message: any) => {
      //   console.log('收到的数据--------------', JSON.parse(message))
      // })
    } catch (error) {
      console.log('mqtt.connect error:', error)
    }
  }
  // //订阅信息设置
  const subscription = ref({
    topic: options.topic, //需要动态配置
    qos: (options.qos as mqtt.QoS) || 2
  })

  const retryTimes = ref(0)

  const handleOnReConnect = () => {
    retryTimes.value += 1
    if (retryTimes.value > 5) {
      try {
        client.value.end()
        retryTimes.value = 0
        console.log('connection maxReconnectTimes limit, stop retry')
      } catch (error) {
        console.log('handleOnReConnect catch error:', error)
      }
    }
  }
  //订阅消息
  const doSubscribe = () => {
    const { topic, qos } = subscription.value
    client.value.subscribe(topic, { qos }, (error: Error, granted: mqtt.ISubscriptionGrant[]) => {
      if (error) {
        console.log('subscribe error:', error)
        return
      }
      console.log('subscribe successfully:', granted)
    })
  }
  //关闭连接
  const destroyConnection = () => {
    if (client.value.connected) {
      try {
        client.value.end(false, () => {
          retryTimes.value = 0
          console.log('disconnected successfully')
        })
      } catch (error) {
        console.log('disconnect error:', error)
      }
    }
  }
  // //组件销毁前断开连接
  onUnmounted(() => {
    console.log('页面销毁前断开连接------')
    destroyConnection()
  })
  return {
    client,
    connect,
    destroyConnection
  }
}

export default useMqtt
