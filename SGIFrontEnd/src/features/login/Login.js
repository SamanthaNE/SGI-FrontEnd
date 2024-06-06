import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CButton, CCard, CCardBody, CCol, CContainer, CForm, CFormInput, CInputGroup, CInputGroupText, CRow, } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import { KEYCODE } from '../../config/Constants'
import axiosInstance from '../../config/HTTPService'
import { useDispatch } from 'react-redux'
import { addUser } from '../../redux/slices/userSlice'

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const handleLogin = async(e) => {
    e.preventDefault();

    try {
      const params = {
        'keyCode': KEYCODE,
        'email': email,
        'password': password
      };

      const response = await axiosInstance.post('api/users/login', params);
      
      if (response.data) {
        console.log(response.data.userInfo[0])
        const userInfo = response.data.userInfo[0];
        const user = {
            name: userInfo.firstNames + ' ' + userInfo.familyNames,
            email: userInfo.email,
            role: userInfo.roleName,
            idPerson: userInfo.idPerson,
            scopusAuthorId: userInfo.scopusAuthorId
        };

        sessionStorage.setItem('user', JSON.stringify(user));
        dispatch(addUser(user));

        if(userInfo.roleName === 'Investigador'){
          navigate('/publicaciones/revision');
        } else{
          navigate('/publicaciones/historico');
        }
        
      } else {
        setError(response.data.message || 'Credenciales incorrectas');
        setPassword('');
      }
      
    } catch (error) {
      console.error('Error:', error);
      setError('Error al iniciar sesión');
    }
  };

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
                      autoComplete="email" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
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
