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

const showName = (label, { firstName, lastName }) => (
  <Text>
    {label} {firstName} {lastName}
  </Text>
)

class FamilyDetails extends React.Component {
  static navigationOptions = {
    title: 'Details'
  }

  render() {
    const { data: { loading, error, person } } = this.props

    if (loading) return <Text>Loading...</Text>
    if (error) return <Text>Error :(</Text>

    const { firstName, lastName, dad, mom, boFu } = person
    return (
      <View style={styles.container}>
        {showName('', person)}
        {showName('dad:', dad)}
        {showName('mom:', mom)}
      </View>
    )
  }
}

const query = gql`
  query($id: String!) {
    person(id: $id) {
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
      boFu {
        firstName
        lastName
      }
    }
  }
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
})
