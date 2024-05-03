import React from 'react'
import CIcon from '@coreui/icons-react'
import {
  cilBarChart,
  cibReadTheDocs,
} from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

const _nav = [
  {
    component: CNavTitle,
    name: 'Menú',
  },
  {
    component: CNavGroup,
    name: 'Publicaciones',
    icon: <CIcon icon={cibReadTheDocs} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'En revisión',
        to: '/publicaciones/revision',
      },
    ]
  },
  {
    component: CNavItem,
    name: 'Eval. Desempeño',
    to: '/evaluacion',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
  },
]

export default _nav
