import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { addDeck as addDeckAction } from '../actions'
import { StyleSheet, Text, View, TextInput, Button } from 'react-native'

export class AddDeck extends Component {
	state = {
		title: ''
	}
	
	submit = () => {
		const { dispatch, navigation } = this.props
		const { title } = this.state
		dispatch(addDeckAction({
			title,
		}))
		navigation.goBack()
	}

	render(){
		const { title } = this.state
		return <View>
			<TextInput 
					placeholder='Deck title'
					value={title}
					onChangeText={(title) => this.setState({title})}
				/>
			<Button
				title='Submit'
				onPress={this.submit}
				/>
		</View>
	}
}

export default connect()(AddDeck)