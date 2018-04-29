import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider } from 'react-apollo'

import Family from './components/display'

const client = new ApolloClient({
  uri: 'https://stormy-scrubland-22228.herokuapp.com'
})

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Family />
        </View>
      </ApolloProvider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
