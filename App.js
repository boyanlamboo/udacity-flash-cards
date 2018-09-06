import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import reducer from './reducers'
import middleware from './middleware'
import AllDecks from './components/AllDecks'
import Deck from './components/Deck'
import AddCard from './components/AddCard'
import AddDeck from './components/AddDeck'
import { Quiz as StartQuiz } from './components/Quiz'
import { createMaterialTopTabNavigator, createStackNavigator } from 'react-navigation'
import { setLocalNotification } from './utils/notifications'


const store = createStore(reducer, middleware)

const Tabs = createMaterialTopTabNavigator({
  Decks: AllDecks,
	AddDeck: {
		screen: AddDeck,
		navigationOptions: () => ({
			title: 'Add new deck'
		}),
	}
}, {
		initialRouteName: 'Decks',
		tabBarOptions: {
			style: {
				backgroundColor: '#12CC8B',
			}
		}
	},
)

const Stack = createStackNavigator({
  Home: {
    screen: Tabs,
		navigationOptions: () => ({
			title: 'Decks',
			titleStyle: {
        color: '#000000'
      },
			headerStyle: {
				backgroundColor: '#F2F2F2'
			}
		})
	},
	Deck: {
		screen: Deck,
		navigationOptions: ({navigation}) => ({
			title: `Deck: ${navigation.state.params.title}`,
			titleStyle: {
        color: '#000000'
      },
			headerStyle: {
				backgroundColor: '#F2F2F2'
			}
		})
	},
	AddCard: {
		screen: AddCard,
		navigationOptions: ({navigation}) => ({
			title: `Adding card to: ${navigation.state.params.title}`,
			titleStyle: {
        color: '#000000'
      },
			headerStyle: {
				backgroundColor: '#F2F2F2'
			}
		})
	},
	StartQuiz: {
		screen: StartQuiz,
		navigationOptions: ({navigation}) => ({
			title: `Quiz: ${navigation.state.params.title}`,
			titleStyle: {
        color: '#000000'
      },
			headerStyle: {
				backgroundColor: '#F2F2F2'
			}
		})
	},
}, {
	initialRouteName: 'Home',
	headerMode: 'screen',
})

export default class App extends React.Component {
	componentDidMount() {
		setLocalNotification()
	}
  render() {
    return (
			<Provider store={store}>
				<Stack />
			</Provider> 
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
