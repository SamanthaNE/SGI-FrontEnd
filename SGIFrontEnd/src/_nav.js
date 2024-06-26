import React from 'react'
import CIcon from '@coreui/icons-react'
import { cilBarChart, cibReadTheDocs } from '@coreui/icons'
import { CNavGroup, CNavItem, CNavTitle } from '@coreui/react'

export const _navResearcher = [
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

export const _navWorker = [
  {
    component: CNavTitle,
    name: 'Menú',
  },
  /*
  {
    component: CNavGroup,
    name: 'Publicaciones',
    icon: <CIcon icon={cibReadTheDocs} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Por validar',
        to: '/publicaciones/validar',
      },
      {
        component: CNavItem,
        name: 'Histórico',
        to: '/publicaciones/historico',
      },
    ]
  },
  */
  {
    component: CNavItem,
    name: 'Publicaciones',
    to: '/publicaciones/historico',
    icon: <CIcon icon={cibReadTheDocs} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: 'Proyectos',
    to: '/proyectos',
    icon: <CIcon icon={cibReadTheDocs} customClassName="nav-icon" />,
  },
  {
    component: CNavGroup,
    name: 'Eval. Desempeño',
    icon: <CIcon icon={cilBarChart} customClassName="nav-icon" />,
    items: [
      {
        component: CNavItem,
        name: 'Grupos de investigación',
        to: '/desempeño/grupos',
      },
      {
        component: CNavItem,
        name: 'Reglas de calificación',
        to: '/desempeño/reglas',
      },
    ]
  },
]

