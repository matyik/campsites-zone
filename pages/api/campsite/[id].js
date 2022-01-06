import axios from 'axios'
const apikey = process.env.RIDB_API_KEY

export default async function handler(req, res) {
  const id = req.query.id
  try {
    const ridbRes = await axios.get(
      `https://ridb.recreation.gov/api/v1/campsites/${id}`,
      { headers: { apikey } }
    )
    const data = ridbRes.data[0]
    return res.status(200).json(data)
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
