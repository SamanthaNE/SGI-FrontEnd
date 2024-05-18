import React from 'react'

// ---------------------- RESEARCHER ---------------------- //

const ScopusPublications = React.lazy(() => import('./features/researcher/scopus_publication/ScopusPublication'))
const SPDataCuration = React.lazy(() => import('./features/researcher/scopus_publication/SPDataCuration'))
const ProjectSearch = React.lazy(() => import('./features/researcher/scientific_prod/ProjectSearch'))
const NewProject = React.lazy(() => import('./features/researcher/scientific_prod/NewProject'))
const FundingSearch = React.lazy(() => import('./features/researcher/scientific_prod/FundingSearch'))
const NewFunding = React.lazy(() => import('./features/researcher/scientific_prod/NewFunding'))

const PerformanceEval = React.lazy(() => import('./features/researcher/performance_evaluation/PerformanceEval'))
const PublicationDetail = React.lazy(() => import('./features/researcher/performance_evaluation/publications/PublicationDetail'))
const PublicationSearchEval = React.lazy(() => import('./features/researcher/performance_evaluation/publications/PublicationSearch'))
const ProjectDetail = React.lazy(() => import('./features/researcher/performance_evaluation/projects/ProjectDetail'))
const ProjectSearchEval = React.lazy(() => import('./features/researcher/performance_evaluation/projects/ProjectSearch'))
const GroupDetail = React.lazy(() => import('./features/researcher/performance_evaluation/groups/GroupDetail'))

// ---------------------- WORKER ---------------------- //

const Publications = React.lazy(() => import('./features/worker/scientific_production/publications/Publications'))
const PublicationDetailWorker = React.lazy(() => import('./features/worker/scientific_production/publications/PublicationDetail'))
const Projects = React.lazy(() => import('./features/worker/scientific_production/projects/Projects'))
const ProjectDetailWorker = React.lazy(() => import('./features/worker/scientific_production/projects/ProjectDetail'))

const PublicationValidation = React.lazy(() => import('./features/worker/scientific_production/publications/validation/PublicationValidation'))
const PublicationValidationDetail = React.lazy(() => import('./features/worker/scientific_production/publications/validation/PublicationValidationDetail'))

const Groups = React.lazy(() => import('./features/worker/performance_evaluation/research_groups/Groups'))
const GroupDetailWorker = React.lazy(() => import('./features/worker/performance_evaluation/research_groups/GroupDetail'))
const QualificationRules = React.lazy(() => import('./features/worker/performance_evaluation/qualification_rules/QualificationRules'))
const RuleDetail = React.lazy(() => import('./features/worker/performance_evaluation/qualification_rules/RuleDetail'))
const NewRule = React.lazy(() => import('./features/worker/performance_evaluation/qualification_rules/NewRule'))

//-----------------------------------------------------------------------------//

const routes = [
  { path: '/publicaciones', element: ScopusPublications, exact: true },
  { path: '/publicaciones/revision', name: 'Publicaciones en revisión', element: ScopusPublications },
  { path: '/publicaciones/revision/detalle/:elementID', name: 'Registro de información', element: SPDataCuration },
  { path: '/publicaciones/revision/detalle/:elementID/proyectos', name: 'Búsqueda de proyectos', element: ProjectSearch }, 
  { path: '/publicaciones/revision/detalle/:elementID/proyectos/nuevo', name: 'Registro de nuevo proyecto', element: NewProject },
  { path: '/publicaciones/revision/detalle/:elementID/proyectos/nuevo/financiamiento', name: 'Búsqueda de financiamientos', element: FundingSearch },
  { path: '/publicaciones/revision/detalle/:elementID/proyectos/nuevo/financiamiento/nuevo', name: 'Registro de nuevo financiamiento', element: NewFunding },

  { path: '/evaluacion', name: 'Eval. Desempeño', element: PerformanceEval }, 
  { path: '/evaluacion/publicaciones', name: 'Publicaciones', element: PublicationSearchEval },
  { path: '/evaluacion/publicaciones/detalle/:elementID', name: 'Detalle de la publicacion', element: PublicationDetail }, 
  { path: '/evaluacion/proyectos', name: 'Proyectos', element: ProjectSearchEval },
  { path: '/evaluacion/proyectos/detalle/:elementID', name: 'Detalle del proyecto', element: ProjectDetail },
  { path: '/evaluacion/grupos/detalle/:elementID', name: 'Detalle del grupo de investigación', element: GroupDetail },

  /***********************************************************/

  { path: '/publicaciones/historico', name: 'Publicaciones', element: Publications },
  { path: '/publicaciones/historico/detalle/:elementID', name: 'Detalle de la publicación', element: PublicationDetailWorker },

  { path: '/publicaciones/validar', name: 'Publicaciones por validar', element: PublicationValidation },
  { path: '/publicaciones/validar/detalle/:elementID', name: 'Detalle de la publicación', element: PublicationValidationDetail },
  
  { path: '/proyectos', name: 'Proyectos', element: Projects },
  { path: '/proyectos/detalle/:elementID', name: 'Detalle del proyecto', element: ProjectDetailWorker },
  
  { path: '/desempeño', name: 'Eval. Desempeño', element: Groups, exact: true },
  { path: '/desempeño/grupos', name: 'Grupos de investigación', element: Groups },
  { path: '/desempeño/grupos/detalle/:elementID', name: 'Detalle del grupo de investigación', element: GroupDetailWorker }, 
  { path: '/desempeño/reglas', name: 'Reglas de calificación', element: QualificationRules },
  { path: '/desempeño/reglas/registro', name: 'Registro de una regla de calificación', element: NewRule },
  { path: '/desempeño/reglas/detalle/:elementID', name: 'Detalle de la regla de calificación', element: RuleDetail },
]

export default routes
