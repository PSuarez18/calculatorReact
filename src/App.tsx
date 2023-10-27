import { useState } from 'react'
import './App.css'
import { Icon } from '@iconify/react'

function App() {
  const [currentValue, setCurrentValue] = useState('0')
  const [prevValue, setPrevValue] = useState<string | null>(null)
  const [operator, setOperator] = useState<string | null>(null)


  //Handler for Click the Numbers/ Manejador de Clicks en Numeros
  const numberButtonClick = (valueNumber: string) => {
    if (currentValue === '0' || currentValue === 'Error') {
      setCurrentValue(valueNumber)
    } else {
      setCurrentValue(currentValue + valueNumber)
    }
  }

  //Handler for Click the operator math/ Manejador de Click en Operaador Matematico
  const operatorButtonClick = (op: string) => {
    if (prevValue === null) {
      setPrevValue(currentValue)
      setCurrentValue('0')
      setOperator(op)
    }
    else {
      calculateResult()
      setOperator(op)
      setCurrentValue('0')
    }
  }
 

  //handler Result Math // Manejar de resultado matematico
  const calculateResult = () => {
    if (prevValue !== null && operator !== null) {
      const num1 = parseFloat(prevValue)
      const num2 = parseFloat(currentValue)

      switch (operator) {
        case '+':
          setCurrentValue((num1 + num2).toString());
          break;
        case '-':
          setCurrentValue((num1 - num2).toString());
          break;
        case '*':
          setCurrentValue((num1 * num2).toString());
          break;
        case '/':
          if (num2 !== 0) {
            setCurrentValue((num1 / num2).toString());
          } else {
            setCurrentValue('Error');
          }
          break;
        case "%":
          {
            setCurrentValue(((num1 * num2)  / 100).toString())
          }
          break;
        default:
          break;
      }

      setPrevValue(null);
      setOperator(null);
    }
  }

  //Handler Result Button Equal // Manejador de Resultado Boton Igualdad
  const handleEqualsClick = () => {
    calculateResult();
  }


  const handlerClear = () => {
    setCurrentValue('0')
    setPrevValue(null)
    setOperator(null)
  }


  //Handler Keys Number // Manejador Teclado Numerico
  const handleKeyDown = (event:any) => {
    const key = event.key;
  
    if (/^[0-9]$/.test(key)) {
      numberButtonClick(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
      operatorButtonClick(key);
    } else if (key === 'Enter') {
      handleEqualsClick();
    } else if (key === 'Escape') {
      handlerClear();
    } else if (key === 'Backspace') {
      if (currentValue.length > 1) {
        setCurrentValue(currentValue.slice(0, -1));
      } else {
        setCurrentValue('0');
      }
    }
  };
  



  return (
    <>
      <div>
        <div>
          <input value={currentValue} readOnly onKeyDown={handleKeyDown}></input>
        </div>
        <div>
          <button onClick={() => operatorButtonClick('+')}>
            <Icon icon="whh:calcplus" height={45} /></button>
          <button onClick={() => operatorButtonClick('-')}>
            <Icon icon="whh:calcminus" height={45} /></button>
          <button onClick={() => operatorButtonClick('*')}>
            <Icon icon="whh:calcmultiply" height={45} /></button>
          <button onClick={() => operatorButtonClick('/')}>
            <Icon icon="whh:calcdivide" height={45} /></button>
          <button onClick={() => handleEqualsClick()}><Icon icon="whh:calcequals" height={45} /></button>
          <button onClick={() => operatorButtonClick('%')}>
            <Icon icon="fa-solid:percentage" height={45} /></button>
          <button onClick={() => numberButtonClick('9')}>
            <Icon icon="material-symbols:counter-9" height={45} /></button>
          <button onClick={() => numberButtonClick('8')}>
            <Icon icon="material-symbols:counter-8" height={45} /></button>
          <button onClick={() => numberButtonClick('7')}>
            <Icon icon="material-symbols:counter-7" height={45} /></button>
          <button onClick={() => numberButtonClick('6')}>
            <Icon icon="material-symbols:counter-6" height={45} /></button>
          <button onClick={() => numberButtonClick('5')}>
            <Icon icon="material-symbols:counter-5" height={45} /></button>
          <button onClick={() => numberButtonClick('4')}>
            <Icon icon="material-symbols:counter-4" height={45} /></button>
          <button onClick={() => numberButtonClick('3')}>
            <Icon icon="material-symbols:counter-3" height={45} /></button>
          <button onClick={() => numberButtonClick('2')}>
            <Icon icon="material-symbols:counter-2" height={45} /></button>
          <button onClick={() => numberButtonClick('1')}>
            <Icon icon="material-symbols:counter-1" height={45} /></button>
          <button onClick={() => numberButtonClick('0')}>
            <Icon icon="material-symbols:counter-0" height={45} /></button>
          <button onClick={() => handlerClear()}>
            <Icon icon="material-symbols:copyright-outline-rounded" height={45} /></button>
          <button onClick={() => numberButtonClick('.')}> 
            <Icon icon="tabler:point-filled" height={45} /></button>
        </div>
      </div>

    </>
  )
}

export default App
