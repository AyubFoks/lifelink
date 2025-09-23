import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Homepage from '../pages/Homepage'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Profile from '../pages/Profile'
import Requests from '../pages/Requests'
import CreateRequest from '../pages/CreateRequest'
import NotFound from '../pages/NotFound'
import ProtectedRoute from '../components/auth/ProtectedRoute'

const Routes = () => (
    <Router>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/requests" element={<Requests />} />
        <Route path="/create-request" element={
            <ProtectedRoute>
                <CreateRequest />
            </ProtectedRoute>
        } />
        <Route path="/hospital/:id" element={
            <ProtectedRoute>
                <Requests isHospitalView />
            </ProtectedRoute>
        } />
        <Route path="/user/:id" element={
            <ProtectedRoute>
                <Profile />
            </ProtectedRoute>
        } />
        <Route path="/request/:id" element={
            <ProtectedRoute>
                <Requests isRequestView />
            </ProtectedRoute>
        } />
        <Route path="/donation-history" element={
            <ProtectedRoute>
                <Profile initialTab="donationHistory" />
            </ProtectedRoute>
        } />
        <Route path="*" element={<NotFound />} />
    </Router>
)

export default Routes