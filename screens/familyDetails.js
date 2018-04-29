import React from 'react'
import { StyleSheet, ScrollView, Text, View } from 'react-native'
import { graphql } from 'react-apollo'
import gql from 'graphql-tag'

/**
 * graphql HOC components render function is called with
 * 1. `loading` to indicate state of request
 * 2. `error`   resolved error
 * 3. `data`    resolved response object.
 */

const showName = (label, { id, firstName, lastName }) => (
  <Text key={id} style={styles.text}>
    {label} {firstName} {lastName}
  </Text>
)
const showNameList = (label, people) =>
  people.map(person => showName(label, person))

class FamilyDetails extends React.Component {
  static navigationOptions = {
    title: 'Details'
  }

  render() {
    const { data: { loading, error, person } } = this.props

    if (loading) return <Text>Loading...</Text>
    if (error) return <Text>Error :(</Text>

    const { dad, mom, boFu } = person
    return (
      <ScrollView contentContainerStyle={styles.contentContainer}>
        {showName('', person)}
        {showName('dad:', dad)}
        {showName('mom:', mom)}
        {showNameList('boFu', boFu)}
      </ScrollView>
    )
  }
}

const details = gql`
  fragment details on Person {
    id
    lastName
    firstName
  }
`

const query = gql`
  query($id: String!) {
    person(id: $id) {
      id
      ...details

      dad: father {
        ...details
      }

      mom: mother {
        ...details
      }

      boFu {
        ...details
      }
    }
  }
  ${details}
`

// graphql HOC works IFF there is an ApolloProvider somewhere up
// the component Hierarchy
//
export default graphql(query, {
  options: props => {
    // TODO: Not sure if this is the idiomatic RN way of getting data
    // from StackNavigator. Does this information exist in passed down props?
    //
    // **** props.navigation.state.params.personId
    //
    // console.log('GRAPHQL Lifecycle StartQuery PROPS', props)
    //
    return {
      variables: {
        id: props.navigation.state.params.personId
      }
    }
  }
})(FamilyDetails)

const styles = StyleSheet.create({
  text: {
    padding: 5
  },

  contentContainer: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
