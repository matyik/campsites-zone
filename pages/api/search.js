import axios from 'axios'
const apikey = process.env.RIDB_API_KEY

export default async function handler(req, res) {
  const { q, location } = req.query
  try {
    const ridbRes = await axios.get(
      `https://ridb.recreation.gov/api/v1/campsites?query=${q}&limit=100&offset=0`,
      { headers: { apikey } }
    )
    const recdata = ridbRes.data.RECDATA
    if (recdata.length > 0) {
      if (location) {
        try {
          const locationRes = await axios.get(
            `https://geokeo.com/geocode/v1/search.php?q=${location}&api=YOUR_API_KEY`
          )
          if (locationRes.data.results.length > 0) {
            const { lat, lng } = locationRes.data.results[0].geometry.location
            const newRecData = recdata.filter(
              (campsite) =>
                campsite.CampsiteLatitude > lat - 4 &&
                campsite.CampsiteLatitude < lat + 4 &&
                campsite.CampsiteLongitude > lng - 4 &&
                campsite.CampsiteLongitude < lng + 4
            )
            if (newRecData.length > 0) {
              return res.status(200).json({
                recdata: newRecData
              })
            } else {
              return res.status(200).json({ error: 'No Campsites Found' })
            }
          } else {
            return res.status(200).json({ error: 'No Campsites Found' })
          }
        } catch (err) {
          res.status(500).json({ error: err.message })
        }
      } else {
        return res.status(200).json({ recdata: recdata.splice(50) })
      }
    }
    return res.status(200).json({ error: 'No Campsites Found' })
  } catch (err) {
    return res.status(500).json({ error: err.message })
  }
}
