import paho.mqtt.client as mqtt

broker_url = "farmer.cloudmqtt.com"
broker_port = 17831

def on_connect(client, userdata, flags, rc):
    print("Connected with result code "+str(rc))

def connect():
    client = mqtt.Client()
    client.username_pw_set("gsjiffrr", "nyyGhWthNz-M")
    client.connect(broker_url, broker_port, 60)

    client.on_message = on_message
    client.on_connect = on_connect

    return client
