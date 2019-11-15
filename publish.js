var mqtt = require('mqtt')
var client  = mqtt.connect('mqtt://broker.hivemq.com', {
  'wsOptions': {
    'port': 8000
  }
})

const topic = 'gti780a2019/equipe03/temperature'

client.on('connect', function () {
  client.subscribe(topic, function (err) {
    if (!err) {
      client.publish(topic, 'Hello there')
    }
  })
})
