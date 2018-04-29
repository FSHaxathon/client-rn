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

  const { firstName, lastName } = person
  return (
    <Text>
      {firstName} {lastName}
    </Text>
  )
}

const query = gql`
  query PersonQuery {
    person(id: "121") {
      id
      firstName
      lastName
      father {
        firstName
      }
    }
  }
`

// graphql HOC works IFF there is an ApolloProvider somewhere up
// the component Hierarchy
//
export default graphql(query)(Family)
