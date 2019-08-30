import RPi.GPIO as GPIO
import time

GPIO.setmode(GPIO.BOARD)

#Define qual o pino utilizado para o circuito, por padrão o pino 7
def capturar_resistencia(pin_to_circuit = 7):
    count = 0

    #Configura a saída no pino
    GPIO.setup(pin_to_circuit, GPIO.OUT)
    GPIO.output(pin_to_circuit, GPIO.LOW)

    #Aguarda 10 milisegundos
    time.sleep(0.1)

    #Seta o pino para o método de entrada
    GPIO.setup(pin_to_circuit, GPIO.IN)

    #Conta até que o pino fique alto, ou seja, quando o capacitor estiver 3/4 preenchido
    while (GPIO.input(pin_to_circuit) == GPIO.LOW):
        count += 1
    return count