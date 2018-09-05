import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, Text, StyleSheet, FlatList, List, ListItem, TouchableOpacity } from 'react-native'
import { fetchDecks } from '../utils/api'
import { getDecks } from '../actions'

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
		
		return decks ? <FlatList
				data={Object.values(decks)}
			  keyExtractor={(item) => item.title}
				renderItem={({item}) => (
					<TouchableOpacity onPress={() => navigation.navigate('Deck', item)}>
						<Text>{item.title}</Text>
						<Text>{item.questions.length}</Text>
					</TouchableOpacity>
				)}
			/> : null
			
	}
}

function mapStateToProps(decks) {
		return { decks }
}

export default connect(mapStateToProps)(AllDecks)