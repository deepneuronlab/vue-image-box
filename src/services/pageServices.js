import axios from "axios"

export const getPages = async () => {
  const { data: { links } } = await axios.get('/pages')
  return links
}

export const postPage = async page => {
  const { data: { coords } } = await axios.post('/page', { page })
  return coords
}