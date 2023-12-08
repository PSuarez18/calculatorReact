import { useState } from 'react';
import './App.css';
import { Icon } from '@iconify/react';
import ThemeSelector from './ThemeSelector';

function App() {
  const [currentValue, setCurrentValue] = useState('0');
  const [prevValue, setPrevValue] = useState<string | null>(null);
  const [operator, setOperator] = useState<string | null>(null);
  const [currentTheme, setCurrentTheme] = useState<string>("theme1");

  const numberButtonClick = (valueNumber: string) => {
    if (currentValue === '0' || currentValue === 'Error' || currentValue === '') {
      setCurrentValue(valueNumber);
    } else {
      setCurrentValue(currentValue + valueNumber);
    }
  }

  const operatorButtonClick = (op: string) => {
    if (prevValue === null) {
      setPrevValue(currentValue);
      setOperator(op);
      setCurrentValue('0');
    } else if (prevValue && operator && currentValue) {
      calculateResult();
    }
  }

  const calculateResult = () => {
    if (prevValue !== null && operator !== null) {
      const num1 = parseFloat(prevValue);
      const num2 = parseFloat(currentValue);

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
        case '%':
          setCurrentValue(((num1 * num2) / 100).toString());
          break;
        default:
          break;
      }
      setPrevValue(null);
      setOperator(null);
    }
  }

  const handleEqualsClick = () => {
    calculateResult();
    setOperator(null);
  }

  const handlerClear = () => {
    setCurrentValue('0');
    setPrevValue(null);
    setOperator(null);
  }

  const handleKeyDown = (event: any) => {
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
    <div>

      <ThemeSelector onSelectTheme={setCurrentTheme} />
      <div className="calculator-container">
        <div className="calculator">
          <div>
            <input
              value={
                !operator
                  ? currentValue
                  : prevValue
                    ? `${prevValue} ${operator} ${currentValue}`
                    : currentValue
              }
              readOnly
              onKeyDown={handleKeyDown}
              className="screen"
            />
            <div className="button-container">
              <div className="number-buttons">
                <button onClick={() => numberButtonClick('7')} className={`button number ${currentTheme}`}>
                  <Icon icon="material-symbols:counter-7" height={45} />
                </button>
                <button onClick={() => numberButtonClick('8')} className={`button number ${currentTheme}`}>
                  <Icon icon="material-symbols:counter-8" height={45} />
                </button>
                <button onClick={() => numberButtonClick('9')} className={`button number ${currentTheme}`}>
                  <Icon icon="material-symbols:counter-9" height={45} />
                </button>
                <button onClick={() => numberButtonClick('4')} className={`button number ${currentTheme}`}>
                  <Icon icon="material-symbols:counter-4" height={45} />
                </button>
                <button onClick={() => numberButtonClick('5')} className={`button number ${currentTheme}`}>
                  <Icon icon="material-symbols:counter-5" height={45} />
                </button>
                <button onClick={() => numberButtonClick('6')} className={`button number ${currentTheme}`}>
                  <Icon icon="material-symbols:counter-6" height={45} />
                </button>
                <button onClick={() => numberButtonClick('1')} className={`button number ${currentTheme}`}>
                  <Icon icon="material-symbols:counter-1" height={45} />
                </button>
                <button onClick={() => numberButtonClick('2')} className={`button number ${currentTheme}`}>
                  <Icon icon="material-symbols:counter-2" height={45} />
                </button>
                <button onClick={() => numberButtonClick('3')} className={`button number ${currentTheme}`}>
                  <Icon icon="material-symbols:counter-3" height={45} />
                </button>
                <button onClick={() => handlerClear()} className={`button clear ${currentTheme}`}>
                  <Icon icon="material-symbols:copyright-outline-rounded" height={45} />
                </button>
                <button onClick={() => numberButtonClick('0')} className={`button number ${currentTheme}`}>
                  <Icon icon="material-symbols:counter-0" height={45} />
                </button>
                <button onClick={() => numberButtonClick('.')} className={`button number ${currentTheme}`}>
                  <Icon icon="tabler:point-filled" height={38} />
                </button>
                <button onClick={() => operatorButtonClick('+')} className={`button operator ${currentTheme}`}>
                  <Icon icon="whh:calcplus" height={38} />
                </button>
                <button onClick={() => operatorButtonClick('-')} className={`button operator ${currentTheme}`}>
                  <Icon icon="whh:calcminus" height={38} />
                </button>
                <button onClick={() => operatorButtonClick('*')} className={`button operator ${currentTheme}`}>
                  <Icon icon="whh:calcmultiply" height={38} />
                </button>
                <button onClick={() => operatorButtonClick('/')} className={`button operator ${currentTheme}`}>
                  <Icon icon="whh:calcdivide" height={38} />
                </button>
                <button onClick={() => handleEqualsClick()} className={`button equal ${currentTheme}`}>
                  <Icon icon="whh:calcequals" height={38} />
                </button>
                <button onClick={() => operatorButtonClick('%')} className={`button percentage ${currentTheme}`}>
                  <Icon icon="fa-solid:percentage" height={38} />
                </button>
              </div>


            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
