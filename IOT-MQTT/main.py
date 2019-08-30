import mqtt as mqtt
import uuid
# import sensorLDR as sensor

client = mqtt.connect()
iniciou = False
resistenciaAtual = 0
processId = ""

while True:
    # resistencia = sensor.capturar_resistencia()
    resistencia = 15001
    if(iniciou == False):
        if(resistencia > 15000):
            iniciou = True
            processId = uuid.uuid1()
            client.publish("Test", '{"ambiente" : 1, "processId" : "' +str(processId)+'", "ligado" : true }' )
    else:
        if(resistencia < 15000):
            iniciou = False
            processId = processId
            client.publish("Test", '{"ambiente" : 1, "processId" : "' + str(processId)+'", "ligado" : false }' )
