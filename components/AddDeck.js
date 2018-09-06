import React, { Component } from 'react'
import { connect } from 'react-redux' 
import { addDeck as addDeckAction } from '../actions'
import { StyleSheet, Text, View, TextInput, Button, KeyboardAvoidingView } from 'react-native'

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
		navigation.navigate('Deck', {
			title: title
		})
	}

	render(){
		const { title } = this.state
		return <KeyboardAvoidingView 
						 style={styles.container}
						 behavior='padding'
						 enabled>
			<TextInput 
					placeholder='Deck title'
					value={title}
					onChangeText={(title) => this.setState({title})}
					style={styles.input}
				/>
			<Button
				title='Create Deck'
				onPress={this.submit}
				color='#12CC8B'
				/>
		</KeyboardAvoidingView>
	}
}

export default connect()(AddDeck)