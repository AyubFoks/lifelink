import Routes from "./routes/Routes"

function App() {
  return (
    <div className="App-container">
      <Router>
        <Header />
        <Routes />
        <Footer />
      </Router>
    </div>
  )
}

export default App
