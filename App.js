import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import ApolloClient from 'apollo-boost'
import { ApolloProvider, Query } from 'react-apollo'
import gql from 'graphql-tag'

const client = new ApolloClient({
  uri: 'https://stormy-scrubland-22228.herokuapp.com'
})

// Data Test.
// Much hack
//
const Family = () => (
  <Query
    query={gql`
      {
        person(id: "121") {
          id
          firstName
          lastName
          father {
            firstName
          }
        }
      }
    `}>
    {({ loading, error, data }) => {
      if (loading) return <Text>Loading...</Text>
      if (error) return <Text>Error :(</Text>

      const { firstName, lastName } = data.person
      return (
        <Text>
          {firstName} {lastName}
        </Text>
      )
    }}
  </Query>
)

export default class App extends React.Component {
  render() {
    return (
      <ApolloProvider client={client}>
        <View style={styles.container}>
          <Text>Is GraphQL loading?</Text>
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
