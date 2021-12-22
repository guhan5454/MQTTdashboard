import React, { useEffect,useState } from 'react';
import { View, StyleSheet, Text, Button } from 'react-native';
import MQTTConnection from './MQTTConnection';
import { Buffer } from 'buffer';

global.Buffer = Buffer;

export default function App() {

	const [mqttObjState, setmqttObjState] = useState({})

	useEffect(() => {

		const onMQTTConnect = () => {
			console.log('App onMQTTConnect')
			mqttObjState.mqttConnect.subscribeChannel('')
		}


		const onMQTTLost = () => {
			console.log('App onMQTTLost')
		}

		const onMQTTMessageArrived = (message) => {
			console.log('App onMQTTMessageArrive:', message);
			console.log('App onMQTTMessageArrived payloadString: ', message.payloadString);
		}

		const onMQTTMessageDelivered = (message) => {
			console.log('App onMQTTMessageDelivered: ', message);
		}



		const mqttObj = {}
		mqttObj.mqttConnect = new MQTTConnection()
		mqttObj.mqttConnect.onMQTTConnect = onMQTTConnect
		mqttObj.mqttConnect.onMQTTLost = onMQTTLost
		mqttObj.mqttConnect.onMQTTMessageArrived = onMQTTMessageArrived
		mqttObj.mqttConnect.onMQTTMessageDelivered = onMQTTMessageDelivered
		
		mqttObj.mqttConnect.connect('10.1.75.125', 8000)
		
		setmqttObjState(mqttObj)

		return () => {
			mqttObjState.mqttConnect.close()
		}
	}, [])

	return (
		<View style={styles.container}>
			<Text>
				Mqtt Dashboard
			</Text>
			<Button>
				title="Send"
				onPress={() => mqttObjState.mqttConnect.send('', "check message from Guhan")}
			</Button>
		</View>
	)

}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center'
	}
})