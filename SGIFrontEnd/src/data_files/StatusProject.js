const StatusProject = [
  {
    id: 'ACTIVE',
    name: 'Activo',
    substatus: [
      {id: 'INITIAL', name: 'Por iniciar'},
      {id: 'EXECUTION', name: 'En ejecución'},
    ],
  },
  {
    id: 'CONCLUDED',
    name: 'Concluido',
    substatus: [
      {id: 'PROCESS', name: 'En proceso de cierre'},
      {id: 'CLOSED', name: 'Cierre'},
    ],
  },
  {
    id: 'SUSPENDED',
    name: 'Suspendido',
    substatus: [
      {id: 'CANCELED', name: 'Cancelado'},
    ],
  },
]

export default StatusProject;