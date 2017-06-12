import { StyleSheet } from 'react-native';

const Style = StyleSheet.create({
  form: {
    position: 'relative',
    flexDirection: 'row',
    flexWrap: 'wrap',
    height: 40,
    marginBottom: 30
  },
  input: {
    height: 40,
    flex: 7,
    marginRight: 10,
//    padding: '0 10',
//    fontSize: 1em,
//    line-height: 40px;
    paddingHorizontal: 10,
    fontFamily: 'PT Sans',
    color: '#131516',
//    border: ${props => props.inputError ? '1px solid #fe4a49' : '0'};
    borderRadius: 5,
    backgroundColor: '#fff',
//    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  },
  error: {
    position: 'absolute',
    bottom: 0,
    left: 0,
//    font-size: 0.85em;
    fontFamily: 'PT Sans',
    color: '#fe4a49'
  },
  button: {
    flex: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    backgroundColor: '#fe4a49',
//    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
  },
  buttonText: {
    fontFamily: 'PT Sans',
    color: '#fff',
  }
});

export default Style;

//const Form = styled.form`
//  position: relative;
//  margin-bottom: 50px;
//  }
//`;
//
//const Input = styled.input`
//  height: 40px;
//  width: 220px;
//  margin-right: 10px;
//  padding: 0 10px;
//  font-size: 1em;
//  line-height: 40px;
//  color: #131516;
//  border: ${props => props.inputError ? '1px solid #fe4a49' : '0'};
//  outline: 0;
//  border-radius: 5px;
//  background-color: #fff;
//  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
//`;
//
//const ErrorText = styled.p`
//  position: absolute;
//  top: 100%;
//  left: 0;
//  font-size: 0.85em;
//  color: #fe4a49;
//`;
//
//const Button = styled.button`
//  width: 100px;
//  height: 40px;
//  line-height: 40px;
//  font-size: 1em;
//  text-align: center;
//  color: #fff;
//  border: 0;
//  border-radius: 5px;
//  outline: 0;
//  background-color: #fe4a49;
//  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
//  cursor: pointer;
//  animation: ${addBtnShake} 5s linear infinite;
//`;