import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SignUp = () => {
  return (
    <View className={styles.container}>
      <Text className={styles.title}>SignUp</Text>
    </View>
  )
}

export default SignUp

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
})