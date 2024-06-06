const StatusProject = [
  {
    id: 'ACTIVO',
    name: 'Activo',
    substatus: [
      {id: 'POR_INICIAR', name: 'Por iniciar'},
      {id: 'EN_EJECUCION', name: 'En ejecución'},
    ],
  },
  {
    id: 'CONCLUIDO',
    name: 'Concluido',
    substatus: [
      {id: 'EN_PROCESO_CIERRRE', name: 'En proceso de cierre'},
      {id: 'CERRADO', name: 'Cierre'},
    ],
  },
  {
    id: 'SUSPENDIDO',
    name: 'Suspendido',
    substatus: [
      {id: 'CANCELADO', name: 'Cancelado'},
    ],
  },
]

export default StatusProject;