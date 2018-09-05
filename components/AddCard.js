import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { addCard as addCardAction } from '../actions'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

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
		return <View>
			<TextInput 
					placeholder='Question'
					value={question}
					onChangeText={(question) => this.setState({question})}
				/>
			<TextInput 
					placeholder='Answer'
					value={answer}
					onChangeText={(answer) => this.setState({answer})}
				/>
			<Button
				title='Submit'
				onPress={this.submit}
				/>
		</View>
	}
}

export default connect()(AddCard)