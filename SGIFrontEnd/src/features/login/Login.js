import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { UserContext } from '../../context/UserContext'

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  /* Simulación de autenticación */
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  
  const handleLogin = (e) => {
    e.preventDefault();

    if (username === 'investigador' && password === '1234') {
      login({ username, role: 'Investigador' });
      sessionStorage.setItem('user', JSON.stringify({ username, role: 'Investigador' }));

      navigate('/publicaciones/revision');
    } else if (username === 'trabajador' && password === '1234') {
      
      login({ username, role: 'Trabajador' });

      sessionStorage.setItem('user', JSON.stringify({ username, role: 'Trabajador' }));

      navigate('/publicaciones/historico');
    } else {
      setError('Credenciales incorrectas');
      setPassword('');
    }
  };
  /* Simulación de autenticación */

  return (
    <div className="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
      <CContainer>
        <CRow className="justify-content-center">
          <CCol lg={5}>
            <CCard className="p-4">
              <CCardBody>
                <CForm>
                  <h1>Iniciar sesión</h1>
                  <p className="text-body-secondary">Accede con tu correo electrónico PUCP</p>
                  <CInputGroup className="mb-3">
                    <CInputGroupText>
                      <CIcon icon={cilUser} />
                    </CInputGroupText>
                    <CFormInput 
                      placeholder="Correo electrónico" 
                      autoComplete="username" 
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </CInputGroup>
                  <CInputGroup className="mb-4">
                    <CInputGroupText>
                      <CIcon icon={cilLockLocked} />
                    </CInputGroupText>
                    <CFormInput
                      type="password"
                      placeholder="Contraseña"
                      autoComplete="current-password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </CInputGroup>
                  <CRow>
                    <CCol sm={6}>
                      <CButton color="primary" className="px-4 mb-3" onClick={handleLogin}>
                        Iniciar sesión
                      </CButton>
                      {error && <b>{error}</b>}
                    </CCol>
                    <CCol sm={6} className="text-right">
                      <CButton color="link" className="px-0">
                        ¿Olvidaste tu contraseña?
                      </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  )
}

export default Login
