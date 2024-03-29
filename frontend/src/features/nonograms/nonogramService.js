import axios from 'axios'

const API_URL = '/api/nonograms/'

// Create new Nonogram
const createNonogram = async (nonogramData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, nonogramData, config)
  return response.data
}

// Get all Nonograms
const getAllNonograms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + "all", config)

  return response.data
}

// Get all workshop Nonograms
const getAllWorkshopNonograms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + "allWorkshop", config)

  return response.data
}

// Get all casual Nonograms
const getAllCasualNonograms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + "allCasual", config)

  return response.data
}

// Get user Nonograms
const getNonograms = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get user Nonogram
const getNonogram = async (nonogramId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.get(API_URL + nonogramId, config)
  return response.data
}

// Update user Nonogram
const updateNonogram = async (nonogramId, nonogramData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + nonogramId, nonogramData, config)
  return response.data
}

// Update Nonogram votes
const updateNonogramVotes = async (nonogramId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + nonogramId + "/votes", null, config)
  return response.data
}

// Update Nonogram played
const updateNonogramPlayed = async (data, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.put(API_URL + data.nonogramId + "/played", { bestTime: data.bestTime }, config)
  return response.data
}

// Delete user Nonogram
const deleteNonogram = async (nonogramId, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }

  const response = await axios.delete(API_URL + nonogramId, config)
  return response.data
}

const nonogramService = {
  createNonogram,
  getAllNonograms,
  getAllCasualNonograms,
  getAllWorkshopNonograms,
  getNonograms,
  getNonogram,
  updateNonogram,
  updateNonogramVotes,
  updateNonogramPlayed,
  deleteNonogram
}

export default nonogramService