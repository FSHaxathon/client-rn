import React from 'react'
import { StyleSheet, View } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'
import { StackNavigator } from 'react-navigation'

import ChooseScreen from './screens/chooseScreen'
import FamilyDetails from './screens/familyDetails'

const client = new ApolloClient({
  uri: 'https://stormy-scrubland-22228.herokuapp.com'
})

const RootStack = StackNavigator({
  Home: { screen: ChooseScreen },
  Profile: { screen: FamilyDetails }
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <RootStack />
      </ApolloProvider>
    )
  }
}
