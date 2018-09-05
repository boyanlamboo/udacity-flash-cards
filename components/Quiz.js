import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, List, ListItem, Button } from 'react-native'
import { connect } from 'react-redux'

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
	
	renderBtns = () => <View>
		<Button
				title='Correct'
				onPress={() => this.answerQuestion(true)}
			/>
		<Button
				title='Incorrect'
				onPress={() => this.answerQuestion(false)}
			/>
	</View>
	
	questionCounter = (currentQuestion, numberOfQuestions) => <View>
		<Text>{currentQuestion + 1} / {numberOfQuestions}</Text>
	</View>

	render(){
		const { navigation } = this.props 
		const { currentQuestion, correctAnswers, view } = this.state
		const questions = navigation.getParam('questions', [])
		
		if(currentQuestion === questions.length){
			return <Text>{correctAnswers * 100 / questions.length}%</Text>	
		}
		
		const counterView = this.questionCounter(currentQuestion, questions.length)
		
		switch(view){
			case ANSWER_VIEW :
				return <View>
					{counterView}
					<Text>{questions[currentQuestion].answer}</Text>
					<Button
							title='Question'
							onPress={() => this.switchView(QUESTION_VIEW)}
						/>
					{this.renderBtns()}
				</View>
			case QUESTION_VIEW :
			default :
				return <View>
					{counterView}
					<Text>{questions[currentQuestion].question}</Text>
					<Button
							title='Answer'
							onPress={() => this.switchView(ANSWER_VIEW)}
						/>
					{this.renderBtns()}
				</View>
		}
		
		return <Text>Hi</Text>
	}
}