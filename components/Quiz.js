import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, List, ListItem, Button, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux'

const styles = StyleSheet.create({
	counter: {
		color: 'gray',
		fontSize: 18,
		margin: 12
	},
	container: {
		flex: 1,
		justifyContent: 'space-around',
		alignItems: 'center',
		padding: 24
	},
	title: {
		fontSize: 24,
		fontWeight: 'bold',
		textAlign: 'center'
	},
	topPortion: {
		justifyContent: 'space-between',
		alignItems: 'center',
		height: 200
	},
	btns: {
		flex: 1,
		justifyContent: 'center',
		height: 200
	},
	answerToggle: {
		color: 'blue',
	},
	buttonContainer: {
		justifyContent: 'center'
	},
	button: {
		padding: 12
	},
})



const QUESTION_VIEW = 'QUESTION_VIEW'
const ANSWER_VIEW = 'ANSWER_VIEW'

export class Quiz extends Component {
	state = {
		currentQuestion: 0,
		correctAnswers: 0,
		view: QUESTION_VIEW,
	}

	switchView = (view) => this.setState({
		view
	})

	answerQuestion = (correct) => {
		if(correct){
			this.setState((state) => ({
				correctAnswers: state.correctAnswers + 1
			}))
		}
		this.setState((state) => ({
			currentQuestion: state.currentQuestion + 1,
			view: QUESTION_VIEW
		}))
	}
	
	renderBtns = () => <View style={styles.btns}>
		<View style={styles.button}>
			<Button
				title='Correct'
				onPress={() => this.answerQuestion(true)}
				color='#12CC8B'
			/>
		</View>
		
		<View style={styles.button}>
			<Button
				title='Incorrect'
				onPress={() => this.answerQuestion(false)}
				color='#D32D4F'
			/>
		</View>
	</View>
	
	questionCounter = (currentQuestion, numberOfQuestions) => <View>
		<Text style={styles.counter}>Question: {currentQuestion + 1} / {numberOfQuestions}</Text>
	</View>
	
	restartQuiz = () => this.setState({
		currentQuestion: 0,
		correctAnswers: 0
	})

	render(){
		const { navigation } = this.props 
		const { currentQuestion, correctAnswers, view } = this.state
		const questions = navigation.getParam('questions', [])
		
		if(currentQuestion === questions.length){
			return 	<View style={styles.container}>
								<Text style={styles.title}>Your score: {correctAnswers * 100 / questions.length}%</Text>
								<View style={styles.buttonContainer}>
									<View style={styles.button}>
										<Button
											title='Restart Quiz' 
											onPress={this.restartQuiz}
											color='#12CC8B'
										/>
									</View>
									<View style={styles.button}>
										<Button
										title='Return to deck' 
										onPress={() => navigation.goBack()}
									/>
									</View>
								</View>
			
						</View>
		}

		const counterView = this.questionCounter(currentQuestion, questions.length)

		switch(view){
			case ANSWER_VIEW :
				
				return <View style={styles.container}>
					
					<View style={styles.topPortion}>
						{counterView}
						<Text style={styles.title}>{questions[currentQuestion].answer}</Text>
						<TouchableOpacity
							onPress={() => this.switchView(QUESTION_VIEW)}>
							<Text style={styles.answerToggle}>See Answer</Text>
						</TouchableOpacity>
					</View>
					
					{this.renderBtns()}
			
				</View>
			case QUESTION_VIEW :
			default :
				return <View style={styles.container}>
					
					<View style={styles.topPortion}>
						{counterView}
						<Text style={styles.title}>{questions[currentQuestion].question}</Text>
						<TouchableOpacity
							onPress={() => this.switchView(ANSWER_VIEW)}>
							<Text style={styles.answerToggle}>See Answer</Text>
						</TouchableOpacity>
					</View>
					
					{this.renderBtns()}
			
				</View>
		}
	}
}