import React from 'react'

const ScopusPublications = React.lazy(() => import('./features/researcher/scopus_publication/ScopusPublication'))
const PerformanceEval = React.lazy(() => import('./features/researcher/performance_evaluation/PerformanceEval'))
const SPDataCuration = React.lazy(() => import('./features/researcher/scopus_publication/SPDataCuration'))
const ProjectSearch = React.lazy(() => import('./features/researcher/scientific_prod/ProjectSearch'))
const NewProject = React.lazy(() => import('./features/researcher/scientific_prod/NewProject'))
const FundingSearch = React.lazy(() => import('./features/researcher/scientific_prod/FundingSearch'))
const NewFunding = React.lazy(() => import('./features/researcher/scientific_prod/NewFunding'))

//-----------------------------------------------------------------------------//

const routes = [
  { path: '/publicaciones', element: ScopusPublications, exact: true },
  { path: '/publicaciones/revision', name: 'Publicaciones en revisión', element: ScopusPublications },
  { path: '/publicaciones/revision/detalle', name: 'Registro de información', element: SPDataCuration }, //FALTA CONSIDERAR EL ID DE LA PUB SELECCIONADA
  { path: '/publicaciones/revision/detalle/proyectos', name: 'Búsqueda de proyectos', element: ProjectSearch }, //FALTA CONSIDERAR EL ID DE LA PUB SELECCIONADA
  { path: '/publicaciones/revision/detalle/proyectos/nuevo', name: 'Registro de nuevo proyecto', element: NewProject }, //FALTA CONSIDERAR EL ID DE LA PUB SELECCIONADA
  { path: '/publicaciones/revision/detalle/proyectos/nuevo/financiamiento', name: 'Búsqueda de financiamientos', element: FundingSearch }, //FALTA CONSIDERAR EL ID DE LA PUB SELECCIONADA
  { path: '/publicaciones/revision/detalle/proyectos/nuevo/financiamiento/nuevo', name: 'Registro de nuevo financiamiento', element: NewFunding }, //FALTA CONSIDERAR EL ID DE LA PUB SELECCIONADA

  { path: '/evaluacion', name: 'Eval. Desempeño', element: PerformanceEval },

]

export default routes
