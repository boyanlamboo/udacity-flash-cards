import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList, List, ListItem, TouchableOpacity } from 'react-native'
import { gray } from '../utils/colors'
import { fetchDecks } from '../utils/api'
import { getDecks } from '../actions'

const styles = StyleSheet.create({
  deck: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
		margin: 12,
		borderRadius: 5,
		height: 200,
		shadowColor: 'rgba(0,0,0,0.5)',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
  },
	title: {
		margin: 12,
		fontSize: 22,
		fontWeight: 'bold'
	},
	subTitle: {
		margin: 6,
		fontSize: 16,
		color: gray
	}
})

export class AllDecks extends Component {
	state = {
		loading: false
	}

	setLoading = (loading) => this.setState({
		loading
	}) 

	componentDidMount(){
			const { dispatch } = this.props
			this.setLoading(true)
			fetchDecks()
				.then(decks => dispatch(getDecks(decks)))
				.then(() => this.setLoading(false))
				.catch(() => this.setLoading(false))
	}

	render(){
		const { loading } = this.state
		const { decks, navigation } = this.props 
		
		if(loading){
			return (
				<Text>Loading...</Text>
			)
		}
		
		return decks ? <View>
				<Text style={styles.title} >Your decks</Text>
				<FlatList
				data={Object.values(decks)}
			  keyExtractor={(item) => item.title}
				renderItem={({item}) => (
					<TouchableOpacity 
						style={styles.deck}
						onPress={() => navigation.navigate('Deck', item)}>
						<Text style={styles.title}>{item.title}</Text>
						<Text style={styles.subTitle}>{item.questions.length} cards in deck</Text>	
					</TouchableOpacity>
					)}
				/>
			</View> : null
			
	}
}

function mapStateToProps(decks) {
		return { decks }
}

export default connect(mapStateToProps)(AllDecks)