import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isPrincipalAuthor: null,
  isRelatedProject: null,
  selectedGroups: [],
  selectedOptionAuthor: '',
  selectedProjects: [],
  newProject: {
    projectTitle: '',
    selectedOptionOrg: '',
    dateStart: '',
    dateEnd: '', 
    activeStatus: null,
    activeSubStatus: null,
    isProjectFunded: null,
    isParticipating: null,
    isTeam: null
  },
  selectedFundings: [],
}

const curationSlice = createSlice({
  name: 'curation',
  initialState,
  reducers: {
    setIsPrincipalAuthor: (state, action) => {
      state.isPrincipalAuthor = action.payload
    },
    setIsRelatedProject: (state, action) => {
      state.isRelatedProject = action.payload
    },
    setSelectedGroups: (state, action) => {
      state.selectedGroups = action.payload
    },
    setSelectedOptionAuthor: (state, action) => {
      state.selectedOptionAuthor = action.payload
    },
    setSelectedProjects: (state, action) => {
      state.selectedProjects = action.payload
    },
    setProjectTitle: (state, action) => {
      state.newProject.projectTitle = action.payload
    },
    setSelectedOptionOrg: (state, action) => {
      state.newProject.selectedOptionOrg = action.payload
    },
    setDateStart: (state, action) => {
      state.newProject.dateStart = action.payload
    },
    setDateEnd: (state, action) => {
      state.newProject.dateEnd = action.payload
    },
    setActiveStatus: (state, action) => {
      state.newProject.activeStatus = action.payload
    },
    setActiveSubStatus: (state, action) => {
      state.newProject.activeSubStatus = action.payload
    },
    setIsProjectFunded: (state, action) => {
      state.newProject.isProjectFunded = action.payload
    },
    setIsTeam: (state, action) => {
      state.newProject.isTeam = action.payload
    },
    setIsParticipating: (state, action) => {
      state.newProject.isParticipating = action.payload
    },
    setSelectedFundings: (state, action) => {
      state.selectedFundings = action.payload
    },
  },
})

export const {
  setIsPrincipalAuthor,
  setIsRelatedProject,
  setSelectedGroups,
  setSelectedOptionAuthor,
  setSelectedProjects,
  setProjectTitle,
  setSelectedOptionOrg,
  setDateStart,
  setDateEnd,
  setActiveStatus,
  setActiveSubStatus,
  setIsProjectFunded,
  setIsTeam,
  setIsParticipating,
  setSelectedFundings
} = curationSlice.actions

export default curationSlice.reducer