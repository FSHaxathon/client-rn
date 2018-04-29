import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

/**
 * graphql HOC components render function is called with
 * 1. `loading` to indicate state of request
 * 2. `error`   resolved error
 * 3. `data`    resolved response object.
 */
const Family = ({ data: { loading, error, person } }) => {
  if (loading) return <Text>Loading...</Text>
  if (error) return <Text>Error :(</Text>

  const { firstName, lastName, dad, mom } = person
  return (
    <View>
      <Text>
        me: {firstName} {lastName}
      </Text>
      <Text>
        dad: {dad.firstName} {dad.lastName}
      </Text>
      <Text>
        mom: {mom.firstName} {mom.lastName}
      </Text>
    </View>
  )
}

const query = gql`
  query PersonQuery {
    person(id: "1024") {
      id
      firstName
      lastName
      dad: father {
        firstName
        lastName
      }
      mom: mother {
        firstName
        lastName
      }
    }
  }
`

// graphql HOC works IFF there is an ApolloProvider somewhere up
// the component Hierarchy
//
export default graphql(query)(Family)
