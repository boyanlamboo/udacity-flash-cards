import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, List, ListItem, Button } from 'react-native'
import { connect } from 'react-redux'

export class Deck extends Component {
	render(){
		const { navigation, decks } = this.props
		const deck = decks[navigation.getParam('title')]
		return <View>
			<Text>{deck.title}</Text>
			<Text>{deck.questions.length}</Text>
			<Button onPress={() => navigation.navigate('AddCard', deck)}
							title='Add Card'
			/>
			<Button onPress={() => navigation.navigate('StartQuiz', deck)}
							title='Start Quiz'
							disabled={deck.questions.length === 0}
			/>
		</View>
	}
}

function mapStateToProps(decks) {
	return { decks }
}

export default connect(mapStateToProps)(Deck)