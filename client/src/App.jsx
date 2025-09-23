
function App() {
  return (
    <div className="App-container">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={
            <ProtectedRoute>
              <Homepage />
            </ProtectedRoute>
          } />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          } />
          <Route path="/requests" element={
            <ProtectedRoute>
              <Requests />
            </ProtectedRoute>
          } />
          <Route path="/create-request" element={
            <ProtectedRoute>
              <CreateRequest />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
