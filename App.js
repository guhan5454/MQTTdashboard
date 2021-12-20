import React, {useEffect} from 'react';
import {View, StyleSheet, Text, Button} from 'react-native'; 
import MQTTConnection from './MQTTConnection';
import { Buffer } from 'buffer';

global. Buffer = Buffer;

export default function App() {
	useEffect (() => {
		this.mqttConnect = new MQTTConnection()
		this.mqttConnect.onMQTTConnect = this.onMQTTConnect
		this.mqttConnect.onMQTTLost = this.onMQTTLost 
		this.mqttConnect.onMQTTMessageArrived = this.onMQTTMessageArrived
		this.mqttConnect.onMQTTMessageDelivered = this.onMQTTMessageDelivered

		this.mqttConnect.connect(ip, port)

		onMQTTConnect = () => {
			console.log('App onMQTTConnect')
			this.mqttConnect.subscribeChannel( 'hanth2')
		}


		onMQTTLost = () => {
			console.log('App onMQTTLost')
		}

		onMQTTMessageArrived = (message) => {
			console.log('App onMQTTMessageArrive:', message);
			console.log('App onMQTTMessageArrived payloadString: ', message.payloadString);
		}

		onMQTTMessageDelivered = (message) => {
			console.log('App onMQTTMessageDelivered: ', message);
		}

		return () => {
			this.mqttConnect.close()
		}
	}, [])

	return (
		<View style={styles.container}>
			<Text>
				Mqtt Dashboard
			</Text>
			<Button>
				title="Send"
				onPress={()=> this.mqttConnect.send('hanth2', "check message from Guhan")}
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