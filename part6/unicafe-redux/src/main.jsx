import ReactDOM from 'react-dom/client'
import { createStore } from 'redux'
import counterReducer from './reducers/counterReducer'

const store = createStore(counterReducer)

const App = () => {
  const handleGood = () => {\n    store.dispatch({ type: 'GOOD' })\n  }\n\n  const handleOk = () => {\n    store.dispatch({ type: 'OK' })\n  }\n\n  const handleBad = () => {\n    store.dispatch({ type: 'BAD' })\n  }\n\n  const handleReset = () => {\n    store.dispatch({ type: 'RESET' })\n  }\n\n  return (
    <div>
      <button onClick={handleGood}>good</button>
      <button onClick={handleOk}>ok</button>
      <button onClick={handleBad}>bad</button>
      <button onClick={handleReset}>reset stats</button>
      <div>good {store.getState().good}</div>
      <div>ok {store.getState().ok}</div>
      <div>bad {store.getState().bad}</div>
    </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
