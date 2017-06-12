import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  gradientContainer: {
    flex: 1,
    padding: 15,
    alignItems: 'center'
  },
  container: {
    flex: 1,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    paddingTop: 15
  },
  text: {
    fontFamily: 'PT Sans'
  },
  error: {
    marginTop: 5,
    fontFamily: 'PT Sans',
    color: '#fe4a49'
  }
});

export default Style;
