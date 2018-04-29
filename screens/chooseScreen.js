import React from 'react'
import { Button, StyleSheet, Text, View } from 'react-native'

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome'
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Button
          title="Josephine Patel..."
          onPress={() => navigate('Profile', { personId: '99' })}
        />

        <Button
          title="Michael Lee..."
          onPress={() => navigate('Profile', { personId: '1024' })}
        />

        <Button
          title="Troy Martino..."
          onPress={() => navigate('Profile', { personId: '2048' })}
        />
      </View>
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

export default HomeScreen
