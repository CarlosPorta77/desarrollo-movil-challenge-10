import React from 'react'
import { ActivityIndicator, AsyncStorage, StatusBar, StyleSheet, View } from 'react-native'
import { getCurrentUser } from '../firebase'
// import { TextInput } from 'react-native-gesture-handler';
import { TextInput } from 'react-native'
import { Button } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'
import firebase, { db, auth } from '../firebase'

export default class AuthLoadingScreen extends React.Component {
  constructor(props) {
    super(props)
    this._bootstrapAsync()
    this.state = { name: 'Carlos' }
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const currentUser = await getCurrentUser()
    //this.props.navigation.navigate('App')
  }

  // Render any loading content that you like here
  _handlePress = event => {
    const tokensCollection = db.collection('users')
    const userId = auth.currentUser.uid

    tokensCollection.doc(userId).set({
      name: this.state.name,
    })

    this.props.navigation.navigate('App')
  }
  render() {
    return (
      <View style={styles.container}>
        {/* <ActivityIndicator /> */}
        <StatusBar barStyle="default" />
        <TextInput
          style={{ height: 20, borderColor: 'gray', borderWidth: 1, width: 100 }}
          onChangeText={text => this.setState({ name })}
          value={this.state.name}
        />
        <Button
          icon={<Icon name="arrow-right" size={15} color="white" />}
          title="Ingresar"
          onPress={this._handlePress}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
})
