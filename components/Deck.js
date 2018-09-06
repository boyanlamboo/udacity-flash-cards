import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, List, ListItem, Button } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'space-around',
		padding: 24
	},
	buttons: {
		justifyContent: 'space-around',
		alignItems: 'center',
		height: 100,
	},
	texts: {
		justifyContent: 'space-around',
		alignItems: 'center'
	},
	title: {
		fontSize: 30,
		fontWeight: 'bold'
	},
	subTitle: {
		fontSize: 18,
		textAlign: 'center'
	}
})

export class Deck extends Component {
	render(){
		const { navigation, decks } = this.props
		const deck = decks[navigation.getParam('title')]
		return <View style={styles.container}>
			
			<View style={styles.texts}>
				<Text style={styles.title}>Deck: {deck.title}</Text>
				<Text style={styles.subTitle}>You have {deck.questions.length} cards in this deck. Feel free to add more or test your knowdlegde by starting the quiz!</Text>
			</View>
			
			<View style={styles.buttons}>
				<Button onPress={() => navigation.navigate('AddCard', deck)}
							title='Add Card'
							color='#12CC8B'
				/>
				<Button onPress={() => navigation.navigate('StartQuiz', deck)}
								title='Start Quiz'
								disabled={deck.questions.length === 0}
				/>
			</View>
			
		</View>
	}
}

function mapStateToProps(decks) {
	return { decks }
}

export default connect(mapStateToProps)(Deck)