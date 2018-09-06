import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { addCard as addCardAction } from '../actions'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'flex-start',
		margin: 24
	},
	input: {
		marginTop: 24,
		marginBottom: 24,
		fontSize: 22,
		height: 45
	}
})

export class AddCard extends Component {
	state = {
		question: '',
		answer: '',
	}
	
	submit = () => {
		const { dispatch, navigation } = this.props
		const { question, answer } = this.state
		dispatch(addCardAction({
			title: navigation.getParam('title'),
			question,
			answer
		}))
		navigation.goBack()
	}

	render(){
		const { question, answer } = this.state
		return <View style={styles.container}>
			<TextInput 
					placeholder='Question'
					value={question}
					onChangeText={(question) => this.setState({question})}
					style={styles.input}
				/>
			<TextInput 
					placeholder='Answer'
					value={answer}
					onChangeText={(answer) => this.setState({answer})}
					style={styles.input}
				/>
			<Button
				title='Add card'
				onPress={this.submit}
				color='#12CC8B'
				/>
		</View>
	}
}

export default connect()(AddCard)