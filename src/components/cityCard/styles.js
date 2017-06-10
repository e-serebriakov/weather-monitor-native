import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  card: {
    position: relative;
    width: 325;
    margin: 10 0;
    padding: 20;
    fontSize: 1;  // @TODO change
    textAlign: center;
    color: '#131516';
    backgroundColor: 'white';
    borderRadius: 5;
    boxShadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
    shadowColor: '#000',
    shadowOpacity: 0.16,
    shadowRadius: 6,
    shadowOffset: {
      height: 3,
      width: 0
    }
  }
});